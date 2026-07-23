import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import ConfirmDialog from "../components/ConfirmDialog";
import { EmptyState, LoadingSkeleton, ErrorBanner } from "../components/StateBlocks";

// Sample data so the page has something to render before you wire up
// your GET /tasks request. Replace/remove this once real data flows in.
const SAMPLE_TASKS = [
  {
    _id: "1",
    title: "Set up MongoDB connection",
    description: "Connect the Express server to the Atlas cluster.",
    completed: true,
    priority: "high",
    dueDate: null,
  },
  {
    _id: "2",
    title: "Build the GET /tasks route",
    description: "",
    completed: false,
    priority: "medium",
    dueDate: null,
  },
  {
    _id: "3",
    title: "Wire up the frontend to the API",
    description: "Replace sample data with real fetch/axios calls.",
    completed: false,
    priority: "low",
    dueDate: null,
  },
];

export default function TaskListPage() {
  const navigate = useNavigate();

  // ---- UI state -----------------------------------------------------
  // Swap these for whatever your data-fetching setup gives you
  // (e.g. data/isLoading/error from a fetch hook, useEffect + useState, etc.)
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [taskToDelete, setTaskToDelete] = useState(null);

  // ---- Derived list ---------------------------------------------------
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "active" && !task.completed);

    return matchesSearch && matchesStatus;
  });

  // ---- Handlers ---------------------------------------------------
  // Each of these is where you'll call your Express API.
  // They currently just update local state so the UI is functional on its own.

  function handleToggleComplete(task) {
    // TODO: call your PATCH /tasks/:id route here with { completed: !task.completed }
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function handleDeleteRequest(task) {
    setTaskToDelete(task);
  }

  function handleDeleteConfirm() {
    // TODO: call your DELETE /tasks/:id route here
    setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
    setTaskToDelete(null);
  }

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">
            {tasks.length} task{tasks.length === 1 ? "" : "s"} total
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/create")}
        >
          + New Task
        </button>
      </div>

      <div className="toolbar">
        <input
          type="text"
          className="form-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {error ? <ErrorBanner message={error} onRetry={() => {}} /> : null}

      {isLoading ? (
        <LoadingSkeleton />
      ) : filteredTasks.length === 0 ? (
        tasks.length === 0 ? (
          <EmptyState onCreate={() => navigate("/create")} />
        ) : (
          <div className="state-block">
            <p className="state-title">No matching tasks</p>
            <p className="state-text">Try a different search or filter.</p>
          </div>
        )
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!taskToDelete}
        title="Delete this task?"
        text={
          taskToDelete
            ? `"${taskToDelete.title}" will be permanently removed.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}
