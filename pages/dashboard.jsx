"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import RenderTable from "@/components/dashboard/RenderTable";
// import ChartJS
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [skorJatengData, setSkorJatengData] = useState(null);
  const [bestCabangData, setBestCabangData] = useState(null);
  const [cardDashboardData, setCardDashboardData] = useState([]);
  const [bestSamsatData, setBestSamsatData] = useState(null);
  const [bestSamsatCard, setBestSamsatCard] = useState(null);
  const [cabangTables, setCabangTables] = useState([]);
  const [chartData1, setChartData1] = useState(null);
  const [chartData2, setChartData2] = useState(null);

  const cardConfig = [
    {
      title: "Action Plan Kanwil",
      link: "/quickwin-kanwil",
      color: "bg-green-800",
    },
    {
      title: "Action Plan Cabang",
      link: "/quickwin-cabang",
      color: "bg-blue-800",
    },
    {
      title: "Action Plan Samsat",
      link: "/quickwin-samsat",
      color: "bg-yellow-600",
    },
  ];

  useEffect(() => {
    async function fetchCharts() {
      try {
        const res1 = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardchart1"
        );
        const data1 = await res1.json();

        if (data1?.data && Array.isArray(data1.data)) {
          setChartData1({
            labels: data1.data.map((item) => item[0]),
            datasets: [
              {
                data: data1.data.map((item) => parseFloat(item[1])),
                backgroundColor: ["#001BB7", "#347433", "#FFCC00", "#8C1007"],
              },
            ],
          });
        } else {
          console.warn("Struktur chart1 tidak sesuai:", data1);
        }

        const res2 = await fetch(
          "https://magangproject.vercel.app/api/dashboard/getdashboardchart2"
        );
        const data2 = await res2.json();

        if (data2?.data && Array.isArray(data2.data)) {
          setChartData2({
            labels: data2.data.map((item) => item[0]),
            datasets: [
              {
                data: data2.data.map((item) => parseFloat(item[1])),
                backgroundColor: ["#8C1007", "#DC2525", "#C83F12"],
              },
            ],
          });
        } else {
          console.warn("Struktur chart2 tidak sesuai:", data2);
        }
      } catch (error) {
        console.error("Gagal memuat data chart:", error);
      }
    }

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

          // cari tabel "Nilai Total Action Plan Cabang"
          const table = json.tables.find(
            (t) => t.name === "Nilai Total Action Plan Cabang"
          );

          if (table) {
            setBestCabangData({
              header: [table.header], // bungkus biar cocok dengan RenderTable
              data: table.data,
              summary: [table.data[0][1], table.data[0][2]],
              // misal summary menampilkan baris pertama
            });
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
          setBestSamsatData(json.tables);

          // cari tabel khusus untuk card
          const table = json.tables.find(
            (t) => t.name === "Nilai Total Action Plan SAMSAT"
          );
          if (table) {
            setBestSamsatCard({
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

    fetchDataJateng();
    fetchDataBestCabang();
    fetchDataBestSamsat();
    fetchCardDashboard();
    fetchCharts();
  }, []);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc, val) => acc + val, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${percentage}% (${value})`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          return ((value / total) * 100).toFixed(1) + "%";
        },
      },
    },
  };

  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          {/* Navbar */}
          <Navbar />

          {/* Container dengan padding yang lebih baik */}
          <div className="px-4 md:px-6 lg:px-8 space-y-6">
            {/* Section 1: Grid untuk cards dan info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kolom kiri: Skor Jateng */}
              <Card className="row-span-2 p-5 overflow-hidden text-center">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-bold text-red-900">
                    Skor Action Plan Jateng
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-6xl font-bold text-red-900">
                    {skorJatengData?.summary?.[2] ?? "-"}
                  </div>
                  <p className="text-sm text-gray-600">
                    Target Skor{" "}
                    <span className="text-green-700 font-bold">100</span> (Nilai
                    Max)
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/quickwin-jateng"
                      className="inline-block px-4 py-2 text-sm font-semibold text-white bg-red-900 rounded-lg hover:bg-red-800 transition"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Kolom tengah atas: Cabang Terbaik */}
              <Card className="row-span-1 p-0 overflow-hidden">
                <CardHeader className="bg-green-800 text-white p-2">
                  <CardTitle className="text-sm">
                    Action Plan Cabang Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between text-red-900 font-bold p-4">
                  <span>{bestCabangData?.summary?.[0] ?? "-"}</span>
                  <span>{bestCabangData?.summary?.[1] ?? "-"}</span>
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
                <CardHeader className="bg-green-800 text-white p-2">
                  <CardTitle className="text-sm">
                    Action Plan Samsat Terbaik
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between text-red-900 font-bold p-4">
                  <span>{bestSamsatCard?.summary?.[1] ?? "-"}</span>
                  <span>{bestSamsatCard?.summary?.[2] ?? "-"}</span>
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
                    Dokumen Petunjuk Teknis Action Plan Dalam Peningkatan
                    Tingkat Kepatuhan
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Action Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cardConfig.map((cfg, idx) => (
                <Card
                  key={idx}
                  className="p-0 overflow-hidden rounded-2xl shadow-md"
                >
                  {/* gunakan warna dari cardConfig */}
                  <CardHeader className={`${cfg.color} text-white p-2`}>
                    <div className="flex items-center justify-between w-full">
                      <CardTitle className="text-sm">{cfg.title}</CardTitle>
                      <Link href={cfg.link} className="hover:text-gray-200">
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 text-center text-red-900 font-bold">
                    <div className="text-4xl mb-1">
                      {cardDashboardData[idx]?.data?.[0]?.[0] ?? "-"}
                    </div>
                    <div className="text-lg text-red-600 mb-1">
                      {cardDashboardData[idx]?.data?.[1]?.[0] ?? "-"}
                    </div>
                    <p className="text-sm text-gray-600">
                      {cardDashboardData[idx]?.data?.[2]?.[0] ?? "-"} (Skor Max)
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Section 3: Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-0 overflow-hidden h-[400px] flex flex-col">
                <CardHeader className="bg-green-900 text-white p-2">
                  <CardTitle className="text-sm">
                    Action Plan (Pie Chart)
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  {chartData1 ? (
                    <div className="w-full h-full max-h-[320px]">
                      <Pie
                        data={chartData1}
                        options={{
                          ...options,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Memuat chart...</p>
                  )}
                </CardContent>
              </Card>

              <Card className="p-0 overflow-hidden h-[400px] flex flex-col">
                <CardHeader className="bg-blue-900 text-white p-2">
                  <CardTitle className="text-sm">
                    Kekurangan (Pie Chart)
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  {chartData2 ? (
                    <div className="w-full h-full max-h-[320px]">
                      <Pie
                        data={chartData2}
                        options={{
                          ...options,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Memuat chart...</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Tables */}
            <div className="space-y-6">
              {/* ===== Peringkat Action Plan Cabang ===== */}
              <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-3 text-center">
                Peringkat Action Plan Cabang
              </h2>

              {/* Tabel khusus: Nilai Total Action Plan Cabang - Full Width */}
              {cabangTables
                .filter(
                  (table) => table.name === "Nilai Total Action Plan Cabang"
                )
                .map((table, idx) => (
                  <div key={`main-${idx}`} className="w-full">
                    <Card className="overflow-hidden w-full">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold text-blue-900">
                          {table.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <RenderTable
                          data={{
                            header: [table.header],
                            data: table.data,
                            summary: table.summary,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                ))}

              {/* Tabel lainnya - 2 per baris */}
              {cabangTables.filter(
                (table) => table.name !== "Nilai Total Action Plan Cabang"
              ).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cabangTables
                    .filter(
                      (table) => table.name !== "Nilai Total Action Plan Cabang"
                    )
                    .map((table, idx) => (
                      <Card key={`other-${idx}`} className="overflow-hidden">
                        <CardHeader>
                          <CardTitle className="text-base font-semibold text-green-900">
                            {table.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <RenderTable
                            data={{
                              header: [table.header],
                              data: table.data,
                              summary: table.summary,
                            }}
                          />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </div>

            {/* Divider antar segmen */}
            <div className="my-8 border-t-4 border-dashed border-gray-400"></div>

            {/* Section: Tables SAMSAT */}
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-3 text-center">
              Peringkat Action Plan SAMSAT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {bestSamsatData?.map((table, idx) => (
                <Card key={idx} className="overflow-hidden w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-blue-900">
                      {table.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RenderTable
                      data={{
                        header: [table.header],
                        data: table.data,
                      }}
                    />
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
