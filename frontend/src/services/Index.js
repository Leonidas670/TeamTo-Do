import axios from "axios";

// Base URL configurable via Vite env var `VITE_API_URL`.
const API_BASE = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE,
});

// Obtener todas las tareas
export const getTasks = () => api.get("/tasks").then((r) => r.data);

// Crear nueva tarea
export const createTask = (task) => api.post("/tasks", task).then((r) => r.data);

// Actualizar tarea (PUT para reemplazarla completa)
export const updateTask = (id, updatedTask) =>
  api.put(`/tasks/${id}`, updatedTask).then((r) => r.data);

// Eliminar tarea
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

// Auth
export const login = (payload) => api.post('/auth/login', payload).then(r => r.data);
export const register = (payload) => api.post('/auth/register', payload).then(r => r.data);

// Users
export const getUsers = () => api.get('/users').then(r => r.data);
export const createUser = (user) => api.post('/users', user).then(r => r.data);

// Teams
export const getTeams = () => api.get('/teams').then(r => r.data);
export const createTeam = (team) => api.post('/teams', team).then(r => r.data);
