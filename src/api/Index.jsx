import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001",
});

export const getTasks = () => api.get("/tasks").then((r) => r.data);
export const createTask = (task) => api.post("/tasks", task).then((r) => r.data);
export const updateTask = (id, patch) =>
  api.patch(`/tasks/${id}`, patch).then((r) => r.data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
