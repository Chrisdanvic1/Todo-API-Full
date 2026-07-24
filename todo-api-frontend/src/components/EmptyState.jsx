import { FiClipboard } from "react-icons/fi";
import Button from "./Button";

export default function EmptyState({
  title = "No tasks yet",
  message = "Create your first task and it will show up here.",
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      {/* Icon inside a soft circular background — simple "illustration" */}
      <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-5">
        <FiClipboard className="w-9 h-9 text-primary-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1.5">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{message}</p>

      <Button to="/create-task" variant="primary">
        Create Task
      </Button>
    </div>
  );
}
