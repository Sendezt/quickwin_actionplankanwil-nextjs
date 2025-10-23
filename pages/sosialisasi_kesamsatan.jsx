// ============ FILE: pages/MenuEnam.jsx (MAIN FILE) ============
"use client";

import React, { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import RenderTable4 from "@/components/sosialisasikesamsatan/RenderTable4";
import RenderTable from "@/components/sosialisasikesamsatan/RenderTable";
import { RenderTable1 } from "@/components/sosialisasikesamsatan/RenderTable1";
import { RenderTable2 } from "@/components/sosialisasikesamsatan/RenderTable2";
import { FeedbackModal } from "@/components/sosialisasikesamsatan/feedback/FeedbackModal";

// Import custom hook
import { useMenuEnamData } from "@/hooks/sosialisasikesamsatan/useDataMenuEnam";

// Import card components
import { PeriodCard } from "@/components/sosialisasikesamsatan/cards/PeriodCard";
import { ScoreCard } from "@/components/sosialisasikesamsatan/cards/ScoreCard";
import { ObjectPenilaianCard } from "@/components/sosialisasikesamsatan/cards/ObjectPenilaianCard";
import { BannerKesamsatanCard } from "@/components/sosialisasikesamsatan/cards/BannerKesamsatanCard";
import { FormulaKesamsatanCard } from "@/components/sosialisasikesamsatan/cards/FormulaKesamsatanCard";
import { TableCard } from "@/components/sosialisasikesamsatan/tables/TableCard";

// Import loading components
import { SkeletonPeriod } from "@/components/sosialisasikesamsatan/skeleton/SkeletonPeriod";
import { SkeletonScore } from "@/components/sosialisasikesamsatan/skeleton/SkeletonScore";
import { SkeletonInfoCard } from "@/components/sosialisasikesamsatan/skeleton/SkeletonInfoCard";
import { SkeletonTable } from "@/components/sosialisasikesamsatan/skeleton/SkeletonTable";

import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuEnam() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    table5Data,
    rangeData,
    feedbackData,
    loading,
  } = useMenuEnamData();

  const [modalOpen, setModalOpen] = useState(false);

  const skorKanwil = table3Data?.summary?.[5] ?? "?";
  const skorCabang = table2Data?.summary?.[5] ?? "?";
  const skorSamsat = table3Data?.summary?.[5] ?? "?";
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
        description: `${user.username} mengunjungi halaman sosialisasi kesamsatan`,
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
          {/* Periode Section */}
          <div className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              {loading ? (
                <>
                  <SkeletonPeriod />
                  <SkeletonPeriod />
                </>
              ) : (
                <>
                  <PeriodCard
                    title="Periode Awal"
                    date={rangeData?.periode_awal}
                  />
                  <PeriodCard
                    title="Periode Akhir"
                    date={rangeData?.periode_akhir}
                  />
                </>
              )}
            </div>
          </div>

          {/* Score Section */}
          <div className="space-y-3">
            <div className="grid gap-4 md:grid-cols-3">
              {loading ? (
                <>
                  <SkeletonScore bgColor="bg-blue-100" />
                  <SkeletonScore bgColor="bg-green-100" />
                  <SkeletonScore bgColor="bg-yellow-100" />
                </>
              ) : (
                <>
                  <ScoreCard
                    title="Skor Kanwil"
                    score={skorKanwil}
                    bgColor="bg-blue-100"
                    textColor="text-blue-800"
                  />
                  <ScoreCard
                    title="Skor Cabang"
                    score={skorCabang}
                    bgColor="bg-green-100"
                    textColor="text-green-800"
                  />
                  <ScoreCard
                    title="Skor Samsat Se-Jateng"
                    score={skorSamsat}
                    bgColor="bg-yellow-100"
                    textColor="text-yellow-800"
                  />
                </>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-3">
            <div className="grid gap-4 lg:grid-cols-3">
              {loading ? (
                <>
                  <SkeletonInfoCard />
                  <SkeletonInfoCard />
                  <SkeletonInfoCard />
                </>
              ) : (
                <>
                  <ObjectPenilaianCard />
                  <BannerKesamsatanCard />
                  <FormulaKesamsatanCard />
                </>
              )}
            </div>
          </div>

          {/* Data Tables Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Data Tabel Penilaian
            </h2>

            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonTable key={i} />
                ))}
              </div>
            ) : (
              <>
                <TableCard
                  title={
                    <>
                      Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialiasasi Kesamsatan
                      </span>{" "}
                      - Kanwil
                    </>
                  }
                  showFeedback
                  onFeedbackClick={() => setModalOpen(true)}
                >
                  <RenderTable1
                    table1Data={table1Data}
                    loading={loading}
                    feedbackData={feedbackData}
                  />
                </TableCard>

                <TableCard
                  title={
                    <>
                      Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Cabang
                    </>
                  }
                >
                  <RenderTable2
                    table2Data={table2Data}
                    loading={loading}
                    feedbackData={feedbackData}
                  />
                </TableCard>

                <TableCard
                  title={
                    <>
                      Skor Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Samsat
                    </>
                  }
                >
                  <RenderTable data={table3Data} />
                </TableCard>

                <TableCard
                  title={
                    <>
                      Pengisian Data Banner{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Samsat
                    </>
                  }
                >
                  <RenderTable4 data={table4Data} />
                </TableCard>

                <TableCard
                  title={
                    <>
                      Pengisian Data IG{" "}
                      <span className="text-orange-500">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Kanwil & Cabang
                    </>
                  }
                >
                  <RenderTable data={table5Data} isTable5={true} />
                </TableCard>

                <FeedbackModal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  feedbackData={feedbackData}
                />
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
