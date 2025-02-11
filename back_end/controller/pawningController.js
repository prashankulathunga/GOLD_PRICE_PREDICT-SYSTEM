import db from "../model/connection.js";

const addPawnItem = async (req, res) => {
  if (!req.user || !req.user.userId) {
    console.log(req.user);
    return res
      .status(401)
      .json({ message: "Unauthorized. User ID not found!" });
  }

  const UserId = req.user.userId;

  const {
    CustomerID,
    ItemName,
    Note,
    Cartage,
    ItemWeight,
    ActualPrice,
    LoanPrice,
    MonthCount,
  } = req.body;

  if (
    !CustomerID ||
    !ItemName ||
    !Note ||
    !Cartage ||
    !ItemWeight ||
    !ActualPrice ||
    !LoanPrice ||
    !MonthCount
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const currentDate = new Date();
  const DueDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + MonthCount)
  );

  const [pawningItem] = await db.query(
    "INSERT INTO PawnItems (UserID, CustomerID,ItemName, Note, Cartage,Status, ItemWeight, ActualPrice, LoanPrice,NeedPayAmount, MonthCount, DueDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      UserId,
      CustomerID,
      ItemName,
      Note,
      Cartage,
      "Active",
      ItemWeight,
      ActualPrice,
      LoanPrice,
      0,
      MonthCount,
      DueDate,
    ]
  );

  // cashbook record debited

  if (pawningItem) {
    await db.query(
      "INSERT INTO cashbook (UserID, TransactionType, CashBookNote, Amount) VALUES (?,?,?,?)",
      [UserId, "Debit", "Give Loan for Pawn Item", LoanPrice]
    );

    return res
      .status(201)
      .json({ message: "Pawn Item Save Successfully Debited cash" });
  }
};

const getPawnItemsAndCustomer = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      console.log(req.user);
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID not found!" });
    }

    const userId = req.user.userId;

    const [rows] = await db.execute(
      `SELECT 
        Customers.CustomerID, 
        Customers.CustomerFirstName, 
        Customers.CustomerLastName, 
        Customers.CustomerContact, 
        Customers.StreetAddress, 
        Customers.SecondAddress, 
        Customers.City, 
        Customers.ZipCode, 
        PawnItems.PawnItemID,  
        PawnItems.ItemName, 
        PawnItems.Note, 
        PawnItems.Cartage, 
        PawnItems.ItemWeight, 
        PawnItems.ActualPrice, 
        PawnItems.LoanPrice, 
        PawnItems.NeedPayAmount, 
        PawnItems.MonthCount, 
        PawnItems.PawnDate,
        PawnItems.DueDate,
        PawnItems.Status
      FROM Customers 
      JOIN PawnItems ON Customers.CustomerID = PawnItems.CustomerID 
      ORDER BY PawnItems.PawnItemID DESC`,
      [userId]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.error("[ERROR] Failed to fetch pawn items:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const pawnItemFindByID = async(req, res)=>{
    if (!req.user || !req.user.userId) {
      console.log(req.user);
      return res
       .status(401)
       .json({ message: "Unauthorized. User ID not found!" });
    }

    const userId = req.user.userId;
    const {pawnItemId} = req.params;

    console.log(pawnItemId);

    if (!pawnItemId) {
        return res.status(400).json({ message: "Pawn Item ID is required!" });
    }

    const [pawnItem] = await db.query("SELECT * FROM PawnItems WHERE PawnItemID = ? && UserID = ?", [pawnItemId, userId]);

    if (!pawnItem){
        return res.status(200).json({message:"Pawn Item Not Found"})
    }

    return res.status(200).json(pawnItem);

}






export default { addPawnItem, getPawnItemsAndCustomer, pawnItemFindByID};
