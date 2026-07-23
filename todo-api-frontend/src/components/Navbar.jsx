import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-mark">T</span>
          Task App
        </Link>
      </div>
    </header>
  );
}
