import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (name, password) => {
    // buscamos si ya existe en localStorage "users_db"
    const dbRaw = localStorage.getItem("users_db");
    let db = dbRaw ? JSON.parse(dbRaw) : [];

    const existing = db.find((u) => u.name === name);

    if (existing) {
      if (existing.password !== password) {
        toast.error("Contraseña incorrecta");
        return;
      }
      setUser(existing);
      localStorage.setItem("auth_user", JSON.stringify(existing));
      toast.success(`Bienvenido ${name}`);
      navigate("/");
    } else {
      // registro nuevo
      const newUser = { name, password };
      db.push(newUser);
      localStorage.setItem("users_db", JSON.stringify(db));
      setUser(newUser);
      localStorage.setItem("auth_user", JSON.stringify(newUser));
      toast.success(`Usuario creado: ${name}`);
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Sesión cerrada");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
