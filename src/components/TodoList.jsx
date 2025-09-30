import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
