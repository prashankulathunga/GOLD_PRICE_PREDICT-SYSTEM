import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './model/connection.js';
import './cornjobs/cornjobs.js';

// import route start

import UserRoute from "./route/UserRoute.js";
import CustomerRoute from './route/CustomerRoute.js';
import PawningRoute from './route/PawningRoute.js';
import InterestRoute from './route/InterestRoute.js'
import CashBookRoute from './route/CashbookRoute.js'

// import route end 

const app = express();

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Test database connection before starting the server
const testDatabaseConnection = async () => {
    try {
        const [rows] = await db.query("SHOW TABLES;");
        console.log(`Connected to the database: Tables found: ${rows.map(row => Object.values(row)[0]).join(", ")}`);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Start the server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await testDatabaseConnection();
});


// router start 

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/customer', CustomerRoute);
app.use('/api/v1/pawn', PawningRoute);
app.use('/api/v1/interest', InterestRoute);
app.use('/api/v1/cashbook', CashBookRoute);