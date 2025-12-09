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
    <li className="flex flex-col gap-3 bg-white rounded-lg shadow p-4 transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          {isEditing ? (
            <input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="border-gray-300 rounded-md shadow-sm focus:ring-blue-600 focus:border-blue-600 px-2 py-1"
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
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold transition-colors duration-200"
              onClick={saveEdit}
            >
              Guardar
            </button>
          ) : (
            <button
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm font-semibold transition-colors duration-200"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
          <button
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-semibold transition-colors duration-200"
            onClick={() => onDelete(task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500 pl-8">
        Creado por: {task.author}{" "}
        {task.editor && <span>· Última edición: {task.editor}</span>}
      </div>
    </li>
  );
}
