import { useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  const login = (payload) => {
    setUser({ id: "1", name: payload.email });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
}
