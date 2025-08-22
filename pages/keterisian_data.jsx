"use client";

import React, { useState, useEffect } from "react";
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
import { CalendarDays, BarChart3, FileText } from "lucide-react";
import Navbar from "@/components/navbar";
import { ChartBarSingle } from "@/components/chart-bar-single";

export default function MenuLima() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [cabangData, setCabangData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rangeData, setRangeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Skor total (table1)
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet5table1"
        );
        const json1 = await res1.json();
        setTable1Data(json1);

        // Table2 data
        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet5table2"
        );
        const json2 = await res2.json();
        setTable2Data(json2);

        // Skor cabang
        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet5card"
        );
        const json3 = await res3.json();
        setCabangData(json3);
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
        const json = await res.json();
        setRangeData(json);
      } catch (err) {
        console.error("Gagal fetch getRange-sheet5: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  // Ambil nilai akhir Kanwil
  const skorKanwil = table1Data?.summary?.[5] ?? "-";

  // Ambil data cabang
  const skorCabangList = cabangData?.data ?? [];
  const targetSkor = cabangData?.summary?.[1] ?? "";

  // Skeleton Card
  const SkeletonCard = () => (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 py-3 border-b">
        <Skeleton className="h-4 w-1/4 mb-2" />
      </div>
      <CardContent className="py-6 px-5 space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Grid Periode + Skor */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {/* Periode Awal */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Periode Awal
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rangeData?.periode_awal ?? "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tanggal Mulai Periode
                    </p>
                  </CardContent>
                </Card>

                {/* Periode Akhir */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Periode Akhir
                    </CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {rangeData?.periode_akhir ?? "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tanggal Akhir Periode
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Kanwil */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Skor Kanwil
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{skorKanwil}</div>
                    <p className="text-xs text-muted-foreground">
                      Nilai Akhir (Max 4)
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Cabang */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Skor Cabang
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {skorCabangList.length > 0 ? (
                      skorCabangList.map(([cabang, skor], idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm border-b pb-1 last:border-0"
                        >
                          <span>{cabang}</span>
                          <span className="font-bold">{skor}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Tidak ada data cabang
                      </p>
                    )}
                    {targetSkor && (
                      <p className="text-xs text-muted-foreground pt-2">
                        Target Skor: {targetSkor}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Section tambahan */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Obyek Penilaian */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-green-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-green-800">
                  Obyek Penilaian
                </h4>
                <BarChart3 className="h-4 w-4 text-green-700" />
              </div>
              <CardContent className="py-6 px-5">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  Kantor Wilayah
                </div>
                <p className="text-sm text-muted-foreground">
                  1 Obyek Penilaian
                </p>
              </CardContent>
            </Card>

            {/* Forumula */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Forumula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-6 px-5 italic space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Tingkat Keterisian Data Kepemilikan Kendaraan sesuai
                      Target
                    </span>
                    {" = "}
                    Realisasi Ceri / Target
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Prosentase Keterisian Data</CardTitle>
              <CardDescription>Per Loket Kantor</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                table1Data &&
                table1Data.data && <ChartBarSingle data={table1Data.data} />
              )}
            </CardContent>
          </Card>

          {/* Table 1 - Rekapitulasi Data Keterisian */}
          <Card>
            <CardHeader>
              <CardTitle>Rekapitulasi Keterisian Data Per Cabang</CardTitle>
              <CardDescription>
                Ringkasan keterisian data berdasarkan masing-masing cabang.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!table1Data ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {table1Data?.header?.[0]?.map((header, idx) => (
                          <th
                            key={idx}
                            className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(table1Data?.data) &&
                        table1Data.data.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50">
                            {Array.isArray(row) &&
                              row.map((cell, cellIdx) => (
                                <td
                                  key={cellIdx}
                                  className="border border-gray-300 px-4 py-2 text-sm"
                                >
                                  {cell}
                                </td>
                              ))}
                          </tr>
                        ))}
                      {/* Summary row */}
                      {Array.isArray(table1Data?.summary) && (
                        <tr className="bg-gray-200 font-medium">
                          {/* Tambah sel kosong di awal */}
                          <td className="border border-gray-300 px-4 py-2 text-sm font-semibold"></td>
                          {table1Data.summary.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Table 2 - Data Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Skor Keterisian Data - Per Samsat</CardTitle>
              <CardDescription>
                Detail skor keterisian data untuk setiap samsat di masing-masing
                cabang.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!table2Data ? (
                <Skeleton className="h-[200px] w-full" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        {Array.isArray(table2Data?.header?.[0]) &&
                          table2Data.header[0].map((header, idx) => (
                            <th
                              key={idx}
                              className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                            >
                              {header}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(table2Data?.data) &&
                        table2Data.data.map((cabangData, cabangIdx) => (
                          <React.Fragment key={cabangIdx}>
                            {/* Header cabang */}
                            <tr className="bg-gray-100">
                              <td
                                colSpan={table2Data.header?.[0]?.length || 7}
                                className="border border-gray-300 px-4 py-2 text-sm font-bold"
                              >
                                {cabangData.cabang}
                              </td>
                            </tr>
                            {/* Data samsat dalam cabang */}
                            {Array.isArray(cabangData.samsat) &&
                              cabangData.samsat.map((samsatRow, samsatIdx) => {
                                // Skip jika hanya satu kolom (seperti "CAB SURAKARTA")
                                if (
                                  Array.isArray(samsatRow) &&
                                  samsatRow.length === 1
                                ) {
                                  return (
                                    <tr
                                      key={samsatIdx}
                                      className="bg-green-100"
                                    >
                                      <td
                                        colSpan={
                                          table2Data.header?.[0]?.length || 7
                                        }
                                        className="border border-gray-300 px-4 py-2 text-sm font-semibold text-green-800"
                                      >
                                        {samsatRow[0]}
                                      </td>
                                    </tr>
                                  );
                                }

                                return (
                                  <tr
                                    key={samsatIdx}
                                    className="hover:bg-gray-50"
                                  >
                                    {Array.isArray(samsatRow) &&
                                      samsatRow.map((cell, cellIdx) => (
                                        <td
                                          key={cellIdx}
                                          className="border border-gray-300 px-4 py-2 text-sm"
                                        >
                                          {cell}
                                        </td>
                                      ))}
                                  </tr>
                                );
                              })}
                          </React.Fragment>
                        ))}
                      {/* Summary row */}
                      {Array.isArray(table2Data?.summary) && (
                        <tr className="font-medium">
                          {/* Tambah sel kosong di awal */}
                          <td className="border border-gray-300 px-4 py-2 text-sm font-semibold"></td>
                          {table2Data.summary.map((cell, cellIdx) => (
                            <td
                              key={cellIdx}
                              className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
