"use client";

import React from "react";

export default function Sidebar({ active, setActive }) {
  const menus = ["Dashboard", "Cabang", "ActionPlan", "Feedback", "User"];

  const handleLogout = () => {
    // Hapus token JWT
    localStorage.removeItem("token");

    // Redirect ke page.js (misalnya halaman login utama)
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 text-2xl font-bold border-b border-blue-600 flex justify-between items-center">
        <span>Admin Panel</span>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        {menus.map((menu) => (
          <button
            key={menu}
            onClick={() => setActive(menu)}
            className={`w-full text-left px-6 py-3 hover:bg-blue-700 ${
              active === menu ? "bg-blue-600 font-semibold" : ""
            }`}
          >
            {menu}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-600">
        <button
          onClick={handleLogout}
          className="w-full text-left px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
