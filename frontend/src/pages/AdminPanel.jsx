import { useEffect, useState } from "react";
import { fetchAdminStats } from "../services/api";

export default function AdminPanel() {
  const [stats, setStats] = useState({ usersCount: 0, destinationsCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");
    fetchAdminStats(token)
      .then((data) => {
        if (isMounted) setStats(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h1>Панель администратора</h1>
      {loading && <div className="loader">Загрузка статистики...</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Пользователи</p>
            <p className="stat-value">{stats.usersCount}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Направления</p>
            <p className="stat-value">{stats.destinationsCount}</p>
          </div>
        </div>
      )}
    </section>
  );
}
