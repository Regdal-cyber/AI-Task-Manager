const express = require('express');
const cors = require('cors');
const app = express();

const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);

const port = 3000;
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
app.listen(port, () => {
    console.log('Сервер запущен!')
});
