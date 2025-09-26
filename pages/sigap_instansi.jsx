"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  BarChart3,
  FileText,
  LandPlot,
  Radical,
} from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/sigapinstansi/RenderTable";
import RenderTableArray from "@/components/sigapinstansi/RenderTableArray";

export default function MenuSebelas() {
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
          "https://quickwin-jateng.vercel.app/api/sheet11/getsheet11table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet11/getsheet11table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet11/getsheet11table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet11/getsheet11table4"
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
          "https://quickwin-jateng.vercel.app/api/sheet11/getRange-sheet11"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet11: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  function getNilaiAkhir(table) {
    const headerRow = table?.header?.[0] ?? [];
    const idx = headerRow.findIndex((h) => h.includes("Nilai Akhir"));

    if (table?.summary && idx !== -1) {
      return table.summary[idx - 2] ?? "?";
    }

    if (table?.data?.length && idx !== -1) {
      if (Array.isArray(table.data[0])) {
        return table.data[0][idx] ?? "?";
      } else if (table.data[0]?.samsat?.length) {
        return table.data[0].samsat[0][idx] ?? "?";
      }
    }
    return "?";
  }

  const skorKanwil = getNilaiAkhir(table1Data);
  const skorCabang = getNilaiAkhir(table2Data);
  const skorSamsat = getNilaiAkhir(table3Data);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Baris 1: Periode Awal, Periode Akhir, Obyek Penilaian, Formula */}
          <div className="grid gap-4 md:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="shadow-sm border bg-white p-3">
                  <CardHeader className="pb-1">
                    <Skeleton className="h-3 w-1/3 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-5 w-1/2 mb-1" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
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

                {/* Obyek Penilaian */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Obyek Penilaian
                    </CardTitle>
                    <LandPlot className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-1 px-6">
                    <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
                      <li className="py-2">Kantor Wilayah</li>
                      <li className="py-2">Kantor Cabang</li>
                      <li className="py-2">Kantor Samsat</li>
                    </ol>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 Obyek Penilaian
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
                          Kontribusi SW Terkutip dari Tunggakan
                        </p>
                        <p className="text-gray-600 text-xs">
                          = Realisasi SW Terkutip / Tunggakan SW
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Baris 2: Skor Kanwil, Cabang, Samsat */}
          <div className="grid gap-6 md:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="shadow-md border-0 p-0">
                  <CardHeader className="px-6 py-4 bg-slate-100">
                    <Skeleton className="h-4 w-1/4" />
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <Skeleton className="h-12 w-20 mb-3" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Skor Kanwil */}
                <Card className="shadow-md border-0 p-0">
                  <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-blue-100 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-blue-800">
                      Skor Kanwil
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="text-6xl font-extrabold text-blue-700">
                      {skorKanwil}
                    </div>
                    <p className="text-sm text-blue-600 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Cabang */}
                <Card className="shadow-md border-0 p-0">
                  <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-green-100 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-green-800">
                      Skor Cabang
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="text-6xl font-extrabold text-green-700">
                      {skorCabang}
                    </div>
                    <p className="text-sm text-green-600 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Samsat */}
                <Card className="shadow-md border-0 p-0">
                  <CardHeader className="flex flex-row items-center justify-between px-6 py-4 bg-yellow-100 rounded-t-lg">
                    <CardTitle className="text-sm font-medium text-yellow-800">
                      Skor Samsat
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <div className="text-6xl font-extrabold text-yellow-700">
                      {skorSamsat}
                    </div>
                    <p className="text-sm text-yellow-600 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="shadow-sm border bg-white">
                  <CardHeader>
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Table 1 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Skor Kontribusi Penerimaan{" "}
                      <span className="text-red-700">SIGAP Instansi</span> -
                      Kanwil
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable data={table1Data} />
                  </CardContent>
                </Card>

                {/* Table 2 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Skor Kontribusi Penerimaan{" "}
                      <span className="text-red-700">SIGAP Instansi</span> - Per
                      Cabang
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable data={table2Data} />
                  </CardContent>
                </Card>

                {/* Table 3 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Skor Kontribusi Penerimaan{" "}
                      <span className="text-red-700">SIGAP Instansi</span> - Per
                      Samsat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTableArray data={table3Data} />
                  </CardContent>
                </Card>

                {/* Table 4 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Hasil Penerimaan Atas Kegiatan{" "}
                      <span className="text-orange-400">SIGAP Instansi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTableArray data={table4Data} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
