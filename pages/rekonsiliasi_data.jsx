"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, BarChart3, LandPlot, Radical } from "lucide-react";
import Navbar from "@/components/navbar";
import TableCardWrapper from "@/components/rekonsiliasidata/Table1";

export default function MenuEmpat() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [cabangData, setCabangData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table1"
        );
        const json1 = await res1.json();
        setTable1Data(json1);

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table2"
        );
        const json2 = await res2.json();
        setTable2Data(json2);

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table3"
        );
        const json3 = await res3.json();
        setTable3Data(json3);

        const cabangRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4card"
        );
        const cabangJson = await cabangRes.json();
        setCabangData(cabangJson);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet4"
        );
        const json = await res.json();
        if (json) {
          setRangeData(json);
        }
      } catch (err) {
        console.error("Gagal fetch getRange-sheet4: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  // Skeleton sesuai struktur card
  const SkeletonGrid = () => (
    <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
      {/* Grid utama */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Periode Awal */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader>
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>

        {/* Skor Samsat Se-Jateng */}
        <Card className="row-span-2 p-6 flex items-center justify-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </Card>

        {/* Periode Akhir */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader>
            <Skeleton className="h-4 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      </div>

      {/* Grid kedua */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Obyek Penilaian */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader>
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-28 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>

        {/* Skor Cabang */}
        <Card className="row-span-2 p-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </Card>

        {/* Formula */}
        <Card className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader>
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="py-6 space-y-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
          </CardContent>
        </Card>
      </div>

      {/* Skeleton tabel */}
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-2">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-full" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  // Ambil nilai akhir Samsat Se-Jateng (summary index ke-6)
  const skorSamsat = table1Data?.summary?.[6] ?? "-";

  // Ambil data cabang
  const skorCabangList = cabangData?.data ?? [];
  const targetSkor = cabangData?.summary?.[1] ?? "";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
            {/* Grid utama */}
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

              {/* Kolom 2 (row-span-2): Skor Samsat Se-Jateng */}
              <Card className="p-0 overflow-hidden row-span-2">
                <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                  <h4 className="text-sm font-semibold text-yellow-800">
                    Skor Samsat Se-Jateng
                  </h4>
                  <div className="bg-yellow-200 rounded-full">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
                  <div className="text-7xl font-bold text-yellow-900">
                    {skorSamsat}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nilai Akhir (Max 4)
                  </p>
                </CardContent>
              </Card>

              {/* Kolom 1: Periode Akhir */}
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

            {/* Grid kedua */}
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
                    Kantor Samsat
                  </div>
                  <p className="text-xs">1 Obyek Penilaian</p>
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
                  {skorCabangList.map(([cabang, skor], idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-1xl border-b pb-1 last:border-0"
                    >
                      <span>{cabang}</span>
                      <span className="font-bold">{skor}</span>
                    </div>
                  ))}

                  <p className="text-xs text-muted-foreground pt-2">
                    Target Skor: {targetSkor}
                  </p>
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
                  <div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-gray-900">
                        Terlaksananya Kegiatan Rekonsiliasi Data
                      </span>{" "}
                      = Realisasi Kegiatan / Target
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* === Tambahan Tabel === */}
            <TableCardWrapper
              title="Rekapitulasi Rekonsiliasi Data Per Cabang"
              headers={table1Data?.header?.[0] ?? []}
              data={table1Data?.data ?? []}
              summary={table1Data?.summary ?? []}
              isLoading={!table1Data}
              isNested={false}
            />
            <TableCardWrapper
              title="Skor Pelaksanaan Rekonsiliasi Data - Per Samsat"
              headers={table2Data?.header?.[0] ?? []}
              data={table2Data?.data ?? []}
              summary={table2Data?.summary ?? []}
              isLoading={!table2Data}
              isNested={true}
            />
            <TableCardWrapper
              title="Rekapitulasi Pelaksanaan Rekonsiliasi Data - Per Samsat"
              headers={table3Data?.header?.[0] ?? []}
              data={table3Data?.data ?? []}
              summary={table3Data?.summary ?? []}
              isLoading={!table3Data}
              isNested={true}
            />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
