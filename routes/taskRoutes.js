import express from 'express'
import { createTasks, updateTasks } from '../controllers/taskController.js'

const router = express.Router()

router.post('/tasks', createTasks);
router.put('/tasks/:id', updateTasks);

export default router