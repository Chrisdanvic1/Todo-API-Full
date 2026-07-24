import { FiCheckCircle, FiClock } from "react-icons/fi";

export default function StatusBadge({ isCompleted }) {
  if (isCompleted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
        <FiCheckCircle className="w-3.5 h-3.5" />
        Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
      <FiClock className="w-3.5 h-3.5" />
      Pending
    </span>
  );
}
