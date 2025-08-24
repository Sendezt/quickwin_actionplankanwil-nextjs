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
import RenderTable from "@/components/pendataanlaka/RenderTable";
import RenderTable2 from "@/components/pendataanlaka/RenderTable2";

export default function MenuThirdteen() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tabel 1
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet13/getsheet13table1"
        );
        setTable1Data(await res1.json());

        // Tabel 2
        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet13/getsheet13table2"
        );
        setTable2Data(await res2.json());
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

  const skorTotal = table1Data?.summary?.[5] ?? "-";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Cards Atas */}
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-0 overflow-hidden">
                  <div className="px-5 py-3 border-b">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                  </div>
                  <CardContent className="py-6 px-5 space-y-2">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {/* Baris 1 */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Kolom Kiri: Periode Awal + Akhir */}
                <div className="grid gap-4">
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
                </div>

                {/* Kolom Kanan: Skor Total */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Skor Total
                    </CardTitle>
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-extrabold text-blue-700">
                      {skorTotal}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Nilai Akhir (Max 4)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Baris 2: Objek Penilaian full width */}
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
            </div>
          )}

          {/* Formula */}
          <div className="grid gap-4">
            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Formula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-4 px-5 italic">
                <span className="font-semibold text-gray-900">
                  % pelunasan PKB dan SWDKLLJ kendaraan terlibat laka lantas
                </span>
                <span className="text-gray-600">
                  {" "}
                  = Jumlah kendaraan terlibat laka lantas yang lunas SW / Jumlah
                  Kendaraan terlibat laka
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Skor Kontribusi % Pelunasan Kendaraan Terlibat Laka - Per Cabang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable data={table1Data} />
            </CardContent>
          </Card>

          {/* Table 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Hasil Penerimaan SW Atas Kendaraan Terlibat Laka
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RenderTable2 data={table2Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
