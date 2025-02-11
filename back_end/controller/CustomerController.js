import db from "../model/connection.js";

const createCustomer = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      console.log(req.user);
      return res
        .status(401)
        .json({ message: "Unauthorized. User ID not found!" });
    }

    const UserId = req.user.userId; // Extract User ID from token

    const {
      CustomerID,
      CustomerFirstName,
      CustomerLastName,
      CustomerContact,
      StreetAddress,
      SecondAddress,
      City,
      ZipCode,
    } = req.body;

    if (
      !CustomerID ||
      !CustomerFirstName ||
      !CustomerLastName ||
      !CustomerContact ||
      !StreetAddress ||
      !City ||
      !ZipCode
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [rows] = await db.query(
      "INSERT INTO Customers (UserID, CustomerID, CustomerFirstName, CustomerLastName, CustomerContact, StreetAddress, SecondAddress, City, ZipCode) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        UserId,
        CustomerID,
        CustomerFirstName,
        CustomerLastName,
        CustomerContact,
        StreetAddress,
        SecondAddress || "",
        City,
        ZipCode,
      ]
    );

    return res.status(201).json({
      message: "Customer created successfully",
      customerId: rows.insertId,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const findByIDCustomer = async (req, res) => {
  const { customerId } = req.params;

  if (!req.user || !req.user.userId) {
    console.log(req.user);
    return res
      .status(401)
      .json({ message: "Unauthorized. User ID not found!" });
  }

  const UserId = req.user.userId; // Extract User ID from token

  if (!customerId) {
    return res.status(400).json({ message: "Customer ID is required" });
  }

  try {
    const [customer] = await db.query(
      "SELECT * FROM Customers WHERE CustomerID =? && UserID = ?",
      [customerId, UserId]
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res
      .status(200)
      .json({ message: "Customer data loaded successfully", data: customer });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



const updateCustomer = async (req, res) => {
  const { customerId } = req.params;
  const { CustomerContact, StreetAddress, SecondAddress, City, ZipCode } =
    req.body;

  if (!req.user || !req.user.userId) {
    console.log(req.user);
    return res
      .status(401)
      .json({ message: "Unauthorized. User ID not found!" });
  }
  console.log(req.user);
  const UserId = req.user.userId; // Extract User ID from token

  const [selectedCustomer] = await db.query(
    "SELECT * FROM Customers WHERE CustomerID = ? && UserID = ?",
    [customerId, UserId]
  );

  console.log(selectedCustomer)

  if (!selectedCustomer) {
    return res.status(404).json({ message: "Customer not found" });
  }



const customerFirstName = selectedCustomer[0].CustomerFirstName;
const customerLastName = selectedCustomer[0].CustomerLastName;

  console.log(customerFirstName, customerLastName);

  const [updateCustomer] = await db.execute(
    "UPDATE Customers SET CustomerFirstName = ?, CustomerLastName = ?, CustomerContact = ?, StreetAddress = ?, SecondAddress = ?, City = ?, ZipCode = ? WHERE CustomerID = ? AND UserID = ?",
    [
      customerFirstName,
      customerLastName,
      CustomerContact,
      StreetAddress,
      SecondAddress || "", // Ensure empty string if value is missing
      City,
      ZipCode,
      customerId,
      UserId,
    ]
);

  if (updateCustomer.affectedRows > 0) {
    return res
      .status(200)
      .json({ message: "Customer updated successfully", data: updateCustomer });
  } else {
    return res.status(400).json({ message: "No changes made" });
  }
};

export default { createCustomer, findByIDCustomer, updateCustomer };
