// pages/MenuSatu.jsx
"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChartBarMultiple } from "@/components/implementasiuuhkpd/chart-bar-multiple";
import Navbar from "@/components/navbar";
import { useDashboardData } from "@/hooks/implementasiuuhkpd/useDashboardData";
import { DashboardStats } from "@/components/implementasiuuhkpd/DashboardStats";
import { DashboardTable } from "@/components/implementasiuuhkpd/DashboardTable";
import { FeedbackModal } from "@/components/implementasiuuhkpd/feedback/FeedbackModal";
import NotAuthenticated from "@/components/not-Authenticate";

export default function MenuSatu() {
  const { dashboardData, rangeData, feedbackData, isLoading } =
    useDashboardData();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    // Simulasi delay biar spinner terlihat
    setTimeout(() => {
      if (!storedUser || !token) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);

      // Kirim log kunjungan
      const user = JSON.parse(storedUser);
      const logData = {
        adminId: user.id,
        action: "visit",
        description: `User ${user.username} mengunjungi halaman Implementasi UU HKPD`,
      };
      fetch("https://magangproject.vercel.app/api/logs/createlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch((err) => console.error("Gagal mengirim log:", err));
    }, 800);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4">Memeriksa autentikasi...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Navbar />

          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashboardStats
                dashboardData={dashboardData}
                rangeData={rangeData}
                isLoading={isLoading}
              />
            </div>

            {dashboardData?.data && (
              <ChartBarMultiple data={dashboardData.data} />
            )}

            <DashboardTable
              dashboardData={dashboardData}
              isLoading={isLoading}
              onOpenFeedback={() => setOpenFeedbackModal(true)}
            />
          </div>

          <FeedbackModal
            open={openFeedbackModal}
            onClose={() => setOpenFeedbackModal(false)}
            feedbackData={feedbackData}
          />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
