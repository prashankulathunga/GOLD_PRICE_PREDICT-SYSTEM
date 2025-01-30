import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const db = pool.promise();

const queryTables = async () => {
    try {
        const [rows] = await db.query("SHOW TABLES;");
        console.log(rows);
    } catch (err) {
        console.error("Error executing query:", err);
    }
}


queryTables();

export default db;
