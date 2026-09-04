import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadTasks = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Введите название задачи');
      return;
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle('');
    setDescription('');
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    loadTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <form onSubmit={createTask} className="task-form">
        <input
          type="text"
          placeholder="Название задачи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Описание задачи"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Создать задачу</button>
      </form>

      <h2>Список задач</h2>

      <div className="tasks">
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <select
              value={task.status || 'new'}
              onChange={(e) => updateStatus(task.id, e.target.value)}
            >
              <option value="new">Новая</option>
              <option value="in_progress">В процессе</option>
              <option value="done">Выполнена</option>
            </select>

            <button onClick={() => deleteTask(task.id)}>
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;