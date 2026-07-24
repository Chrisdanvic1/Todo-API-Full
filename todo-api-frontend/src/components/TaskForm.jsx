/**
 * TaskForm.jsx
 * ------------------------------------------------------------
 * Shared form UI used by both the "Create Task" and "Edit Task"
 * pages, since they look identical apart from a few text labels
 * and starting values.
 *
 * IMPORTANT: This component only manages its OWN input state
 * (so the inputs are typeable / controlled). It does NOT send
 * anything to a server. The `onSubmit` prop is just a plain
 * function passed down from the page — wire it up to your real
 * API call later (e.g. inside CreateTask.jsx / EditTask.jsx).
 *
 * Props:
 *   - heading: string shown at the top of the card ("Create a new task")
 *   - subheading: small helper text under the heading
 *   - submitLabel: text on the submit button ("Create Task" / "Update Task")
 *   - initialTitle / initialDueDate: used to prefill fields on the Edit page
 *   - onSubmit: called with { title, dueDate } when the form is submitted
 *   - onCancel: called when the Cancel button is clicked
 */

import { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import Button from "./Button";

export default function TaskForm({
  heading,
  subheading,
  submitLabel,
  initialTitle = "",
  initialDueDate = "",
  onSubmit,
  onCancel,
}) {
  // Local UI state for the two form fields. This is just so the
  // inputs behave like normal editable text fields — it is NOT
  // connected to any backend or global state.
  const [title, setTitle] = useState(initialTitle);
  const [dueDate, setDueDate] = useState(initialDueDate);

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser's default full-page-reload submit

    // ---------------------------------------------------------
    // BACKEND INTEGRATION POINT
    // Replace this with your actual API call, e.g.:
    //   await axios.post("/api/tasks", { title, dueDate })
    // For now we just hand the values up to whichever page
    // rendered this form, via the onSubmit prop.
    // ---------------------------------------------------------
    if (onSubmit) onSubmit({ title, dueDate });
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                       outline-none transition-colors duration-150
                       focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
        </div>

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
