// pages/MenuSatu.jsx
"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChartBarMultiple } from "@/components/implementasiuuhkpd/chart-bar-multiple";
import Navbar from "@/components/navbar";
import { useDashboardData } from "@/hooks/implementasiuuhkpd/useDataMenuSatu";
import { DashboardStats } from "@/components/implementasiuuhkpd/DashboardStats";
import { DashboardTable } from "@/components/implementasiuuhkpd/DashboardTable";
import { FeedbackModal } from "@/components/implementasiuuhkpd/feedback/FeedbackModal";
import NotAuthenticated from "@/components/not-Authenticate";
import LoadingAuth from "@/components/loading";

export default function MenuSatu() {
  const { dashboardData, rangeData, feedbackData, isLoading } =
    useDashboardData();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

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
      fetch("https://quickwin-jateng.vercel.app/api/logs/createlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch((err) => console.error("Gagal mengirim log:", err));
    };

    // Jalankan pertama kali (dengan delay spinner)
    const initialTimeout = setTimeout(checkAuth, 800);

    // Jalankan ulang setiap 30 detik
    const interval = setInterval(checkAuth, 30000);

    // Dengarkan perubahan di localStorage (real-time logout)
    const handleStorageChange = (e) => {
      if (e.key === "token" && !e.newValue) {
        setIsAuthenticated(false);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Spinner awal
  if (isAuthenticated === null) {
    return <LoadingAuth />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {/* Jika belum login → tampilkan NotAuthenticated */}
          {!isAuthenticated ? (
            <NotAuthenticated />
          ) : (
            <>
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

              <FeedbackModal
                open={openFeedbackModal}
                onClose={() => setOpenFeedbackModal(false)}
                feedbackData={feedbackData}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
