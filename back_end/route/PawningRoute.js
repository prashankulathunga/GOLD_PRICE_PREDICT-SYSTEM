import express from "express";
import PawningController from "../controller/pawningController.js";
import middleware from "../middleware/middleware.js";

// Apply middleware to all routes
const verify = middleware.verifyToken;

const router = express.Router();


router.post("/create-pawn-item", verify, PawningController.addPawnItem);
router.get("/get-all-pawn-item", verify, PawningController.getPawnItemsAndCustomer);
router.get("/get-pawn-item-by-id/:pawnItemId", verify, PawningController.pawnItemFindByID);

export default router;