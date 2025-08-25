"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function RenderTable({ data }) {
  if (!data) return null;

  const headerTop = data?.headerTop || [];
  const headerBottom = data?.headerBottom || [];
  const rows = data?.data || [];

  // Kolom "SR" yang bisa di-sort
  const sortableIndices = [2, 5, 8, 11, 14];
  const dataIndexMap = {
    2: 4,   // Kendaraan SR
    5: 7,   // SWDKLLJ SR
    8: 10,  // PKB Provinsi SR
    11: 13, // PKB Opsen SR
    14: 16, // PNBP SR
  };

  const [sortConfig, setSortConfig] = useState({ key: 4, direction: "desc" });

  const handleSort = (headerIndex, dataIndex) => {
    if (sortConfig.key === dataIndex) {
      setSortConfig({
        key: dataIndex,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: dataIndex, direction: "desc" });
    }
  };

  // Sort rows
  const sortedRows = [...rows];
  if (sortConfig.key !== null) {
    sortedRows.sort((a, b) => {
      const numA = parseFloat(String(a[sortConfig.key]).replace("%", ""));
      const numB = parseFloat(String(b[sortConfig.key]).replace("%", ""));
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortConfig.direction === "asc" ? numA - numB : numB - numA;
      } else {
        return sortConfig.direction === "asc"
          ? String(a[sortConfig.key]).localeCompare(String(b[sortConfig.key]))
          : String(b[sortConfig.key]).localeCompare(String(a[sortConfig.key]));
      }
    });
  }

  return (
    <div className="overflow-x-auto border shadow-md">
      <Table className="min-w-full border-collapse text-sm text-center">
        <TableHeader>
          {/* Header Top */}
          <TableRow className="bg-gray-100 text-gray-800">
            <TableHead rowSpan={2} className="text-center font-bold border">
              {headerTop[0]}
            </TableHead>
            <TableHead rowSpan={2} className="text-center font-bold border">
              {headerTop[1]}
            </TableHead>
            {headerTop.slice(2).map((col, idx) => (
              <TableHead
                key={idx}
                colSpan={3}
                className="text-center font-bold border"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>

          {/* Header Bottom */}
          <TableRow className="bg-gray-50 text-gray-700">
            {headerBottom.map((col, idx) => {
              const dataIndex = dataIndexMap[idx];
              const isSortable = sortableIndices.includes(idx);

              return (
                <TableHead
                  key={idx}
                  onClick={() => isSortable && handleSort(idx, dataIndex)}
                  className={`cursor-pointer border px-2 py-1 ${
                    isSortable ? "hover:bg-gray-200" : ""
                  }`}
                >
                  {col}
                  {isSortable ? (
                    sortConfig.key === dataIndex ? (
                      <span className="ml-1 text-blue-600">
                        {sortConfig.direction === "asc" ? "▲" : "▼"}
                      </span>
                    ) : (
                      <span className="ml-1 text-gray-400">⇅</span>
                    )
                  ) : null}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sortedRows.map((row, idx) => (
            <TableRow
              key={idx}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
            >
              {row.map((cell, cidx) => (
                <TableCell
                  key={cidx}
                  className={`border px-2 py-1 ${
                    cidx === 0
                      ? "font-semibold"
                      : typeof cell === "number"
                      ? "text-right"
                      : "text-center"
                  }`}
                >
                  {cidx === 0 ? idx + 1 : cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
