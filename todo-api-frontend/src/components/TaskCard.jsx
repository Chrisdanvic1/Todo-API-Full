import { useNavigate } from "react-router-dom";
import PriorityBadge from "./PriorityBadge";

// Displays a single task row in the task list.
//
// Props:
// - task: { _id, title, description, completed, priority, dueDate }
// - onToggleComplete(task): called when the checkbox is clicked
// - onDelete(task): called when the delete button is clicked
export default function TaskCard({ task, onToggleComplete, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="task-card">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={!!task.completed}
        onChange={() => onToggleComplete(task)}
        aria-label={
          task.completed ? "Mark task as not done" : "Mark task as done"
        }
      />

      <div className="task-card-body">
        <p className={`task-title ${task.completed ? "is-done" : ""}`}>
          {task.title}
        </p>

        {task.description ? (
          <p className="task-description">{task.description}</p>
        ) : null}

        <div className="task-meta">
          {task.priority ? <PriorityBadge priority={task.priority} /> : null}
          {task.dueDate ? (
            <span className="badge badge-neutral">
              Due {formatDate(task.dueDate)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-icon"
          onClick={() => navigate(`/edit/${task._id}`)}
          aria-label="Edit task"
          title="Edit"
        >
          ✏️
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm btn-icon"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
