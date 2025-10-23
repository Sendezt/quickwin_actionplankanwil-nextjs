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
import { useMenuTujuhData } from "@/hooks/signalonline/useDataMenuTujuh";

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

export default function MenuTujuh() {
  const { table1Data, rangeData, feedbackData, loading } = useMenuTujuhData();
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const skorKanwil = table1Data?.summary?.[8] ?? "?";

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
        description: `${user.username} mengunjungi halaman Optimalisasi Signal Layanan Online`,
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
