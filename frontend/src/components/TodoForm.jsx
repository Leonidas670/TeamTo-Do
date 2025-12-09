import { useState } from "react";

export default function TodoForm({ onAdd, disabled }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={submit} className="flex gap-4 items-center">
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 transition"
          placeholder="¿Qué necesitas hacer hoy?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 shrink-0 disabled:bg-blue-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={disabled}
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
}
