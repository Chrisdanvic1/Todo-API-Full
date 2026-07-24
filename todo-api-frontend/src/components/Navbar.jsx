/**
 * Navbar.jsx
 * ------------------------------------------------------------
 * Top navigation bar shown on every page.
 * - Desktop: logo on the left, nav links on the right.
 * - Mobile: logo + hamburger button, links collapse into a dropdown.
 *
 * `useState` is only used here for UI state (is the mobile menu open?)
 * — this is NOT related to backend / API data.
 */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiCheckSquare, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Create Task", path: "/create-task" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tailwind classes for a nav link. NavLink gives us `isActive`
  // automatically based on the current route, so we can highlight
  // whichever page the user is on.
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-primary-50 text-primary-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / app title */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
            <FiCheckSquare className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-display font-bold text-gray-900 text-lg">
            Task Manager
          </span>
        </NavLink>

        {/* Desktop nav links — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger button — hidden on larger screens */}
        <button
          className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-5 h-5" />
          ) : (
            <FiMenu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu — only rendered when open */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 px-4 pb-4 pt-2 flex flex-col gap-1 bg-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
