// ============ FILE: pages/MenuEmpat.jsx (MAIN FILE) ============
"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/navbar";
import TableCardWrapper from "@/components/rekonsiliasidata/Table1";
import TableCardFeedback from "@/components/rekonsiliasidata/FeedbackCard";

// Import custom hooks
import { useDataFetching } from "@/hooks/rekonsiliasidata/useDataFetching";

// Import card components
import { PeriodCard } from "@/components/rekonsiliasidata/cards/PeriodCard";
import { ScoreCard } from "@/components/rekonsiliasidata/cards/ScoreCard";
import { BranchScoreCard } from "@/components/rekonsiliasidata/cards/BranchScoreCard";
import { ObjectCard } from "@/components/rekonsiliasidata/cards/ObjectCard";
import { FormulaCard } from "@/components/rekonsiliasidata/cards/FormulaCard";

// Import loading components
import { SkeletonGrid } from "@/components/rekonsiliasidata/skeleton/SkeletonGrid";

import NotAuthenticatedPage from "@/components/not-Authenticate";
import { useEffect, useState } from "react";

export default function MenuEmpat() {
  const {
    table1Data,
    table2Data,
    table3Data,
    rangeData,
    cabangData,
    feedbackData,
    loading,
  } = useDataFetching();

  const skorSamsat = table1Data?.summary?.[6] ?? "-";
  const skorCabangList = cabangData?.data ?? [];
  const targetSkor = cabangData?.summary?.[1] ?? "";

  const [isAuthenticated, setIsAuthenticated] = useState(null);

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
        description: `${user.username} mengunjungi halaman rekonsiliasi data`,
      };
      fetch("https://magangproject.vercel.app/api/logs/createlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch((err) => console.error("Gagal mengirim log ", err));
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
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
            {/* Grid Periode & Skor Samsat */}
            <div className="grid gap-4 md:grid-cols-2">
              <PeriodCard
                title="Periode Awal"
                date={rangeData?.periode_awal}
                icon={CalendarDays}
              />
              <ScoreCard
                title="Skor Samsat Se-Jateng"
                score={skorSamsat}
                maxScore={4}
                bgColor="bg-yellow-100"
                textColor="text-yellow-800"
              />
              <PeriodCard
                title="Periode Akhir"
                date={rangeData?.periode_akhir}
                icon={CalendarDays}
              />
            </div>

            {/* Grid Obyek & Skor Cabang */}
            <div className="grid gap-4 md:grid-cols-2">
              <ObjectCard />
              <BranchScoreCard
                scores={skorCabangList}
                targetScore={targetSkor}
              />
              <FormulaCard />
            </div>

            {/* Tables */}
            <TableCardFeedback
              title={
                <span className="text-xl">
                  Rekapitulasi{" "}
                  <span className="text-red-700">Rekonsiliasi Data</span> Per
                  Cabang
                </span>
              }
              headers={table1Data?.header?.[0] ?? []}
              data={table1Data?.data ?? []}
              summary={table1Data?.summary ?? []}
              isNested={false}
              feedbackData={feedbackData}
            />

            <TableCardWrapper
              title={
                <span className="text-xl">
                  Skor Pelaksanaan{" "}
                  <span className="text-red-700">Rekonsiliasi Data</span> - Per
                  Samsat
                </span>
              }
              headers={table2Data?.header?.[0] ?? []}
              data={table2Data?.data ?? []}
              summary={table2Data?.summary ?? []}
              isLoading={!table2Data}
              isNested={true}
            />

            <TableCardWrapper
              title={
                <span className="text-xl">
                  Rekapitulasi Pelaksanaan{" "}
                  <span className="text-red-700">Rekonsiliasi Data</span> - Per
                  Samsat
                </span>
              }
              headers={table3Data?.header?.[0] ?? []}
              data={table3Data?.data ?? []}
              summary={table3Data?.summary ?? []}
              isLoading={!table3Data}
              isNested={true}
            />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
