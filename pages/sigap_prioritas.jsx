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
import RenderTable from "@/components/sigapprioritas/RenderTable";
import RenderTableArray from "@/components/sigapprioritas/RenderTableArray";

export default function MenuTen() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tabel 1
        const res1 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet10/getsheet10table1"
        );
        setTable1Data(await res1.json());

        // Tabel 2
        const res2 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet10/getsheet10table2"
        );
        setTable2Data(await res2.json());

        // Tabel 3
        const res3 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet10/getsheet10table3"
        );
        setTable3Data(await res3.json());

        // Tabel 4
        const res4 = await fetch(
          "https://quickwin-jateng.vercel.app/api/sheet10/getsheet10table4"
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
          "https://quickwin-jateng.vercel.app/api/sheet10/getRange-sheet10"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet10: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  function getNilaiAkhir(table) {
    // ambil header pertama
    const headerRow = table?.header?.[0] ?? [];
    const idx = headerRow.findIndex((h) => h.includes("Nilai Akhir"));

    // kalau ada summary → ambil dari situ
    if (table?.summary && idx !== -1) {
      return table.summary[idx - 2] ?? "?";
      // ⚠️ perbedaan: summary Samsat & Cabang ga ada kolom "No" dan "Loket/Cabang"
      // makanya geser index (idx - 2)
    }

    // fallback: kalau ada data array biasa
    if (table?.data?.length && idx !== -1) {
      if (Array.isArray(table.data[0])) {
        // data berupa array biasa
        return table.data[0][idx] ?? "?";
      } else if (table.data[0]?.samsat?.length) {
        // data berupa object dengan samsat array
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
          {/* Cards Atas */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="p-0 overflow-hidden">
                  <div className="px-5 py-3 border-b">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                  </div>
                  <CardContent className="py-6 px-5 space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
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
                    <p className="text-xs text-muted-foreground mt-1">Tanggal Mulai</p>
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
                    <p className="text-xs text-muted-foreground mt-1">Tanggal Akhir</p>
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
          {/* All Skor - Kanwil Cabang Samsat */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Skor Kanwil */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-blue-800">
                  Skor Kanwil
                </h4>
                <div className="bg-blue-200 rounded-full p-1">
                  <BarChart3 className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <CardContent className="pb-4">
                <div className="text-7xl font-bold text-blue-700">
                  {skorKanwil}
                </div>
                <p className="text-xs text-muted-foreground">
                  Target Skor{" "}
                  <span className="text-gray-500">| 4 (Nilai Max)</span>
                </p>
              </CardContent>
            </Card>

            {/* Skor Cabang */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-green-800">
                  Skor Cabang
                </h4>
                <div className="bg-green-200 rounded-full p-1">
                  <BarChart3 className="h-4 w-4 text-green-700" />
                </div>
              </div>
              <CardContent className="pb-4">
                <div className="text-7xl font-bold text-green-700">
                  {skorCabang}
                </div>
                <p className="text-xs text-muted-foreground">
                  Target Skor{" "}
                  <span className="text-gray-500">| 4 (Nilai Max)</span>
                </p>
              </CardContent>
            </Card>

            {/* Skor Samsat */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Skor Samsat Se-Jateng
                </h4>
                <div className="bg-yellow-200 rounded-full p-1">
                  <BarChart3 className="h-4 w-4 text-yellow-700" />
                </div>
              </div>
              <CardContent className="pb-4">
                <div className="text-7xl font-bold text-yellow-700">
                  {skorSamsat}
                </div>
                <p className="text-xs text-muted-foreground">
                  Target Skor{" "}
                  <span className="text-gray-500">| 4 (Nilai Max)</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Skor Kontribusi Penerimaan{" "}
                <span className="text-red-700">SIGAP Prioritas</span> - Kanwil
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
                <span className="text-red-700">SIGAP Prioritas</span> - Per
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
                <span className="text-red-700">SIGAP Prioritas</span> - Per
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
                <span className="text-yellow-700">SIGAP Prioritas</span>
              </CardTitle>
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
