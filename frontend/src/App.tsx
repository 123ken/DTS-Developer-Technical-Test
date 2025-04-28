
import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api/tasks';
import { Task, TaskCreate } from './types';
import './App.css'; 

const defaultStatus = 'pending';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState<string | null>(null); 

  const fetchTasks = () => {
    getTasks()
      .then(setTasks)
      .catch(err => {
        console.error("Failed to fetch tasks:", err);
        setError("Failed to load tasks. Please check the backend connection.");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); 
    if (!title || !dueDate) {
      setError("Title and Due Date are required.");
      return;
    }
    const newTask: TaskCreate = {
      title,
      description: description || undefined, 
      status: defaultStatus,
      due_date: dueDate
    };
    try {
      const created = await createTask(newTask);
      if (created && created.id) {
         setTasks([...tasks, created]);
         setTitle('');
         setDescription('');
         setDueDate('');
      } else {
         throw new Error("Invalid task data received from server.");
      }
    } catch (err) {
      console.error("Failed to create task:", err);
      setError("Failed to create task. Please try again.");
    }
  };

  const handleStatusUpdate = async (id: number, currentStatus: string) => {
    setError(null);
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      const updated = await updateTaskStatus(id, { status: newStatus });
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Failed to update task status:", err);
      setError("Failed to update task status. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  const formatDueDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };


  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleCreate} className="task-form">
        <input
          className="task-input"
          placeholder="Title *"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="task-input"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          className="task-input"
          type="datetime-local"
          value={dueDate}
          required
          onChange={e => setDueDate(e.target.value)}
          title="Due Date *"
        />
        <button type="submit" className="button button-add">Add Task</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && !error && <p>No tasks yet. Add one above!</p>}
        {tasks.map(task => (
          <li key={task.id} className={`task-item status-${task.status}`}>
            <div className="task-details">
              <strong>{task.title}</strong>
              {task.description && <p className="task-description">{task.description}</p>}
              <span className="task-meta">Status: {task.status}</span>
              <span className="task-meta">Due: {formatDueDate(task.due_date)}</span>
            </div>
            <div className="task-actions">
              <button
                onClick={() => handleStatusUpdate(task.id, task.status)}
                className={`button button-toggle-status ${task.status === 'pending' ? 'status-pending' : 'status-completed'}`}
              >
                Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="button button-delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;