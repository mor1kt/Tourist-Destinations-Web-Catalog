import { useState } from "react";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setAuth } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    loginUser(form)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setAuth(data.user);
        setSuccess("Вы вошли в аккаунт.");
        setForm({ email: "", password: "" });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <h1>Вход</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert">{success}</div>}
      <form onSubmit={handleSubmit} className="form">
        <label className="form-field">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-field">
          Пароль
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>
      </form>
    </section>
  );
}
