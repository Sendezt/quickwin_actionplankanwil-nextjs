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

  useEffect(() => {
    const storeduser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (!storeduser || !token) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);

      const user = JSON.parse(storeduser);
      const logData = {
        adminId: user.id,
        action: "visit",
        description: `${user.username} mengunjungi halaman Sigap Prioritas`,
      };
      fetch("https://magangproject.vercel.app/api/logs/createlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch((err) => console.error("Gagal mengirim log: ", err));
    }, 800);
  }, []);

  if (isAuthenticated == null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-lg mt-4">Memerikasa Auntentikasi...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotAuthenticatedPage />;
  }

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="flex flex-col gap-6 p-4 md:p-6">
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
