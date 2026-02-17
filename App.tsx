import React from "react";
import { Routes, Route } from "react-router-dom";
import MainWebsite from "./components/MainWebsite";
import AdminPanel from "./components/AdminPanel";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainWebsite />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default App;
