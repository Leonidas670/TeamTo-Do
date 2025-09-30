import { useState } from "react";

export default function TodoForm({ onAdd }) {
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
      />
      <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">
        Añadir
      </button>
    </form>
  );
}
