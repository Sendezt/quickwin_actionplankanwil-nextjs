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
    // Cek token pertama kali
    checkTokenValidity();

    // Set interval untuk cek token setiap 15 menit
    const interval = setInterval(() => {
      console.log("Checking token validity...");
      checkTokenValidity();
    }, 15 * 60 * 1000); // 15 menit dalam milidetik

    // Cleanup interval ketika component unmount
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
          className="p-2 rounded-md hover:bg-slate-700 cursor-pointer transition-colors duration-200"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-3 space-y-1">
        {menus.map((menu) => (
          <button
            key={menu.name}
            onClick={() => onNavigate(menu.path)}
            className={`flex items-center ${
              collapsed ? "justify-center" : "px-5"
            } py-3 w-full text-left rounded-md transition-all duration-200 cursor-pointer
            ${
              activePath === menu.path
                ? "bg-blue-600 text-white font-medium shadow-md"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {menu.icon}
            {!collapsed && <span className="ml-3">{menu.name}</span>}
          </button>
        ))}
      </nav>

      {/* Bagian bawah: Login / Logout */}
      <div className="p-4 border-t border-slate-700">
        {checkingAuth ? (
          // Loading state untuk button
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "px-4"
            } py-3 w-full bg-slate-700 rounded-md`}
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {!collapsed && (
              <span className="ml-3 text-slate-300 text-sm">Checking...</span>
            )}
          </div>
        ) : isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              collapsed ? "justify-center" : "px-4"
            } py-3 w-full bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 font-medium cursor-pointer`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className={`flex items-center ${
              collapsed ? "justify-center" : "px-4"
            } py-3 w-full bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-200 font-medium cursor-pointer`}
          >
            <LogIn size={20} />
            {!collapsed && <span className="ml-3">Login</span>}
          </button>
        )}
      </div>
    </div>
  );
}
