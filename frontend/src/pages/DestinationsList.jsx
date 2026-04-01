import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createDestination,
  fetchDestinations,
  uploadDestinationImage,
} from "../services/api";
import useAuth from "../hooks/useAuth";

export default function DestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    title: "",
    country: "",
    description: "",
    rating: "",
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
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const trimmed = {
        ...form,
        title: form.title.trim(),
        country: form.country.trim(),
        description: form.description.trim(),
      };

      if (!trimmed.title || !trimmed.country || !trimmed.description) {
        setError("Заполните все обязательные поля.");
        return;
      }

      let images = [];
      if (imageFile) {
        const uploaded = await uploadDestinationImage(imageFile, token);
        images = [uploaded.url];
      }
      const created = await createDestination({ ...trimmed, images }, token);
      setDestinations((prev) => [created, ...prev]);
      setForm({ title: "", country: "", description: "", rating: "" });
      setImageFile(null);
      setSuccess("Направление добавлено.");
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
      {success && <div className="alert">{success}</div>}

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
          <label className="form-field">
            Рейтинг
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
            />
          </label>
          <label className="form-field">
            Фото
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            />
          </label>
          <button
            type="submit"
            disabled={
              creating ||
              !form.title.trim() ||
              !form.country.trim() ||
              !form.description.trim()
            }
          >
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
            <article key={item._id} className="card">
              <div
                className="card-media"
                aria-hidden="true"
                style={
                  item.images?.[0]
                    ? { backgroundImage: `url(${item.images[0]})` }
                    : undefined
                }
              />
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
