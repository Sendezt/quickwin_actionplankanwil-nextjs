"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { useDataMenuTiga } from "@/hooks/operasigabungan/useDataMenuTiga";
import {
  PeriodCards,
  ObjectCard,
  SupportLetterCard,
  ScoreCards,
  FormulaCard,
} from "@/components/operasigabungan/InfoCard";
import { TableSections } from "@/components/operasigabungan/TableSections";
import NotAuthenticatedPage from "@/components/not-Authenticate";
import { useEffect, useState } from "react";
import LoadingAuth from "@/components/loading";

export default function MenuTiga() {
  const {
    table1: table1Data,
    table2: table2Data,
    table3: table3Data,
    table4: table4Data,
    table5: table5Data,
    breakdown: breakdownData,
    range: rangeData,
    loading,
    totalSkor,
    targetSkor,
    feedback,
  } = useDataMenuTiga();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      fetch(`${BASE_URL}/api/logs/createlog`, {
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
              {/* Info Cards Row */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <PeriodCards rangeData={rangeData} loading={loading} />
                <ObjectCard loading={loading} />
                <SupportLetterCard loading={loading} />
              </div>

              {/* Score Cards Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <ScoreCards
                  totalSkor={totalSkor}
                  targetSkor={targetSkor}
                  breakdownData={breakdownData}
                  loading={loading}
                />
              </div>

              {/* Formula Card */}
              <FormulaCard loading={loading} />

              {/* Tables Section */}
              <TableSections
                table1Data={table1Data}
                table2Data={table2Data}
                table3Data={table3Data}
                table4Data={table4Data}
                table5Data={table5Data}
                feedback={feedback}
                loading={loading}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
