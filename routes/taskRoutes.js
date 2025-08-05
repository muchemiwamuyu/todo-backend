import express from 'express'
import { createTasks, updateTasks } from '../controllers/taskController.js'

const router = express.Router()

router.post('/tasks', createTasks);
router.put('/task/:id', updateTasks)

export default router