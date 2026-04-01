import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createDestination, fetchDestinations } from "../services/api";
import useAuth from "../hooks/useAuth";

export default function DestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    country: "",
    description: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    fetchDestinations()
      .then((items) => {
        if (isMounted) setDestinations(items);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const created = await createDestination(form, token);
      setDestinations((prev) => [created, ...prev]);
      setForm({ title: "", country: "", description: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Откройте</p>
          <h1>Направления</h1>
        </div>
      </div>

      {loading && <div className="loader">Загрузка направлений...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {user?.role === "admin" ? (
        <form className="form card" onSubmit={handleCreate}>
          <h2 className="card-title">Добавить направление</h2>
          <label className="form-field">
            Название
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-field">
            Страна
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-field">
            Описание
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" disabled={creating}>
            {creating ? "Создание..." : "Создать"}
          </button>
        </form>
      ) : (
        <div className="empty-state">
          <h2>Доступ только для администратора</h2>
          <p>Войдите как админ, чтобы добавлять направления.</p>
        </div>
      )}

      {!loading && !error && destinations.length === 0 && (
        <div className="empty-state">
          <h2>Пока нет направлений</h2>
          <p>Скоро появятся новые локации.</p>
        </div>
      )}

      {!loading && !error && destinations.length > 0 && (
        <div className="card-grid">
          {destinations.map((item) => (
            <article key={item.id} className="card">
              <div className="card-media" aria-hidden="true" />
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-meta">{item.country}</p>
                <p className="card-text">
                  {item.description?.slice(0, 90) || "Описание пока не добавлено."}
                </p>
                <Link to={`/destinations/${item._id}`} className="card-link">
                  Подробнее
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
