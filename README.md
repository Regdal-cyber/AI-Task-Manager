# Task Manager

Веб-приложение для управления задачами с возможностью создавать, просматривать, изменять статус, удалять задачи и экспортировать их в CSV.

## Что делает каждый файл
###  backend/
    `server.js`  Главный файл сервера. Запускает Express, подключает CORS и маршруты. 
    `db.js`  Настройка подключения к PostgreSQL через `pg`. Использует данные из `.env`. 
    `routes/tasks.js`  Все маршруты API: GET, POST, PUT, DELETE для задач. Содержит валидацию данных. 
    `.env`  Переменные окружения (данные для подключения к БД). 

 ###  frontend/
    `src/App.jsx`  Главный компонент. Содержит форму создания задачи и список задач. 
    `src/App.css`  Стили для всего приложения. 
    `src/main.jsx`  Точка входа React-приложения. 
    `vite.config.js`  Настройка Vite (сервер разработки, прокси для API). 
    `package.json`  Зависимости проекта (React, axios и др.). 

###  scripts/
    `export_tasks.py` Python-скрипт. Подключается к PostgreSQL, загружает все задачи и сохраняет в CSV-файл.

### node_modules/
    Библиотека

## Как запустить проект

### 1. База данных (PostgreSQL)
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

### 2. Запуск бэкенда
    cd backend
    npm install
    node server.js
    Сервер запустится на http://localhost:3000

### 3. Запуск фронтенда
    cd frontend
    npm install
    npm run dev
    Открой http://localhost:5173

### 4. Экспорт задач в CSV
    cd scripts
    pip install psycopg2-binary python-dotenv
    py export_tasks.py

## Как проверить работоспособность

### 1. Проверка базы данных (PostgreSQL)
    Открой терминал и выполни:
    psql -U postgres -d task_manager -c "SELECT * FROM tasks;"

### 2. Проверка бэкенда (Node.js)
    Запусти сервер:
    cd backend
    npm install
    node server.js

    Ожидаемый вывод в терминале:
    Сервер запущен!

### 3. Проверка фронтенда (React)
    Запусти приложение:
    cd frontend
    npm install
    npm run dev

    Ожидаемый вывод в терминале:
    VITE v5.x.x  ready in xxx ms
    ➜  Local:   http://localhost:5173/
    
    Проверь в браузере:
    Открой http://localhost:5173

    Должна открыться страница с формой создания задачи и списком задач.

### 4. Проверка экспорта в CSV (Python)
    Установи зависимости:

    pip install psycopg2-binary python-dotenv
    Запусти скрипт:

    cd scripts
    py export_tasks.py

    В папке scripts появился файл tasks_export_*.csv. Открой его — там должны быть все задачи.
## Методы
GET     /tasks	    Получить все задачи
POST    /tasks	    Создать задачу
PUT     /tasks/:id	Обновить статус
DELETE  /tasks/:id	Удалить задачу

## Технологии
    React + Vite
    Node.js + Express
    PostgreSQL
    Python

## Структура
    AI-Task-Manager/
    ├── backend/
    ├── frontend/
    ├── node_modules/
    ├── scripts/
    └── README.md
