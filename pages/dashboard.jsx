"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import DashboardStats from "@/components/dashboard-stats";
import { ProgressSection } from "@/components/progress-section";
import { RecentActivities } from "@/components/recent-activity";
import { PerformanceChart } from "@/components/performance-chart";
import { ProgramTable } from "@/components/program-table";

export default function Dashboard() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Dashboard Monitoring
                </h1>
                <p className="text-muted-foreground">
                  Pantau progress dan kinerja program UU HKPD Jawa Tengah secara
                  real-time
                </p>
              </div>

              {/* Stats Cards */}
              <DashboardStats />

              {/* Performance Chart */}
              <PerformanceChart />

              {/* Progress Section */}
              <ProgressSection />

              {/* Recent Activities and Program Table */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <RecentActivities />
                </div>
                <div className="lg:col-span-2">
                  <ProgramTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
