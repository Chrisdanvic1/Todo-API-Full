import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { LoadingSkeleton, ErrorBanner } from "../components/StateBlocks";

// Sample task standing in for your GET /tasks/:id response.
// Replace this with real data once you wire up the fetch.
const SAMPLE_TASK = {
  _id: "2",
  title: "Build the GET /tasks route",
  description: "",
  priority: "medium",
  dueDate: "",
  completed: false,
};

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---- UI state -----------------------------------------------------
  // Swap these for the result of your GET /tasks/:id request.
  const [task] = useState(SAMPLE_TASK);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(values) {
    // TODO: call your PATCH /tasks/:id route here with `values`
    //
    // Suggested pattern:
    // setSubmitting(true);
    // patchTask(id, values)
    //   .then(() => navigate("/"))
    //   .catch((err) => setError(err.message))
    //   .finally(() => setSubmitting(false));

    console.log(`Update task ${id}:`, values);
    navigate("/");
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to tasks
      </Link>

      <div className="page-header">
        <div>
          <h1 className="page-title">Edit Task</h1>
          <p className="page-subtitle">Update the details of this task.</p>
        </div>
      </div>

      {error ? <ErrorBanner message={error} onRetry={() => {}} /> : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : !task ? (
        <div className="state-block">
          <p className="state-title">Task not found</p>
          <p className="state-text">
            This task may have been deleted.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/")}
          >
            Back to tasks
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: "24px" }}>
          <TaskForm
            initialValues={task}
            submitLabel="Save Changes"
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/")}
          />
        </div>
      )}
    </div>
  );
}
