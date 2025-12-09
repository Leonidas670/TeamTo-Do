import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) return;
    login(name.trim(), password.trim());
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        Bienvenido
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Inicia sesión o regístrate para continuar
      </p>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Nombre de usuario
          </label>
          <input
            id="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="Tu nombre de usuario"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-md transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={!name.trim() || !password.trim()}
        >
          Entrar / Registrarse
        </button>
      </form>
    </div>
  );
}
