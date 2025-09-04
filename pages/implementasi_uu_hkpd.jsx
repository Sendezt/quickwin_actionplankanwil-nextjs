// Main Component - MenuSatu.jsx (Refactored)
"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ChartBarMultiple } from "@/components/implementasiuuhkpd/chart-bar-multiple";
import Navbar from "@/components/navbar";
import { useDashboardData } from "@/hooks/implementasiuuhkpd/useDashboardData"
import { DashboardStats } from "@/components/implementasiuuhkpd/DashboardStats"
import { DashboardTable } from "@/components/implementasiuuhkpd/DashboardTable"

export default function MenuSatu() {
  const { dashboardData, rangeData, isLoading } = useDashboardData();

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
            {dashboardData && dashboardData.data && (
              <ChartBarMultiple data={dashboardData.data} />
            )}

            {/* Table */}
            <DashboardTable 
              dashboardData={dashboardData}
              isLoading={isLoading}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}