"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { useTableData } from "@/hooks/anev/useDataAnev";
import DataTableSatu from "@/components/anev/DataTableSatu";
import MonthSelector from "@/components/anev/MonthSelector";

const TablePage = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    data1,
    header1,
    result1,
    data2,
    header2,
    result2,
    loading,
    message,
  } = useTableData("januari");

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="flex flex-col gap-6 min-h-screen w-full p-4 md:p-6">
          <MonthSelector
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />

          {message && <p className="mb-2 text-sm text-gray-600">{message}</p>}

          <DataTableSatu
            header={header1}
            data={data1}
            result={result1}
            loading={loading}
          />

          <DataTableSatu
            header={header2}
            data={data2}
            result={result2}
            loading={loading}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TablePage;
