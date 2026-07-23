// Small reusable "state" blocks shown instead of the task list:
// empty state, loading skeleton, and error banner.

export function EmptyState({ onCreate }) {
  return (
    <div className="state-block">
      <div className="state-icon">📋</div>
      <p className="state-title">No tasks yet</p>
      <p className="state-text">Create your first task to get started.</p>
      <button type="button" className="btn btn-primary btn-sm" onClick={onCreate}>
        + New Task
      </button>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="task-list">
      <div className="skeleton skeleton-card" />
      <div className="skeleton skeleton-card" />
      <div className="skeleton skeleton-card" />
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner">
      <span>⚠️ {message || "Something went wrong. Please try again."}</span>
      {onRetry ? (
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ marginLeft: "auto" }}
          onClick={onRetry}
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
