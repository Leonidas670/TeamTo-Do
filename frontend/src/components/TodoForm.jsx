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
        className="flex-1 border px-3 py-2 rounded"
        placeholder="Nueva tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
      <button
        className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-dark disabled:opacity-60"
        type="submit"
        disabled={disabled}
      >
        Añadir
      </button>
    </form>
  );
}
