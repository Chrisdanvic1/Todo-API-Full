import { FiEdit2, FiTrash2, FiCalendar } from "react-icons/fi";
import StatusBadge from "./StatusBadge";

function formatDate(dateString) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div
      className="group bg-white rounded-2xl p-5 shadow-card border border-gray-100
                 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 ease-out"
    >
      {/* Top row: title + status badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-semibold text-gray-800 leading-snug wrap-break-word">
          {task.title}
        </h3>
        <StatusBadge isCompleted={task.completed} />
      </div>

      {/* Date info */}
      <div className="space-y-1.5 mb-5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-400" />
          <span>Created: {formatDate(task.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="w-4 h-4 text-gray-400" />
          <span>Due: {formatDate(task.dateForCompletion)}</span>
        </div>
      </div>

      {/* Actions row — only shows on hover on larger screens for a cleaner
          look, always visible on touch devices since there's no hover there. */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(task._id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                     text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-600
                     transition-colors duration-150"
        >
          <FiEdit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg
                     text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600
                     transition-colors duration-150"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
