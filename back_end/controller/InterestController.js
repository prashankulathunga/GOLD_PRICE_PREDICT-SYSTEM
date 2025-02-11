import db from "../model/connection.js";

const saveInterest = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      console.log(req.user);
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID not found!" });
    }

    const userId = req.user.userId;

    console.log(userId)

    const { customerID, PawnItemID, FullAmount, PayAmount } = req.body;

    if ((!customerID || !PawnItemID, !FullAmount || !PayAmount)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const Balance = Math.max(0, FullAmount - PayAmount);
    console.log(Balance)

    const [rows] = await db.query(
      "INSERT INTO Interest (userId, customerID, PawnItemID, FullAmount, PayAmount, Balance) VALUES (?,?,?,?,?,?)",
      [userId, customerID, PawnItemID, FullAmount, PayAmount, Balance]
    );

    if (rows) {
      if (Balance <= 0) {
        await db.query(
          "UPDATE PawnItems SET Status = 'Redeem' WHERE PawnItemID =? && UserID = ?",
          [PawnItemID, userId]
        );
      }

      await db.query(
        "UPDATE PawnItems SET NeedPayAmount = ? WHERE PawnItemID =? && UserID = ? ",
        [Balance, PawnItemID, userId]
      );

      await db.query(
        "INSERT INTO Cashbook (UserID, TransactionType, CashBookNote, Amount) VALUES (?,?,?,?)",
        [userId, "Credit", "Pawn Item Interest Fee Payment", PayAmount]
      );
      return res.status(201).json({ message: "Interest saved successfully cashbook credited updated" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getInterest = async(req, res)=>{
    try {
      if (!req.user ||!req.user.userId) {
        console.log(req.user);
        return res
         .status(401)
         .json({ message: "Unauthorized. User ID not found!" });
      }
      const userId = req.user.userId;
      const [rows] = await db.query(
        "SELECT CustomerID, PawnItemID, FullAmount, PayAmount, Balance, DueDate, InterestDate FROM Interest WHERE userId =?",
        [userId]
      );
      return res.status(200).json(rows);
    } catch (error) {
      console.error("[ERROR] Failed to fetch interest:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default { saveInterest, getInterest };
