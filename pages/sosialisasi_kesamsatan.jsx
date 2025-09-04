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
  Radical,
  LandPlot,
} from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable4 from "@/components/sosialisasikesamsatan/RenderTable4";
import RenderTable from "@/components/sosialisasikesamsatan/RenderTable";
import React from "react";

export default function MenuEnam() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [table5Data, setTable5Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table4"
        );
        setTable4Data(await res4.json());

        const res5 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table5"
        );
        setTable5Data(await res5.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet6"
        );
        const json = await res.json();
        if (json) setRangeData(json);
      } catch (err) {
        console.error("Gagal fetch getRange-sheet6: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  // Enhanced Skeleton Components
  const PeriodeSkeleton = () => (
    <Card className="shadow-sm border border-dashed bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-3 rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col justify-center space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );

  const ScoreSkeleton = ({ bgColor, iconColor }) => (
    <Card className="p-0 overflow-hidden pb-4 text-center">
      <div
        className={`${bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}
      >
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <CardContent className="pb-4 space-y-2 pt-6">
        <Skeleton className="h-12 w-16 mx-auto" />
        <Skeleton className="h-3 w-24 mx-auto" />
      </CardContent>
    </Card>
  );

  const InfoCardSkeleton = () => (
    <Card className="shadow-sm border border-dashed bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent className="py-4 px-5 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <Skeleton className="h-3 w-20" />
      </CardContent>
    </Card>
  );

  const TableSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 flex-1" />
            ))}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-6 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Skor dari summary
  const skorKanwil = table3Data?.summary?.[5] ?? "?";
  const skorCabang = table2Data?.summary?.[5] ?? "?";
  const skorSamsat = table3Data?.summary?.[5] ?? "?";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Periode Section */}
          <div className="space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              {loading ? (
                <>
                  <PeriodeSkeleton />
                  <PeriodeSkeleton />
                </>
              ) : (
                <>
                  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-xs font-medium text-gray-600">
                        Periode Awal
                      </CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        {rangeData?.periode_awal || "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tanggal Mulai
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-xs font-medium text-gray-600">
                        Periode Akhir
                      </CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        {rangeData?.periode_akhir || "-"}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tanggal Akhir
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Score Section */}
          <div className="space-y-3">
            <div className="grid gap-4 md:grid-cols-3">
              {loading ? (
                <>
                  <ScoreSkeleton bgColor="bg-blue-100" />
                  <ScoreSkeleton bgColor="bg-green-100" />
                  <ScoreSkeleton bgColor="bg-yellow-100" />
                </>
              ) : (
                <>
                  <Card className="p-0 overflow-hidden text-center hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                      <h4 className="text-sm font-semibold text-blue-800">
                        Skor Kanwil
                      </h4>
                      <BarChart3 className="h-4 w-4 text-blue-700" />
                    </div>
                    <CardContent className="pb-6 pt-6">
                      <div className="text-5xl font-bold text-blue-900 mb-2">
                        {skorKanwil}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nilai Akhir (Max 4)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="p-0 overflow-hidden text-center hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                      <h4 className="text-sm font-semibold text-green-800">
                        Skor Cabang
                      </h4>
                      <BarChart3 className="h-4 w-4 text-green-700" />
                    </div>
                    <CardContent className="pb-6 pt-6">
                      <div className="text-5xl font-bold text-green-900 mb-2">
                        {skorCabang}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nilai Akhir (Max 4)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="p-0 overflow-hidden text-center hover:shadow-lg transition-shadow">
                    <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                      <h4 className="text-sm font-semibold text-yellow-800">
                        Skor Samsat Se-Jateng
                      </h4>
                      <BarChart3 className="h-4 w-4 text-yellow-700" />
                    </div>
                    <CardContent className="pb-6 pt-6">
                      <div className="text-5xl font-bold text-yellow-900 mb-2">
                        {skorSamsat}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nilai Akhir (Max 4)
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="space-y-3">
            <div className="grid gap-4 lg:grid-cols-3">
              {loading ? (
                <>
                  <InfoCardSkeleton />
                  <InfoCardSkeleton />
                  <InfoCardSkeleton />
                </>
              ) : (
                <>
                  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-sm font-medium text-gray-700">
                        Obyek Penilaian
                      </CardTitle>
                      <LandPlot className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-5">
                      <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
                        <li className="py-2">Kantor Wilayah</li>
                        <li className="py-2">Kantor Cabang</li>
                        <li className="py-2">Kantor Samsat</li>
                      </ol>
                      <p className="text-xs text-muted-foreground px-2">
                        3 Obyek Penilaian
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-sm font-medium text-gray-700">
                        Banner Kesamsatan
                      </CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="p-5">
                      <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
                        <li className="py-2">Banner Terkait Jasa Raharja</li>
                        <li className="py-2">Banner Terkait JRku Reward</li>
                        <li className="py-2">Banner Terkait Signal</li>
                        <li className="py-2">Banner Terkait Layanan Online</li>
                        <li className="py-2">
                          Banner Terkait Fungsi Regident, PKB, dan SWDKLLJ
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-sm font-medium text-gray-700">
                        Forumula
                      </CardTitle>
                      <Radical className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="space-y-3 text-sm">
                        <div className="border-l-4 border-blue-200 pl-3">
                          <p className="font-semibold text-gray-900 mb-1">
                            Terlaksananya Sosialisasi Kesamsatan di IG Kanwil
                          </p>
                          <p className="text-gray-600 text-xs">
                            = Realisasi / Target (8 Postingan per Bulan)
                          </p>
                        </div>
                        <div className="border-l-4 border-green-200 pl-3">
                          <p className="font-semibold text-gray-900 mb-1">
                            Terlaksananya Sosialisasi Kesamsatan di IG Cabang
                          </p>
                          <p className="text-gray-600 text-xs">
                            = Realisasi / Target (8 Postingan per Bulan Per
                            Cabang)
                          </p>
                        </div>
                        <div className="border-l-4 border-yellow-200 pl-3">
                          <p className="font-semibold text-gray-900 mb-1">
                            Tersedianya Banner Kesamsatan
                          </p>
                          <p className="text-gray-600 text-xs">
                            = Realisasi / Target
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Data Tables Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Data Tabel Penilaian
            </h2>

            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                      Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Kanwil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RenderTable data={table1Data} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                      Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Cabang
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RenderTable data={table2Data} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                      Skor Pelaksanaan{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Samsat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RenderTable data={table3Data} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                      Pengisian Data Banner{" "}
                      <span className="text-red-700">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Per Samsat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RenderTable4 data={table4Data} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="border-b">
                    <CardTitle className="text-xl">
                      Pengisian Data IG{" "}
                      <span className="text-orange-500">
                        Sosialisasi Kesamsatan
                      </span>{" "}
                      - Kanwil & Cabang
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RenderTable data={table5Data} isTable5={true} />
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
