import { useState } from "react";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task?.text || "Tarea de ejemplo");

  const saveEdit = () => {
    if (!newText.trim()) return;
    onEdit?.(task?.id, newText.trim());
    setIsEditing(false);
  };

  const mockTask = task || {
    id: 1,
    text: "Tarea de ejemplo",
    completed: false,
    author: "Usuario Demo",
    editor: null
  };

  return (
    <li className="group relative bg-gradient-to-br from-white to-orange-50/20 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 border-2 border-orange-100 hover:border-orange-200 transform hover:-translate-y-1">
      {/* Indicador de estado lateral */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl transition-colors duration-300 ${
        mockTask.completed 
          ? "bg-gradient-to-b from-green-400 to-emerald-500" 
          : "bg-gradient-to-b from-orange-400 to-rose-400"
      }`} />

      <div className="flex items-start justify-between gap-4">
        {/* Checkbox y contenido */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Checkbox personalizado */}
          <div className="relative flex-shrink-0 mt-1">
            <input
              type="checkbox"
              checked={mockTask.completed}
              onChange={(e) => onToggle?.(mockTask.id, e.target.checked)}
              className="peer h-6 w-6 rounded-lg border-2 border-orange-300 text-orange-500 focus:ring-2 focus:ring-orange-400 focus:ring-offset-1 cursor-pointer transition-all duration-200 hover:border-orange-400"
            />
            {mockTask.completed && (
              <svg 
                className="absolute top-1 left-1 w-4 h-4 text-white pointer-events-none"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>

          {/* Texto de la tarea */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="relative">
                <input
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all outline-none"
                  autoFocus
                />
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <p className={`text-base font-medium leading-relaxed transition-all duration-300 ${
                  mockTask.completed 
                    ? "line-through text-gray-400" 
                    : "text-gray-800"
                }`}>
                  {mockTask.text}
                </p>
                {mockTask.completed && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex-shrink-0">
                    ✓ Hecho
                  </span>
                )}
              </div>
            )}

            {/* Info del autor */}
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{mockTask.author}</span>
              </div>
              {mockTask.editor && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span>Editado por {mockTask.editor}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={saveEdit}
                title="Guardar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-all duration-200"
                onClick={() => {
                  setIsEditing(false);
                  setNewText(mockTask.text);
                }}
                title="Cancelar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                className="p-2 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={() => setIsEditing(true)}
                title="Editar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                className="p-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                onClick={() => onDelete?.(mockTask.id)}
                title="Eliminar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}