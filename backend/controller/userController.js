import db from "../model/connection.js";
import Share from "../share/getIdToken.js";

const createUser = async (req, res) => {
  const { full_name, email, id_number, address } = req.body;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Input validation
  if (!full_name || !email || !id_number || !address) {
    return res.status(400).json({
      error: "ValidationError",
      message: "All fields are required",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid email format",
    });
  }

  // Validate Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader;

  // Get the admin ID from the token using the Share module
  const adminId = Share.getUserIdFromToken(token);

  console.log(adminId);
  console.log(token);

  if (!adminId) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  const query = "INSERT INTO users (full_name, admin_id, email, id_number, address) VALUES (?, ?, ?, ?, ?)";
  const values = [full_name, adminId, email, id_number, address];

  try {
    const [result] = await db.execute(query, values);

    // Success response
    return res.status(201).json({
      message: "User created successfully",
      data: {
        userId: result.insertId,
        full_name,
        email,
        id_number,
        address,
      },
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        error: "DuplicateEntryError",
        message: "A user with this email already exists",
      });
    }

    console.error("Create user error:", error);
    return res.status(500).json({
      error: "InternalServerError",
      message: "Failed to create user. Please try again later.",
    });
  }
};


const getUsers = (req, resp)=> {

    // Share.getUserIdFromToken(req.headers.authorization);

    // const query = 'SELECT * FROM users WHERE user_id = ?';
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return resp.status(401).json({ message: 'Authorization header missing' });
    }

    // Remove 'Bearer ' from the token string (if present)
    const token = authHeader;

    if (!token) {
        return resp.status(401).json({ message: 'Token missing' });
    }

    // Get the user ID from the token using the Share module
    const adminId = Share.getUserIdFromToken(token);

    if (!adminId) {
        return resp.status(403).json({ message: 'Invalid or expired token' });
    }

    // Simulating database query for demonstration
     db.execute ('SELECT * FROM users WHERE admin_id = ?', [adminId]).then(data=>{
        return resp.status(200).json({ data});
     }).catch(error=>{
        console.error('Get users error:', error);
        return resp.status(500).json({ message: 'Failed to get users. Please try again later.' });
     })
};



  export default {createUser , getUsers};