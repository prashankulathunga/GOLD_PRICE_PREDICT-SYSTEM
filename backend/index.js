import express from 'express';
import connection from './model/connection.js';
const app = express();
import env from 'dotenv';
import bodyParser from 'body-parser'
import pawningRoute from './route/pawningRoute.js';
import userRoute from './route/userRoute.js';
import interestRoute from './route/interestRoute.js';
import adminRoute from './route/adminRoute.js';

env.config();
app.use(bodyParser.json());

const port = process.env.SERVICE_PORT || 3000;

try {
    app.listen(port, () => {
        console.log(`server is running port ${port}`);
        
    })

} catch (error) {
    console.log(error);
}

app.use('/api/v1/pawn', pawningRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/interest', interestRoute);
app.use('/api/v1/admin', adminRoute);












































