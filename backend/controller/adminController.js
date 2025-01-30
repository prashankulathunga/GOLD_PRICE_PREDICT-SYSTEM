import db from "../model/connection.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;



const signup = async (req, resp) => {
  console.log("==============================");
  console.log("Incoming request body:", req.body); // Debug request data

  // Check for missing fields
  if (!req.body.full_name || !req.body.email || !req.body.password || !req.body.pawn_id || !req.body.postal_code) {
    console.log("Validation failed: Missing fields.");
    return resp.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db.execute("SELECT * FROM admins WHERE email = ?", [req.body.email]);
    console.log("Email check result:", existingUser);

    if (existingUser.length > 0) {
      console.log("Email already exists:", req.body.email);
      return resp.status(409).json({ message: "Email already exists!" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("Password hashed successfully:", hashedPassword);

    console.log("Coming ---->");

    // SQL Query to insert data
    const [result] = await db.execute(
      "INSERT INTO admins (full_name, email, password, pawn_id, postal_code) VALUES (?, ?, ?, ?, ?)",
      [req.body.full_name, req.body.email, hashedPassword, req.body.pawn_id, req.body.postal_code]
    );
    console.log("Data insertion result:", result);

    // Send success response
    return resp.status(201).json({ message: "Successfully signed up!" });
  } catch (error) {
    console.error("Error during signup:", error.message);
    return resp.status(500).json({ message: "Internal server error!" });
  }
};


const login = async (req, resp) => {
    try {

console.log(req.body.email)

      // Check if user exists
      const [admin] = await db.execute("SELECT id, email, password FROM admins WHERE email = ?", [req.body.email]);
      console.log(admin)
      if (admin.length < 0) {
        return resp.status(404).json({ message: "User not found" });
      }
  
console.log(req.body.password)

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(req.body.password, admin[0].password);
      if (!isPasswordValid) {
        return resp.status(401).json({ message: "Invalid password" });
      }
  
      // Generate token
        const token = jwt.sign({ id: admin[0].id, email: admin[0].email}, secretKey, { expiresIn: "5h" });
  
      // Successful login response
      return resp.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return resp.status(500).json({ message: "Internal server error" });
    }
  };
  


export default { signup, login };
