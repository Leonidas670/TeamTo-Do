import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as apiLogin, register as apiRegister } from "../services/Index.js";
import { sendWelcomeEmail } from "../services/emailjs.js";

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
      .then(({ user: u, token }) => {
        setUser(u);
        localStorage.setItem("auth_user", JSON.stringify(u));
        localStorage.setItem("auth_token", JSON.stringify(token));
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
    localStorage.removeItem("auth_token");
    toast.info("Sesión cerrada");
    navigate("/login");
  };

  const register = async (name, email, password) => {
    try {
      const { user: u, token } = await apiRegister({ name, email, password });
      toast.success(`Usuario ${u.name} creado correctamente!`);

      localStorage.setItem("auth_user", JSON.stringify(u));
      localStorage.setItem("auth_token", JSON.stringify(token));

      try {
        await sendWelcomeEmail({ name: u.name ?? name, email });
      } catch (e) {
        // Helpful during setup: EmailJS returns status/text for common config issues.
        // eslint-disable-next-line no-console
        console.error("EmailJS error:", e);
        toast.warning("Registro OK, pero no se pudo enviar el correo. Revisa la consola para más detalles.");
      }

      navigate("/login");
      return u;
    } catch (err) {
      const message = err?.response?.data?.message || "Error en el registro";
      toast.error(message);
      throw err;
    }
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
