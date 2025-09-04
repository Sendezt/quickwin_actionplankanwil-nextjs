"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  FileText,
  LandPlot,
  Radical,
} from "lucide-react";
import Navbar from "@/components/navbar";
import TableCard from "@/components/operasigabungan/TableCard";

export default function MenuTiga() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [table5Data, setTable5Data] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [table1Res, table2Res, table3Res, table4Res, table5Res] =
          await Promise.all([
            fetch(
              "https://magangproject.vercel.app/api/google/getsheet3table1"
            ),
            fetch(
              "https://magangproject.vercel.app/api/google/getsheet3table2"
            ),
            fetch(
              "https://magangproject.vercel.app/api/google/getsheet3table3"
            ),
            fetch(
              "https://magangproject.vercel.app/api/google/getsheet3table4"
            ),
            fetch(
              "https://magangproject.vercel.app/api/google/getsheet3table5"
            ),
          ]);

        const table1Json = await table1Res.json();
        const table2Json = await table2Res.json();
        const table3Json = await table3Res.json();
        const table4Json = await table4Res.json();
        const table5Json = await table5Res.json();

        setTable1Data(table1Json);
        setTable2Data(table2Json);
        setTable3Data(table3Json);
        setTable4Data(table4Json);
        setTable5Data(table5Json);

        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet3card"
        );
        const breakdownJson = await breakdownRes.json();
        setBreakdownData(breakdownJson);

        const rangeRes = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet3"
        );
        const rangeJson = await rangeRes.json();
        setRangeData(rangeJson);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSkor =
    breakdownData?.data?.reduce((total, item) => total + item.skor, 0) ?? 0;
  const targetSkor = 4;

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* ---------------- Row pertama ---------------- */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card
                  key={i}
                  className="shadow-sm border border-dashed bg-muted/30"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-3 rounded-full" />
                  </CardHeader>
                  <CardContent className="py-2 px-7 space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Periode Awal & Akhir */}
                {rangeData?.periode_awal && rangeData?.periode_akhir && (
                  <>
                    <Card className="shadow-sm border border-dashed bg-muted/30">
                      <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-xs font-medium">
                          Periode Awal
                        </CardTitle>
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-6">
                        <div className="text-base font-semibold text-gray-900">
                          {rangeData.periode_awal}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tanggal Mulai
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm border border-dashed bg-muted/30">
                      <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-xs font-medium">
                          Periode Akhir
                        </CardTitle>
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-6">
                        <div className="text-base font-semibold text-gray-900">
                          {rangeData.periode_akhir}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tanggal Akhir
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )}

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
                      Kantor Samsat
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 Obyek Penilaian
                    </p>
                  </CardContent>
                </Card>

                {/* Surat Dukungan */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Surat Dukungan Opsgab
                    </CardTitle>
                    <FileText className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-1 px-6">
                    <a
                      href="https://drive.google.com/file/d/1PiK5uwKQ2LPZfLICZZKwmaDX-CW-wmx5/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-blue-600 hover:underline block"
                    >
                      Surat Dukungan Operasi Gabungan
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      Surat Sekda kepada Kapolda No.900.1.13.1/0005203 Hal
                      Kegiatan Operasi Gabungan Optimalisasi Pajak Kendaraan
                      Bermotor Tahun 2025
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* ---------------- Row kedua ---------------- */}
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="p-0 overflow-hidden">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between border-b">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <CardContent className="py-6 space-y-3 text-center">
                    {i === 0 ? (
                      <>
                        <Skeleton className="h-14 w-20 mx-auto" />
                        <Skeleton className="h-3 w-16 mx-auto" />
                      </>
                    ) : (
                      Array.from({ length: 3 }).map((_, j) => (
                        <div
                          key={j}
                          className="flex justify-between items-center px-2"
                        >
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-5 w-8" />
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* Skor Total */}
                <Card className="p-0 overflow-hidden pb-4 text-center">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Skor Total
                    </h4>
                    <div className="bg-blue-200 rounded-full">
                      <TrendingUp className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                  <CardContent className="pb-4">
                    <div className="text-7xl font-bold text-blue-900">
                      {totalSkor}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: {targetSkor}
                    </p>
                  </CardContent>
                </Card>

                {/* Breakdown Skor */}
                <Card className="p-0 overflow-hidden">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Breakdown Skor
                    </h4>
                    <div className="bg-blue-200 rounded-full">
                      <BarChart3 className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                  <CardContent className="py-2 space-y-2">
                    {breakdownData?.data?.length > 0 ? (
                      breakdownData.data.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-lg text-gray-600 flex-1 pr-2 font-bold">
                            {item.judul}
                          </span>
                          <span className="text-2xl font-extrabold text-blue-900">
                            {item.skor}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Tidak ada data
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* ---------------- Formula ---------------- */}
          {loading ? (
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="border-b last:border-0 pb-2">
                    <Skeleton className="h-4 w-56" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow col-span-4">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Forumula
                </CardTitle>
                <Radical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-3 text-sm">
                  {/* Formula 1 */}
                  <div className="border-l-4 border-gray-400 pl-3">
                    <p className="font-semibold text-gray-900 mb-1">
                      Terlaksananya Kegiatan Operasi Gabungan
                    </p>
                    <p className="text-gray-600 text-xs">
                      = Realisasi Kegiatan / Target
                    </p>
                  </div>

                  {/* Formula 2 */}
                  <div className="border-l-4 border-gray-400 pl-3">
                    <p className="font-semibold text-gray-900 mb-1">
                      Kontribusi SW terkutip dari Tunggakan SW
                    </p>
                    <p className="text-gray-600 text-xs">
                      = Realisasi SW Terkutip / Tunggakan SW
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ---------------- Tables ---------------- */}
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="px-5 py-3 border-b">
                  <Skeleton className="h-4 w-52" />
                </div>
                <CardContent className="py-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-5 w-full" />
                  ))}
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <TableCard
                title="Skor Pelaksanaan Operasi Gabungan - Per Cabang"
                headers={table1Data?.header?.[0] ?? []}
                data={table1Data?.data ?? []}
                summary={table1Data?.summary ?? []}
                isLoading={!table1Data}
              />
              <TableCard
                title="Skor Kontribusi Penerimaan Operasi Gabungan - Per Cabang"
                headers={table2Data?.header?.[0] ?? []}
                data={table2Data?.data ?? []}
                summary={table2Data?.summary ?? []}
                isLoading={!table2Data}
              />
              <TableCard
                title="Skor Pelaksanaan Operasi Gabungan - Per Samsat"
                headers={table3Data?.header?.[0] ?? []}
                data={
                  table3Data?.data?.flatMap((item) => [
                    [`${item.cabang}`, "", "", "", "", "", ""],
                    ...item.samsat.map((row) => ["", ...row.slice(1)]),
                  ]) ?? []
                }
                summary={table3Data?.summary ?? []}
                isLoading={!table3Data}
              />
              <TableCard
                title="Skor Kontribusi Penerimaan Operasi Gabungan - Per Samsat"
                headers={table4Data?.header?.[0] ?? []}
                data={
                  table4Data?.data?.flatMap((item) => [
                    [`${item.cabang}`, "", "", "", "", "", ""],
                    ...item.samsat.map((row) => ["", ...row.slice(1)]),
                  ]) ?? []
                }
                summary={table4Data?.summary ?? []}
                isLoading={!table4Data}
              />
              <TableCard
                title="Hasil Penerimaan Atas Kegiatan Operasi Gabungan"
                headers={table5Data?.header?.[0] ?? []}
                data={
                  table5Data?.data?.flatMap((item) => [
                    [`${item.cabang}`, "", "", "", "", "", ""],
                    ...item.samsat.map((row) => ["", ...row.slice(1)]),
                  ]) ?? []
                }
                summary={table5Data?.summary ?? []}
                isLoading={!table5Data}
              />
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
