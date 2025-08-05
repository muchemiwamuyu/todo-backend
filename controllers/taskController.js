import connectDb from "../config/db.js";

export const createTasks =  async (req, res) => {
    const db = await connectDb();
    const {title, description} = req.body;

    if (!title || !description) {
        res.status(400).json({message: 'kindly fill the required fields'})
    };

    try {
        const [result] = await db.execute('INSERT INTO tasks (title, description) VALUES (?, ?)', [title, description]);
        res.status(201).json({message: 'Task created', taskId: result.insertId});
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(500).json({error: 'task already exists'});
        };

        res.status(500).json({error: error.message});
    }
}

export const updateTasks = async (req, res) => {
    try {
        const database = await connectDb();
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Please fill in all the required fields' });
        }

        const [result] = await database.execute(
            'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
            [title, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task updated successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
