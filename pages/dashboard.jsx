"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/navbar";

// import ChartJS
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [skorJatengData, setSkorJatengData] = useState(null);
  const [bestCabangData, setBestCabangData] = useState(null);
  const [cardDashboardData, setCardDashboardData] = useState([]);
  const [bestSamsatData, setBestSamsatData] = useState(null);
  const [cabangTables, setCabangTables] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchCardDashboard() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardcard"
        );
        const json = await res.json();

        if (json && Array.isArray(json.cards)) {
          setCardDashboardData(json.cards);
        } else {
          console.warn("Struktur data tidak valid:", json);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    async function fetchDataBestCabang() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardtable1"
        );
        const json = await res.json();

        if (json && Array.isArray(json.tables)) {
          setCabangTables(json.tables); // simpan semua tabel
          const table = json.tables.find(
            (t) => t.name === "Nilai Total Action Plan Cabang"
          );
          if (table) {
            setBestCabangData({ summary: table.data[0] });
          }
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    async function fetchDataBestSamsat() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardtable2"
        );
        const json = await res.json();

        if (json && Array.isArray(json.tables)) {
          const table = json.tables.find(
            (t) => t.name === "Nilai Total Action Plan SAMSAT"
          );
          if (table) {
            setBestSamsatData({
              summary: table.data[0],
            });
          }
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    async function fetchDataJateng() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getquickwinjateng"
        );
        const json = await res.json();

        if (json && json.data && Array.isArray(json.data)) {
          setSkorJatengData(json);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    }

    async function fetchDataChart() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardchart1"
        );
        const json = await res.json();

        if (json && Array.isArray(json.data)) {
          const labels = json.data.map((d) => d[0]);
          const values = json.data.map((d) => parseFloat(d[1]));

          setChartData({
            labels,
            datasets: [
              {
                label: json.name,
                data: values,
                backgroundColor: [
                  "#ef4444", // merah
                  "#22c55e", // hijau
                  "#3b82f6", // biru
                  "#f59e0b", // kuning
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error("Gagal fetch chart data:", err);
      }
    }

    fetchDataJateng();
    fetchDataBestCabang();
    fetchDataBestSamsat();
    fetchCardDashboard();
    fetchDataChart();
  }, []);

  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          {/* Navbar */}
          <Navbar />

          {/* Konten Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-6 lg:px-8">
            {/* Kolom kiri: Skor Jateng */}
            <Card className="row-span-2 p-0 overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-bold text-red-900">
                  Skor Action Plan Jateng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-4xl font-bold text-red-900">
                  {skorJatengData?.summary?.[2] ?? "-"}
                </div>
                <p className="text-sm text-gray-600">
                  Target Skor{" "}
                  <span className="text-green-700 font-bold">100</span> (nilai
                  max)
                </p>
              </CardContent>
            </Card>

            {/* Kolom tengah atas: Cabang Terbaik */}
            <Card className="row-span-1 p-0 overflow-hidden">
              <CardHeader className="bg-green-500 text-white p-2">
                <CardTitle className="text-sm">
                  Action Plan Cabang Terbaik
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between text-red-900 font-bold p-4">
                <span>{bestCabangData?.summary?.[1] ?? "-"}</span>
                <span>{bestCabangData?.summary?.[2] ?? "-"}</span>
              </CardContent>
            </Card>

            {/* Kolom kanan atas: Petunjuk */}
            <Card className="p-0 overflow-hidden">
              <CardContent className="p-4">
                <a
                  href="https://drive.google.com/file/d/1xkFeIieB7_Qp8RHBdRZRlp-VpQ6f-Lvz/view"
                  className="text-lg text-blue-700 font-bold hover:underline"
                >
                  Petunjuk Pengisian Action Plan
                </a>
                <p className="text-xs text-gray-600">
                  AS/SE/18/2025 Tentang Sarana Teknologi Action Plan SWDKLLJ
                  Tahun 2025
                </p>
              </CardContent>
            </Card>

            {/* Kolom tengah bawah: Samsat Terbaik */}
            <Card className="row-span-1 p-0 overflow-hidden">
              <CardHeader className="bg-green-900 text-white p-2">
                <CardTitle className="text-sm">
                  Action Plan Samsat Terbaik
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between text-red-900 font-bold p-4">
                <span>{bestSamsatData?.summary?.[1] ?? "-"}</span>
                <span>{bestSamsatData?.summary?.[2] ?? "-"}</span>
              </CardContent>
            </Card>

            {/* Kolom kanan bawah: Juknis */}
            <Card className="p-0 overflow-hidden">
              <CardContent className="p-4">
                <a
                  href="https://drive.google.com/file/d/1PKoplfsZnruv9zBwrNjDxrB8v7AumzqQ/view?usp=sharing"
                  className="text-lg text-blue-700 font-bold hover:underline"
                >
                  Juknis Penilaian Action Plan
                </a>
                <p className="text-xs text-gray-600">
                  Dokumen Petunjuk Teknis Action Plan Dalam Peningkatan Tingkat
                  Kepatuhan
                </p>
              </CardContent>
            </Card>

            {/* Render cards dari API */}
            {cardDashboardData.map((card, idx) => (
              <Card
                key={idx}
                className="p-0 overflow-hidden rounded-2xl shadow-md"
              >
                <CardHeader className="bg-green-900 text-white p-2">
                  <CardTitle className="text-sm">Action Plan Kanwil</CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-center text-red-900 font-bold">
                  {/* Skor utama */}
                  <div className="text-4xl mb-1">
                    {card.data?.[0]?.[0] ?? "-"}
                  </div>

                  {/* Persentase */}
                  <div className="text-lg text-red-600 mb-1">
                    {card.data?.[1]?.[0] ?? "-"}
                  </div>

                  {/* Skor max */}
                  <p className="text-sm text-gray-600">
                    {card.data?.[2]?.[0] ?? "-"} (skor max)
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* === Pie Chart di atas tabel === */}
            <Card className="col-span-3 p-0 overflow-hidden">
              <CardHeader className="bg-green-900 text-white p-2">
                <CardTitle className="text-sm">
                  Action Plan (Pie Chart)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {chartData ? (
                  <Pie data={chartData} />
                ) : (
                  <p className="text-gray-500 text-sm">Memuat chart...</p>
                )}
              </CardContent>
            </Card>

            {/* Render tabel khusus: Nilai Total Action Plan Cabang */}
            {cabangTables
              .filter((t) => t.name === "Nilai Total Action Plan Cabang")
              .map((table, idx) => (
                <Card key={idx} className="col-span-3 p-0 overflow-hidden">
                  <CardHeader className="bg-green-900 text-white p-2">
                    <CardTitle className="text-sm">{table.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          {table.header.map((col, i) => (
                            <th key={i} className="border px-3 py-2 text-left">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.data.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            {row.map((cell, j) => (
                              <td key={j} className="border px-3 py-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              ))}

            {/* Render tabel lainnya dalam grid 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3">
              {cabangTables
                .filter((t) => t.name !== "Nilai Total Action Plan Cabang")
                .map((table, idx) => (
                  <Card key={idx} className="p-0 overflow-hidden">
                    <CardHeader className="bg-green-900 text-white p-2">
                      <CardTitle className="text-sm">{table.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 overflow-x-auto">
                      <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            {table.header.map((col, i) => (
                              <th
                                key={i}
                                className="border px-2 py-1 text-left"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.data.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              {row.map((cell, j) => (
                                <td key={j} className="border px-2 py-1">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
