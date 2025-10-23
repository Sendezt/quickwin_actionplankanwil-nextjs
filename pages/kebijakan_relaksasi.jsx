"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";

// Import custom components
import {
  PeriodeCards,
  ScoreCards,
  FormulaCard,
  GrowthChart,
  DataTable1,
  DataTable2,
} from "../components/kebijakanrelaksasi/menuDua";

// Custom hooks
import { useMenuDuaData } from "../hooks/kebijakanrelaksasi/useDataMenuDua";
import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuDua() {
  const {
    tableData,
    table1Data,
    breakdownData,
    rangeData,
    loading,
    feedbackData,
  } = useMenuDuaData();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (!storedUser || !token) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);

      const user = JSON.parse(storedUser);
      const logData = {
        adminId: user.id,
        action: "visit",
        description: `${user.username} mengunjungi halaman Kebijakan Relaksasi`,
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
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4">Memeriksa autentikasi...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotAuthenticatedPage />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Periode Information */}
          <PeriodeCards rangeData={rangeData} loading={loading} />

          {/* Score Information */}
          <ScoreCards breakdownData={breakdownData} loading={loading} />

          {/* Formula Description */}
          <FormulaCard loading={loading} />

          {/* Growth Chart */}
          <GrowthChart table1Data={table1Data} loading={loading} />

          {/* Data Tables */}
          <DataTable1
            table1Data={table1Data}
            loading={loading}
            feedbackData={feedbackData}
          />
          <DataTable2
            tableData={tableData}
            loading={loading}
            feedbackData={feedbackData}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
