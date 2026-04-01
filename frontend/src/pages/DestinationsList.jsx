import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const mockDestinations = [
  {
    id: "1",
    title: "Almaty",
    country: "Kazakhstan",
    excerpt: "Mountain skyline and vibrant city life.",
  },
  {
    id: "2",
    title: "Bali",
    country: "Indonesia",
    excerpt: "Beaches, temples, and rice terraces.",
  },
  {
    id: "3",
    title: "Reykjavik",
    country: "Iceland",
    excerpt: "Northern lights and geothermal pools.",
  },
];

export default function DestinationsList() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDestinations(mockDestinations);
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <div className="section-head">
        <div>
          <p className="eyebrow">Explore</p>
          <h1>Destinations</h1>
        </div>
      </div>

      {loading && <div className="loader">Loading destinations...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && destinations.length === 0 && (
        <div className="empty-state">
          <h2>No destinations yet</h2>
          <p>Check back soon for new locations.</p>
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
                <p className="card-text">{item.excerpt}</p>
                <Link to={`/destinations/${item.id}`} className="card-link">
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
