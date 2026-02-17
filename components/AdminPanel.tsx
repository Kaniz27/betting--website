// src/components/AdminPanel.tsx
import React, { useState } from "react";
import Login from "./login/Login";
import Dashboard from "./login/Dashboard";

const AdminPanel: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => setUser(username);
  const handleLogout = () => setUser(null);

  return user ? (
    <Dashboard username={user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default AdminPanel;
