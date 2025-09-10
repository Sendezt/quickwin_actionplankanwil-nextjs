"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar({ toggleSidebar }) {
  return (
    <div className="w-full h-14 bg-white shadow flex items-center px-4 justify-between">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Admin</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
}
