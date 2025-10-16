"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  ListTodo,
  MessageSquare,
  Users,
  LogOut,
  LogIn,
  ListTree,
  Activity,
} from "lucide-react";

export default function Sidebar({ onNavigate, activePath }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admindashboard",
    },
    {
      name: "ActionPlan",
      icon: <ListTodo size={20} />,
      path: "/adminactionplan",
    },
    {
      name: "Sub ActionPlan",
      icon: <ListTree size={20} />,
      path: "/adminsubactionplan",
    },
    { name: "Cabang", icon: <Building2 size={20} />, path: "/admincabang" },
    {
      name: "Feedback",
      icon: <MessageSquare size={20} />,
      path: "/adminfeedback",
    },
    { name: "User", icon: <Users size={20} />, path: "/adminuser" },
    {
      name: "Log Activity",
      icon: <Activity size={20} />,
      path: "/adminlogactivity",
    },
  ];

  const isTokenValid = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  };

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
    setCheckingAuth(false);
  };

  useEffect(() => {
    checkTokenValidity();
    const interval = setInterval(checkTokenValidity, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/";
  };

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-[#202123] text-white flex flex-col shadow-lg border-r border-[#2a2b32] transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-5 border-b border-[#2a2b32] flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-green-500 rounded flex items-center justify-center text-white font-bold">
              A
            </div>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-[#2a2b32] transition-colors duration-200"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 flex flex-col gap-1">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => onNavigate(menu.path)}
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : "pl-5 pr-3"
            } py-3 rounded-lg transition-all duration-200 cursor-pointer ${
              activePath === menu.path
                ? "bg-green-500 text-white shadow-md"
                : "text-gray-400 hover:bg-[#2a2b32] hover:text-white"
            }`}
          >
            {menu.icon}
            {!collapsed && (
              <span className="text-sm font-medium">{menu.name}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Login / Logout */}
      <div className="p-4 border-t border-[#2a2b32]">
        {checkingAuth ? (
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "pl-4"
            } py-3 w-full bg-[#2a2b32] rounded-lg`}
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {!collapsed && (
              <span className="ml-3 text-gray-400 text-sm">Checking...</span>
            )}
          </div>
        ) : isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : "pl-4"
            } py-3 w-full bg-red-600 hover:bg-red-700 rounded-lg transition-all duration-200 font-medium`}
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className={`flex items-center gap-3 ${
              collapsed ? "justify-center" : "pl-4"
            } py-3 w-full bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 font-medium`}
          >
            <LogIn size={20} />
            {!collapsed && <span>Login</span>}
          </button>
        )}
      </div>
    </div>
  );
}
