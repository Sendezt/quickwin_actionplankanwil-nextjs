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
import { CalendarDays, BarChart3, FileText, Radical, LandPlot } from "lucide-react";
import Navbar from "@/components/navbar";
import RenderTable4 from "@/components/sosialisasikesamsatan/RenderTable4";
import React from "react";

export default function MenuEnam() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [table4Data, setTable4Data] = useState(null);
  const [table5Data, setTable5Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table1"
        );
        setTable1Data(await res1.json());

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table2"
        );
        setTable2Data(await res2.json());

        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table3"
        );
        setTable3Data(await res3.json());

        const res4 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table4"
        );
        setTable4Data(await res4.json());

        const res5 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet6table5"
        );
        setTable5Data(await res5.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet6"
        );
        const json = await res.json();
        if (json) setRangeData(json);
      } catch (err) {
        console.error("Gagal fetch getRange-sheet6: ", err);
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
      <div className="overflow-x-auto">
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
                // Summary berupa array biasa
                <tr className="font-medium bg-blue-50">
                  <td></td>
                  {data.summary.map((cell, idx) => (
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
                    className="font-medium bg-blue-50 hover:bg-blue-100"
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
  const skorKanwil = table3Data?.summary?.[5] ?? "?";
  const skorCabang = table2Data?.summary?.[5] ?? "?";
  const skorSamsat = table3Data?.summary?.[5] ?? "?";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Top Info */}
          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                <Card className="shadow-sm border border-dashed bg-muted/30">
                  <CardHeader className="flex flex-row items-center justify-between pb-1">
                    <CardTitle className="text-xs font-medium">
                      Periode Awal
                    </CardTitle>
                    <CalendarDays className="h-3 w-3 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center">
                    <div className="text-base font-semibold text-gray-900">
                      {rangeData.periode_awal}
                    </div>
                    <p className="text-xs">Tanggal Mulai Periode</p>
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
                  <CardContent className="flex flex-col justify-center">
                    <div className="text-base font-semibold text-gray-900">
                      {rangeData.periode_akhir}
                    </div>
                    <p className="text-xs">Tanggal Akhir Periode</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Skor Kanwil */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-blue-800">
                  Skor Kanwil
                </h4>
                <BarChart3 className="h-4 w-4 text-blue-700" />
              </div>
              <CardContent className="pb-4">
                <div className="text-6xl font-bold text-blue-900">
                  {skorKanwil}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            {/* Skor Cabang */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-green-800">
                  Skor Cabang
                </h4>
                <BarChart3 className="h-4 w-4 text-green-700" />
              </div>
              <CardContent className="pb-4">
                <div className="text-6xl font-bold text-green-900">
                  {skorCabang}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            {/* Skor Samsat Se-Jateng */}
            <Card className="p-0 overflow-hidden pb-4 text-center">
              <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Skor Samsat Se-Jateng
                </h4>
                <BarChart3 className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="pb-4">
                <div className="text-6xl font-bold text-yellow-900">
                  {skorSamsat}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Obyek Penilaian */}
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">
                  Obyek Penilaian
                </CardTitle>
                <LandPlot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-6 px-5">
                <ol className="list-decimal pl-5 text-sm font-bold text-gray-900 mb-1">
                  <li>Kantor Wilayah</li>
                  <li>Kantor Cabang</li>
                  <li>Kantor Samsat</li>
                </ol>
                <p className="text-xs text-muted-foreground">
                  3 Obyek Penilaian
                </p>
              </CardContent>
            </Card>

            {/* Banner Kesamsatan */}
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">
                  Banner Kesamsatan
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-4 px-5 space-y-3">
                <ol className="list-decimal pl-5 text-sm font-semibold text-gray-900">
                  <li>Banner Terkait Jasa Raharja</li>
                  <li>Banner Terkait JRku Reward</li>
                  <li>Banner Terkait Signal</li>
                  <li>Banner Terkait Layanan Online</li>
                  <li>Banner Terkait Fungsi Regident, PKB, dan SWDKLLJ</li>
                </ol>
              </CardContent>
            </Card>

            {/* Formula */}
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">Forumula</CardTitle>
                <Radical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-4 px-5 italic">
                <ol className="list-decimal pl-5 divide-y divide-gray-200 text-sm">
                  <li className="py-2 text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Terlaksananya Sosialisasi Kesamsatan di IG Kanwil
                    </span>
                    <span className="text-gray-600">
                      {" "}
                      = Realisasi / Target (8 Postingan per Bulan)
                    </span>
                  </li>
                  <li className="py-2 text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Terlaksananya Sosialisasi Kesamsatan di IG Cabang
                    </span>
                    <span className="text-gray-600">
                      {" "}
                      = Realisasi / Target (8 Postingan per Bulan Per Cabang)
                    </span>
                  </li>
                  <li className="py-2 text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Tersedianya Banner Kesamsatan
                    </span>
                    <span className="text-gray-600"> = Realisasi / Target</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Table 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Pelaksanaan Sosialisasi Kesamsatan - Kanwil</CardTitle>
              <CardDescription>
                Rekap data sosialisasi tingkat Kanwil
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
                Pelaksanaan Sosialisasi Kesamsatan - Per Cabang
              </CardTitle>
              <CardDescription>
                Detail pelaksanaan sosialisasi di tiap cabang
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
                Skor Pelaksanaan Sosialisasi Kesamsatan - Per Samsat
              </CardTitle>
              <CardDescription>
                Nilai akhir sosialisasi berdasarkan masing-masing Samsat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable data={table3Data} />
            </CardContent>
          </Card>

          {/* Table 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Pengisian Data Banner Sosialisasi Kesamsatan - Per Samsat
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Monitoring kelengkapan banner sosialisasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable4 data={table4Data} />
            </CardContent>
          </Card>

          {/* Table 5 */}
          <Card>
            <CardHeader>
              <CardTitle>
                Pengisian Data IG Sosialisasi Kesamsatan - Kanwil & Cabang
              </CardTitle>
              <CardDescription>
                Rekap postingan IG pada tingkat Kanwil dan Cabang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RenderTable data={table5Data} />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
