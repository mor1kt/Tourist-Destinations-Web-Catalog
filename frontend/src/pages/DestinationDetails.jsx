import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DestinationDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetails({
        id,
        title: "Sample Destination",
        description: "Details will be loaded from the API.",
        highlights: ["Local cuisine", "Historic landmarks", "Nature trails"],
      });
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <div className="loader">Loading details...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!details) return <div className="empty-state">No data found.</div>;

  return (
    <section className="details">
      <div className="details-media" aria-hidden="true" />
      <div className="details-body">
        <p className="eyebrow">Destination</p>
        <h1>{details.title}</h1>
        <p className="lead">{details.description}</p>
        <ul className="pill-list">
          {details.highlights.map((item) => (
            <li key={item} className="pill">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
