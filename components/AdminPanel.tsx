// src/components/admin/AdminPanel.tsx
import React, { useState } from "react";

interface AdminPanelProps {
  username?: string; // optional, চাইলে welcome দেখাবে
}

const AdminPanel: React.FC<AdminPanelProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "Users":
        return <p className="text-lg">User Management Content</p>;
      case "Dashboard":
        return <p className="text-lg">Dashboard Stats Content</p>;
      case "Actions":
        return <p className="text-lg">Admin Actions Content</p>;
      case "Security":
        return <p className="text-lg">Security Logs Content</p>;
      default:
        return <p className="text-lg">Dashboard Stats Content</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-500 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        {username && <p className="mb-4">Welcome, {username}</p>}

        <button
          className="mb-2 text-left hover:bg-orange-600 p-2 rounded"
          onClick={() => setActiveTab("Dashboard")}
        >
          Dashboard Stats
        </button>
        <button
          className="mb-2 text-left hover:bg-orange-600 p-2 rounded"
          onClick={() => setActiveTab("Users")}
        >
          User Management
        </button>
        <button
          className="mb-2 text-left hover:bg-orange-600 p-2 rounded"
          onClick={() => setActiveTab("Actions")}
        >
          Admin Actions
        </button>
        <button
          className="mb-2 text-left hover:bg-orange-600 p-2 rounded"
          onClick={() => setActiveTab("Security")}
        >
          Security Logs
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{renderTab()}</main>
    </div>
  );
};

export default AdminPanel;
