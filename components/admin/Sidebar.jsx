"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  ListTodo,
  MessageSquare,
  Users,
  LogOut,
  ListTree,
} from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Cabang", icon: <Building2 size={20} /> },
    { name: "ActionPlan", icon: <ListTodo size={20} /> },
    { name: "Sub ActionPlan", icon: <ListTree size={20} /> },
    { name: "Feedback", icon: <MessageSquare size={20} /> },
    { name: "User", icon: <Users size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-slate-800 text-white flex flex-col shadow-lg border-r border-slate-700 transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl font-semibold text-white">Admin Panel</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-slate-700"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-3 space-y-1">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => setActive(menu.name)}
            className={`flex items-center ${
              collapsed ? "justify-center" : "px-5"
            } py-3 w-full text-left rounded-md transition-all duration-200
            ${
              active === menu.name
                ? "bg-blue-600 text-white font-medium shadow-md"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {menu.icon}
            {!collapsed && <span className="ml-3">{menu.name}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className={`flex items-center ${
            collapsed ? "justify-center" : "px-4"
          } py-3 w-full bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 font-medium`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
}
