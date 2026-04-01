import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const linkClass = ({ isActive }) =>
  isActive ? "nav-link nav-link-active" : "nav-link";

export default function NavBar() {
  const { user, clearAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-brand">
        Каталог путешествий
        {user ? (
          <span className="nav-status">Вы вошли как {user.name}</span>
        ) : null}
      </div>
      <div className="nav-links">
        <NavLink to="/" className={linkClass} end>
          Главная
        </NavLink>
        <NavLink to="/destinations" className={linkClass}>
          Направления
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Профиль
        </NavLink>
        {user?.role === "admin" ? (
          <NavLink to="/admin" className={linkClass}>
            Админ
          </NavLink>
        ) : null}
        {!user ? (
          <>
            <NavLink to="/login" className={linkClass}>
              Вход
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Регистрация
            </NavLink>
          </>
        ) : (
          <button className="nav-button" type="button" onClick={handleLogout}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
}
