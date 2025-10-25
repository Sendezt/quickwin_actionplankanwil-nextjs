// ============ FILE: pages/MenuTigaBelas.jsx (MAIN FILE) ============
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/pendataanlaka/RenderTable";
import RenderTable2 from "@/components/pendataanlaka/RenderTable2";

// Import custom hook
import { useDataMenuTigabelas } from "@/hooks/pendataanterlibatlaka/useDataMenuTigaBelas";

// Import card components
import { PeriodCard } from "@/components/pendataanlaka/cards/PeriodCard";
import { TotalScoreCard } from "@/components/pendataanlaka/cards/TotalScoreCard";
import { ObjectCard } from "@/components/pendataanlaka/cards/ObjectCard";
import { FormulaLakaCard } from "@/components/pendataanlaka/cards/FormulaLakaCard";
import { TableCard } from "@/components/pendataanlaka/tables/TableCard";

// Import loading components
import { SkeletonTopSection } from "@/components/pendataanlaka/skeletons/SkeletonTopSection";
import { SkeletonTableList } from "@/components/pendataanlaka/skeletons/SkeletonTableList";

import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuTigaBelas() {
  const { table1Data, table2Data, rangeData, feedbackData, loading } =
    useDataMenuTigabelas();

  const skorTotal = table1Data?.summary?.[5] ?? "-";
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
      fetch("https://magangproject.vercel.app/api/logs/createlog", {
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4">Memeriksa autentikasi...</p>
      </div>
    );
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
              {/* Cards Atas */}
              {loading ? (
                <SkeletonTopSection />
              ) : (
                <div className="grid gap-4">
                  {/* Baris 1 */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Kolom Kiri: Periode Awal + Akhir */}
                    <div className="grid gap-4">
                      <PeriodCard
                        title="Periode Awal"
                        date={rangeData?.periode_awal}
                      />
                      <PeriodCard
                        title="Periode Akhir"
                        date={rangeData?.periode_akhir}
                      />
                    </div>

                    {/* Kolom Kanan: Skor Total */}
                    <TotalScoreCard score={skorTotal} />
                  </div>

                  {/* Baris 2: Obyek Penilaian & Formula sejajar */}
                  <div className="grid grid-cols-2 gap-4">
                    <ObjectCard />
                    <FormulaLakaCard />
                  </div>
                </div>
              )}

              {/* Tables Section */}
              {loading ? (
                <SkeletonTableList count={2} />
              ) : (
                <>
                  <TableCard
                    title={
                      <>
                        Skor Kontribusi % Pelunasan{" "}
                        <span className="text-red-600">
                          Kendaraan Terlibat Laka
                        </span>{" "}
                        - Per Cabang
                      </>
                    }
                  >
                    <RenderTable
                      data={table1Data}
                      feedbackData={feedbackData}
                    />
                  </TableCard>

                  <TableCard
                    title={
                      <>
                        Hasil Penerimaan SW Atas{" "}
                        <span className="text-yellow-600">
                          Kendaraan Terlibat Laka
                        </span>
                      </>
                    }
                  >
                    <RenderTable2 data={table2Data} />
                  </TableCard>
                </>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
