const { Pool } = require('pg');
const express = require('express');
const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task_manager',
    password: 'artur1103',
    port: 5432
});
const port = 3000;
app.use(express.json());
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks')
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.post('/tasks', async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const result = await pool.query(
            'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})
app.put('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const result = await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})
app.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *;',
            [id]
        );
        res.status(200).json({
            message: 'Задача успешно удалена',
            deletedUser: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})
app.listen(port, () => {
    console.log('Сервер запущен!')
});
