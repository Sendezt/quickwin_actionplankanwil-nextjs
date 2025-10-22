"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, BarChart3, LandPlot, Radical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/komitmenstakeholder/RenderTable";
import RenderTableFeedback from "@/components/komitmenstakeholder/RenderTableFeedback";
import RenderTableArray from "@/components/komitmenstakeholder/RenderTableArray";
import RenderTableScroll from "@/components/komitmenstakeholder/RenderTableScroll";
import { FeedbackModal } from "@/components/komitmenstakeholder/feedback/FeedbackModal";

// Constants
const API_BASE_URL = "https://quickwin-jateng.vercel.app/api";

const API_ENDPOINTS = {
  table1: `${API_BASE_URL}/sheet9/getsheet9table1`,
  table2: `${API_BASE_URL}/sheet9/getsheet9table2`,
  table3: `${API_BASE_URL}/sheet9/getsheet9table3`,
  table4: `${API_BASE_URL}/sheet9/getsheet9table4`,
  breakdown: `${API_BASE_URL}/sheet9/getsheet9card`,
  range: `${API_BASE_URL}/sheet9/getRange-sheet9`,
  feedback: "https://quickwin-jateng.vercel.app/api/feedback/read",
};

const SCORE_CONFIGS = [
  {
    title: "Skor Kanwil",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    iconColor: "text-blue-700",
    scoreColor: "text-blue-600",
  },
  {
    title: "Skor Cabang",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    iconColor: "text-green-700",
    scoreColor: "text-green-600",
  },
  {
    title: "Skor Samsat Se-Jateng",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-700",
    scoreColor: "text-yellow-600",
  },
];

// Skeleton Components
const PeriodSkeleton = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-3 rounded-full" />
    </CardHeader>
    <CardContent className="py-1 px-4">
      <Skeleton className="h-6 w-32 mb-1" />
      <Skeleton className="h-3 w-20" />
    </CardContent>
  </Card>
);

const ScoreSkeleton = () => (
  <Card className="p-0 overflow-hidden">
    <div className="px-5 py-3 border-b flex items-center justify-between">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <CardContent className="text-center py-6">
      <Skeleton className="h-12 w-20 mx-auto mb-2" />
      <Skeleton className="h-3 w-32 mx-auto" />
    </CardContent>
  </Card>
);

const BreakdownSkeleton = () => (
  <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </CardHeader>
    <CardContent className="py-3 px-5 space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
      <div className="border-t pt-3 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-8" />
      </div>
    </CardContent>
  </Card>
);

const InfoCardSkeleton = ({ icon: Icon, title }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-4 w-32" />
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-2 px-4">
      <Skeleton className="h-4 w-28 mb-1" />
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-4 w-20" />
    </CardContent>
  </Card>
);

const TableSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-64 mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-2">
      {[...Array(3)].map((_, j) => (
        <Skeleton key={j} className="h-4 w-full" />
      ))}
    </CardContent>
  </Card>
);

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    {/* Periode Section */}
    <div className="grid gap-4 md:grid-cols-2">
      <PeriodSkeleton />
      <PeriodSkeleton />
    </div>

    {/* Score Section */}
    <div className="grid gap-4 md:grid-cols-3">
      <ScoreSkeleton />
      <ScoreSkeleton />
      <ScoreSkeleton />
    </div>

    {/* Breakdown + Info Section */}
    <div className="grid gap-4 md:grid-cols-2">
      <BreakdownSkeleton />
      <div className="flex flex-col gap-4">
        <InfoCardSkeleton icon={LandPlot} title="Obyek Penilaian" />
        <InfoCardSkeleton icon={Radical} title="Formula" />
      </div>
    </div>

    {/* Tables Section */}
    {[...Array(4)].map((_, i) => (
      <TableSkeleton key={i} />
    ))}
  </div>
);

// Main Components
const PeriodCard = ({ title, value, description, icon: Icon }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <div className="text-base font-semibold text-gray-900">
        {value || "-"}
      </div>
      <p className="text-xs">{description}</p>
    </CardContent>
  </Card>
);

const ScoreCard = ({ title, score, config }) => (
  <Card className="p-0 overflow-hidden">
    <div
      className={`${config.bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}
    >
      <h4 className={`text-sm font-semibold ${config.textColor}`}>{title}</h4>
      <BarChart3 className={`h-4 w-4 ${config.iconColor}`} />
    </div>
    <CardContent className="text-center py-6">
      <div className={`text-6xl font-bold ${config.scoreColor}`}>{score}</div>
      <p className="text-sm text-gray-600 mt-2">Target Skor | 4 (Nilai Max)</p>
    </CardContent>
  </Card>
);

const BreakdownCard = ({ breakdownData }) => (
  <Card className="shadow-lg border-2 border-blue-500 bg-blue-50">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-base md:text-lg font-bold text-blue-800">
        Breakdown Komitmen Stakeholder
      </CardTitle>
      <BarChart3 className="h-5 w-5 text-blue-700" />
    </CardHeader>
    <CardContent className="py-3 px-5">
      <div className="space-y-3">
        {breakdownData?.data?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-700 font-medium flex-1 pr-2">
              {item.judul}
            </span>
            <span className="text-lg md:text-xl font-extrabold text-blue-900">
              {item.skor}
            </span>
          </div>
        ))}
      </div>
      {breakdownData?.target && (
        <div className="mt-4 border-t border-blue-200 pt-3 flex justify-between items-center">
          <span className="font-semibold text-gray-800 text-base">
            {breakdownData.target.judul}
          </span>
          <span className="text-lg md:text-xl font-extrabold text-blue-900">
            {breakdownData.target.skor}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

const InfoCard = ({ title, icon: Icon, children }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-2 px-6 text-sm">{children}</CardContent>
  </Card>
);

const DataTable = ({ title, description, children }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

// Custom Hooks
const useDataFetching = () => {
  const [data, setData] = useState({
    table1Data: null,
    table2Data: null,
    table3Data: null,
    table4Data: null,
    breakdownData: null,
    rangeData: null,
    feedback: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [
          table1Response,
          table2Response,
          table3Response,
          table4Response,
          breakdownResponse,
          rangeResponse,
          feedbackResponse,
        ] = await Promise.all([
          fetch(API_ENDPOINTS.table1),
          fetch(API_ENDPOINTS.table2),
          fetch(API_ENDPOINTS.table3),
          fetch(API_ENDPOINTS.table4),
          fetch(API_ENDPOINTS.breakdown),
          fetch(API_ENDPOINTS.range),
          fetch(API_ENDPOINTS.feedback),
        ]);

        const [
          table1Data,
          table2Data,
          table3Data,
          table4Data,
          breakdownData,
          rangeData,
          feedback,
        ] = await Promise.all([
          table1Response.json(),
          table2Response.json(),
          table3Response.json(),
          table4Response.json(),
          breakdownResponse.json(),
          rangeResponse.json(),
          feedbackResponse.json(),
        ]);

        setData({
          table1Data,
          table2Data,
          table3Data,
          table4Data,
          breakdownData,
          rangeData,
          feedback,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { ...data, loading };
};

// Main Component
export default function MenuNine() {
  const {
    table1Data,
    table2Data,
    table3Data,
    table4Data,
    breakdownData,
    rangeData,
    loading,
    feedback,
  } = useDataFetching();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState("all");

  // Computed values
  const scores = [
    table1Data?.data?.[0]?.[9] ?? "?",
    table2Data?.summary?.[8] ?? "?",
    table3Data?.summary?.[8] ?? "?",
  ];

  if (loading) {
    return (
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0">
          <Navbar />
          <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
            <LoadingSkeleton />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
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
            <BreakdownCard breakdownData={breakdownData} />

            <div className="flex flex-col gap-4">
              <InfoCard title="Obyek Penilaian" icon={LandPlot}>
                <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
                  <li className="py-2">Kantor Wilayah</li>
                  <li className="py-2">Kantor Cabang</li>
                  <li className="py-2">Kantor Samsat</li>
                </ol>
                <p className="text-xs text-muted-foreground mt-1">
                  3 Obyek Penilaian
                </p>
              </InfoCard>

              <InfoCard title="Forumula" icon={Radical}>
                <div className="border-l-4 border-gray-400 pl-3 space-y-1 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">
                    Terlaksananya sinergi yang diwujudkan dalam bentuk Komitmen
                    Bersama, yang terimplementasi ke dalam sebuah inisiatif
                    strategis, yang selanjutnya dilakukan analisa dan evaluasi
                    atas inisiatif yang dilakukan
                  </p>
                  <p className="text-gray-600 text-xs">
                    = Ketersediaan komitmen (50%), Implementasi inisiatif
                    strategis (25%), dan ketersediaan hasil analisa dan evaluasi
                    (25%) / Target
                  </p>
                </div>
              </InfoCard>
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
                    setSelectedCabang("all"); // default lihat semua
                  }}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
                >
                  Feedback
                </Button>
              </div>
            }
          >
            <RenderTableFeedback data={table1Data} feedbackData={feedback} />
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
              <>
                <span className="text-xl">
                  Pengisian Data Komitmen Stakeholder
                </span>
              </>
            }
          >
            <RenderTableScroll data={table4Data} />
          </DataTable>
          <FeedbackModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            feedbackData={feedback}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
