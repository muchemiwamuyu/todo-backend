import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const connectDb = async () => {
    try {
        const database = await mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        })
        console.log('Mysql connected');
        return database;
    } catch (error) {
        console.error('error connecting to mysql', error)
        process.exit(1)
    }
}

export default connectDb;