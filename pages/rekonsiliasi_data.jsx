"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, BarChart3, FileText } from "lucide-react";
import Navbar from "@/components/navbar";

export default function MenuEmpat() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [table3Data, setTable3Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);
  const [cabangData, setCabangData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tabel 1 untuk ambil summary (nilai akhir samsat se jateng)
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table1"
        );
        const json1 = await res1.json();
        setTable1Data(json1);

        // Fetch table2Data
        const res2 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table2"
        );
        const json2 = await res2.json();
        setTable2Data(json2);

        // Fetch table3Data
        const res3 = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4table3"
        );
        const json3 = await res3.json();
        setTable3Data(json3);

        // Fetch Skor Cabang
        const cabangRes = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet4card"
        );
        const cabangJson = await cabangRes.json();
        setCabangData(cabangJson);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    async function fetchRangeData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getRange-sheet4"
        );
        const json = await res.json();
        if (json) {
          setRangeData(json);
        }
      } catch (err) {
        console.error("Gagal fetch getRange-sheet4: ", err);
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

  // Function to normalize nested data structure
  const normalizeTableData = (data) => {
    if (!Array.isArray(data)) return [];

    const normalizedRows = [];

    data.forEach((cabangItem) => {
      // Add cabang header row
      if (cabangItem.cabang) {
        normalizedRows.push([cabangItem.cabang, "", "", "", "", "", "", ""]);
      }

      // Add samsat rows
      if (Array.isArray(cabangItem.samsat)) {
        cabangItem.samsat.forEach((samsatRow) => {
          normalizedRows.push(samsatRow);
        });
      }
    });

    return normalizedRows;
  };

  // Function to normalize summary (no shift needed)
  const normalizeSummary = (summary) => {
    if (!Array.isArray(summary)) return [];
    return summary; // Return as-is, no shifting
  };

  // TableCard component
  const TableCard = ({
    title,
    description,
    headers,
    data,
    summary,
    isLoading,
    isNested = false,
  }) => {
    if (isLoading) {
      return (
        <Card className="w-full">
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      );
    }

    // Use normalized data only for nested tables (table2 and table3)
    const tableData = isNested ? normalizeTableData(data) : data;
    const tableSummary = isNested ? normalizeSummary(summary) : summary;

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {Array.isArray(headers) &&
                    headers.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 whitespace-pre-line"
                      >
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tableData) &&
                  tableData.map((row, rowIndex) => {
                    // Check if this is a cabang header row (only for nested tables)
                    const isCabangHeader =
                      isNested && row[1] === "" && row[0] !== "";

                    return (
                      <tr
                        key={rowIndex}
                        className={
                          isCabangHeader
                            ? "bg-gray-100 font-semibold"
                            : "hover:bg-gray-50"
                        }
                      >
                        {isCabangHeader ? (
                          <td
                            className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-semibold"
                            colSpan={headers.length}
                          >
                            {row[0]}
                          </td>
                        ) : (
                          Array.isArray(row) &&
                          row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                            >
                              {cell}
                            </td>
                          ))
                        )}
                      </tr>
                    );
                  })}
                {Array.isArray(tableSummary) && tableSummary.length > 0 && (
                  <tr className="bg-blue-50 font-semibold">
                    {["", ...tableSummary].map((summaryCell, summaryIndex) => (
                      <td
                        key={summaryIndex}
                        className="border border-gray-300 px-4 py-2 text-sm text-gray-900"
                      >
                        {summaryCell}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Ambil nilai akhir Samsat Se-Jateng (summary index ke-6)
  const skorSamsat = table1Data?.summary?.[6] ?? "-";

  // Ambil data cabang
  const skorCabangList = cabangData?.data ?? [];
  const targetSkor = cabangData?.summary?.[1] ?? "";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Grid utama */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Kolom 1: Periode Awal */}
            <Card className="shadow-sm border border-dashed bg-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">
                  Periode Awal
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="py-1 px-4">
                <div className="text-base font-semibold text-gray-900">
                  {rangeData?.periode_awal ?? "-"}
                </div>
                <p className="text-xs">Tanggal Mulai Periode</p>
              </CardContent>
            </Card>

            {/* Kolom 2 (row-span-2): Skor Samsat Se-Jateng */}
            <Card className="p-0 overflow-hidden row-span-2">
              <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-blue-800">
                  Skor Samsat Se-Jateng
                </h4>
                <div className="bg-blue-200 rounded-full">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
                <div className="text-7xl font-bold text-blue-900">
                  {skorSamsat}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nilai Akhir (Max 4)
                </p>
              </CardContent>
            </Card>

            {/* Kolom 1: Periode Akhir */}
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
                <p className="text-xs">Tanggal Akhir Periode</p>
              </CardContent>
            </Card>
          </div>

          {/* Grid kedua */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Kolom 1: Obyek Penilaian */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-green-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-green-800">
                  Obyek Penilaian
                </h4>
                <BarChart3 className="h-4 w-4 text-green-700" />
              </div>
              <CardContent className="py-6 px-5">
                <div className="text-lg font-bold text-gray-900 mb-1">
                  Kantor Samsat
                </div>
                <p className="text-sm text-muted-foreground">
                  1 Obyek Penilaian
                </p>
              </CardContent>
            </Card>

            {/* Kolom 2 (row-span-2): Skor Cabang */}
            <Card className="p-0 overflow-hidden row-span-2">
              <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
                <h4 className="text-sm font-semibold text-blue-800">
                  Skor Cabang
                </h4>
                <div className="bg-blue-200 rounded-full">
                  <BarChart3 className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <CardContent className="px-5 py-4 space-y-3">
                {skorCabangList.map(([cabang, skor], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-1xl border-b pb-1 last:border-0"
                  >
                    <span>{cabang}</span>
                    <span className="font-bold">{skor}</span>
                  </div>
                ))}

                <p className="text-xs text-muted-foreground pt-2">
                  Target Skor: {targetSkor}
                </p>
              </CardContent>
            </Card>

            {/* Forumula */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-yellow-100 px-5 py-3 border-b flex items-center justify-between">
                <h4 className="text-sm font-semibold text-yellow-800">
                  Forumula
                </h4>
                <FileText className="h-4 w-4 text-yellow-700" />
              </div>
              <CardContent className="py-6 px-5 italic space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-gray-900">
                      Terlaksananya Kegiatan Rekonsiliasi Data
                    </span>{" "}
                    = Realisasi Kegiatan / Target
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* === Tambahan Tabel === */}
          <TableCard
            title="Rekapitulasi Rekonsiliasi Data Per Cabang"
            description="Rekapitulasi hasil rekonsiliasi per cabang"
            headers={table1Data?.header?.[0] ?? []}
            data={table1Data?.data ?? []}
            summary={table1Data?.summary ?? []}
            isLoading={!table1Data}
            isNested={false}
          />
          <TableCard
            title="Skor Pelaksanaan Rekonsiliasi Data - Per Samsat"
            description="Skor pelaksanaan rekonsiliasi per Samsat"
            headers={table2Data?.header?.[0] ?? []}
            data={table2Data?.data ?? []}
            summary={table2Data?.summary ?? []}
            isLoading={!table2Data}
            isNested={true}
          />
          <TableCard
            title="Rekapitulasi Pelaksanaan Rekonsiliasi Data - Per Samsat"
            description="Rekapitulasi pelaksanaan rekonsiliasi data per Samsat"
            headers={table3Data?.header?.[0] ?? []}
            data={table3Data?.data ?? []}
            summary={table3Data?.summary ?? []}
            isLoading={!table3Data}
            isNested={true}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
