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


export const updateTasks = async (req, res) => {
  try {
    const db = await connectDb();
    const { id } = req.params;
    let { title, description, status, priority, tags, due_date, project, links } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'kindly fill the required fields' });
    }

    // Format arrays
    const formattedTags = Array.isArray(tags) ? JSON.stringify(tags) : tags;
    const formattedLinks = Array.isArray(links) ? JSON.stringify(links) : links;

    // 1. Check if task exists
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Task not found (no record with this ID)' });
    }

    // 2. Update task
    const [_updatedTasks] = await db.execute(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, tags = ?, due_date = ?, project = ?, links = ? WHERE id = ?',
      [title, description, status, priority, formattedTags, due_date, project, formattedLinks, id]
    );

    // 3. Return success
    return res.status(200).json({
      message: 'Task updated successfully',
      taskId: id,
      tasksTitle: title
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
