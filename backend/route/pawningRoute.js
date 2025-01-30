import express from 'express';
import pawningController from '../controller/pawningController.js';
import  middleware  from '../middleware/middleware.js';

const verifyToken = middleware.verifyToken;

const Router = express.Router();

// Importing the required models
Router.post('/save-pawn-item', verifyToken, pawningController.savePawnItem);
Router.post('/pay-pawn-item', verifyToken, pawningController.makePayment);
Router.get('/get-pawn-item', verifyToken, pawningController.getPawningItems);



export default Router;



