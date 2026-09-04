const pool = require('../db');
const express = require('express');
const router = express.Router();
const isValidStatus = (status) => {
    return ['new', 'in_progress', 'done'].includes(status);
};
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks')
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const title = req.body.title;
        const description = req.body.description;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                error: 'Название задачи обязательно и должно быть непустой строкой'
            });
        }

        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({
                error: 'Описание должно быть строкой'
            });
        }

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
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        if (!isValidStatus(status)) {
            return res.status(400).json({
                error: 'Некорректный статус. Допустимые значения: new, in_progress, done'
            });
        }

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
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *;',
            [id]
        );
        res.status(200).json({
            message: 'Задача успешно удалена',
            deletedTask: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
})
module.exports = router;