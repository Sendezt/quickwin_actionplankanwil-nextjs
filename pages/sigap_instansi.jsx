// ============ FILE: pages/MenuSebelas.jsx (MAIN FILE) ============
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/sigapinstansi/RenderTable";
import RenderTableArray from "@/components/sigapinstansi/RenderTableArray";
import RenderTableFeedback from "@/components/sigapinstansi/RenderTableFeedback";
import { FeedbackModal } from "@/components/sigapinstansi/feedback/FeedbackModal";

// Import custom hook
import { useDataMenuSebelas } from "@/hooks/sigapinstansi/useDataMenuSebelas";

// Import utils
import { getNilaiAkhir } from "@/lib/getNilaiAkhir";

// Import card components
import { PeriodCard } from "@/components/sigapinstansi/cards/PeriodCard";
import { ObjectPenilaianCard } from "@/components/sigapinstansi/cards/ObjectPenilaianCard";
import { FormulaSigapCard } from "@/components/sigapinstansi/cards/FormulaSigapCard";
import { ScoreCard } from "@/components/sigapinstansi/cards/ScoreCard";
import { TableCard } from "@/components/sigapinstansi/tables/TableCard";

// Import loading components
import { SkeletonInfoGrid } from "@/components/sigapinstansi/skeletons/SkeletonInfoGrid";
import { SkeletonScoreGrid } from "@/components/sigapinstansi/skeletons/SkeletonScoreGrid";
import { SkeletonTableList } from "@/components/sigapinstansi/skeletons/SkeletonTableList";

import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuSebelas() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    rangeData,
    feedbackData,
    loading,
  } = useDataMenuSebelas();

  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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
        description: `${user.username} mengunjungi halaman Sigap Instansi`,
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
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Baris 1: Periode Awal, Periode Akhir, Obyek Penilaian, Formula */}
          {loading ? (
            <SkeletonInfoGrid />
          ) : (
            <div className="grid gap-4 md:grid-cols-4">
              <PeriodCard title="Periode Awal" date={rangeData?.periode_awal} />
              <PeriodCard
                title="Periode Akhir"
                date={rangeData?.periode_akhir}
              />
              <ObjectPenilaianCard />
              <FormulaSigapCard />
            </div>
          )}

          {/* Baris 2: Skor Kanwil, Cabang, Samsat */}
          {loading ? (
            <SkeletonScoreGrid />
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              <ScoreCard
                title="Skor Kanwil"
                score={skorKanwil}
                bgColor="bg-blue-100"
                textColor="text-blue-800"
                scoreColor="text-blue-700"
              />
              <ScoreCard
                title="Skor Cabang"
                score={skorCabang}
                bgColor="bg-green-100"
                textColor="text-green-800"
                scoreColor="text-green-700"
              />
              <ScoreCard
                title="Skor Samsat"
                score={skorSamsat}
                bgColor="bg-yellow-100"
                textColor="text-yellow-800"
                scoreColor="text-yellow-700"
              />
            </div>
          )}

          {/* Tables Section */}
          {loading ? (
            <SkeletonTableList count={4} />
          ) : (
            <div className="flex flex-col gap-6">
              <TableCard
                title={
                  <>
                    Skor Kontribusi Penerimaan{" "}
                    <span className="text-red-700">SIGAP Prioritas</span> -
                    Kanwil
                  </>
                }
                showFeedback
                onFeedbackClick={() => setModalOpen(true)}
              >
                <RenderTable data={table1Data} />
              </TableCard>

              <TableCard
                title={
                  <>
                    Skor Kontribusi Penerimaan{" "}
                    <span className="text-red-700">SIGAP Instansi</span> - Per
                    Cabang
                  </>
                }
              >
                <RenderTableFeedback
                  data={table2Data}
                  feedbackData={feedbackData}
                />
              </TableCard>

              <TableCard
                title={
                  <>
                    Skor Kontribusi Penerimaan{" "}
                    <span className="text-red-700">SIGAP Instansi</span> - Per
                    Samsat
                  </>
                }
              >
                <RenderTableArray data={table3Data} />
              </TableCard>

              <TableCard
                title={
                  <>
                    Hasil Penerimaan Atas Kegiatan{" "}
                    <span className="text-orange-400">SIGAP Instansi</span>
                  </>
                }
              >
                <RenderTableArray data={table4Data} />
              </TableCard>

              <FeedbackModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                feedbackData={feedbackData}
              />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
