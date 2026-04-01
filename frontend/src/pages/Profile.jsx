import { useState } from "react";

export default function Profile() {
  const [user] = useState({ name: "Guest", email: "guest@example.com" });

  return (
    <section>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </section>
  );
}
