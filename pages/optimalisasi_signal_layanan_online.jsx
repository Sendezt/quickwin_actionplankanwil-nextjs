// pages\optimalisasi_signal_layanan_online.jsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { FeedbackModal } from "@/components/optimalisasisignal/FeedbackModal";

// Import custom hook
import { useDataMenuTujuh } from "@/hooks/signalonline/useDataMenuTujuh";

// Import card components
import { PeriodCard } from "@/components/optimalisasisignal/cards/PeriodCard";
import { ObjectCard } from "@/components/optimalisasisignal/cards/ObjectCard";
import { FormulaSignalCard } from "@/components/optimalisasisignal/cards/FormulaSignalCard";
import { KanwilScoreCard } from "@/components/optimalisasisignal/cards/KanwilScoreCard";

// Import table components
import { NestedTable } from "@/components/optimalisasisignal/tables/NestedTable";

// Import loading components
import { SkeletonInfoCard } from "@/components/optimalisasisignal/skeletons/SkeletonInfoCard";
import { SkeletonScoreCard } from "@/components/optimalisasisignal/skeletons/SkeletonScoreCard";
import { SkeletonTable } from "@/components/optimalisasisignal/skeletons/SkeletonTable";

import NotAuthenticatedPage from "@/components/not-Authenticate";
import LoadingAuth from "@/components/loading";

export default function MenuTujuh() {
  const { table1Data, rangeData, feedbackData, loading } = useDataMenuTujuh();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const skorKanwil = table1Data?.summary?.[8] ?? "?";

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
              {/* Top Info (4 Card) */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {loading ? (
                  <>
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
                    <SkeletonInfoCard />
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
                    <ObjectCard objectName="Kantor Wilayah" objectCount={1} />
                    <FormulaSignalCard />
                  </>
                )}
              </div>

              {/* Skor Kanwil */}
              <div className="grid gap-4 md:grid-cols-1">
                {loading ? (
                  <SkeletonScoreCard />
                ) : (
                  <KanwilScoreCard score={skorKanwil} />
                )}
              </div>

              {/* Table 1 */}
              {loading ? (
                <SkeletonTable />
              ) : (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      Rekapitulasi{" "}
                      <span className="text-red-700">
                        Penerimaan SIGNAL & Layanan Online
                      </span>
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenFeedbackModal(true)}
                      className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
                    >
                      Feedback
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <NestedTable data={table1Data} />
                  </CardContent>

                  <FeedbackModal
                    open={openFeedbackModal}
                    onClose={() => setOpenFeedbackModal(false)}
                    feedbackData={feedbackData}
                  />
                </Card>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
