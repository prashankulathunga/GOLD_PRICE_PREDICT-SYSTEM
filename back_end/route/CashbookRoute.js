import express from "express";
import CashBookController from "../controller/CashbookController.js";
import middleware from "../middleware/middleware.js";

// Apply middleware to all routes
const verify = middleware.verifyToken;

const router = express.Router();

router.post("/create-cashbook", verify, CashBookController.createCashBook);
router.get("/get-all-cashbook", verify, CashBookController.getAllCashBook);

export default router;