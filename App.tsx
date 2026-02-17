import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";

import MainWebsite from "./components/MainWebsite";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainWebsite />} />
    
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
