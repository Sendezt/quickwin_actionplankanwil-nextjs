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
import RenderTable from "@/components/wablast/RenderTable";
import RenderTableArray from "@/components/wablast/RenderTableArray";

export default function MenuTwelve() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tabel 1
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table1"
        );
        setTable1Data(await res1.json());

        // Tabel 2
        const res2 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table2"
        );
        setTable2Data(await res2.json());

        // Tabel 3
        const res3 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table3"
        );
        setTable3Data(await res3.json());

        // Tabel 4
        const res4 = await fetch(
          "https://magangproject.vercel.app/api/sheet12/getsheet12table4"
        );
        setTable4Data(await res4.json());
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

  const skorTotal = table1Data?.data?.[0]?.[6] ?? "-";

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
                      Skor Total
                    </CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{skorTotal}</div>
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
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      Kantor Wilayah
                    </div>
                    <p className="text-sm text-muted-foreground">
                      1 Obyek Penilaian
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Forumula */}
          <div className="grid gap-4">
            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Forumula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-4 px-5 italic">
                <span className="font-semibold text-gray-900">
                  Kontribusi SW Terkutip dari Tunggakan
                </span>
                <span className="text-gray-600">
                  {" "}
                  = Realisasi SW Terkutip / Tunggakan SW
                </span>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Skor Kontribusi Penerimaan WA Blast - Kanwil
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis esse vitae harum nisi velit fugit minus deleniti
                voluptas, temporibus cumque hic, beatae dicta veniam eaque alias
                illo sequi, eligendi omnis.
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
                Skor Kontribusi Penerimaan WA Blast - Per Cabang
              </CardTitle>
              <CardDescription>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
                id voluptates molestiae natus provident sint quibusdam fugiat
                dolores eveniet quod voluptate doloremque excepturi consequuntur
                totam culpa, at magnam deserunt veritatis?
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
                Skor Kontribusi Penerimaan WA Blast - Per Samsat
              </CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                nihil veritatis commodi, voluptas eius cum quibusdam! Blanditiis
                debitis laboriosam adipisci voluptate ad quod. Voluptatem,
                numquam aliquam explicabo voluptatibus similique optio!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Hasil Penerimaan Atas Kegiatan WA Blast</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem facilis provident labore distinctio doloremque
                placeat, in rerum. Corporis iure voluptas soluta eum, libero
                incidunt quo, dolorem illum repudiandae ipsum ducimus!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTableArray data={table4Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
