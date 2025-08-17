import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function connectDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log('Mysql connected');
        return connection;
    } catch (error) {
        console.error('error connecting to mysql', error);
        process.exit(1);
    }
};

export default connectDb;