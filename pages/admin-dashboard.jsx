"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import DashboardPage from "@/components/admin/DashboardPage";
import CabangPage from "@/components/admin/CabangPage";
import ActionPlanPage from "@/components/admin/ActionPlanPage";
import FeedbackPage from "@/components/admin/FeedbackPage";

export default function AdminPage() {
  const [active, setActive] = useState("Dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Desktop */}
      <div className="hidden md:block">
        <Sidebar active={active} setActive={setActive} />
      </div>

      {/* Sidebar Mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64">
            <Sidebar active={active} setActive={setActive} />
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
        <main className="p-6 overflow-y-auto">
          {active === "Dashboard" && <DashboardPage />}
          {active === "Cabang" && <CabangPage />}
          {active === "ActionPlan" && <ActionPlanPage />}
          {active === "Feedback" && <FeedbackPage />}
        </main>
      </div>
    </div>
  );
}
