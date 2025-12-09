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
    <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input
        className="border px-3 py-2 rounded"
        placeholder="Usuario"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        className="border px-3 py-2 rounded"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark">
        Entrar / Registrarse
      </button>
    </form>
  );
}
