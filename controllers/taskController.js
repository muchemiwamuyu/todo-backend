import connectDb from "../config/db.js";

export async function createTasks(req, res) {
    try {
        const db = await connectDb();
        let { title, description, status, priority, tags, due_date, project, links } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'kindly fill the required fields' });
        }

        // Ensure arrays are stored as JSON strings
        if (Array.isArray(tags)) tags = JSON.stringify(tags);
        if (Array.isArray(links)) links = JSON.stringify(links);

        const [newTasks] = await db.execute(
            'INSERT INTO tasks (title, description, status, priority, tags, due_date, project, links) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, description, status, priority, tags, due_date, project, links]
        );

        return res.status(201).json({
            message: 'Task created successfully',
            taskId: newTasks.insertId,
            tasksTitle: title
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Task with this title already exists' });
        }
        return res.status(500).json({ error: error.message });
    }
}
