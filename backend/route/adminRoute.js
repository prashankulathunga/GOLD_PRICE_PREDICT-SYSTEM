import express from 'express';
import adminController from '../controller/adminController.js';
const Router = express.Router();

Router.post('/signup', adminController.signup);
Router.post('/login', adminController.login);

export default Router;