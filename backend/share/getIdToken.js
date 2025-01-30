import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY; // Ensure this is set in your .env file

const getUserIdFromToken = (token) => {
  try {
    if (!token) {
      console.error("Token is missing");
      return null;
    }

    // Decode the token
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded Token:", decoded);

    // Return the user ID
    return decoded.id;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired:", error.message);
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Error verifying token:", error.message);
    }
    return null;
  }
};

export default {getUserIdFromToken};
