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
  LandPlot,
  Radical,
  Building2,
  MapPin,
  Car,
} from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/kolaborasimerchant/RenderTable";
import RenderTableArray from "@/components/kolaborasimerchant/RenderTableArray";
import RenderTableSimple from "@/components/kolaborasimerchant/RenderTableSimple";
import RenderTable6 from "@/components/kolaborasimerchant/RenderTable6";
import RenderTableScroll from "@/components/kolaborasimerchant/RenderTableScroll";
import RenderTable4 from "@/components/kolaborasimerchant/RenderTable4";

export default function MenuDelapan() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [table5Data, setTable5Data] = useState(null);
  const [table6Data, setTable6Data] = useState(null);
  const [table7Data, setTable7Data] = useState(null);
  const [table8Data, setTable8Data] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table4"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table2"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table5"
        );
        setTable4Data(await res4.json());

        const res5 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table3"
        );
        setTable5Data(await res5.json());

        const res6 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table6"
        );
        setTable6Data(await res6.json());

        const res7 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table7"
        );
        setTable7Data(await res7.json());

        const res8 = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8table8"
        );
        setTable8Data(await res8.json());

        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getsheet8card"
        );
        setBreakdownData(await breakdownRes.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/sheet8/getRange-sheet8"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet8: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  const skorKanwil = table2Data?.total?.[1] ?? "-";
  const skorCabang = table4Data?.total?.[8] ?? "-";
  const skorSamsat = table6Data?.totalSummary ?? "-";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {loading ? (
            <>
              {/* Skeleton untuk Row 1 - Periode dan Obyek Penilaian */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Skeleton untuk Periode Awal & Akhir */}
                <div className="flex flex-col gap-4">
                  {/* Skeleton Periode Awal */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-2 w-32" />
                    </CardContent>
                  </Card>

                  {/* Skeleton Periode Akhir */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-3 rounded-full" />
                    </CardHeader>
                    <CardContent className="px-3 pb-2">
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-2 w-32" />
                    </CardContent>
                  </Card>
                </div>

                {/* Skeleton untuk Obyek Penilaian */}
                <Card className="p-0 overflow-hidden">
                  <div className="bg-gray-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <CardContent className="py-3 px-5 space-y-2">
                    <div className="pl-5 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-3 w-36 mt-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Skeleton untuk Row 2 - Skor Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Skeleton Skor Kanwil */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-blue-100 px-5 py-3 border-b flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <Skeleton className="h-16 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </CardContent>
                </Card>

                {/* Skeleton Skor Cabang */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-green-100 px-5 py-3 border-b flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <Skeleton className="h-16 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </CardContent>
                </Card>

                {/* Skeleton Skor Samsat */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <Skeleton className="h-16 w-16 mx-auto mb-2" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                  </CardContent>
                </Card>
              </div>

              {/* Skeleton untuk Row 3 - Breakdown & Formula */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Skeleton Breakdown Skor */}
                <Card className="p-0 overflow-hidden">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                  <CardContent className="py-2 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-6 w-8" />
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t pt-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-6" />
                    </div>
                  </CardContent>
                </Card>

                {/* Skeleton Formula */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-3" />
                  </CardHeader>
                  <CardContent className="px-3 pb-2">
                    <div className="pl-4 space-y-2">
                      <div className="border-b pb-2">
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                      <div>
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skeleton untuk Tables */}
              {[
                "Skor Jumlah Kolaborasi Merchant - Kanwil",
                "Skor Jumlah Kolaborasi Merchant - Per Cabang",
                "Skor Jumlah Kolaborasi Merchant - Per Samsat",
                "Skor % Pemanfaatan Fasilitas Merchant - Kanwil",
                "Skor % Pemanfaatan Fasilitas Merchant - Cabang",
                "Skor % Pemanfaatan Fasilitas Merchant - Samsat",
                "Pengisian Data Jumlah Merchant",
                "Pengisian Data Klaim Merchant",
              ].map((title, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-80 mb-2" />
                    {i === 7 && <Skeleton className="h-4 w-48" />}
                  </CardHeader>
                  <CardContent>
                    {/* Skeleton untuk Table Header */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 border-b p-3">
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-18" />
                          {i >= 4 && <Skeleton className="h-4 w-20" />}
                          {i >= 6 && <Skeleton className="h-4 w-22" />}
                        </div>
                      </div>
                      {/* Skeleton untuk Table Rows */}
                      {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="border-b p-3 last:border-b-0">
                          <div className="flex gap-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-18" />
                            {i >= 4 && <Skeleton className="h-4 w-20" />}
                            {i >= 6 && <Skeleton className="h-4 w-22" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              {/* Row 1: Periode Awal, Periode Akhir, Obyek Penilaian */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Kolom Kiri: Periode Awal & Akhir */}
                <div className="flex flex-col gap-4">
                  {/* Periode Awal */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 px-6">
                      <CardTitle className="text-xs font-medium">
                        Periode Awal
                      </CardTitle>
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                      <div className="text-base font-semibold text-gray-900">
                        {rangeData?.periode_awal ?? "-"}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Tanggal Mulai Periode
                      </p>
                    </CardContent>
                  </Card>

                  {/* Periode Akhir */}
                  <Card className="shadow-sm border border-dashed bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 px-6">
                      <CardTitle className="text-xs font-medium">
                        Periode Akhir
                      </CardTitle>
                      <CalendarDays className="h-3 w-3 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="px-6 pb-2">
                      <div className="text-base font-semibold text-gray-900">
                        {rangeData?.periode_akhir ?? "-"}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        Tanggal Akhir Periode
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Kolom Kanan: Obyek Penilaian */}
                <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-medium">
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
                    <p className="text-[10px] text-muted-foreground px-2">
                      3 Obyek Penilaian
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Row 2: Skor Kanwil, Skor Cabang, Skor Samsat */}
              <div className="grid gap-4 md:grid-cols-3">
                {/* Skor Kanwil */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-blue-100 px-5 py-3 border-b flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Skor Kanwil
                    </h4>
                    <BarChart3 className="h-4 w-4 text-blue-700" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <div className="text-6xl font-bold text-blue-600">
                      {skorKanwil}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Cabang */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-green-100 px-5 py-3 border-b flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-green-800">
                      Skor Cabang
                    </h4>
                    <BarChart3 className="h-4 w-4 text-green-700" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <div className="text-6xl font-bold text-green-600">
                      {skorCabang}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>

                {/* Skor Samsat */}
                <Card className="overflow-hidden p-0">
                  <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-yellow-800">
                      Skor Samsat Se-Jateng
                    </h4>
                    <BarChart3 className="h-4 w-4 text-yellow-700" />
                  </div>
                  <CardContent className="py-6 px-5 text-center">
                    <div className="text-6xl font-bold text-yellow-600">
                      {skorSamsat}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Target Skor | 4 (Nilai Max)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Row 3: Breakdown Skor + Formula */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Breakdown Skor */}
                <Card className="p-0 overflow-hidden">
                  {/* Header */}
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Breakdown Skor
                    </h4>
                    <div className="bg-blue-200 rounded-full">
                      <BarChart3 className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="py-2 space-y-2">
                    {Array.isArray(breakdownData?.data) &&
                    breakdownData.data.length > 0 ? (
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

                    {breakdownData?.target && (
                      <div className="flex justify-between items-center border-t pt-2 text-gray-700">
                        <span className="text-sm font-semibold">
                          {breakdownData.target.judul}
                        </span>
                        <span className="text-lg font-bold">
                          {breakdownData.target.skor}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Forumula */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1 px-6">
                    <CardTitle className="text-xs font-medium">
                      Forumula
                    </CardTitle>
                    <Radical className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="space-y-3 text-sm">
                      {/* Formula 1 */}
                      <div className="border-l-4 border-gray-400 pl-3">
                        <p className="font-semibold text-gray-900 mb-1">
                          Jumlah merchant yang bekerja sama
                        </p>
                        <p className="text-gray-600 text-xs">
                          = Jumlah merchant yang berhasil diajak kerjasama /
                          Target (3 Merchant)
                        </p>
                      </div>

                      {/* Formula 2 */}
                      <div className="border-l-4 border-gray-400 pl-3">
                        <p className="font-semibold text-gray-900 mb-1">
                          % Jumlah WP yang memanfaatkan fasilitas merchant
                        </p>
                        <p className="text-gray-600 text-xs">
                          = Jumlah Wajib Pajak yang memanfaatkan fasilitas
                          merchant / Target (10 Klaim per Merchant)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SECTION: KANTOR WILAYAH */}
              <div className="bg-blue-50 px-4 py-2 rounded-t-lg border-b-2 border-blue-200">
                <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  KANTOR WILAYAH
                </h2>
              </div>

              <Card className="rounded-t-none">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor Jumlah{" "}
                    <span className="text-red-700">Kolaborasi Merchant</span> -
                    Kanwil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTable data={table1Data} />
                </CardContent>
              </Card>

              <Card className="mt-0">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor % Pemanfaatan{" "}
                    <span className="text-orange-500">Fasilitas Merchant</span>{" "}
                    - Kanwil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTableSimple data={table2Data} />
                </CardContent>
              </Card>

              {/* SECTION: KANTOR CABANG */}
              <div className="bg-green-50 px-4 py-2 rounded-t-lg border-b-2 border-green-200 mt-8">
                <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  KANTOR CABANG
                </h2>
              </div>

              <Card className="rounded-t-none">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor Jumlah{" "}
                    <span className="text-red-700">Kolaborasi Merchant</span> -
                    Per Cabang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTable data={table3Data} />
                </CardContent>
              </Card>

              <Card className="mt-0">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor % Pemanfaatan{" "}
                    <span className="text-orange-500">Fasilitas Merchant</span>{" "}
                    - Cabang
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTable4 data={table4Data} />
                </CardContent>
              </Card>

              {/* SECTION: KANTOR SAMSAT */}
              <div className="bg-yellow-50 px-4 py-2 rounded-t-lg border-b-2 border-yellow-200 mt-8">
                <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  KANTOR SAMSAT
                </h2>
              </div>

              <Card className="rounded-t-none">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor Jumlah{" "}
                    <span className="text-red-700">Kolaborasi Merchant</span> -
                    Per Samsat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTableArray data={table5Data} />
                </CardContent>
              </Card>

              <Card className="mt-0">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Skor % Pemanfaatan{" "}
                    <span className="text-orange-500">Fasilitas Merchant</span>{" "}
                    - Samsat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTable6 data={table6Data} />
                </CardContent>
              </Card>

              {/* SECTION: DATA PENGISIAN */}
              <div className="bg-purple-50 px-4 py-2 rounded-t-lg border-b-2 border-purple-200 mt-8">
                <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  DATA PENGISIAN
                </h2>
              </div>

              <Card className="rounded-t-none">
                <CardHeader>
                  <CardTitle>Pengisian Data Jumlah Merchant</CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTableScroll data={table7Data} />
                </CardContent>
              </Card>

              <Card className="mt-0">
                <CardHeader>
                  <CardTitle>Pengisian Data Klaim Merchant</CardTitle>
                </CardHeader>
                <CardContent>
                  <RenderTableScroll data={table8Data} />
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
