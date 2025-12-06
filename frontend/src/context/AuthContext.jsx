import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as apiLogin, register as apiRegister } from "../services/Index.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const login = (name, password) => {
    // Intentamos iniciar sesión contra el backend
    apiLogin({ name, password })
      .then((u) => {
        setUser(u);
        localStorage.setItem("auth_user", JSON.stringify(u));
        toast.success(`Bienvenido ${u.name}`);
        navigate("/");
      })
      .catch((err) => {
        // Si no existe, registramos automáticamente generando un email local
        const fakeEmail = `${name.replace(/\s+/g, "_").toLowerCase()}@local.test`;
        apiRegister({ name, email: fakeEmail, password })
          .then((u) => {
            setUser(u);
            localStorage.setItem("auth_user", JSON.stringify(u));
            toast.success(`Usuario creado: ${u.name}`);
            navigate("/");
          })
          .catch(() => {
            toast.error("Error en autenticación");
          });
      });
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
