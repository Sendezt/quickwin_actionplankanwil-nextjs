"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, BarChart3, FileText } from "lucide-react";
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
          "https://magangproject.vercel.app/api/sheet11/getsheet11table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet11/getsheet11table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet11/getsheet11table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet11/getsheet11table4"
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
          "https://magangproject.vercel.app/api/google/getRange-sheet5"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet5: ", err);
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
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Baris 1: Periode Awal & Akhir */}
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="p-3 shadow-sm bg-slate-50 border-0">
                  <CardHeader className="pb-1">
                    <Skeleton className="h-3 w-1/4 mb-1" />
                  </CardHeader>
                  <CardContent className="pt-1">
                    <Skeleton className="h-5 w-1/3 mb-1" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card className="bg-slate-50 shadow-sm border-0">
                  <CardHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-1">
                    <CardTitle className="text-sm font-medium text-gray-700">
                      Periode Awal
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-4 pb-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {rangeData?.periode_awal ?? "-"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-50 shadow-sm border-0">
                  <CardHeader className="flex flex-row items-center justify-between px-4 pt-3 pb-1">
                    <CardTitle className="text-sm font-medium text-gray-700">
                      Periode Akhir
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent className="px-4 pb-3">
                    <p className="text-lg font-semibold text-gray-800">
                      {rangeData?.periode_akhir ?? "-"}
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Baris 2: Skor Kanwil, Cabang, Samsat */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-blue-100 shadow-md min-h-[160px] border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-blue-800">
                  Skor Kanwil
                </CardTitle>
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </CardHeader>
              <CardContent className="py-6">
                <div className="text-5xl font-extrabold text-blue-700">
                  {skorKanwil}
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-100 shadow-md min-h-[160px] border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-green-800">
                  Skor Cabang
                </CardTitle>
                <BarChart3 className="h-6 w-6 text-green-600" />
              </CardHeader>
              <CardContent className="py-6">
                <div className="text-5xl font-extrabold text-green-700">
                  {skorCabang}
                </div>
                <p className="text-sm text-green-600 mt-2">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-100 shadow-md min-h-[160px] border-0">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold text-yellow-800">
                  Skor Samsat
                </CardTitle>
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </CardHeader>
              <CardContent className="py-6">
                <div className="text-5xl font-extrabold text-yellow-700">
                  {skorSamsat}
                </div>
                <p className="text-sm text-yellow-600 mt-2">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Baris 3: Obyek Penilaian & Formula */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-0 overflow-hidden border-0 bg-green-50 shadow-sm">
              <div className="bg-green-100 px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-green-800">
                  Obyek Penilaian
                </h4>
                <BarChart3 className="h-4 w-4 text-green-700" />
              </div>
              <CardContent className="py-6 px-5">
                <ol className="list-decimal pl-5 text-lg font-bold text-gray-900 mb-1">
                  <li>Kantor Wilayah</li>
                  <li>Kantor Cabang</li>
                  <li>Kantor Samsat</li>
                </ol>
                <p className="text-sm text-muted-foreground">
                  3 Obyek Penilaian
                </p>
              </CardContent>
            </Card>

            <Card className="p-0 overflow-hidden border-0 bg-yellow-50 shadow-sm">
              <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Formula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-4 px-5 italic">
                <span className="font-semibold text-gray-900">
                  Kontribusi SW Terkutip dari Tunggakan
                </span>
                <span className="text-gray-600">
                  {" "}
                  = Realisasi SW Terkutip / Tunggakan SW
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Kontribusi Penerimaan SIGAP Instansi - Kanwil
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
                Skor Kontribusi Penerimaan SIGAP Instansi - Per Cabang
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
                Skor Kontribusi Penerimaan SIGAP Instansi - Per Samsat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Hasil Penerimaan Atas Kegiatan SIGAP Instansi
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
