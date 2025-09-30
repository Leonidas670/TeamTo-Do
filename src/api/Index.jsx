import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001",
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
