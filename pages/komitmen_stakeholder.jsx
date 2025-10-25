// ============ FILE: pages/MenuSembilan.jsx (MAIN FILE) ============
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/komitmenstakeholder/RenderTable";
import RenderTableFeedback from "@/components/komitmenstakeholder/RenderTableFeedback";
import RenderTableArray from "@/components/komitmenstakeholder/RenderTableArray";
import RenderTableScroll from "@/components/komitmenstakeholder/RenderTableScroll";
import { FeedbackModal } from "@/components/komitmenstakeholder/feedback/FeedbackModal";

// Import custom hook
import { useDataMenuSembilan } from "@/hooks/komitmenstakeholder/useDataMenuSembilan";

// Import constants
import { SCORE_CONFIGS } from "@/constants/scoreConfigs";

// Import card components
import { PeriodCard } from "@/components/komitmenstakeholder/cards/PeriodCard";
import { ScoreCard } from "@/components/komitmenstakeholder/cards/ScoreCard";
import { BreakdownStakeholderCard } from "@/components/komitmenstakeholder/cards/BreakdownStakeholderCard";
import { ObjectPenilaianCard } from "@/components/komitmenstakeholder/cards/ObjectPenilaianCard";
import { FormulaStakeholderCard } from "@/components/komitmenstakeholder/cards/FormulaStakeholderCard";

// Import table components
import { DataTable } from "@/components/komitmenstakeholder/tables/DataTable";

// Import loading components
import { LoadingSkeleton } from "@/components/komitmenstakeholder/skeletons/LoadingSkeleton";

import NotAuthenticatedPage from "@/components/not-Authenticate";

export default function MenuSembilan() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    breakdownData,
    rangeData,
    feedback,
    loading,
  } = useDataMenuSembilan();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Computed values
  const scores = [
    table1Data?.data?.[0]?.[9] ?? "?",
    table2Data?.summary?.[8] ?? "?",
    table3Data?.summary?.[8] ?? "?",
  ];

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
              {/* Period Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <PeriodCard
                  title="Periode Awal"
                  value={rangeData?.periode_awal}
                  description="Tanggal Mulai"
                  icon={CalendarDays}
                />
                <PeriodCard
                  title="Periode Akhir"
                  value={rangeData?.periode_akhir}
                  description="Tanggal Akhir"
                  icon={CalendarDays}
                />
              </div>

              {/* Scores Section */}
              <div className="grid gap-4 md:grid-cols-3">
                {SCORE_CONFIGS.map((config, index) => (
                  <ScoreCard
                    key={index}
                    title={config.title}
                    score={scores[index]}
                    config={config}
                  />
                ))}
              </div>

              {/* Breakdown and Info Section */}
              <div className="grid gap-4 md:grid-cols-2">
                <BreakdownStakeholderCard breakdownData={breakdownData} />
                <div className="flex flex-col gap-4">
                  <ObjectPenilaianCard />
                  <FormulaStakeholderCard />
                </div>
              </div>

              {/* Tables Section */}
              <DataTable
                title={
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl">Skor</span>{" "}
                      <span className="text-red-700 font-semibold text-xl">
                        Jumlah Komitmen Stakeholder
                      </span>{" "}
                      <span className="text-xl">- Kanwil</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedCabang("all");
                      }}
                      className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
                    >
                      Feedback
                    </Button>
                  </div>
                }
              >
                <RenderTableFeedback
                  data={table1Data}
                  feedbackData={feedback}
                />
              </DataTable>

              <DataTable
                title={
                  <>
                    <span className="text-xl">Skor</span>{" "}
                    <span className="text-red-700 font-semibold text-xl">
                      Jumlah Komitmen Stakeholder
                    </span>{" "}
                    <span className="text-xl">- Cabang</span>
                  </>
                }
              >
                <RenderTable data={table2Data} />
              </DataTable>

              <DataTable
                title={
                  <>
                    <span className="text-xl">Skor</span>{" "}
                    <span className="text-red-700 font-semibold text-xl">
                      Jumlah Komitmen Stakeholder
                    </span>{" "}
                    <span className="text-xl">- Samsat</span>
                  </>
                }
              >
                <RenderTableArray data={table3Data} />
              </DataTable>

              <DataTable
                title={
                  <span className="text-xl">
                    Pengisian Data Komitmen Stakeholder
                  </span>
                }
              >
                <RenderTableScroll data={table4Data} />
              </DataTable>

              <FeedbackModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                feedbackData={feedback}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
