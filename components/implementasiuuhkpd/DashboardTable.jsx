// components\implementasiuuhkpd\DashboardTable.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/implementasiuuhkpd/DataTable";
import { TableSkeleton } from "./TableSkeleton";

export function DashboardTable({ dashboardData, isLoading }) {
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
      <CardHeader>
        <CardTitle className="text-xl">
          Rekapitulasi{" "}
          <span className="text-yellow-500">Implementasi UU HKPD</span> Per
          Cabang
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              headers={headers}
              data={dashboardData.data}
              summary={dashboardData.summary}
              expandedRows={expandedRows}
              onToggleRow={toggleRow}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
