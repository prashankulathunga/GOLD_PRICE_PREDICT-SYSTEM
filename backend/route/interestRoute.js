import express from 'express';
import pawningController from '../controller/interestController.js';
import  middleware  from '../middleware/middleware.js';

const verifyToken = middleware.verifyToken;

const Router = express.Router();

Router.post('/calculate-interest',verifyToken, pawningController.calculateMonthlyInterest);

export default Router;