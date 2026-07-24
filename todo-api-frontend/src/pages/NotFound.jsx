/**
 * NotFound.jsx
 * ------------------------------------------------------------
 * Shown for any route that doesn't match Home, CreateTask, or
 * EditTask (see the "*" route in App.jsx).
 */

import { FiAlertTriangle } from "react-icons/fi";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-5">
        <FiAlertTriangle className="w-7 h-7 text-primary-500" />
      </div>

      <h1 className="text-5xl font-extrabold text-gray-900 mb-2">404</h1>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Page not found
      </h2>
      <p className="text-sm text-gray-500 max-w-sm mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Button to="/" variant="primary">
        Return Home
      </Button>
    </div>
  );
}
