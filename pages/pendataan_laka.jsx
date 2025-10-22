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
import {
  CalendarDays,
  BarChart3,
  FileText,
  Radical,
  LandPlot,
} from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/pendataanlaka/RenderTable";
import RenderTable2 from "@/components/pendataanlaka/RenderTable2";

export default function MenuThirdteen() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tabel 1
        const res1 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet13/getsheet13table1"
        );
        setTable1Data(await res1.json());

        // Tabel 2
        const res2 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet13/getsheet13table2"
        );
        setTable2Data(await res2.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet13/getRange-sheet13"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet13: ", err);
      }
    }

    const fetchFeedback = async () => {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/feedback/read"
        );
        const data = await res.json();
        setFeedbackData(data);
      } catch (err) {
        console.error("Error fetch feedback:", err);
      }
    };

    fetchData();
    fetchRangeData();
    fetchFeedback();
  }, []);

  const skorTotal = table1Data?.summary?.[5] ?? "-";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Cards Atas */}
          {loading ? (
            <div className="grid gap-4">
              {/* Baris 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Kolom kiri: Periode Awal & Akhir */}
                <div className="grid gap-4">
                  {/* Periode Awal */}
                  <Card>
                    <CardHeader className="pb-1">
                      <Skeleton className="h-3 w-20 mb-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </CardContent>
                  </Card>

                  {/* Periode Akhir */}
                  <Card>
                    <CardHeader className="pb-1">
                      <Skeleton className="h-3 w-20 mb-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </CardContent>
                  </Card>
                </div>

                {/* Kolom kanan: Skor Total */}
                <Card>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-24 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-20 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              </div>

              {/* Baris 2: Obyek Penilaian & Formula */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-1">
                    <Skeleton className="h-3 w-24 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-3 w-28" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-1">
                    <Skeleton className="h-3 w-24 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* Baris 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Kolom Kiri: Periode Awal + Akhir */}
                <div className="grid gap-4">
                  {/* Periode Awal */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-xs font-medium">
                        Periode Awal
                      </CardTitle>
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="py-1 px-6">
                      <div className="text-base font-semibold text-gray-900">
                        {rangeData?.periode_awal ?? "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tanggal Mulai
                      </p>
                    </CardContent>
                  </Card>

                  {/* Periode Akhir */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-xs font-medium">
                        Periode Akhir
                      </CardTitle>
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="py-1 px-6">
                      <div className="text-base font-semibold text-gray-900">
                        {rangeData?.periode_akhir ?? "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tanggal Akhir
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Kolom Kanan: Skor Total */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Skor Total
                    </CardTitle>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-extrabold text-blue-700">
                      {skorTotal}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nilai Akhir (Max 4)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Baris 2: Obyek Penilaian & Formula sejajar */}
              <div className="grid grid-cols-2 gap-4">
                {/* Obyek Penilaian */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Obyek Penilaian
                    </CardTitle>
                    <LandPlot className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-1 px-6">
                    <div className="text-base font-semibold text-gray-900">
                      Kantor Wilayah
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 Obyek Penilaian
                    </p>
                  </CardContent>
                </Card>

                {/* Forumula */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Forumula
                    </CardTitle>
                    <Radical className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-3 text-sm">
                      <div className="border-l-4 border-gray-400 pl-3">
                        <p className="font-semibold text-gray-900 mb-1">
                          % pelunasan PKB dan SWDKLLJ kendaraan terlibat laka
                          lantas
                        </p>
                        <p className="text-gray-600 text-xs">
                          = Jumlah kendaraan terlibat laka lantas yang lunas SW
                          / Jumlah Kendaraan terlibat laka
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Skor Kontribusi % Pelunasan{" "}
                <span className="text-red-600">Kendaraan Terlibat Laka</span> -
                Per Cabang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable data={table1Data} feedbackData={feedbackData} />
            </CardContent>
          </Card>

          {/* Table 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Hasil Penerimaan SW Atas{" "}
                <span className="text-yellow-600">Kendaraan Terlibat Laka</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable2 data={table2Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
