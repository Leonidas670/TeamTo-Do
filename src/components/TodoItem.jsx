export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-3 border rounded">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggle(task.id, e.target.checked)}
        />
        <div>
          <div
            className={`font-medium ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.text}
          </div>
          <div className="text-xs text-gray-500">Autor: {task.author}</div>
        </div>
      </div>
      <button
        className="px-2 py-1 border rounded text-sm"
        onClick={() => onDelete(task.id)}
      >
        Eliminar
      </button>
    </li>
  );
}
