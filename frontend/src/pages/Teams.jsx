import { useEffect, useState } from "react";
import { getTeams, createTeam } from "../services/Index.js";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch(() => toast.error("Error cargando equipos"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setSending(true);
    try {
      const created = await createTeam({
        name: trimmedName,
        description: description.trim() || null,
      });
      setTeams((prev) => [created, ...prev]);
      setName("");
      setDescription("");
      toast.success(`Equipo "${created.name}" creado`);
    } catch (err) {
      const msg = err?.response?.data?.message || "Error al crear equipo";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <LoadingScreen text="Cargando equipos..." />;
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Equipos</h1>
      <p className="text-gray-600 mb-6">
        Crea equipos para organizar trabajo en grupo. Luego podrás asignar tareas a cada equipo.
      </p>

      {/* Formulario crear equipo */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Crear nuevo equipo</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del equipo *
            </label>
            <input
              id="team-name"
              type="text"
              placeholder="Ej: Marketing, Desarrollo..."
              className="w-full px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={sending}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="team-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción (opcional)
            </label>
            <input
              id="team-desc"
              type="text"
              placeholder="Breve descripción del equipo"
              className="w-full px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={sending}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={sending || !name.trim()}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {sending ? "Creando..." : "Crear equipo"}
            </button>
          </div>
        </div>
      </form>

      {/* Lista de equipos */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Todos los equipos</h2>
      {teams.length === 0 ? (
        <p className="text-gray-500 py-6">Aún no hay equipos. Crea el primero arriba.</p>
      ) : (
        <ul className="space-y-3">
          {teams.map((team) => (
            <li
              key={team.id}
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-orange-100 bg-orange-50/50 hover:bg-orange-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold shadow">
                {team.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{team.name}</p>
                {team.description && (
                  <p className="text-sm text-gray-500 truncate">{team.description}</p>
                )}
              </div>
              <span className="text-xs text-gray-400">
                ID: {team.id}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
