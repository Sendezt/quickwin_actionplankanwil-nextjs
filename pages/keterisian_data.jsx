// ============ FILE: pages/MenuLima.jsx (MAIN FILE) ============
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/navbar";
import { ChartBarSingle } from "@/components/chart-bar-single";
import TableSkorSamsat from "@/components/keterisiandata/Table2";
import TableRekapitulasi from "@/components/keterisiandata/Table1";

// Import custom hook
import { useMenuLimaData } from "@/hooks/keterisiandatavalid/useDataMenuLima";

// Import card components
import { PeriodCard } from "@/components/keterisiandata/cards/PeriodCard";
import { KanwilScoreCard } from "@/components/keterisiandata/cards/KanwilScoreCard";
import { BranchScoreCard } from "@/components/keterisiandata/cards/BranchScoreCard";
import { ObjectCard } from "@/components/keterisiandata/cards/ObjectCard";
import { FormulaCard } from "@/components/keterisiandata/cards/FormulaCard";

// Import loading components
import { SkeletonPeriodGrid } from "@/components/keterisiandata/skeleton/SkeletonPeriodGrid";
import { SkeletonInfoGrid } from "@/components/keterisiandata/skeleton/SkeletonInfoGrid";
import NotAuthenticatedPage from "@/components/not-Authenticate";
import LoadingAuth from "@/components/loading";

export default function MenuLima() {
  const {
    table1Data,
    table2Data,
    cabangData,
    rangeData,
    feedbackData,
    loading,
  } = useMenuLimaData();

  const skorKanwil = table1Data?.summary?.[5] ?? "-";
  const skorCabangList = cabangData?.data ?? [];
  const targetSkor = cabangData?.summary?.[1] ?? "";
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
        description: `User ${user.username} mengunjungi halaman Keterisian Data`,
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
              {/* Grid Periode & Skor Kanwil */}
              {loading ? (
                <SkeletonPeriodGrid />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <PeriodCard
                      title="Periode Awal"
                      date={rangeData?.periode_awal}
                      icon={CalendarDays}
                    />
                    <PeriodCard
                      title="Periode Akhir"
                      date={rangeData?.periode_akhir}
                      icon={CalendarDays}
                    />
                  </div>
                  <KanwilScoreCard score={skorKanwil} />
                </div>
              )}

              {/* Grid Obyek & Skor Cabang */}
              {loading ? (
                <SkeletonInfoGrid />
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <ObjectCard objectName="Kantor Wilayah" objectCount={1} />
                    <FormulaCard
                      title="Tingkat Keterisian Data Kepemilikan Kendaraan sesuai Target"
                      formula="= Realisasi Ceri / Target"
                    />
                  </div>
                  <BranchScoreCard
                    scores={skorCabangList}
                    targetScore={targetSkor}
                  />
                </div>
              )}

              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-700">
                    Prosentase Keterisian Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-[300px] w-full" />
                  ) : (
                    table1Data?.data && (
                      <ChartBarSingle data={table1Data.data} />
                    )
                  )}
                </CardContent>
              </Card>

              {/* Table 1 - Rekapitulasi Data Keterisian */}
              <Card>
                <CardHeader className="text-xl">
                  <CardTitle>
                    Rekapitulasi{" "}
                    <span className="text-red-700">Keterisian Data</span> Per
                    Cabang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TableRekapitulasi
                    table1Data={table1Data}
                    feedbackData={feedbackData}
                  />
                </CardContent>
              </Card>

              {/* Table 2 - Data Detail */}
              <Card>
                <CardHeader className="text-xl">
                  <CardTitle>
                    Skor <span className="text-red-700">Keterisian Data</span> -
                    Per Samsat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TableSkorSamsat table2Data={table2Data} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
