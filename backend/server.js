const express = require('express');
const cors = require('cors');
const app = express();

const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

const port = 3000;

app.listen(port, () => {
    console.log('Сервер запущен!')
});
