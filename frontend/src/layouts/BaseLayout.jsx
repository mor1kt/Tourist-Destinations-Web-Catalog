import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function BaseLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavBar />
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Каталог туристических направлений</p>
      </footer>
    </div>
  );
}
