import React from "react";
import UserManagement from "./UserManagement";
import RecipeManagement from "./RecipeManagement";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-800 text-white py-4 px-8">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserManagement />
          <RecipeManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

