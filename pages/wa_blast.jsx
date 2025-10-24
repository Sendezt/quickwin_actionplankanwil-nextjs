// ============ FILE: pages/MenuDuaBelas.jsx (MAIN FILE) ============
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/wablast/RenderTable";
import RenderTableArray from "@/components/wablast/RenderTableArray";
import RenderTableFeedback from "@/components/wablast/RenderTableFeedback";
import { FeedbackModal } from "@/components/wablast/feedback/FeedbackModal";

// Import custom hook
import { useDataMenuDuabelas } from "@/hooks/wablast/useDataMenuDuaBelas";

// Import card components
import { PeriodCard } from "@/components/wablast/cards/PeriodCard";
import { TotalScoreCard } from "@/components/wablast/cards/TotalScoreCard";
import { ObjectCard } from "@/components/wablast/cards/ObjectCard";
import { FormulaWaBlastCard } from "@/components/wablast/cards/FormulaWaBlastCard";
import { TableCard } from "@/components/wablast/tables/TableCard";

// Import loading components
import { SkeletonTopSection } from "@/components/wablast/skeletons/SkeletonTopSection";
import { SkeletonTableList } from "@/components/wablast/skeletons/SkeletonTableList";

import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuDuaBelas() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    rangeData,
    feedbackData,
    loading,
  } = useDataMenuDuabelas();

  const [modalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const skorTotal = table1Data?.data?.[0]?.[6] ?? "-";

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
        description: `User ${user.username} mengunjungi halaman WA Blast`,
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
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Kolom Kiri: Periode Awal & Akhir */}
                    <div className="flex flex-col gap-4">
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

                  {/* Obyek Penilaian & Formula sejajar */}
                  <div className="grid grid-cols-2 gap-4">
                    <ObjectCard />
                    <FormulaWaBlastCard />
                  </div>
                </>
              )}

              {/* Tables Section */}
              {loading ? (
                <SkeletonTableList count={4} />
              ) : (
                <>
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
                        <span className="text-red-700">WA Blast</span> - Per
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
                        <span className="text-red-700">WA Blast</span> - Per
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
                        <span className="text-orange-500">WA Blast</span>
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
                </>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
