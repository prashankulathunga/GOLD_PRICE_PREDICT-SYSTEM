import db from "../model/connection.js";
import Share from "../share/getIdToken.js";
/**
 * Controller for managing pawnshop operations including user management,
 * pawning items, payments, and interest calculations.
 */

const savePawnItem = async (req, res) => {
  const {
    user_id,
    item_name,
    item_description,
    item_weight,
    item_price,
    due_date,
    requested_loan_amount, // Add requested_loan_amount
  } = req.body;

  // Input validation
  if (
    !user_id ||
    !item_name ||
    !item_price ||
    !due_date ||
    !requested_loan_amount
  ) {
    return res
      .status(400)
      .json({ error: "ValidationError", message: "Missing required fields" });
  }

  const validateAmount = (amount) => typeof amount === "number" && amount > 0;
  if (!validateAmount(item_price) || !validateAmount(requested_loan_amount)) {
    return res
      .status(400)
      .json({
        error: "ValidationError",
        message: "Invalid item price or requested loan amount",
      });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Calculate maximum loan amount (80% of item price)
    const maxLoanAmount = item_price * 0.8;

    // Determine the loan amount to be granted
    const loan_amount = Math.min(requested_loan_amount, maxLoanAmount);

    // Calculate the initial interest (2.5% of the granted loan amount)
    const initialInterest = loan_amount * 0.025;
    const loanAmountWithInterest = loan_amount + initialInterest;

    // Insert pawn item
    const [responseItem] = await connection.execute(
      `INSERT INTO PawnItem (
        user_id, item_name, item_description, item_weight, 
        item_price, pawn_date, due_date, status, loan_amount
      ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, 'active', ?)`,

      [
        user_id,
        item_name,
        item_description,
        item_weight,
        item_price,
        due_date,
        loanAmountWithInterest,
      ]
    );

    const pawn_id = responseItem.insertId;

    // Create loan record
    const [responseLoan] = await connection.execute(
      `INSERT INTO LoanDetails (
        pawn_id, loan_amount, initial_loan_amount, remaining_amount,
        interest_rate, due_date, status, pawn_date
      ) VALUES (?, ?, ?, ?, 4.00, ?, 'active', CURRENT_TIMESTAMP)`,

      [pawn_id, loan_amount, loan_amount, loanAmountWithInterest, due_date]
    );

    const loan_id = responseLoan.insertId;

    // Record initial interest as a transaction
    await connection.execute(
      `INSERT INTO CashBook (loan_id, transaction_date, transaction_amount, transaction_type)
       VALUES (?, CURRENT_TIMESTAMP, ?, 'debit')`,
      [loan_id, loan_amount]
    );

    await connection.commit();

    res.status(201).json({
      message: "Pawn transaction completed successfully",
      pawn_id,
      loan_id,
      loan_amount: loanAmountWithInterest,
      granted_loan_amount: loan_amount,
      max_loan_amount: maxLoanAmount,
      requested_loan_amount,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Pawn transaction error:", error);
    res
      .status(500)
      .json({
        error: "InternalServerError",
        message: "Failed to process pawn transaction",
      });
  } finally {
    connection.release();
  }
};

const makePayment = async (req, res) => {
  const { loan_id, transaction_amount } = req.body;

  if (
    !loan_id ||
    typeof transaction_amount !== "number" ||
    transaction_amount <= 0
  ) {
    return res
      .status(400)
      .json({
        error: "ValidationError",
        message: "Valid loan ID and amount are required",
      });
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [loanDetails] = await connection.execute(
      `SELECT remaining_amount, pawn_id FROM LoanDetails WHERE loan_id = ? FOR UPDATE`,
      [loan_id]
    );

    if (loanDetails.length === 0) {
      await connection.rollback();
      return res
        .status(404)
        .json({ error: "LoanNotFound", message: "Loan not found" });
    }

    const { remaining_amount, pawn_id } = loanDetails[0];

    if (transaction_amount >= remaining_amount) {
      await connection.rollback();
      return res
        .status(400)
        .json({
          error: "PaymentExceedsBalance",
          message: "Payment exceeds remaining balance",
        });
    }

    const updatedRemainingAmount = remaining_amount - transaction_amount;
    const newStatus = updatedRemainingAmount <= 0 ? "redeemed" : "active";

    // Update loan details
    await connection.execute(
      `UPDATE LoanDetails SET remaining_amount = ?, status = ? WHERE loan_id = ?`,
      [updatedRemainingAmount, newStatus, loan_id]
    );

    // Record payment
    await connection.execute(
      `INSERT INTO CashBook (loan_id, transaction_date, transaction_amount, transaction_type)
       VALUES (?, CURRENT_TIMESTAMP, ?, 'credit')`,
      [loan_id, transaction_amount]
    );

    // Update pawn status if fully paid
    if (newStatus === "redeemed") {
      await connection.execute(
        `UPDATE PawnItem SET status = 'redeemed' WHERE pawn_id = ?`,
        [pawn_id]
      );
    }

    await connection.commit();

    res.status(200).json({
      message: "Payment processed successfully",
      loan_id,
      remaining_amount: updatedRemainingAmount,
      status: newStatus,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Payment processing error:", error);
    res
      .status(500)
      .json({
        error: "InternalServerError",
        message: "Failed to process payment",
      });
  } finally {
    connection.release();
  }
};

const getPawningItems = async (req, res) => {
  const authorization = req.headers.authorization;

  // Validate the authorization header
  if (!authorization) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Extract admin ID from the token
  const adminId = Share.getUserIdFromToken(authorization);
  console.log(adminId);

  if (!adminId) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  // Query to fetch users by admin ID
  const userQuery = "SELECT user_id FROM users WHERE admin_id = ?";
  const userValues = [adminId];

  try {
    // Execute the first query to get user IDs
    const [result] = await db.execute(userQuery, userValues);
    console.log("Users result:", result);

    // Extract user IDs from the result
    const userIds = result.map((user) => user.user_id);

    if (userIds.length === 0) {
      return res.status(404).json({
        error: "NotFoundError",
        message: "No users found for the given admin ID",
      });
    }

    console.log(userIds);

    // Query to fetch pawning items for the retrieved user IDs
    const pawningItemsQuery = `SELECT * FROM PawnItem WHERE user_id IN (${userIds
      .map(() => "?")
      .join(",")})`;
    const [pawningItems] = await db.execute(pawningItemsQuery, userIds);
    console.log(pawningItems);

    if (pawningItems.length === 0) {
      return res.status(404).json({
        error: "NotFoundError",
        message: "No pawning items found for the associated users",
      });
    }

    // Return the pawning items
    return res.status(200).json({ pawningItems });
  } catch (error) {
    console.error("Error fetching pawning items:", error);
    return res.status(500).json({
      error: "InternalServerError",
      message: "Failed to fetch pawning items. Please try again later.",
    });
  }
};

export default {
  savePawnItem,
  makePayment,
  getPawningItems,
};
