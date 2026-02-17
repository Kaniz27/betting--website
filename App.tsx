// src/App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainWebsite from "./components/MainWebsite";
import AdminPanel from "./components/AdminPanel";
import LoginForm from "./components/login/Login";

const App: React.FC = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<MainWebsite />} />

        {/* Admin panel with login */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminPanel />
            ) : (
              <LoginForm onLoginSuccess={() => setIsAdminLoggedIn(true)} />
            )
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
