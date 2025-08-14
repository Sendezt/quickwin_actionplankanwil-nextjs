"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartBarMultiple } from "@/components/chart-bar-multiple";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  CalendarDays,
} from "lucide-react";

import Navbar from "@/components/navbar";
import DetailTable from "@/components/DetailTable";

export default function MenuSatu() {
  const [dashboardData, setDashboardData] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [expandRow, setExpandRow] = useState(null);

  useEffect(() => {
    let interval;

    async function fetchData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet1"
        );
        const json = await res.json();

        // Perbaikan: pastikan struktur data valid
        if (json && json.data && Array.isArray(json.data)) {
          setDashboardData(json);
        } else {
          console.warn("Struktur data tidak valid:", json);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet1"
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

    fetchData(); // Initial fetch
    fetchRangeData();

    interval = setInterval(fetchData, 10000); // Fetch ulang setiap 60 detik

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const isLoading = !dashboardData;

  const headerRows = dashboardData?.header ?? [];
  const headers =
    headerRows.find((row) => row.some((cell) => cell !== "")) ?? [];

  const totalOffices = dashboardData?.data?.length ?? 0;
  const totalPotential = parseInt(dashboardData?.summary?.[2] || "0");
  const totalTarget = parseInt(dashboardData?.summary?.[3] || "0");
  const totalRealization = parseInt(dashboardData?.summary?.[5] || "0");
  const toggleRow = (index) => {
    setExpandRow(expandRow === index ? null : index);
  };

  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          {/* Navbar */}
          <Navbar />

          {/* Konten Dashboard */}
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="col-span-2 p-0 overflow-hidden">
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
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Kantor
                      </CardTitle>
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalOffices}</div>
                      <p className="text-xs text-muted-foreground">
                        Loket kantor aktif
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Potensi
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalPotential}</div>
                      <p className="text-xs text-muted-foreground">
                        Potensi Kab/Kota
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Target Pelaksanaan
                      </CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{totalTarget}</div>
                      <p className="text-xs text-muted-foreground">
                        Target UU HKPD
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Realisasi
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {totalRealization}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Realisasi Pelaksanaan
                      </p>
                    </CardContent>
                  </Card>
                  {/* Tanggal Periode sebagai dua Card */}
                  {rangeData?.periode_awal && rangeData?.periode_akhir && (
                    <>
                      <Card className="col-span-2 p-0 overflow-hidden">
                        <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                          <h4 className="text-sm font-semibold text-yellow-800">
                            Periode Awal
                          </h4>
                          <div className="bg-yellow-200 rounded-full">
                            <CalendarDays className="h-4 w-4 text-yellow-700" />
                          </div>
                        </div>
                        <CardContent className="py-6 px-5">
                          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                            {rangeData.periode_awal}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Tanggal mulai periode
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="col-span-2 p-0 overflow-hidden">
                        <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                          <h4 className="text-sm font-semibold text-yellow-800">
                            Periode Akhir
                          </h4>
                          <div className="bg-yellow-200 rounded-full">
                            <CalendarDays className="h-4 w-4 text-yellow-700" />
                          </div>
                        </div>
                        <CardContent className="py-6 px-5">
                          <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                            {rangeData.periode_akhir}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Tanggal akhir periode
                          </p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  <Card className="col-span-2 p-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-xl px-5 py-3 flex items-center justify-between border-b">
                      <h4 className="text-sm font-semibold text-blue-800">
                        Skor Kanwil
                      </h4>
                      <div className="bg-blue-200 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4 text-blue-700" />
                      </div>
                    </div>
                    <CardContent className="py-6 px-5">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {dashboardData?.summary?.[7] ?? "-"}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nilai Total Kanwil{" "}
                        <span className="text-gray-500">| 4 (Nilai Max)</span>
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="col-span-2 p-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-t-xl px-5 py-3 flex items-center justify-between border-b">
                      <h4 className="text-sm font-semibold text-blue-800">
                        Skor Cabang
                      </h4>
                      <div className="bg-blue-200 p-1 rounded-full">
                        <TrendingUp className="h-4 w-4 text-blue-700" />
                      </div>
                    </div>
                    <CardContent className="py-6 px-5">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {dashboardData?.summary?.[7] ?? "-"}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Nilai Total Cabang{" "}
                        <span className="text-gray-500">| 4 (Nilai Max)</span>
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {dashboardData && dashboardData.data && (
              <ChartBarMultiple data={dashboardData.data} />
            )}

            {/* Tabel */}
            <Card>
              <CardHeader>
                <CardTitle>Data Pelaksanaan UU HKPD</CardTitle>
                <CardDescription>
                  Monitoring pelaksanaan Undang-Undang Hubungan Keuangan Pusat
                  dan Daerah
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex gap-2">
                          {[...Array(8)].map((__, i2) => (
                            <Skeleton key={i2} className="h-6 flex-1" />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table className="w-full table-fixed border border-gray-300 border-collapse">
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          {headers.map((header, index) => (
                            <TableHead
                              key={index}
                              className="border border-gray-300 text-center px-2 py-1 text-sm font-semibold whitespace-pre-line min-w-[120px]"
                            >
                              {header}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dashboardData.data.map((row, index) => (
                          <React.Fragment key={index}>
                            <TableRow className="border border-gray-300">
                              {row
                                .filter((cell) => cell !== "")
                                .map((cell, cellIndex) => (
                                  <TableCell
                                    key={cellIndex}
                                    className="border border-gray-300 text-center px-2 py-1 text-sm cursor-pointer"
                                    onClick={() => {
                                      if (cellIndex === 1) toggleRow(index); // hanya kolom Loket Kantor bisa diklik
                                    }}
                                  >
                                    {cellIndex === 1 ? (
                                      <Badge className="bg-blue-300 text-blue-800 hover:bg-blue-100 cursor-pointer">
                                        {cell}
                                      </Badge>
                                    ) : cellIndex === 6 && cell === "100" ? (
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        {cell}
                                      </Badge>
                                    ) : (
                                      cell
                                    )}
                                  </TableCell>
                                ))}
                            </TableRow>

                            {/* Row Detail */}
                            {expandRow === index && (
                              <TableRow className="bg-gray-50">
                                <TableCell colSpan={row.length} className="p-2">
                                  <DetailTable loket={row[1]} />
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}

                        {/* Summary Row */}
                        <TableRow className="bg-gray-200 font-medium">
                          <TableCell
                            colSpan={2}
                            className="border border-gray-300 text-center font-semibold"
                          >
                            <Badge variant="secondary">
                              {dashboardData.summary[1]}
                            </Badge>
                          </TableCell>
                          {dashboardData.summary
                            .slice(2)
                            .filter((cell) => cell !== "")
                            .map((cell, index) => (
                              <TableCell
                                key={index}
                                className="border border-gray-300 text-center font-semibold"
                              >
                                {cell}
                              </TableCell>
                            ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
