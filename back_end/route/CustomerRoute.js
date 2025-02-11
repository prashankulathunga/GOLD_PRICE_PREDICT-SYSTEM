import express from "express";
import CustomerController from "../controller/CustomerController.js";
import middleware from "../middleware/middleware.js";

// Apply middleware to all routes
const verify = middleware.verifyToken;

const router = express.Router();

router.post("/create-customer", verify, CustomerController.createCustomer);
router.get("/find-by-id-customer/:customerId", verify, CustomerController.findByIDCustomer);
router.put("/update-by-id-customer/:customerId", verify, CustomerController.updateCustomer);

export default router;
