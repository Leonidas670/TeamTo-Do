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
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
        type="submit"
        disabled={disabled}
      >
        Añadir
      </button>
    </form>
  );
}
