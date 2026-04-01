import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  isActive ? "nav-link nav-link-active" : "nav-link";

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-brand">Destinations</div>
      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>
          Home
        </NavLink>
        <NavLink to="/destinations" className={linkClass}>
          Destinations
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>
        <NavLink to="/admin" className={linkClass}>
          Admin
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
        <NavLink to="/register" className={linkClass}>
          Register
        </NavLink>
      </div>
    </nav>
  );
}
