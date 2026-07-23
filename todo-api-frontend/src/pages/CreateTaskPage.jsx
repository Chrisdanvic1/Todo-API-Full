import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(values) {
    // TODO: call your POST /tasks route here with `values`
    // e.g. { title, description, priority, dueDate }
    //
    // Suggested pattern:
    // setSubmitting(true);
    // postTask(values)
    //   .then(() => navigate("/"))
    //   .catch((err) => setError(err.message))
    //   .finally(() => setSubmitting(false));

    console.log("Create task:", values);
    navigate("/");
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to tasks
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">New Task</h1>
          <p className="page-subtitle">Add a task to your list.</p>
        </div>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <TaskForm
          submitLabel="Create Task"
          submitting={submitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
}
