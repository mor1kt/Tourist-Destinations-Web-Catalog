import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="profile">
      <div className="profile-hero">
        <div>
          <p className="eyebrow">Аккаунт</p>
          <h1>Профиль</h1>
          <p className="lead">Управляйте данными и статусом доступа.</p>
        </div>
        <div className="profile-badge">
          <p className="profile-badge-title">Статус</p>
          <p className="profile-badge-value">
            {user ? "Авторизован" : "Гость"}
          </p>
        </div>
      </div>

      {!user ? (
        <div className="empty-state">
          Вы не вошли в аккаунт. Перейдите на страницу входа.
        </div>
      ) : (
        <div className="profile-grid">
          <div className="profile-card">
            <p className="profile-label">Имя</p>
            <p className="profile-value">{user.name}</p>
          </div>
          <div className="profile-card">
            <p className="profile-label">Email</p>
            <p className="profile-value">{user.email}</p>
          </div>
          <div className="profile-card">
            <p className="profile-label">Роль</p>
            <p className="profile-value">{user.role}</p>
          </div>
        </div>
      )}
    </section>
  );
}
