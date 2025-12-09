import { useState } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    if (!newText.trim()) return;
    onEdit(task.id, newText.trim());
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-2 p-3 border rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
          />
          {isEditing ? (
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border px-2 py-1 rounded"
            />
          ) : (
            <div
              className={`font-medium ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              className="px-2 py-1 bg-brand text-white rounded text-sm hover:bg-brand-dark"
              onClick={saveEdit}
            >
              Guardar
            </button>
          ) : (
            <button
              className="px-2 py-1 border rounded text-sm"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => onDelete(task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Creado por: {task.author}{" "}
        {task.editor && <span>· Última edición: {task.editor}</span>}
      </div>
    </li>
  );
}
