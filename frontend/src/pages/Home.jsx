import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask, getTeams } from "../services/Index.js";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import SearchBar from "../components/SearchBar";
import LoadingScreen from "../components/LoadingScreen";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("");

  // Cargar tareas y equipos al iniciar
  useEffect(() => {
    Promise.all([getTasks(), getTeams()])
      .then(([tasksData, teamsData]) => {
        setTasks(tasksData);
        setTeams(teamsData || []);
      })
      .catch(() => toast.error("Error cargando datos"))
      .finally(() => setLoading(false));
  }, []);

  // Crear nueva tarea (opcionalmente asignada a un equipo)
  const handleAdd = async (text, teamId = null) => {
    try {
      const newTask = {
        author: user.name,
        text,
        completed: false,
        editor: null,
        ...(teamId != null && { teamId }),
      };
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

      const payload = {
        author: current.author,
        text: current.text,
        completed,
        editor: current.editor,
        teamId: current.teamId ?? undefined,
      };
      const updated = await updateTask(id, payload);
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

      const payload = {
        author: current.author,
        text: newText,
        completed: current.completed,
        editor: user.name,
        teamId: current.teamId ?? undefined,
      };
      const updated = await updateTask(id, payload);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Tarea editada");
    } catch {
      toast.error("Error editando tarea");
    }
  };

  // Filtrado por búsqueda, estado y equipo
  const filtered = tasks.filter((t) => {
    const matchesQuery = `${t.author} ${t.text} ${t.team?.name || ""}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    const matchesTeam =
      !teamFilter || String(t.teamId) === teamFilter || (teamFilter === "none" && !t.teamId);
    return matchesQuery && matchesFilter && matchesTeam;
  });

  if (loading) {
    return <LoadingScreen text="Cargando tus tareas..." />;
  }

  return (
    <main className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Tus Tareas</h1>
          <SearchBar
            query={query}
            setQuery={setQuery}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        <div className="my-4">
          <TodoForm onAdd={handleAdd} teams={teams} />
        </div>

        {teams.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filtrar por equipo:</span>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="px-3 py-1.5 border-2 border-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-white"
            >
              <option value="">Todos</option>
              <option value="none">Sin equipo</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No has añadido ninguna tarea todavía.
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
  );
}