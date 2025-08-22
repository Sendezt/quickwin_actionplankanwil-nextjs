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
import { CalendarDays, BarChart3, FileText } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/komitmenstakeholder/RenderTable";
import RenderTableArray from "@/components/komitmenstakeholder/RenderTableArray";
import RenderTableScroll from "@/components/komitmenstakeholder/RenderTableScroll";

export default function MenuNine() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tabel 1
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table1"
        );
        setTable1Data(await res1.json());

        // Tabel 2
        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table2"
        );
        setTable2Data(await res2.json());

        // Tabel 3
        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table3"
        );
        setTable3Data(await res3.json());

        // Tabel 4
        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table4"
        );
        setTable4Data(await res4.json());

        // Breakdown skor
        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9card"
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

  const skorKanwil = table1Data?.data?.[0]?.[9] ?? "?";
  const skorCabang = table2Data?.summary?.[8] ?? "?";
  const skorSamsat = table3Data?.summary?.[8] ?? "?";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
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
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
                  <CardContent>
                    <div className="text-2xl font-bold">{skorCabang}</div>
                    <p className="text-xs text-muted-foreground">
                      Nilai Akhir (Max 4)
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Skor Samsat + Obyek */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Skor Samsat Se-Jateng
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{skorSamsat}</div>
                <p className="text-xs text-muted-foreground">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="bg-green-100 px-5 py-3 border-b flex items-center justify-between">
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
          </div>

          {/* Breakdown Skor */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Breakdown Komitmen Stakeholder
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
                {breakdownData?.target && (
                  <div className="mt-3 border-t pt-2 text-sm text-gray-700 flex justify-between">
                    <span>{breakdownData.target.judul}</span>
                    <span className="font-bold">
                      {breakdownData.target.skor}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Forumula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-4 px-5 italic">
                <span className="font-semibold text-gray-900">
                  Terlaksananya sinergi yang diwujudkan dalam bentuk Komitmen
                  Bersama, yang terimplementasi ke dalam sebuah inisiatif
                  strategis, yang selanjutnya dilakukan analisa dan evaluasi
                  atas inisiatif yang dilakukan
                </span>
                <span className="text-gray-600">
                  {" "}
                  = Ketersediaan komitmen (50%), Implementasi inisiatif
                  strategis (25%), dan ketersediaan hasil analisa dan evaluasi
                  (25%) / Target
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Skor Jumlah Komitmen Stakeholder - Kanwil</CardTitle>
              <CardDescription>
                Ringkasan total skor komitmen stakeholder di tingkat Kantor
                Wilayah sebagai gambaran umum pencapaian secara agregat.
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
                Skor Jumlah Komitmen Stakeholder - Per Cabang
              </CardTitle>
              <CardDescription>
                Perbandingan skor komitmen stakeholder pada setiap cabang untuk
                melihat kontribusi masing-masing unit kerja.
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
                Skor Jumlah Komitmen Stakeholder - Per Samsat
              </CardTitle>
              <CardDescription>
                Detail skor komitmen stakeholder berdasarkan Samsat di setiap
                cabang untuk analisis yang lebih spesifik.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Pengisian Data Komitmen Stakeholder</CardTitle>
              <CardDescription>
                Rekapitulasi data implementasi dan evaluasi komitmen stakeholder
                yang telah diinput pada periode berjalan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableScroll data={table4Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
