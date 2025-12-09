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
    <li className="flex flex-col gap-2 p-3 border rounded bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
            className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-2 focus:ring-green-200"
          />
          {isEditing ? (
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          ) : (
            <div
              className={`font-medium ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              onClick={saveEdit}
            >
              Guardar
            </button>
          ) : (
            <button
              className="px-2 py-1 border rounded text-sm bg-white hover:bg-gray-50"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
          <button
            className="px-2 py-1 border rounded text-sm bg-white hover:bg-red-50 text-red-600"
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
