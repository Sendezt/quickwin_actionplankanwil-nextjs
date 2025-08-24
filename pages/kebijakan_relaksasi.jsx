"use client";

import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
  LabelList,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  FileText,
  LandPlot,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function MenuDua() {
  const [tableData, setTableData] = useState(null);
  const [table1Data, setTable1Data] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [periodeData, setPeriodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rangeData, setRangeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch existing data
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet2"
        );
        const json = await res.json();
        setTableData(json.table2);
        setTable1Data(json.table1);

        // Fetch breakdown skor data
        const breakdownRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet2card"
        );
        const breakdownJson = await breakdownRes.json();
        setBreakdownData(breakdownJson);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet2"
        );
        const json = await res.json();

        if (json) {
          setRangeData(json);
        } else {
          console.warn("Struktur data tidak valid", json);
        }
      } catch (err) {
        console.error("Gagal fetch getRange-sheet1: ", err);
      }
    }
    fetchData();
    fetchRangeData();
  }, []);

  // Skeleton Table Component
  const SkeletonTable = ({ rows = 5, cols = 6 }) => (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-2">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-6 w-24" />
          ))}
        </div>
      ))}
    </div>
  );

  // Hitung total skor dari breakdown data
  const totalSkor =
    breakdownData?.data?.reduce((total, item) => total + item.skor, 0) ?? 0;
  const targetSkor = 8; // nilai maksimum

  // Extract periode data dari API
  const periodeAwal = periodeData?.periode_awal || "Loading...";
  const periodeAkhir = periodeData?.periode_akhir || "Loading...";

  const { headerTop, headerBottom, data, summary } = tableData || {};

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        {/* Navbar */}
        <Navbar />

        {/* Konten Dashboard */}
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="col-span-1 p-0 overflow-hidden">
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
                {/* Tanggal Periode sebagai dua Card
                {rangeData?.periode_awal && rangeData?.periode_akhir && (
                  <>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Periode Awal
                        </CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {rangeData.periode_awal}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tanggal Mulai Periode
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Periode Akhir
                        </CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {rangeData.periode_akhir}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tanggal Akhir Periode
                        </p>
                      </CardContent>
                    </Card>
                  </>
                )} */}

                {/* Skor Total */}
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Skor Total
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalSkor}</div>
                    <p className="text-xs text-muted-foreground">
                      Target: {targetSkor} (nilai max)
                    </p>
                  </CardContent>
                </Card> */}

                {/* Breakdown Skor */}
                {/* <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Breakdown Skor
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
                      )) || (
                        <p className="text-xs text-muted-foreground">
                          Tidak ada data
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card> */}

                <div className="col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {/* Periode */}
                    {rangeData?.periode_awal && rangeData?.periode_akhir && (
                      <>
                        <Card className="shadow-sm border border-dashed bg-muted/30">
                          <CardHeader className="flex flex-row items-center justify-between pb-1">
                            <CardTitle className="text-xs font-medium">
                              Periode Awal
                            </CardTitle>
                            <CalendarDays className="h-3 w-3 text-muted-foreground" />
                          </CardHeader>
                          <CardContent className="py-1 px-4">
                            <div className="text-base font-semibold text-gray-900">
                              {rangeData.periode_awal}
                            </div>
                            <p className="text-xs">Tanggal Mulai</p>
                          </CardContent>
                        </Card>

                        <Card className="shadow-sm border border-dashed bg-muted/30">
                          <CardHeader className="flex flex-row items-center justify-between pb-1">
                            <CardTitle className="text-xs font-medium">
                              Periode Akhir
                            </CardTitle>
                            <CalendarDays className="h-3 w-3 text-muted-foreground" />
                          </CardHeader>
                          <CardContent className="py-1 px-4">
                            <div className="text-base font-semibold text-gray-900">
                              {rangeData.periode_akhir}
                            </div>
                            <p className="text-xs">Tanggal Akhir</p>
                          </CardContent>
                        </Card>
                      </>
                    )}

                    {/* Obyek Penilaian */}
                    <Card className="shadow-sm border border-dashed bg-muted/30">
                      <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-xs font-medium">
                          Obyek Penilaian
                        </CardTitle>
                        <LandPlot className="h-3 w-3 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-4">
                        <div className="text-base font-semibold text-gray-900">
                          Kantor Wilayah
                        </div>
                        <p className="text-xs">1 Obyek Penilaian</p>
                      </CardContent>
                    </Card>

                    {/* SK Gubernur */}
                    <Card className="shadow-sm border border-dashed bg-muted/30">
                      <CardHeader className="flex flex-row items-center justify-between pb-1">
                        <CardTitle className="text-xs font-medium">
                          SK Gubernur Jateng
                        </CardTitle>
                        <FileText className="h-3 w-3 text-muted-foreground" />
                      </CardHeader>
                      <CardContent className="py-1 px-4">
                        <a
                          href="https://drive.google.com/file/d/1zJc41CQkQ4MFStjR_TD9uIwD9FAN9ODm/view"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-blue-600 hover:underline block"
                        >
                          Surat Keputusan Gubernur Jawa Tengah
                        </a>
                        <p className="text-xs">
                          No. 100.3.3.1/87 Tahun 2025 tentang Pembebasan Pajak
                          Kendaraan Bermotor
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Row kedua untuk cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="col-span-1 p-0 overflow-hidden">
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
                {/* Skor Total */}
                <Card className="p-0 overflow-hidden pb-4 text-center">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Skor Total
                    </h4>
                    <div className="bg-blue-200 rounded-full">
                      <TrendingUp className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                  <CardContent className="pb-4">
                    <div className="text-7xl font-bold text-blue-900">
                      {totalSkor}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: {targetSkor} (Nilai Max)
                    </p>
                  </CardContent>
                </Card>

                {/* Breakdown Skor */}
                <Card className="p-0 overflow-hidden">
                  <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Breakdown Skor
                    </h4>
                    <div className="bg-blue-200 rounded-full">
                      <BarChart3 className="h-4 w-4 text-blue-700" />
                    </div>
                  </div>
                  <CardContent className="py-6 px-5 space-y-4">
                    {breakdownData?.data?.length > 0 ? (
                      breakdownData.data.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs text-gray-600 flex-1 pr-2">
                            {index + 1}. {item.judul}
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
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Deskripsi Forumula */}
          {!loading && (
            <Card className="p-0 overflow-hidden">
              {/* Header Card */}
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-t-xl px-5 py-3 flex items-center justify-between border-b">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Forumula
                </h4>
                <div className="bg-yellow-200 p-1 rounded-full">
                  <FileText className="h-4 w-4 text-yellow-700" />
                </div>
              </div>

              {/* Content Card */}
              <CardContent className="py-6 px-5 italic space-y-6">
                {/* Forumula 1 */}
                <div className="pb-4 border-b last:border-0">
                  <p className="text-sm leading-relaxed text-gray-600">
                    <span className="font-semibold text-gray-900">
                      1. Terlaksananya Kebijakan Relaksasi
                    </span>
                    {" = "}
                    <span>
                      Ketersediaan Surat Keputusan Gubernur atas Kebijakan
                      Pembebasan Denda, BBNKB II, dan Pajak Progresif / Target
                    </span>
                  </p>
                </div>

                {/* Forumula 2 */}
                <div className="pb-4 border-b last:border-0">
                  <p className="text-sm leading-relaxed text-gray-600">
                    <span className="font-semibold text-gray-900">
                      2. Pertumbuhan penerimaan SW di periode Relaksasi
                    </span>
                    {" = "}
                    <span>
                      Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n /
                      Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n-1
                      × 100 - 100
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ===== CHART DARI TABLE1 ===== */}
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle>Grafik Pertumbuhan</CardTitle>
              <CardDescription>Pertumbuhan per Loket Kantor</CardDescription>
            </CardHeader>
            <CardContent>
              {!loading && table1Data ? (
                <ChartContainer
                  config={{
                    growth: {
                      label: "Pertumbuhan (%)",
                      color: "var(--chart-1)",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <LineChart
                    data={table1Data.data.map((row) => ({
                      name: row[1], // Loket Kantor
                      growth: parseFloat(row[4].replace("%", "")), // ambil angka dari "125.86%"
                    }))}
                    margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
                  >
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      label={{
                        value: "Pertumbuhan (%)",
                        angle: -90,
                        position: "insideLeft",
                        offset: 10,
                      }}
                    />
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      padding={{ left: 20, right: 20 }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const value = payload[0].value;
                          return (
                            <div className="p-2 bg-white shadow rounded border text-sm">
                              <div className="font-semibold">{label}</div>
                              <div>Pertumbuhan: {value} %</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      dataKey="growth"
                      type="natural"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={{ fill: "var(--chart-1)" }}
                      activeDot={{ r: 6 }}
                    >
                      <LabelList
                        dataKey="growth"
                        position="top"
                        dy={-10} // atur jarak vertikal dari titik
                        formatter={(val) => `${val}%`}
                        className="text-xs fill-gray-700"
                      />
                    </Line>
                  </LineChart>
                </ChartContainer>
              ) : (
                <Skeleton className="h-[300px] w-full" />
              )}
            </CardContent>
          </Card>

          {/* ================= CARD UNTUK TABLE1 ================= */}
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Rekapitulasi Pertumbuhan Penerimaan SW Periode Pemutihan Per
                Cabang
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable
                  rows={5}
                  cols={table1Data?.header[0]?.length || 6}
                />
              ) : (
                <div className="overflow-x-auto w-full scrollbar-hide">
                  <Table className="min-w-max border border-gray-300 w-full">
                    <TableHeader>
                      <TableRow>
                        {table1Data.header[0].map((head, i) => (
                          <TableHead
                            key={i}
                            className="text-center min-w-[120px] border border-gray-300"
                          >
                            {head}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {table1Data.data.map((row, i) => (
                        <TableRow key={i}>
                          {row.map((cell, j) => (
                            <TableCell
                              key={j}
                              className={
                                `border-b border-r border-dotted border-gray-300 ` +
                                (j === 0
                                  ? "text-left font-medium"
                                  : "text-right")
                              }
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          className="font-bold border border-gray-300 text-left"
                        >
                          {table1Data.summary[0]}
                        </TableCell>
                        {table1Data.summary.slice(1).map((cell, j) => (
                          <TableCell
                            key={j}
                            className="font-bold border border-gray-300 text-right"
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ================= CARD UNTUK TABLE2 ================= */}
          <Card className="w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Rekapitulasi Pertumbuhan Penerimaan SW Periode Pemutihan Per
                Cabang
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonTable rows={5} cols={headerBottom?.length || 6} />
              ) : (
                <div className="overflow-x-auto w-full">
                  <Table className="min-w-max border border-gray-300 w-full">
                    <TableHeader>
                      {/* Baris pertama header */}
                      <TableRow>
                        <TableHead
                          rowSpan={2}
                          className="text-center min-w-[120px] sticky left-0 bg-white border border-gray-300 z-10 px-2 py-3"
                        >
                          {headerTop[0][0]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][1]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][2]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[180px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][3]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[180px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][4]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][5]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[180px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][6]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][7]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][8]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][9]}
                        </TableHead>
                        <TableHead
                          colSpan={1}
                          className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][10]}
                        </TableHead>
                        <TableHead
                          colSpan={4}
                          className="text-center min-w-[600px] border border-gray-300 px-2 py-1"
                        >
                          {headerTop[0][11]}
                        </TableHead>
                      </TableRow>

                      {/* Baris kedua header */}
                      <TableRow>
                        {headerBottom.map((item, index) => (
                          <TableHead
                            key={index}
                            className="text-center min-w-[120px] border border-gray-300 px-2 py-2 text-sm"
                          >
                            {item}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <TableCell
                              key={cellIndex}
                              className={
                                `border-b border-r border-dotted border-gray-300 ` +
                                (cellIndex === 0
                                  ? "text-left font-medium sticky left-0 bg-white"
                                  : "text-right") +
                                (cellIndex === 3 ||
                                cellIndex === 11 ||
                                cellIndex === 12 ||
                                cellIndex === 13 ||
                                cellIndex === 14
                                  ? " text-green-600"
                                  : "")
                              }
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        {summary.map((cell, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className={
                              `font-bold border border-gray-300 ` +
                              (cellIndex === 0
                                ? "text-left sticky left-0 bg-white"
                                : "text-right")
                            }
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

///fixxx ea -periode
