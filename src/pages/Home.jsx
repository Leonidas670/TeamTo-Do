import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import SearchBar from "../components/SearchBar";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Cargar tareas al iniciar
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => toast.error("Error cargando tareas"))
      .finally(() => setLoading(false));
  }, []);

  // Crear nueva tarea
  const handleAdd = async (text) => {
    try {
      const newTask = { author: user.name, text, completed: false, editor: null };
      const created = await createTask(newTask);
      setTasks((prev) => [created, ...prev]);
      toast.success("Tarea creada");
    } catch {
      toast.error("Error creando tarea");
    }
  };

  // Marcar completada/pendiente
  const handleToggle = async (id, completed) => {
    try {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;

      const updatedTask = { ...current, completed };
      const updated = await updateTask(id, updatedTask);

      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      toast.error("Error actualizando tarea");
    }
  };

  // Eliminar tarea
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.info("Tarea eliminada");
    } catch {
      toast.error("Error eliminando tarea");
    }
  };

  // Editar tarea
  const handleEdit = async (id, newText) => {
    try {
      const current = tasks.find((t) => t.id === id);
      if (!current) return;

      const updatedTask = {
        ...current,
        text: newText,
        editor: user.name,
      };

      const updated = await updateTask(id, updatedTask);

      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Tarea editada");
    } catch {
      toast.error("Error editando tarea");
    }
  };

  // Filtrado
  const filtered = tasks.filter((t) => {
    const matchesQuery = `${t.author} ${t.text}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Team To-Do</h1>
        {user && (
          <div className="flex gap-3 items-center">
            <span>👤 {user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 border rounded text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="bg-white p-6 rounded shadow">
        <SearchBar
          query={query}
          setQuery={setQuery}
          filter={filter}
          setFilter={setFilter}
        />

        <div className="my-4">
          <TodoForm onAdd={handleAdd} />
        </div>

        {loading ? (
          <div className="text-center p-6">Cargando tareas...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No se encontraron tareas.
          </div>
        ) : (
          <TodoList
            tasks={filtered}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </main>
    </div>
  );
}
