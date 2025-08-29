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
import {
  CalendarDays,
  BarChart3,
  FileText,
  Radical,
  LandPlot,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { ChartBarSingle } from "@/components/chart-bar-single";
import TableSkorSamsat from "@/components/keterisiandata/Table2";
import TableRekapitulasi from "@/components/keterisiandata/Table1";

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

  // Skeleton untuk grid pertama (2 kolom, dengan row-span-2 di kanan)
  const SkeletonGridFirst = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Kolom kiri - 2 card bertumpuk */}
      <div className="space-y-4">
        {/* Periode Awal Skeleton */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent className="py-1 px-4">
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>

        {/* Periode Akhir Skeleton */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent className="py-1 px-4">
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      </div>

      {/* Kolom kanan - Skor Kanwil (row-span-2) */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-muted px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
          <Skeleton className="h-20 w-20 mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    </div>
  );

  // Skeleton untuk grid kedua (2 kolom, dengan row-span-2 di kanan)
  const SkeletonGridSecond = () => (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Kolom kiri - 2 card bertumpuk */}
      <div className="space-y-4">
        {/* Obyek Penilaian Skeleton */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent className="flex flex-col justify-center min-h-24 px-4">
            <Skeleton className="h-6 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>

        {/* Formula Skeleton */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent className="py-6 px-5 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kolom kanan - Skor Cabang (row-span-2) */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-muted px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          {/* Simulasi beberapa baris data cabang */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex justify-between border-b pb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
          <Skeleton className="h-3 w-32 pt-2" />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Grid Periode + Info */}
          {loading ? (
            <SkeletonGridFirst />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Kolom 1: Periode Awal */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">
                    Periode Awal
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-1 px-4">
                  <div className="text-base font-semibold text-gray-900">
                    {rangeData?.periode_awal ?? "-"}
                  </div>
                  <p className="text-xs">Tanggal Mulai Periode</p>
                </CardContent>
              </Card>

              {/* Kolom 2 (row-span-2): Skor Kanwil */}
              <Card className="p-0 overflow-hidden row-span-2">
                <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                  <h4 className="text-sm font-semibold text-blue-800">
                    Skor Kanwil
                  </h4>
                  <div className="bg-blue-200 rounded-full">
                    <BarChart3 className="h-4 w-4 text-blue-700" />
                  </div>
                </div>
                <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
                  <div className="text-7xl font-bold text-blue-900">
                    {skorKanwil}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Target Skor | 4 (Nilai Max)
                  </p>
                </CardContent>
              </Card>

              {/* Kolom 1: Periode Akhir */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">
                    Periode Akhir
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-1 px-4">
                  <div className="text-base font-semibold text-gray-900">
                    {rangeData?.periode_akhir ?? "-"}
                  </div>
                  <p className="text-xs">Tanggal Akhir Periode</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Grid Kedua */}
          {loading ? (
            <SkeletonGridSecond />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {/* Kolom 1: Obyek Penilaian */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">
                    Obyek Penilaian
                  </CardTitle>
                  <LandPlot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="flex flex-col justify-center min-h-24 px-4">
                  <div className="text-base font-semibold text-gray-900">
                    Kantor Wilayah
                  </div>
                  <p className="text-xs text-muted-foreground">
                    1 Obyek Penilaian
                  </p>
                </CardContent>
              </Card>

              {/* Kolom 2 (row-span-2): Skor Cabang */}
              <Card className="p-0 overflow-hidden row-span-2">
                <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                  <h4 className="text-sm font-semibold text-green-800">
                    Skor Cabang
                  </h4>
                  <div className="bg-green-200 rounded-full">
                    <BarChart3 className="h-4 w-4 text-green-700" />
                  </div>
                </div>
                <CardContent className="px-5 py-4 space-y-3">
                  {skorCabangList.length > 0 ? (
                    skorCabangList.map(([cabang, skor], idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-base border-b pb-1 last:border-0"
                      >
                        <span>{cabang}</span>
                        <span className="font-bold text-green-900">{skor}</span>
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

              {/* Forumula */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Forumula
                  </CardTitle>
                  <Radical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-6 px-5 italic space-y-6">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Tingkat Keterisian Data Kepemilikan Kendaraan sesuai
                      Target
                    </span>{" "}
                    = Realisasi Ceri / Target
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

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
            </CardHeader>
            <CardContent>
              <TableRekapitulasi table1Data={table1Data} />
            </CardContent>
          </Card>

          {/* Table 2 - Data Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Skor Keterisian Data - Per Samsat</CardTitle>
            </CardHeader>
            <CardContent>
              <TableSkorSamsat table2Data={table2Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
