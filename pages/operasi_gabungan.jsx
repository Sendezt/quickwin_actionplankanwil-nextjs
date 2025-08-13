"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar";
import PeriodeCard from "@/components/operasigabungan/PeriodeCard";
import TableCard from "@/components/operasigabungan/TableCard";

export default function MenuTiga() {
  const [table1Data, setTable1Data] = useState(null);
  const [table2Data, setTable2Data] = useState(null);
  const [rangeData, setRangeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [t1, t2, range] = await Promise.all([
        fetch("https://magangproject.vercel.app/api/google/getsheet3table1").then(res => res.json()),
        fetch("https://magangproject.vercel.app/api/google/getsheet3table2").then(res => res.json()),
        fetch("https://magangproject.vercel.app/api/google/getRange-sheet1").then(res => res.json())
      ]);
      setTable1Data(t1);
      setTable2Data(t2);
      setRangeData(range);
    }
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <Navbar />

        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {rangeData && (
            <div className="grid gap-4 md:grid-cols-2">
              <PeriodeCard
                title="Periode Awal"
                date={rangeData.periode_awal}
                description="Tanggal mulai periode"
              />
              <PeriodeCard
                title="Periode Akhir"
                date={rangeData.periode_akhir}
                description="Tanggal akhir periode"
              />
            </div>
          )}

          <TableCard
            title="Skor Pelaksanaan Operasi Gabungan - Per Cabang"
            description="Skor Pelaksanaan Operasi Gabungan"
            headers={table1Data?.header?.[0] ?? []}
            data={table1Data?.data ?? []}
            summary={table1Data?.summary ?? []}
            isLoading={!table1Data}
            highlightIndex={1}
          />

          <TableCard
            title="Skor Kontribusi Penerimaan Operasi Gabungan - Per Cabang"
            description="Skor Kontribusi Penerimaan Operasi Gabungan"
            headers={table2Data?.header?.[0] ?? []}
            data={table2Data?.data ?? []}
            summary={table2Data?.summary ?? []}
            isLoading={!table2Data}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
