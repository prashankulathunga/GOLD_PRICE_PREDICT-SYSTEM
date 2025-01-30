import express from 'express';
import pawningController from '../controller/userController.js';
import  middleware  from '../middleware/middleware.js';

const verifyToken = middleware.verifyToken;


const Router = express.Router();

Router.post('/create-user', verifyToken, pawningController.createUser);
Router.get('/get-users', verifyToken, pawningController.getUsers);

export default Router;