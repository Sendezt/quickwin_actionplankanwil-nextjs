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
import LoadingAuth from "@/components/loading";

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
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {!isAuthenticated ? (
            <NotAuthenticatedPage />
          ) : (
            <>
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
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
