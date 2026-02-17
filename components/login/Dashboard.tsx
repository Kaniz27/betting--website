// src/components/login/Dashboard.tsx
import React from "react";

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ username, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {username}</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p>View and manage users</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>Check website reports</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Change admin settings</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
