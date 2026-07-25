import { Link } from "react-router-dom";

const VARIANT_STYLES = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-100",

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
