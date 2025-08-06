import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const connectDb = async () => {
    try {
        const database = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })
        console.log('Mysql connected');
        return database;
    } catch (error) {
        console.error('error connecting to mysql', error)
        process.exit(1)
    }
}

export default connectDb;