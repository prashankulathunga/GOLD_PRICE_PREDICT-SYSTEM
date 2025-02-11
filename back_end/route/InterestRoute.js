import express from "express";
import InterestController from "../controller/InterestController.js";
import middleware from "../middleware/middleware.js";

// Apply middleware to all routes
const verify = middleware.verifyToken;

const router = express.Router();

router.post("/save-interest", verify, InterestController.saveInterest);
router.get("/get-interest", verify, InterestController.getInterest);

export default router;