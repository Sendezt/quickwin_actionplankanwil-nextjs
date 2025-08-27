"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, BarChart3, FileText, LandPlot, Radical } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/wablast/RenderTable";
import RenderTableArray from "@/components/wablast/RenderTableArray";

export default function MenuTwelve() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table4"
        );
        setTable4Data(await res4.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet12"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet12: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  const skorTotal = table1Data?.data?.[0]?.[6] ?? "-";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Cards Atas */}
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Skeleton kiri */}
              <div className="flex flex-col gap-4">
                <Card className="p-0 overflow-hidden">
                  <div className="px-5 py-3 border-b">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                  </div>
                  <CardContent className="py-6 px-5 space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
                <Card className="p-0 overflow-hidden">
                  <div className="px-5 py-3 border-b">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                  </div>
                  <CardContent className="py-6 px-5 space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              </div>
              {/* Skeleton kanan */}
              <Card className="p-0 overflow-hidden">
                <div className="px-5 py-3 border-b">
                  <Skeleton className="h-4 w-1/4 mb-2" />
                </div>
                <CardContent className="py-6 px-5 space-y-2">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Kolom Kiri: Periode Awal & Akhir */}
              <div className="flex flex-col gap-4">
                {/* Periode Awal */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Periode Awal
                    </CardTitle>
                    <CalendarDays className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-1 px-4">
                    <div className="text-base font-semibold text-gray-900">
                      {rangeData?.periode_awal ?? "-"}
                    </div>
                    <p className="text-xs">Tanggal Mulai Periode</p>
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
                  <CardContent className="py-1 px-4">
                    <div className="text-base font-semibold text-gray-900">
                      {rangeData?.periode_akhir ?? "-"}
                    </div>
                    <p className="text-xs">Tanggal Akhir Periode</p>
                  </CardContent>
                </Card>
              </div>

              {/* Kolom Kanan: Skor Total (utama) */}
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-blue-900">
                    Skor Total
                  </CardTitle>
                  <BarChart3 className="h-5 w-5 text-blue-800" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-extrabold text-blue-900">
                    {skorTotal}
                  </div>
                  <p className="text-sm text-blue-700">Nilai Akhir (Max 4)</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Obyek Penilaian (col-span-2) */}
          {!loading && (
            <Card className="shadow-sm border border-dashed bg-muted/30 col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">
                  Obyek Penilaian
                </CardTitle>
                <LandPlot className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-1 px-4">
                <div className="text-base font-semibold text-gray-900">
                  Kantor Wilayah
                </div>
                <p className="text-xs">1 Obyek Penilaian</p>
              </CardContent>
            </Card>
          )}

          {/* Formula (col-span-2) */}
          <Card className="shadow-sm border border-dashed bg-muted/30 col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium">Forumula</CardTitle>
              <Radical className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-1 px-4 italic">
              <span className="font-semibold text-gray-900">
                Kontribusi SW Terkutip dari Tunggakan
              </span>
              <span className="text-gray-600">
                {" "}
                = Realisasi SW Terkutip / Tunggakan SW
              </span>
            </CardContent>
          </Card>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Kontribusi Penerimaan WA Blast - Kanwil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable data={table1Data} />
            </CardContent>
          </Card>

          {/* Table 2 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Kontribusi Penerimaan WA Blast - Per Cabang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable data={table2Data} />
            </CardContent>
          </Card>

          {/* Table 3 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Kontribusi Penerimaan WA Blast - Per Samsat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Hasil Penerimaan Atas Kegiatan WA Blast</CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table4Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
