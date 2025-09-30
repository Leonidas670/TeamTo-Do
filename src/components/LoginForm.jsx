import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const [name, setName] = useState("");
  const { login } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(name.trim());
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm mx-auto">
      <input
        className="border px-3 py-2 rounded"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
    </form>
  );
}
