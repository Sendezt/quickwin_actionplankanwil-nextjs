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
import { CalendarDays, BarChart3, FileText, LandPlot, Radical } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable4 from "@/components/sosialisasikesamsatan/RenderTable4";
import React from "react";

export default function MenuTujuh() {
  const [table1Data, setTable1Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet7table1"
        );
        setTable1Data(await res1.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet7"
        );
        const json = await res.json();
        if (json) setRangeData(json);
      } catch (err) {
        console.error("Gagal fetch getRange-sheet7: ", err);
      }
    }

    fetchData();
    fetchRangeData();
  }, []);

  // Skeleton Card
  const SkeletonCard = () => (
    <Card className="p-0 overflow-hidden">
      <div className="px-5 py-3 border-b">
        <Skeleton className="h-4 w-1/4 mb-2" />
      </div>
      <CardContent className="py-6 px-5 space-y-2">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );

  const RenderTable = ({ data, isTable5 }) => {
    if (!data) return <Skeleton className="h-[200px] w-full" />;

    return (
      <div className="overflow-x-auto text-center">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {(Array.isArray(data?.header?.[0])
                ? data.header[0]
                : data?.header || []
              ).map((header, idx) => (
                <th
                  key={idx}
                  className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(data?.data) &&
              data.data.map((row, idx) => {
                // Nested (cabang + samsat)
                if (row?.cabang && Array.isArray(row?.samsat)) {
                  return (
                    <React.Fragment key={idx}>
                      <tr className="bg-gray-100">
                        <td
                          colSpan={data.header?.[0]?.length || 7}
                          className="border border-gray-300 px-4 py-2 text-sm font-bold"
                        >
                          {row.cabang}
                        </td>
                      </tr>
                      {row.samsat.map((samsatRow, samsatIdx) => {
                        if (
                          Array.isArray(samsatRow) &&
                          samsatRow.length === 1
                        ) {
                          return (
                            <tr key={samsatIdx} className="bg-green-100">
                              <td
                                colSpan={data.header?.[0]?.length || 7}
                                className="border border-gray-300 px-4 py-2 text-sm font-semibold text-green-800"
                              >
                                {samsatRow[0]}
                              </td>
                            </tr>
                          );
                        }
                        return (
                          <tr key={samsatIdx} className="hover:bg-gray-50">
                            {samsatRow.map((cell, cIdx) => {
                              // Tabel5: hilangkan 0 di kolom TOTAL KANWIL & TOTAL CABANG
                              if (
                                isTable5 &&
                                (cell === 0 || cell === "0") &&
                                cIdx >= samsatRow.length - 2
                              )
                                return (
                                  <td
                                    key={cIdx}
                                    className="border border-gray-300 px-4 py-2 text-sm"
                                  ></td>
                                );
                              return (
                                <td
                                  key={cIdx}
                                  className="border border-gray-300 px-4 py-2 text-sm"
                                >
                                  {cell}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                }

                // Flat data
                return (
                  <tr key={idx} className="hover:bg-gray-50">
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="border border-gray-300 px-4 py-2 text-sm"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            {/* Summary */}
            {data?.summary &&
              (Array.isArray(data.summary) ? (
                <tr className="font-medium text-center bg-gray-100">
                  {/* Kolom Total span 2 kolom */}
                  <td
                    colSpan={2}
                    className="border border-gray-300 px-4 py-2 text-sm font-bold text-center"
                  >
                    {data.summary[0]}
                  </td>

                  {data.summary.slice(1).map((cell, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ) : (
                // Summary berupa object (misalnya { total_kanwil: [...], total_cabang: [...] })
                Object.values(data.summary).map((row, idx) => (
                  <tr
                    key={idx}
                    className="font-medium bg-gray-50 hover:bg-gray-100"
                  >
                    {row.map((cell, cIdx) => {
                      if (
                        isTable5 &&
                        cIdx >= row.length - 2 &&
                        (cell === 0 || cell === "0")
                      ) {
                        return (
                          <td
                            key={cIdx}
                            className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                          ></td>
                        );
                      }
                      return (
                        <td
                          key={cIdx}
                          className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                        >
                          {cell || ""}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Skor dari summary
  const skorKanwil = table1Data?.summary?.[8] ?? "?";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Top Info */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
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
                    <p className="text-xs text-muted-foreground">
                      1 Objek Penelitian
                    </p>
                  </CardContent>
                </Card>

                {/* Formula */}
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Formula
                    </CardTitle>
                    <Radical className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="py-2 px-4">
                    <p className="mb-1 italic text-sm font-semibold text-gray-900">
                      Pertumbuhan Penerimaan SWDKLLJ via SIGNAL dan Layanan
                      Online
                    </p>
                    <p className="italic text-xs text-gray-600">
                      = Realisasi / Target
                    </p>
                    <br/>
                    <p className="italic text-xs text-blue-600">
                      *) Target pertumbuhan 5%
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Skor Kanwil */}
          <div className="grid gap-4 md:grid-cols-1">
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Skor Kanwil
                </h4>
                <div className="bg-yellow-200 rounded-full">
                  <BarChart3 className="h-4 w-4 text-yellow-700" />
                </div>
              </div>
              <CardContent className="pb-9">
                <div className="text-7xl font-bold text-yellow-900">
                  {skorKanwil}
                </div>
                <p className="text-xs text-muted-foreground">
                  Target Skor{" "}
                  <span className="text-gray-500">| 4 (Nilai Max)</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Rekapitulasi Penerimaan SIGNAL & Layanan Online
              </CardTitle>
              <CardDescription>Rekap</CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable data={table1Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
