import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const Secret_key = process.env.JWT_SECRET;

const verifyToken = async (req, res, next)=>{
    // Verify token here
    
    const token = req.headers['authorization'];
    
    // Check if token is valid and not expired
    if(!token){
        return res.status(401).json({message: 'Token not provided!'});
    }

    try{
        const decodedValue = jwt.verify(token,Secret_key);
        req.user = decodedValue;
        next();

    }catch(e){
        console.log(e.message)
        return res.status(403).json({message: 'Token is not valid!'});

    }
}

export default {verifyToken};