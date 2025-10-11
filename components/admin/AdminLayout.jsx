"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleNavigate = (path) => {
    router.push(path);
    setShowSidebar(false);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar onNavigate={handleNavigate} activePath={pathname} />
      </div>

      {/* Sidebar Mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64">
            <Sidebar onNavigate={handleNavigate} activePath={pathname} />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setShowSidebar(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
