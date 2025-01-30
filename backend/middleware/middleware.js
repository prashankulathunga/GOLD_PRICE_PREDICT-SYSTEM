import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const secret = process.env.SECRET_KEY;

const verifyToken = async (req, res, next)=>{
    // Verify token here
    
    const token = req.headers['authorization'];
    
    // Check if token is valid and not expired
    if(!token){
        return res.status(401).json({message: 'Token not provided!'});
    }

    try{
        const decodedValue = jwt.verify(token,secret);
        req.user = decodedValue;
        next();

    }catch(e){
        return res.status(403).json({message: 'Token is not valid!'});

    }
}

export default {verifyToken};