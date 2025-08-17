import express from 'express'
import { createTasks } from '../controllers/taskController.js'

const router = express.Router()

router.post('/tasks', createTasks);

export default router