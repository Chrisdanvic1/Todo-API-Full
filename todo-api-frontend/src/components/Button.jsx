/**
 * Button.jsx
 * ------------------------------------------------------------
 * A single, reusable button component used everywhere in the app
 * (Navbar, forms, task cards, empty states, 404 page, etc).
 *
 * Instead of writing new className strings every time we need a
 * button, we centralize the styling here and switch between a few
 * "variants" using props. This keeps the UI consistent and makes
 * it easy to re-theme later.
 *
 * Usage:
 *   <Button>Click me</Button>
 *   <Button variant="secondary">Cancel</Button>
 *   <Button variant="danger" icon={<FiTrash2 />}>Delete</Button>
 *   <Button as="link" to="/create-task">Create Task</Button>
 */

import { Link } from "react-router-dom";

const VARIANT_STYLES = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 shadow-sm hover:shadow-card-hover",
  secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  danger: "bg-white text-red-600 border border-red-100 hover:bg-red-50",
  ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
};

export default function Button({
  children,
  variant = "primary",
  icon = null,
  onClick,
  type = "button",
  to = null, // if provided, the button renders as a <Link> instead of <button>
  fullWidth = false,
  className = "",
}) {
  const baseStyles =
    " inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium " +
    "transition-all duration-200 ease-out active:scale-[0.97] " +
    (fullWidth ? "w-full " : "");

  const combinedStyles = `${baseStyles} ${VARIANT_STYLES[variant]} ${className}`;

  // If a "to" prop is passed, this button is really a navigation link
  // (e.g. the "Create Task" button that takes you to another page).
  if (to) {
    return (
      <Link to={to} className={`${combinedStyles} text-black`}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {icon}
      {children}
    </button>
  );
}
