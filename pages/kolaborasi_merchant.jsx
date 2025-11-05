// ============ FILE: pages/MenuDelapan.jsx (MAIN FILE) ============
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Building2, MapPin, Car, BarChart3 } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTableFeedback from "@/components/kolaborasimerchant/RenderTableFeedback";
import RenderTableArray from "@/components/kolaborasimerchant/RenderTableArray";
import RenderTableSimple from "@/components/kolaborasimerchant/RenderTableSimple";
import RenderTable6 from "@/components/kolaborasimerchant/RenderTable6";
import RenderTableScroll from "@/components/kolaborasimerchant/RenderTableScroll";
import RenderTable4 from "@/components/kolaborasimerchant/RenderTable4";
import RenderTable from "@/components/kolaborasimerchant/RenderTable";

// Import custom hook
import { useDataMenuDelapan } from "@/hooks/kolaborasimerchant/useDataMenuDelapan";

// Import card components
import { PeriodCard } from "@/components/kolaborasimerchant/cards/PeriodCard";
import { ObjectPenilaianCard } from "@/components/kolaborasimerchant/cards/ObjectPenilaianCard";
import { ScoreCard } from "@/components/kolaborasimerchant/cards/ScoreCard";
import { BreakdownScoreCard } from "@/components/kolaborasimerchant/cards/BreakdownScoreCard";
import { FormulaMerchantCard } from "@/components/kolaborasimerchant/cards/FormulaMerchantCard";
import { SectionHeader } from "@/components/kolaborasimerchant/sections/SectionHeader";

// Import loading components
import { SkeletonPeriodGrid } from "@/components/kolaborasimerchant/skeletons/SkeletonPeriodGrid";
import { SkeletonScoreGrid } from "@/components/kolaborasimerchant/skeletons/SkeletonScoreGrid";
import { SkeletonBreakdownGrid } from "@/components/kolaborasimerchant/skeletons/SkeletonBreakdownGrid";
import { SkeletonTableCard } from "@/components/kolaborasimerchant/skeletons/SkeletonTableCard";

import NotAuthenticatedPage from "@/components/not-Authenticate";
import LoadingAuth from "@/components/loading";

export default function MenuDelapan() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    table5Data,
    table6Data,
    table7Data,
    table8Data,
    breakdownData,
    rangeData,
    feedbackData,
    loading,
  } = useDataMenuDelapan();

  const skorKanwil = table2Data?.total?.[1] ?? "-";
  const skorCabang = table4Data?.total?.[8] ?? "-";
  const skorSamsat = table6Data?.totalSummary ?? "-";

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
    };

    const sendVisitLog = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      // Kirim log kunjungan
      const user = JSON.parse(storedUser);
      const logData = {
        adminId: user.id,
        action: "visit",
        description: `User ${user.username} mengunjungi halaman Kolaborasi Merchant`,
      };
      fetch(`${BASE_URL}/api/logs/createlog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      }).catch((err) => console.error("Gagal mengirim log:", err));
    };

    // Jalankan pertama kali (dengan delay spinner)
    const initialTimeout = setTimeout(() => {
      checkAuth();
      sendVisitLog();
    }, 800);

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
              {loading ? (
                <>
                  <SkeletonPeriodGrid />
                  <SkeletonScoreGrid />
                  <SkeletonBreakdownGrid />
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <SkeletonTableCard key={i} hasDescription={i === 8} />
                  ))}
                </>
              ) : (
                <>
                  {/* Row 1: Periode & Obyek Penilaian */}
                  <div className="grid gap-4 md:grid-cols-2">
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
                    <ObjectPenilaianCard />
                  </div>

                  {/* Row 2: Skor Cards */}
                  <div className="grid gap-4 md:grid-cols-3">
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
                  </div>

                  {/* Row 3: Breakdown & Formula */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <BreakdownScoreCard breakdownData={breakdownData} />
                    <FormulaMerchantCard />
                  </div>

                  {/* SECTION: KANTOR WILAYAH */}
                  <SectionHeader
                    title="KANTOR WILAYAH"
                    icon={Building2}
                    bgColor="bg-blue-50"
                    textColor="text-blue-800"
                    borderColor="border-blue-200"
                  />
                  <Card className="rounded-t-none">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor Jumlah{" "}
                        <span className="text-red-700">
                          Kolaborasi Merchant
                        </span>{" "}
                        - Kanwil
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTable data={table1Data} />
                    </CardContent>
                  </Card>
                  <Card className="mt-0">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor % Pemanfaatan{" "}
                        <span className="text-orange-500">
                          Fasilitas Merchant
                        </span>{" "}
                        - Kanwil
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTableSimple data={table2Data} />
                    </CardContent>
                  </Card>

                  {/* SECTION: KANTOR CABANG */}
                  <SectionHeader
                    title="KANTOR CABANG"
                    icon={MapPin}
                    bgColor="bg-green-50"
                    textColor="text-green-800"
                    borderColor="border-green-200"
                  />
                  <Card className="rounded-t-none">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor Jumlah{" "}
                        <span className="text-red-700">
                          Kolaborasi Merchant
                        </span>{" "}
                        - Per Cabang
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTableFeedback
                        data={table3Data}
                        feedbackData={feedbackData}
                      />
                    </CardContent>
                  </Card>
                  <Card className="mt-0">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor % Pemanfaatan{" "}
                        <span className="text-orange-500">
                          Fasilitas Merchant
                        </span>{" "}
                        - Cabang
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTable4
                        data={table4Data}
                        feedbackData={feedbackData}
                      />
                    </CardContent>
                  </Card>

                  {/* SECTION: KANTOR SAMSAT */}
                  <SectionHeader
                    title="KANTOR SAMSAT"
                    icon={Car}
                    bgColor="bg-yellow-50"
                    textColor="text-yellow-800"
                    borderColor="border-yellow-200"
                  />
                  <Card className="rounded-t-none">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor Jumlah{" "}
                        <span className="text-red-700">
                          Kolaborasi Merchant
                        </span>{" "}
                        - Per Samsat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTableArray data={table5Data} />
                    </CardContent>
                  </Card>
                  <Card className="mt-0">
                    <CardHeader>
                      <CardTitle className="text-xl">
                        Skor % Pemanfaatan{" "}
                        <span className="text-orange-500">
                          Fasilitas Merchant
                        </span>{" "}
                        - Samsat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTable6 data={table6Data} />
                    </CardContent>
                  </Card>

                  {/* SECTION: DATA PENGISIAN */}
                  <SectionHeader
                    title="DATA PENGISIAN"
                    icon={BarChart3}
                    bgColor="bg-purple-50"
                    textColor="text-purple-800"
                    borderColor="border-purple-200"
                  />
                  <Card className="rounded-t-none">
                    <CardHeader>
                      <CardTitle>Pengisian Data Jumlah Merchant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTableScroll data={table7Data} />
                    </CardContent>
                  </Card>
                  <Card className="mt-0">
                    <CardHeader>
                      <CardTitle>Pengisian Data Klaim Merchant</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RenderTableScroll data={table8Data} />
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
