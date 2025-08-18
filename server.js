import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();


// middleware
app.use(express.json());

// enable cors
app.use(cors());

// port
const port = process.env.PORT || 3000

const startServer = async () => {
    try {
        const database = await connectDb(); // await db connection

        // app routes
        app.get('/', async (req, res) => {
            try {
                const [rows] = await database.query('SELECT * FROM tasks;')
                res.json({rows})
            } catch (error) {
                console.error('failed to connect to the database', error)
                res.status(500).json({message: 'Failed to fetch tasks'})
            }
        });

        app.use('/api', taskRoutes);

        app.listen(port, () => console.log(`server running on port ${port}`));
    } catch (error) {
        console.error('error connecting to the database', error);
        process.exit(1)
    }
}

startServer()

