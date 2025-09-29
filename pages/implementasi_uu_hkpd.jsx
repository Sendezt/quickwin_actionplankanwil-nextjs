// pages/MenuSatu.jsx
"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChartBarMultiple } from "@/components/implementasiuuhkpd/chart-bar-multiple";
import Navbar from "@/components/navbar";
import { useDashboardData } from "@/hooks/implementasiuuhkpd/useDashboardData";
import { DashboardStats } from "@/components/implementasiuuhkpd/DashboardStats";
import { DashboardTable } from "@/components/implementasiuuhkpd/DashboardTable";
import { FeedbackModal } from "@/components/implementasiuuhkpd/feedback/FeedbackModal";

export default function MenuSatu() {
  // Ambil semua data dari hook, termasuk feedbackData
  const { dashboardData, rangeData, feedbackData, isLoading } =
    useDashboardData();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Navbar />

          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DashboardStats
                dashboardData={dashboardData}
                rangeData={rangeData}
                isLoading={isLoading}
              />
            </div>

            {/* Chart */}
            {dashboardData?.data && (
              <ChartBarMultiple data={dashboardData.data} />
            )}

            {/* Table */}
            <DashboardTable
              dashboardData={dashboardData}
              isLoading={isLoading}
              onOpenFeedback={() => setOpenFeedbackModal(true)}
            />
          </div>

          {/* Feedback Modal */}
          <FeedbackModal
            open={openFeedbackModal} // <- wajib ada
            onClose={() => setOpenFeedbackModal(false)} // <- untuk close
            feedbackData={feedbackData} // <- data untuk modal
          />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
