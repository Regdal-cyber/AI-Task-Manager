import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Не удалось загрузить задачи');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Введите название задачи');
      return;
    }

    try {
      setError('');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось создать задачу');
      }

      setTitle('');
      setDescription('');

      loadTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось изменить статус');
      }

      loadTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm(
      'Вы действительно хотите удалить эту задачу?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось удалить задачу');
      }

      loadTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

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

        <button type="submit">
          Создать задачу
        </button>
      </form>

      <h2>Список задач</h2>

      {loading ? (
        <p className="loading">Загрузка задач...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">Задач пока нет</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div className="task" key={task.id}>
              <h3>{task.title}</h3>

              <div className="description-block">
                <span>Описание</span>
                <p className="task-description">
                  {task.description || 'Описание отсутствует'}
                </p>
              </div>

              <select
                className={`status status-${task.status || 'new'}`}
                value={task.status || 'new'}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value)
                }
              >
                <option value="new">Новая</option>
                <option value="in_progress">В процессе</option>
                <option value="done">Выполнена</option>
              </select>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;