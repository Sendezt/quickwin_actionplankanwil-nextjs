"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";

// Import custom components
import {
  PeriodeCards,
  ScoreCards,
  FormulaCard,
  GrowthChart,
  DataTable1,
  DataTable2,
} from "../components/kebijakanrelaksasi/menuDua";

// Custom hooks
import { useMenuDuaData } from "../hooks/kebijakanrelaksasi/useDataMenuDua";

export default function MenuDua() {
  const { tableData, table1Data, breakdownData, rangeData, loading } =
    useMenuDuaData();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Periode Information */}
          <PeriodeCards rangeData={rangeData} loading={loading} />

          {/* Score Information */}
          <ScoreCards breakdownData={breakdownData} loading={loading} />

          {/* Formula Description */}
          <FormulaCard loading={loading} />

          {/* Growth Chart */}
          <GrowthChart table1Data={table1Data} loading={loading} />

          {/* Data Tables */}
          <DataTable1 table1Data={table1Data} loading={loading} />
          <DataTable2 tableData={tableData} loading={loading} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
