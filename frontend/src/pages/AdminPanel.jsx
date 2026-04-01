import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [stats, setStats] = useState({ users: 0, destinations: 0 });

  useEffect(() => {
    setStats({ users: 128, destinations: 42 });
  }, []);

  return (
    <section>
      <h1>Admin Panel</h1>
      <p>Users: {stats.users}</p>
      <p>Destinations: {stats.destinations}</p>
    </section>
  );
}
