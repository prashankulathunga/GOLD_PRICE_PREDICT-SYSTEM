import db from "../model/connection.js";

const calculateMonthlyInterest = async () => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Fetch active loans
    const [loans] = await connection.execute(
      `SELECT loan_id, remaining_amount, interest_rate, pawn_date, initial_loan_amount FROM LoanDetails WHERE status = 'active'`
    );

    console.log(loans);

    // Fetch the interest rate (assuming a single rate from the Interest table)
    const [interestData] = await connection.execute(`SELECT base_rate FROM InterestRates`);
    console.log(interestData);

    if (!interestData) {
      throw new Error("Interest rate not found in the Interest table");
    }

    for (const loan of loans) {
      const { loan_id, remaining_amount, pawn_date, initial_loan_amount, interest_rate} = loan;

      const startDate = new Date(pawn_date);
      const endDate = new Date();

      // Calculate the difference in months
      const differenceInMilliseconds = endDate - startDate;
      const dayCount = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      const monthCount = Math.floor(dayCount / 30); // Approximate months

      // Calculate interest for the total duration
      interestData.map(interest => {
        const test = interest.base_rate
        console.log(test)
      })

      

      

      

      const interest = remaining_amount * (interestData / 100) * monthCount;

      // Update the remaining amount
      const updatedRemainingAmount = remaining_amount + interest;

      // Update loan details
      await connection.execute(
        `UPDATE LoanDetails SET remaining_amount = ?, last_interest_calc_date = ? WHERE loan_id = ?`,
        [updatedRemainingAmount, endDate, loan_id]
      );
    }

    await connection.commit();
    console.log("Monthly interest calculated successfully for all active loans");
  } catch (error) {
    await connection.rollback();
    console.error("Monthly interest calculation error:", error.message);
  } finally {
    connection.release();
  }
};

export default { calculateMonthlyInterest };




