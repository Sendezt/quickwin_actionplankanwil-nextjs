"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { InfoCards } from "@/components/sigapprioritas/cards/InfoCard";
import { ScoreCards } from "@/components/sigapprioritas/cards/ScoreCard";
import { TablesSection } from "@/components/sigapprioritas/tables/TableSection";
import { useDataMenuTen } from "@/hooks/sigapprioritas/useDataMenuSepuluh";

import NotAuthenticatedPage from "@/components/not-Authenticate";
import LoadingAuth from "@/components/loading";

export default function MenuTen() {
  const {
    loading,
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    rangeData,
    feedbackData,
  } = useDataMenuTen();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  function getNilaiAkhir(table) {
    const headerRow = table?.header?.[0] ?? [];
    const idx = headerRow.findIndex((h) => h.includes("Nilai Akhir"));
    if (table?.summary && idx !== -1) return table.summary[idx - 2] ?? "?";
    if (table?.data?.length && idx !== -1) {
      const first = table.data[0];
      if (Array.isArray(first)) return first[idx] ?? "?";
      if (first?.samsat?.length) return first.samsat[0][idx] ?? "?";
    }
    return "?";
  }

  const skorKanwil = getNilaiAkhir(table1Data);
  const skorCabang = getNilaiAkhir(table2Data);
  const skorSamsat = getNilaiAkhir(table3Data);
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
        description: `User ${user.username} mengunjungi halaman Sigap Prioritas`,
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
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-col gap-6 p-4 md:p-6">
          {!isAuthenticated ? (
            <NotAuthenticatedPage />
          ) : (
            <>
              <InfoCards loading={loading} rangeData={rangeData} />
              <ScoreCards
                skorKanwil={skorKanwil}
                skorCabang={skorCabang}
                skorSamsat={skorSamsat}
              />
              <TablesSection
                data={{ table1Data, table2Data, table3Data, table4Data }}
                feedbackData={feedbackData}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
