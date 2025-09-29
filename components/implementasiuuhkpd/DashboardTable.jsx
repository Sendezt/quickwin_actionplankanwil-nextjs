// components/implementasiuuhkpd/DashboardTable.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/implementasiuuhkpd/DataTable";
import { TableSkeleton } from "./TableSkeleton";
import { Button } from "../ui/button";

export function DashboardTable({ dashboardData, isLoading, onOpenFeedback }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (rowIndex) => {
    setExpandedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((i) => i !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const headerRows = dashboardData?.header ?? [];
  const headers =
    headerRows.find((row) => row.some((cell) => cell !== "")) ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center gap-2">
          Rekapitulasi{" "}
          <span className="text-yellow-500">Implementasi UU HKPD</span> Per
          Cabang
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFeedback}
          className="cursor-pointer hover:bg-blue-600 hover:text-white transition"
        >
          Feedback
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              headers={headers}
              data={dashboardData?.data ?? []}
              summary={dashboardData?.summary ?? []}
              expandedRows={expandedRows}
              onToggleRow={toggleRow}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
