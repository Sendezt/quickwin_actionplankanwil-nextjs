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
import Navbar from "@/components/navbar";
import RenderTable from "@/components/quickwincabang/RenderTable";
import RenderTableInfo from "@/components/quickwincabang/RenderTableInfo";
import ChartBarGeneric from "@/components/quickwincabang/ChartBarGeneric";

export default function QuickwinCabang() {
  const [tables, setTables] = useState([]);
  const [tables2, setTables2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://quickwin-jateng.vercel.app/api/dashboard/getquickwincabangtable"
        );
        const json = await res.json();
        setTables(json.tables || []);

        const res2 = await fetch(
          "https://quickwin-jateng.vercel.app/api/dashboard/getquickwincabang"
        );
        const json2 = await res2.json();
        setTables2(json2);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTable = (name) => tables.find((t) => t.name === name) || null;

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
          {/* Kinerja Action Plan Total */}
          <div className="grid gap-4 text-center">
            <Card>
              <CardHeader>
                <CardTitle>Kinerja Action Plan Total</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-40 w-full" />
                ) : (
                  <RenderTable data={getTable("Kinerja Action Plan Total")} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Grid untuk tabel-tabel berikutnya */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                {/* Table 1. Kinerja Action Plan UU HKPD */}
                <Card>
                  <CardHeader>
                    <CardTitle>1. Kinerja Action Plan UU HKPD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable("1. Kinerja Action Plan UU HKPD")}
                    />
                  </CardContent>
                </Card>

                {/* Table 6. Kinerja Action Plan Sosialisasi Kesamsatan */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      6. Kinerja Action Plan Sosialisasi Kesamsatan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable(
                        "6. Kinerja Action Plan Sosialisasi Kesamsatan"
                      )}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                {/* Table 8. Kinerja Action Plan Kolaborasi Merchant */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      8. Kinerja Action Plan Kolaborasi Merchant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable(
                        "8. Kinerja Action Plan Kolaborasi Merchant"
                      )}
                    />
                  </CardContent>
                </Card>

                {/* 9. Kinerja Action Plan Komitmen Stakeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      9. Kinerja Action Plan Komitmen Stakeholder
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable(
                        "9. Kinerja Action Plan Komitmen Stakeholder"
                      )}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                {/* Table 10. Kinerja Action Plan SIGAP Prioritas */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      10. Kinerja Action Plan SIGAP Prioritas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable("10. Kinerja Action Plan SIGAP Prioritas")}
                    />
                  </CardContent>
                </Card>

                {/* Table 11. Kinerja Action Plan SIGAP Instansi */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      11. Kinerja Action Plan SIGAP Instansi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RenderTable
                      data={getTable("11. Kinerja Action Plan SIGAP Instansi")}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Card className="overflow-x-auto">
            <CardContent>
              {loading ? (
                <Skeleton className="h-40 w-full" />
              ) : (
                <RenderTableInfo data={tables2} />
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                <ChartBarGeneric
                  title="1. Kinerja Action Plan UU HKPD"
                  description="Prosentase per Loket"
                  data={getTable("1. Kinerja Action Plan UU HKPD")?.data}
                  color="#4285F4"
                  customTicks={[0, 50, 100, 150, 200]}
                />

                <ChartBarGeneric
                  title="6. Kinerja Action Plan Sosialisasi Kesamsatan"
                  description="Prosentase per Loket"
                  data={
                    getTable("6. Kinerja Action Plan Sosialisasi Kesamsatan")
                      ?.data
                  }
                  color="#0F9D58"
                  customTicks={[0, 25, 50, 75, 100]}
                />
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                <ChartBarGeneric
                  title="8. Kinerja Action Plan Kolaborasi Merchant"
                  description="Prosentase per Loket"
                  data={
                    getTable("8. Kinerja Action Plan Kolaborasi Merchant")?.data
                  }
                  color="#9333EA"
                  customTicks={[0, 10, 20, 30, 40, 50]}
                />

                <ChartBarGeneric
                  title="9. Kinerja Action Plan Komitmen Stakeholder"
                  description="Prosentase per Loket"
                  data={
                    getTable("9. Kinerja Action Plan Komitmen Stakeholder")
                      ?.data
                  }
                  color="#1E90FF"
                  customTicks={[0, 20, 40, 60, 80]}
                />
              </>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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
                <ChartBarGeneric
                  title="10. Kinerja Action Plan SIGAP Prioritas"
                  description="Prosentase per Loket"
                  data={
                    getTable("10. Kinerja Action Plan SIGAP Prioritas")?.data
                  }
                  color="#06B6D4"
                  customTicks={[0, 50, 100, 150, 200]}
                />

                <ChartBarGeneric
                  title="11. Kinerja Action Plan SIGAP Instansi"
                  description="Prosentase per Loket"
                  data={
                    getTable("11. Kinerja Action Plan SIGAP Instansi")?.data
                  }
                  color="#6A1B9A"
                  customTicks={[0, 50, 100, 150, 200]}
                />
              </>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
