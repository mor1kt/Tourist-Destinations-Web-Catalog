import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDestinationById } from "../services/api";

export default function DestinationDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetchDestinationById(id)
      .then((item) => {
        if (isMounted) setDetails(item);
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
  }, [id]);

  if (loading) return <div className="loader">Загрузка деталей...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!details)
    return <div className="empty-state">Данные не найдены.</div>;

  return (
    <section className="details">
      <div className="details-media" aria-hidden="true" />
      <div className="details-body">
        <p className="eyebrow">Направление</p>
        <h1>{details.title}</h1>
        <p className="lead">{details.description}</p>
        <ul className="pill-list">
          <li className="pill">{details.country}</li>
          <li className="pill">Рейтинг: {details.rating ?? 0}</li>
        </ul>
      </div>
    </section>
  );
}
