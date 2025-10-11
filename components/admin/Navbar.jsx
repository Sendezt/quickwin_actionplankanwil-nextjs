"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ toggleSidebar, title = "Admin Dashboard" }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Tombol toggle sidebar (hanya tampil di mobile) */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Info Admin */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Admin</span>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
