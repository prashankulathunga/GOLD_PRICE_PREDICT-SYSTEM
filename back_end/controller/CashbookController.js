import db from '../model/connection.js';

const createCashBook = async(req,res)=>{
    try {
        if (!req.user ||!req.user.userId) {
            console.log(req.user);
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }


const userId = req.user.userId;

const {TransactionType, CashBookNote, Amount} = req.body

if (!TransactionType ||!CashBookNote ||!Amount) {
    return res.status(400).json({ message: 'Missing required fields!' });
}

const [rows] = await db.query("INSERT INTO Cashbook (userId, TransactionType, CashBookNote, Amount) VALUES (?,?,?,?)", [userId, TransactionType, CashBookNote, Amount]);

if (rows){
    return res.status(201).json({ message: 'Cashbook record created successfully!' });
}else{
    return res.status(500).json({ message: 'Failed to create Cashbook record!' });
}


}catch(e){
    console.log(e);
    return res.status(500).json({ message: 'InternalServer error!' });
}}

const getAllCashBook = async(req,res)=>{
    try {
        if (!req.user ||!req.user.userId) {
            console.log(req.user);
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }


const userId = req.user.userId;

const [rows] = await db.query("SELECT TransactionType, CashBookNote, Amount, TransactionDate FROM Cashbook WHERE userId =?", [userId]);

if (rows){
    return res.status(200).json(rows);
}

}catch(e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server error!' });}
}







export default {createCashBook, getAllCashBook}