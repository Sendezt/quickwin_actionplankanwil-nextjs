"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { useDataMenuTiga } from "@/hooks/operasigabungan/useDataMenuTiga";
import {
  PeriodCards,
  ObjectCard,
  SupportLetterCard,
  ScoreCards,
  FormulaCard,
} from "@/components/operasigabungan/InfoCard";
import { TableSections } from "@/components/operasigabungan/TableSections";

export default function MenuTiga() {
  const {
    table1: table1Data,
    table2: table2Data,
    table3: table3Data,
    table4: table4Data,
    table5: table5Data,
    breakdown: breakdownData,
    range: rangeData,
    loading,
    totalSkor,
    targetSkor,
  } = useDataMenuTiga();

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          {/* Info Cards Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PeriodCards rangeData={rangeData} loading={loading} />
            <ObjectCard loading={loading} />
            <SupportLetterCard loading={loading} />
          </div>

          {/* Score Cards Row */}
          <div className="grid gap-4 md:grid-cols-2">
            <ScoreCards
              totalSkor={totalSkor}
              targetSkor={targetSkor}
              breakdownData={breakdownData}
              loading={loading}
            />
          </div>

          {/* Formula Card */}
          <FormulaCard loading={loading} />

          {/* Tables Section */}
          <TableSections
            table1Data={table1Data}
            table2Data={table2Data}
            table3Data={table3Data}
            table4Data={table4Data}
            table5Data={table5Data}
            loading={loading}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}