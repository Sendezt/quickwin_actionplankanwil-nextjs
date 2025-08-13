"use client";

import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, Line, YAxis } from "recharts";
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
import Navbar from "@/components/navbar";

export default function MenuDua() {
  const [tableData, setTableData] = useState(null);
  const [table1Data, setTable1Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet2"
        );
        const json = await res.json();
        setTableData(json.table2);
        setTable1Data(json.table1);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Skeleton Table
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

  const { headerTop, headerBottom, data, summary } = tableData || {};

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        {/* Navbar */}
        <Navbar />

        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
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
                    />
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
