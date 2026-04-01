import { useEffect, useState } from "react";

export default function Home() {
  const [highlight, setHighlight] = useState("Discover your next trip.");

  useEffect(() => {
    const timer = setTimeout(() => {
      setHighlight("Explore curated destinations worldwide.");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Plan smarter</p>
        <h1>Tourist Destinations Web Catalog</h1>
        <p className="lead">{highlight}</p>
        <div className="hero-actions">
          <a className="btn" href="/destinations">
            Browse destinations
          </a>
          <a className="btn btn-ghost" href="/login">
            Sign in
          </a>
        </div>
      </div>
      <div className="hero-panel" aria-hidden="true">
        <div className="hero-card">
          <p className="hero-card-title">Top picks</p>
          <p className="hero-card-text">Hidden lagoons, city escapes.</p>
        </div>
      </div>
    </section>
  );
}
