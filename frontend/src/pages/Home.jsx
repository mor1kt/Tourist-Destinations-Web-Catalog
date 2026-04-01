import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchDestinations } from "../services/api";

export default function Home() {
  const [highlight, setHighlight] = useState(
    "Откройте новое место для следующего путешествия."
  );
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight("Ищите вдохновение в подборке лучших направлений.");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Планируйте разумно</p>
          <h1>Каталог туристических направлений</h1>
          <p className="lead">{highlight}</p>
          <div className="hero-actions">
            <a className="btn" href="/destinations">
              Смотреть направления
            </a>
            {!user ? (
              <a className="btn btn-ghost" href="/login">
                Войти
              </a>
            ) : null}
          </div>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <div className="hero-card">
            <p className="hero-card-title">Лучшие подборки</p>
            <p className="hero-card-text">Горы, пляжи и городские открытия.</p>
          </div>
          <div className="hero-card">
            <p className="hero-card-title">Культурные маршруты</p>
            <p className="hero-card-text">Музеи, гастрономия, фестивали.</p>
          </div>
          <div className="hero-card">
            <p className="hero-card-title">Приключения</p>
            <p className="hero-card-text">Треки, сафари, водные туры.</p>
          </div>
        </div>
      </section>
      <section className="home-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Новое</p>
            <h2>Свежие направления</h2>
          </div>
        </div>
        {loading && <div className="loader">Загрузка направлений...</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && destinations.length === 0 && (
          <div className="empty-state">Туристических направлений еще нет.</div>
        )}
        {!loading && !error && destinations.length > 0 && (
          <div className="card-grid">
            {destinations.slice(0, 6).map((item) => (
              <article key={item._id} className="card">
                <div className="card-media" aria-hidden="true" />
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-meta">{item.country}</p>
                  <p className="card-text">
                    {item.description?.slice(0, 90) ||
                      "Описание пока не добавлено."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
