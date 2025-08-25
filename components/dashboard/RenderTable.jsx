"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowDown01, ArrowDown10 } from "lucide-react";

export default function RenderTable({ data }) {
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const rows = data?.data || [];
  const summary = data?.summary || null;

  // cari index kolom "Action Plan"
  const actionPlanIndex = headers.findIndex(
    (h) => String(h).toLowerCase().includes("action plan")
  );

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const sortedRows = [...rows];
  if (sortConfig.key === actionPlanIndex && sortConfig.direction) {
    sortedRows.sort((a, b) => {
      const valA = parseFloat(a[sortConfig.key]) || 0;
      const valB = parseFloat(b[sortConfig.key]) || 0;

      return sortConfig.direction === "asc" ? valA - valB : valB - valA;
    });
  }

  const handleSort = (idx) => {
    if (idx !== actionPlanIndex) return;

    let direction = "asc";
    if (sortConfig.key === idx) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }
    setSortConfig({ key: idx, direction });
  };

  const renderSortIcon = (idx) => {
    if (idx !== actionPlanIndex) return null;
    if (!sortConfig.direction) return <ArrowUpDown className="w-4 h-4 inline ml-1" />;
    if (sortConfig.direction === "asc")
      return <ArrowDown01 className="w-4 h-4 inline ml-1" />;
    if (sortConfig.direction === "desc")
      return <ArrowDown10 className="w-4 h-4 inline ml-1" />;
  };

  return (
    <div className="w-full">
      {/* Wrapper dengan overflow untuk mobile */}
      <div className="overflow-x-auto">
        <Table className="w-full min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50">
              {headers.map((col, idx) => (
                <TableHead
                  key={idx}
                  onClick={() => handleSort(idx)}
                  className={`text-center px-3 py-3 font-semibold text-gray-900 border border-gray-200 whitespace-nowrap select-none ${
                    idx === actionPlanIndex ? "cursor-pointer" : ""
                  }`}
                >
                  {col}
                  {renderSortIcon(idx)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {sortedRows.map((row, idx) => (
              <TableRow
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.map((cell, cidx) => (
                  <TableCell
                    key={cidx}
                    className="text-center px-3 py-2 border border-gray-200 whitespace-nowrap"
                  >
                    {/* Format angka jika berupa persentase atau desimal */}
                    {typeof cell === "string" && cell.includes("%") ? (
                      <span className="font-medium text-blue-600">{cell}</span>
                    ) : typeof cell === "number" ? (
                      <span className="font-medium">{cell.toFixed(2)}%</span>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          {summary && (
            <TableFooter>
              <TableRow className="bg-blue-50 font-semibold">
                <TableCell
                  colSpan={2}
                  className="font-bold text-center px-3 py-3 border border-gray-200 text-blue-900"
                >
                  {summary[0]}
                </TableCell>
                {summary.slice(1).map((cell, idx) => (
                  <TableCell
                    key={idx}
                    className="font-semibold text-center px-3 py-3 border border-gray-200 text-blue-900"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Responsive info untuk mobile */}
      <div className="mt-2 text-xs text-gray-500 md:hidden">
        ← Geser kiri/kanan untuk melihat semua kolom
      </div>
    </div>
  );
}
