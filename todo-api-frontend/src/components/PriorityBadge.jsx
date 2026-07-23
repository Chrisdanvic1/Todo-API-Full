// Small colored label used to show a task's priority.
// Falls back to a neutral style if an unexpected value is passed in.
export default function PriorityBadge({ priority }) {
  const normalized = (priority || "").toLowerCase();

  const classByPriority = {
    high: "badge badge-high",
    medium: "badge badge-medium",
    low: "badge badge-low",
  };

  const className = classByPriority[normalized] || "badge badge-neutral";

  return <span className={className}>{priority || "None"}</span>;
}
