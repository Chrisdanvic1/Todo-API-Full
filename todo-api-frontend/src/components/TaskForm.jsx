import { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Button from "./Button";

export default function TaskForm({
  heading,
  subheading,
  submitLabel = "submit",
  initialTitle = "",
  initialDateForCompletion = "",
  initialCompleted = false,
  showCompleted = false,
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [dateForCompletion, setDateForCompletion] = useState(
    initialDateForCompletion,
  );
  const [completed, setCompleted] = useState(initialCompleted);

  function handleSubmit(e) {
    e.preventDefault();

    if (onSubmit) onSubmit({ title, dateForCompletion, completed });
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-card border border-black p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-3">
          <FiCheckSquare className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
        {subheading && (
          <p className="text-sm text-gray-500 mt-1">{subheading}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Task Title field */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Task Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Design the landing page"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                       placeholder:text-gray-400 outline-none transition-colors duration-150
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Due date field */}
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Date for Completion
          </label>
          <input
            id="dueDate"
            type="date"
            required
            value={dateForCompletion}
            onChange={(e) => setDateForCompletion(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                       outline-none transition-colors duration-150
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        {showCompleted && (
          <div className="flex items-center justify-between pr-3">
            <label htmlFor="completed">Completed: </label>
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
