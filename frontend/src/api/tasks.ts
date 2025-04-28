import { Task, TaskCreate, TaskStatusUpdate } from '../types';

const API_URL = 'http://localhost:8000/tasks';

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createTask(task: TaskCreate): Promise<Task> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTaskStatus(id: number, status: TaskStatusUpdate): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(status),
  });
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}