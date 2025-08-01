import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';

dotenv.config()

const uri = process.env.MONGO_URI;

let client 
let tasksCollection 
let db; // connecting the database with the client

const connectDb = async () => {
    try {
        if (!uri) {
            throw new Error('Connection string provided is lacking some data')
        }

        client = new MongoClient(uri)
        await client.connect()
        db = client.db('urban-todo')
        tasksCollection = db.collection('tasks')
        await listCollections(db)
        console.log('Mongodb connected successfully')
        return client.db()

    } catch (error) {
        console.log('Error connecting to MongoDB', error)
        process.exit(1)
    }
}

async function listCollections(db) {
    const databaseData = await db.listCollections().toArray()

    console.log('List of Collections')

    databaseData.forEach(col => {
        if (!col) {
            return console.log('No collections found')
        }
        console.log(col.name)
        
    });
}

export function getTaskCollection() {
    return tasksCollection
}

export const getClient = () => client

export default connectDb;