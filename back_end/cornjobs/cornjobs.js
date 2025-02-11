import db from "../model/connection.js"; // Import database connection
import cron from "node-cron";

//  Schedule a cron job to run every midnight (00:00)
cron.schedule("35 1 * * *", async () => {
  try {
    console.log("[INFO] Running daily update for Pawning Items...");

    //  Expire pawn items whose due date has passed
    try {
      const [result] = await db.execute(
        "UPDATE PawnItems SET Status = 'Expired' WHERE DueDate IS NOT NULL AND DueDate < CURDATE();"
      );

      if (result.affectedRows > 0) {
        console.log(
          `[INFO] Expired pawn items updated: ${result.affectedRows}`
        );
      } else {
        console.log("[INFO] No pawn items expired today.");
      }
    } catch (error) {
      console.error(
        "[ERROR] Failed to update expired pawn items:",
        error.message
      );
    }

    const [pawningItems] = await db.query(
      "SELECT LoanPrice, NeedPayAmount, PawnItemID, Status FROM PawnItems"
    );
    console.log(pawningItems);

    for (const pawn of pawningItems) {
      try {
        // Ensure values are numbers before calculations
        const loanPrice = Number(pawn.LoanPrice) || 0; // Convert to number, default to 0 if NaN
        const needPayAmount = Number(pawn.NeedPayAmount) || 0;

        console.log(pawn.Status);

        const interest = loanPrice * 0.001333;
        console.log(`Interest: ${interest.toFixed(2)}`);

        const updatedAmount = needPayAmount + interest;
        console.log(`NeedPayAmount: ${needPayAmount.toFixed(2)}`);
        console.log(`Updated Amount: ${updatedAmount.toFixed(2)}`);

        if (pawn.Status !== "Redeem" && pawn.Status !== "Expired") {
          await db.execute(
            "UPDATE PawnItems SET NeedPayAmount = ? WHERE PawnItemID = ?",
            [updatedAmount, pawn.PawnItemID] // Corrected reference
          );
        }

        console.log(
          `[INFO] Updated PawnItem ${
            pawn.PawnItemID
          }: Total Payment = ${updatedAmount.toFixed(2)}`
        );
      } catch (err) {
        console.error(
          `[ERROR] Failed to update pawning item: LoanPrice=${pawn.LoanPrice}, NeedPayAmount=${pawn.NeedPayAmount}`,
          err
        );
      }
    }

    //Expire fee

    const [interestExpireFees] = await db.execute("SELECT * FROM Interest");

    for (const interest of interestExpireFees) {
      const loanPrice = Number(pawningItems.LoanPrice) || 0;
      const needPayAmount = Number(pawningItems.NeedPayAmount) || 0;

      const expireFee = 0.005 * loanPrice;
      const fullExpireFee = expireFee + needPayAmount;

      //  Convert `DueDate` from SQL to JavaScript Date
      const dueDate = new Date(interest.DueDate);
      const currentDate = new Date();

      if (dueDate < currentDate) {
        //  Correct date comparison
        await db.execute(
          "UPDATE PawnItems SET NeedPayAmount = ? WHERE PawnItemID = ?",
          [fullExpireFee, pawningItems.PawnItemID]
        );
        console.log(
          `[INFO] Expire fee updated for Item ${
            interest.InterestID
          }: New Amount = ${fullExpireFee.toFixed(2)}`
        );
      }
    }
  } catch (error) {
    console.error("[ERROR] Failed to update pawning items:", error.message);
  }
});

console.log("[INFO] Cron job scheduled to run every midnight.");
