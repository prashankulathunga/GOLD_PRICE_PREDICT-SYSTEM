import db from "../model/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
const secret_key = process.env.JWT_SECRET;

const signup = async (req, res) => {
  const {
    UserFirstName,
    UserLastName,
    UserEmail,
    UserPassword,
    PawnId,
    PostalCode,
  } = req.body;

  try {
    if (
      !UserFirstName ||
      !UserLastName ||
      !UserEmail ||
      !UserPassword ||
      !PawnId ||
      !PostalCode
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("=======1====");
    // check user already exists
    const [isExistingUser] = await db.execute(
      "SELECT * FROM users WHERE UserEmail = ?",
      [UserEmail]
    );

    console.log("=======2====");

    if (isExistingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("=======3====");

    const hashedPassword = await bcrypt.hash(UserPassword, saltRounds);

    // save user in database
    const [result] = await db.execute(
      "INSERT INTO users (UserFirstName, UserLastName, UserEmail, UserPassword, PawnId, PostalCode) VALUES (?,?,?,?,?,?)",
      [
        UserFirstName,
        UserLastName,
        UserEmail,
        hashedPassword,
        PawnId,
        PostalCode,
      ]
    );

    console.log("=======4====");

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { UserEmail, UserPassword } = req.body;

  if (!UserEmail || !UserPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const [rows] = await db.execute("SELECT * FROM users WHERE UserEmail = ?", [
    UserEmail,
  ]);

  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const match = await bcrypt.compare(UserPassword, rows[0].UserPassword);
  if (match) {
    const token = jwt.sign(
      { userId: rows[0].UserID, UserEmail: rows[0].UserEmail },
      secret_key,
      { expiresIn: "1h" }
    );
    return res.json({ message: "Login successful", token });
  }

  return res.status(401).json({ message: "Invalid email or password" });
};

export default { signup, login };
