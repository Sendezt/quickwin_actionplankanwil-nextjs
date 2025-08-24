"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import Navbar from "@/components/navbar";

function TableCard({ title, description, headers, data, summary, isLoading }) {
  const normalizedSummary = Array.isArray(summary?.[0])
    ? summary
    : summary && summary.length
    ? [summary]
    : [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-2">
                {Array.from({ length: headers.length || 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-24" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <Table className="border border-gray-300 border-collapse w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                {headers.map((header, i) => (
                  <TableHead
                    key={i}
                    className="font-semibold text-gray-800 border border-gray-300 px-3 py-2"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    {Array.isArray(row)
                      ? row.map((cell, j) => (
                          <TableCell
                            key={j}
                            className="border border-gray-300 px-3 py-1 text-sm"
                          >
                            {cell}
                          </TableCell>
                        ))
                      : null}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={headers.length}
                    className="text-center text-muted-foreground border border-gray-300 px-3 py-2"
                  >
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {normalizedSummary.length > 0 && (
              <TableFooter>
                {normalizedSummary.map((row, i) => {
                  const emptyCells = headers.length - row.length; // sel kosong di awal
                  return (
                    <TableRow key={i} className="bg-gray-50 font-semibold">
                      {Array.from({ length: emptyCells }).map((_, idx) => (
                        <TableCell
                          key={`empty-${idx}`}
                          className="border border-gray-300 px-3 py-1 text-sm"
                        ></TableCell>
                      ))}
                      {row.map((cell, j) => (
                        <TableCell
                          key={j}
                          className="border border-gray-300 px-3 py-1 text-sm"
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableFooter>
            )}
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

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
        // Ambil data table1 & table2 secara paralel
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

        // Ambil breakdown
        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet3card"
        );
        const breakdownJson = await breakdownRes.json();
        setBreakdownData(breakdownJson);

        // Ambil range periode
        const rangeRes = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheetglobal"
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
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
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
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Periode Awal
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rangeData?.periode_awal}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tanggal Mulai Periode
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Periode Akhir
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rangeData?.periode_akhir}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tanggal Akhir Periode
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Skor Total
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalSkor}</div>
                    <p className="text-xs text-muted-foreground">
                      Target: {targetSkor}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Breakdown Skor
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {breakdownData?.data?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs text-gray-600 flex-1 pr-2">
                            {item.judul}
                          </span>
                          <span className="text-lg font-bold">{item.skor}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}
                <div className="col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {/* Periode */}
                    {rangeData?.periode_awal && rangeData?.periode_akhir && (
                      <>
                        <Card className="shadow-sm border border-dashed bg-muted/30">
                          <CardHeader className="flex flex-row items-center justify-between pb-1">
                            <CardTitle className="text-xs font-medium">
                              Periode Awal
                            </CardTitle>
                            <CalendarDays className="h-3 w-3 text-muted-foreground" />
                          </CardHeader>
                          <CardContent className="py-1 px-4">
                            <div className="text-base font-semibold text-gray-900">
                              {rangeData.periode_awal}
                            </div>
                            <p className="text-xs">Tanggal Mulai Periode</p>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-dashed bg-muted/30">
                          <CardHeader className="flex flex-row items-center justify-between pb-1">
                            <CardTitle className="text-xs font-medium">
                              Periode Akhir
                            </CardTitle>
                            <CalendarDays className="h-3 w-3 text-muted-foreground" />
                          </CardHeader>
                          <CardContent className="py-1 px-4">
                            <div className="text-base font-semibold text-gray-900">
                              {rangeData.periode_akhir}
                            </div>
                            <p className="text-xs">Tanggal Akhir Periode</p>
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
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-4">
                        <div className="text-base font-semibold text-gray-900">
                          Kantor Samsat
                        </div>
                        <p className="text-xs">1 Obyek Penilaian</p>
                      </CardContent>
                    </Card>

                    {/* SK Gubernur */}
                    <Card className="shadow-sm border border-dashed bg-muted/30">
                      <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-xs font-medium">
                          Surat Dukungan Opsgab
                        </CardTitle>
                        <FileText className="h-3 w-3 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-4">
                        <a
                          href="https://drive.google.com/file/d/1PiK5uwKQ2LPZfLICZZKwmaDX-CW-wmx5/view"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-blue-600 hover:underline block"
                        >
                          Surat Dukungan Operasi Gabungan
                        </a>
                        <p className="text-xs">
                          Surat Sekda kepada Kapolda No.900.1.13.1/0005203 Hal
                          Kegiatan Operasi Gabungan Optimalisasi Pajak Kendaraan
                          Bermotor Tahun 2025
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Row kedua untuk cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="col-span-1 p-0 overflow-hidden">
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

          {/* Deskripsi Forumula */}
          <Card className="shadow-sm border border-dashed bg-muted/30">
            {/* Header Card */}
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Forumula
              </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* Content Card */}
            <CardContent className="py-6italic space-y-6">
              {/* Forumula 1 */}
              <div className="pb-4 border-b last:border-0">
                <p className="text-sm leading-relaxed text-gray-600">
                  <span className="font-semibold italic text-gray-900">
                    1. Terlaksananya Kegiatan Operasi Gabungan
                  </span>
                  {" = "}
                  <span className="italic">Realisasi Kegiatan / Target</span>
                </p>
              </div>
              {/* Forumula 2 */}
              <div className="pb-4 border-b last:border-0">
                <p className="text-sm leading-relaxed text-gray-600">
                  <span className="font-semibold text-gray-900 italic">
                    2. Kontribusi SW terkutip dari Tunggakan SW
                  </span>
                  {" = "}
                  <span className="italic">Realisasi SW Terkutip/Tunggakan SW</span>
                </p>
              </div>
            </CardContent>
          </Card>

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
            // description="Skor Pelaksanaan Operasi Gabungan"
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
            // description="Skor Kontribusi Penerimaan Operasi Gabungan"
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
            //

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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
