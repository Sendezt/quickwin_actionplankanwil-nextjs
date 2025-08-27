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
import { CalendarDays, BarChart3, LandPlot, Radical } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/kolaborasimerchant/RenderTable";
import RenderTableArray from "@/components/kolaborasimerchant/RenderTableArray";
import RenderTableSimple from "@/components/kolaborasimerchant/RenderTableSimple";
import RenderTable5 from "@/components/kolaborasimerchant/RenderTable5";
import RenderTable6 from "@/components/kolaborasimerchant/RenderTable6";
import RenderTableScroll from "@/components/kolaborasimerchant/RenderTableScroll";

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
          "https://magangproject.vercel.app/api/google/getsheet8table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table4"
        );
        setTable4Data(await res4.json());

        const res5 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table5"
        );
        setTable5Data(await res5.json());

        const res6 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table6"
        );
        setTable6Data(await res6.json());

        const res7 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table7"
        );
        setTable7Data(await res7.json());

        const res8 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table8"
        );
        setTable8Data(await res8.json());

        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8card"
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
          "https://magangproject.vercel.app/api/google/getRange-sheet8"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet8: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  const skorKanwil = table4Data?.total?.[1] ?? "-";
  const skorCabang = table5Data?.total?.[8] ?? "-";
  const skorSamsat = table6Data?.totalSummary ?? "-";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Row 1: Periode Awal, Periode Akhir, Obyek Penilaian */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Kolom Kiri: Periode Awal & Akhir */}
            <div className="flex flex-col gap-4">
              {/* Periode Awal */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                  <CardTitle className="text-xs font-medium">
                    Periode Awal
                  </CardTitle>
                  <CalendarDays className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="px-3 pb-2">
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
                <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                  <CardTitle className="text-xs font-medium">
                    Periode Akhir
                  </CardTitle>
                  <CalendarDays className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="px-3 pb-2">
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
            <Card className="p-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gray-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-gray-800">
                  Obyek Penilaian
                </h4>
                <div className="bg-gray-200 rounded-full">
                  <LandPlot className="h-4 w-4 text-gray-700" />
                </div>
              </div>

              {/* Content */}
              <CardContent className="py-3 px-5 space-y-2">
                <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                  <li className="font-medium">Kantor Wilayah</li>
                  <li className="font-medium">Kantor Cabang</li>
                  <li className="font-medium">Kantor Samsat</li>
                </ol>

                <p className="text-xs text-gray-500 mt-2 italic">
                  Total: 3 Obyek Penilaian
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

          {/* Row 3: Breakdown Skor + Forumula */}
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
              <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
                <CardTitle className="text-xs font-medium">Forumula</CardTitle>
                <Radical className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="px-3 pb-2">
                <ol className="list-decimal pl-4 space-y-2 text-xs text-gray-700">
                  <li className="italic border-b pb-2">
                    Jumlah merchant yang bekerja sama = Jumlah merchant yang
                    berhasil diajak kerjasama / Target (3 Merchant)
                  </li>
                  <li className="italic">
                    % Jumlah WP yang memanfaatkan fasilitas merchant = Jumlah
                    Wajib Pajak yang memanfaatkan fasilitas merchant / Target
                    (10 Klaim per Merchant)
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Skor Jumlah Kolaborasi Merchant - Kanwil</CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable data={table1Data} />
            </CardContent>
          </Card>

          {/* Table 2 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Jumlah Kolaborasi Merchant - Per Cabang
              </CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable data={table2Data} />
            </CardContent>
          </Card>

          {/* Table 3 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Jumlah Kolaborasi Merchant - Per Samsat
              </CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor % Pemanfaatan Fasilitas Merchant - Kanwil
              </CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableSimple data={table4Data} />
            </CardContent>
          </Card>

          {/* Table 5 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor % Pemanfaatan Fasilitas Merchant - Cabang
              </CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable5 data={table5Data} />
            </CardContent>
          </Card>

          {/* Table 6 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor % Pemanfaatan Fasilitas Merchant - Samsat
              </CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable6 data={table6Data} />
            </CardContent>
          </Card>

          {/* Table 7 */}
          <Card>
            <CardHeader>
              <CardTitle>Pengisian Data Jumlah Merchant</CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableScroll data={table7Data} />
            </CardContent>
          </Card>

          {/* Table 8 */}
          <Card>
            <CardHeader>
              <CardTitle>Pengisian Data Klaim Merchant</CardTitle>
              <CardDescription>
                deskripsi singkat tentang tabel ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableScroll data={table8Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
