import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './api/tasks';
import { Task, TaskCreate } from './types';

const defaultStatus = 'pending';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskCreate = { title, description, status: defaultStatus, due_date: dueDate };
    const created = await createTask(newTask);
    setTasks([...tasks, created]);
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    const updated = await updateTaskStatus(id, { status });
    setTasks(tasks.map(t => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Task Manager</h1>
      <form onSubmit={handleCreate}>
        <input
          placeholder="Title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="datetime-local"
          value={dueDate}
          required
          onChange={e => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '1em 0', border: '1px solid #ccc', padding: 10 }}>
            <strong>{task.title}</strong> <br />
            {task.description && <span>{task.description}<br /></span>}
            Status: {task.status} <br />
            Due: {new Date(task.due_date).toLocaleString()} <br />
            <button onClick={() => handleStatusUpdate(task.id, task.status === 'pending' ? 'completed' : 'pending')}>
              Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: 8, color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;