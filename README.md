# Task Manager

Веб-приложение для управления задачами.

Как запустить проект

1. База данных (PostgreSQL)
Установи PostgreSQL и создай базу данных `task_manager`.
Выполни SQL-запрос:

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

В папке backend создай файл .env:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=твой_пароль
DB_PORT=5432

PORT=3000

2. Запуск бэкенда
cd backend
npm install
node server.js
Сервер запустится на http://localhost:3000

3. Запуск фронтенда
cd frontend
npm install
npm run dev
Открой http://localhost:5173

4. Экспорт задач в CSV
cd scripts
pip install psycopg2-binary python-dotenv
py export_tasks.py

Технологии
React + Vite
Node.js + Express
PostgreSQL
Python

Структура
AI-Task-Manager/
├── backend/
├── frontend/
├── scripts/
└── README.md