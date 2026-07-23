import { useState } from "react";

// Shared form used by both the "Create Task" and "Edit Task" pages.
//
// Props:
// - initialValues: { title, description, priority, dueDate, completed }
// - submitLabel: text for the submit button (e.g. "Create Task" / "Save Changes")
// - onSubmit(values): called with the form values when the form is valid
// - onCancel(): called when the user clicks Cancel
// - submitting: boolean, disables the form while a request is in flight
export default function TaskForm({
  initialValues = {},
  submitLabel = "Save",
  onSubmit,
  onCancel,
  submitting = false,
}) {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [priority, setPriority] = useState(initialValues.priority || "medium");
  const [dueDate, setDueDate] = useState(initialValues.dueDate || "");
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!title.trim()) {
      nextErrors.title = "Title is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="form-input"
          placeholder="e.g. Follow up with supplier"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        {errors.title ? <p className="form-error">{errors.title}</p> : null}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description <span className="optional">(optional)</span>
        </label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Add any extra detail about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={submitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="dueDate">
            Due date <span className="optional">(optional)</span>
          </label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? <span className="spinner" /> : null}
          {submitting ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
