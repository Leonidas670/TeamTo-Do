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

  const login = (emailOrName, password) => {
    const isEmail = emailOrName.includes('@');
    const payload = isEmail ? { email: emailOrName, password } : { name: emailOrName, password };

    // Intentamos iniciar sesión contra el backend
    apiLogin(payload)
      .then((u) => {
        setUser(u);
        localStorage.setItem("auth_user", JSON.stringify(u));
        toast.success(`Bienvenido ${u.name}`);
        navigate("/");
      })
      .catch(() => {
        toast.error("Error en autenticación");
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    toast.info("Sesión cerrada");
    navigate("/login");
  };

  const register = (name, email, password) => {
    apiRegister({ name, email, password })
      .then((u) => {
        toast.success(`Usuario ${u.name} creado correctamente!`);
        navigate("/login");
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Error en el registro";
        toast.error(message);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
