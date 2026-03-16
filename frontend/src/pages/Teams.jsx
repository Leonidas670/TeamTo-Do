import { useEffect, useState } from "react";
import {
  getTeams,
  createTeam,
  addTeamMember,
  removeTeamMember,
} from "../services/Index.js";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Teams() {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [inviteEmail, setInviteEmail] = useState({});
  const [inviteRole, setInviteRole] = useState({});
  const [addingMember, setAddingMember] = useState(null);

  const loadTeams = () => {
    getTeams()
      .then(setTeams)
      .catch(() => toast.error("Error cargando equipos"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTeams();
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

  const handleInvite = async (teamId) => {
    const email = (inviteEmail[teamId] || "").trim().toLowerCase();
    if (!email) {
      toast.error("Escribe un correo");
      return;
    }
    setAddingMember(teamId);
    try {
      const role = inviteRole[teamId] === "ADMIN" ? "ADMIN" : "MEMBER";
      await addTeamMember(teamId, { email, role, inviterId: user.id });
      setInviteEmail((prev) => ({ ...prev, [teamId]: "" }));
      toast.success("Invitación enviada");
      loadTeams();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "No se pudo agregar al equipo";
      toast.error(msg);
    } finally {
      setAddingMember(null);
    }
  };

  const handleRemoveMember = async (teamId, userId) => {
    try {
      await removeTeamMember(teamId, userId);
      toast.info("Miembro quitado del equipo");
      loadTeams();
    } catch (err) {
      const msg =
        err?.response?.data?.message || "No se pudo quitar del equipo";
      toast.error(msg);
    }
  };

  if (loading) {
    return <LoadingScreen text="Cargando equipos..." />;
  }

  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
        Equipos
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        Crea equipos, invita a gente por correo y asignad tareas a cada equipo.
      </p>

      {/* Formulario crear equipo */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100"
      >
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
          Crear nuevo equipo
        </h2>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="team-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre del equipo *
              </label>
              <input
                id="team-name"
                type="text"
                placeholder="Ej: Marketing, Desarrollo..."
                className="w-full px-3 sm:px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={sending}
              />
            </div>
            <div>
              <label
                htmlFor="team-desc"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción (opcional)
              </label>
              <input
                id="team-desc"
                type="text"
                placeholder="Breve descripción"
                className="w-full px-3 sm:px-4 py-2 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={sending}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !name.trim()}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              {sending ? "Creando..." : "Crear equipo"}
            </button>
          </div>
        </div>
      </form>

      {/* Lista de equipos con miembros e invitar */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
        Todos los equipos
      </h2>
      {teams.length === 0 ? (
        <p className="text-gray-500 py-6">Aún no hay equipos. Crea el primero arriba.</p>
      ) : (
        <ul className="space-y-4">
          {teams.map((team) => (
            <li
              key={team.id}
              className="rounded-xl border-2 border-orange-100 bg-orange-50/50 overflow-hidden"
            >
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-bold shadow shrink-0">
                  {team.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">
                    {team.name}
                  </p>
                  {team.description && (
                    <p className="text-sm text-gray-500 truncate">
                      {team.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Miembros */}
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-orange-100/80">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mt-2 mb-2">
                  Miembros ({team.members?.length ?? 0})
                </p>
                {team.members?.length > 0 ? (
                  <ul className="space-y-1.5 mb-3">
                    {team.members.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg bg-white/80 border border-orange-100"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-800 shrink-0">
                            {m.user?.name?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">
                              {m.user?.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {m.user?.email}
                            </p>
                          </div>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 shrink-0">
                            {m.role}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(team.id, m.user.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                          title="Quitar del equipo"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 mb-3">
                    Aún no hay miembros. Invita por correo abajo.
                  </p>
                )}

                {/* Invitar por correo */}
                <div className="flex flex-col xs:flex-row gap-2 items-stretch xs:items-end">
                  <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:items-center">
                    <input
                      type="email"
                      placeholder="Correo del usuario"
                      value={inviteEmail[team.id] || ""}
                      onChange={(e) =>
                        setInviteEmail((prev) => ({
                          ...prev,
                          [team.id]: e.target.value,
                        }))
                      }
                      className="flex-1 min-w-0 px-3 py-2 border-2 border-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
                    />
                    <select
                      value={inviteRole[team.id] || "MEMBER"}
                      onChange={(e) =>
                        setInviteRole((prev) => ({
                          ...prev,
                          [team.id]: e.target.value,
                        }))
                      }
                      className="px-3 py-2 border-2 border-orange-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-orange-400 outline-none"
                    >
                      <option value="MEMBER">Miembro</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInvite(team.id)}
                    disabled={addingMember === team.id || !(inviteEmail[team.id] || "").trim()}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-sm font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
                  >
                    {addingMember === team.id ? "Añadiendo..." : "Invitar"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
