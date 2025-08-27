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
  FileText,
  LandPlot,
  Radical,
} from "lucide-react";
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
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet9/getsheet9table4"
        );
        setTable4Data(await res4.json());

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
          "https://magangproject.vercel.app/api/google/getRange-sheet9"
        );
        setRangeData(await res.json());
      } catch (err) {
        console.error("Gagal fetch getRange-sheet9: ", err);
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
          {/* Row 1: Periode Awal & Akhir */}
          {/* Row 1: Periode Awal & Akhir */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Periode Awal */}
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">
                  Periode Awal
                </CardTitle>
                <CalendarDays className="h-3 w-3 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-1 px-4">
                <div className="text-base font-semibold text-gray-900">
                  {rangeData?.periode_awal ?? "-"}
                </div>
                <p className="text-xs">Tanggal Mulai</p>
              </CardContent>
            </Card>

            {/* Periode Akhir */}
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
                <p className="text-xs">Tanggal Akhir</p>
              </CardContent>
            </Card>
          </div>

          {/* Row 2: Skor Kanwil, Cabang, Samsat */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Skor Kanwil */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-blue-800">
                  Skor Kanwil
                </h4>
                <BarChart3 className="h-4 w-4 text-blue-700" />
              </div>
              <CardContent className="text-center py-6">
                <div className="text-6xl font-bold text-blue-600">
                  {skorKanwil}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Target Skor | 4 (Nilai Max)
                </p>
              </CardContent>
            </Card>

            {/* Skor Cabang */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-green-800">
                  Skor Cabang
                </h4>
                <BarChart3 className="h-4 w-4 text-green-700" />
              </div>
              <CardContent className="text-center py-6">
                <div className="text-6xl font-bold text-green-600">
                  {skorCabang}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Target Skor | 4 (Nilai Max)
                </p>
              </CardContent>
            </Card>

            {/* Skor Samsat */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Skor Samsat Se-Jateng
                </h4>
                <BarChart3 className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="text-center py-6">
                <div className="text-6xl font-bold text-yellow-600">
                  {skorSamsat}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Target Skor | 4 (Nilai Max)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Row 3: Breakdown + (Obyek + Formula) */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Breakdown Komitmen Stakeholder */}
            <Card className="shadow-lg border-2 border-blue-500 bg-blue-50">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-base md:text-lg font-bold text-blue-800">
                  Breakdown Komitmen Stakeholder
                </CardTitle>
                <BarChart3 className="h-5 w-5 text-blue-700" />
              </CardHeader>

              <CardContent className="py-3 px-5">
                <div className="space-y-3">
                  {breakdownData?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm md:text-base text-gray-700 font-medium flex-1 pr-2">
                        {item.judul}
                      </span>
                      <span className="text-lg md:text-xl font-extrabold text-blue-900">
                        {item.skor}
                      </span>
                    </div>
                  ))}
                </div>

                {breakdownData?.target && (
                  <div className="mt-4 border-t border-blue-200 pt-3 flex justify-between items-center">
                    <span className="font-semibold text-gray-800 text-base">
                      {breakdownData.target.judul}
                    </span>
                    <span className="text-lg md:text-xl font-extrabold text-blue-900">
                      {breakdownData.target.skor}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Obyek + Formula jadi vertikal */}
            <div className="flex flex-col gap-4">
              {/* Obyek Penilaian */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">
                    Obyek Penilaian
                  </CardTitle>
                  <LandPlot className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-2 px-4 text-sm">
                  <ol className="list-decimal pl-5 font-semibold text-gray-900 space-y-0.5">
                    <li>Kantor Wilayah</li>
                    <li>Kantor Cabang</li>
                    <li>Kantor Samsat</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-1">
                    3 Obyek Penilaian
                  </p>
                </CardContent>
              </Card>

              {/* Formula */}
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">
                    Forumula
                  </CardTitle>
                  <Radical className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-2 px-4 italic text-sm">
                  <span className="font-semibold text-gray-900">
                    Terlaksananya sinergi yang diwujudkan dalam bentuk Komitmen
                    Bersama, yang terimplementasi ke dalam sebuah inisiatif
                    strategis, yang selanjutnya dilakukan analisa dan evaluasi
                    atas inisiatif yang dilakukan
                  </span>
                  <br />
                  <span className="text-gray-600">
                    = Ketersediaan komitmen (50%), Implementasi inisiatif
                    strategis (25%), dan ketersediaan hasil analisa dan evaluasi
                    (25%) / Target
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Skor Jumlah Komitmen Stakeholder - Kanwil</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                hic voluptatum corporis eius quisquam earum mollitia modi ipsa
                minus sit. Quis neque repellat molestias nostrum enim ipsa
                debitis unde quaerat?
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                exercitationem pariatur explicabo qui modi consequatur? Dolore
                voluptates deserunt nisi ratione! Beatae aperiam repellat
                distinctio eligendi officia aut repellendus eum neque?
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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia ipsum necessitatibus optio accusamus similique ratione
                aspernatur, expedita nulla soluta quae tempore harum esse alias.
                Maxime veniam deleniti architecto obcaecati repudiandae!
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                odit consequuntur dolores, dolorem sequi blanditiis harum
                deleniti. Ipsam mollitia saepe tenetur sed placeat praesentium
                iusto magnam. Necessitatibus expedita cum consectetur?
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
