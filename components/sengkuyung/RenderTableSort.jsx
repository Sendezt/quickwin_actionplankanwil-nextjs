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

export default function RenderTableSort({ data }) {
  if (!data) return null;

  const headerTop = data?.headerTop || [];
  const headerBottom = data?.headerBottom || [];
  const rows = data?.data || [];
  const summary = data?.summary || null;

  // Kolom "SR" yang bisa sorting
  const sortableIndices = [2, 5, 8, 11, 14];

  // Mapping index headerBottom ke index data
  const dataIndexMap = {
    2: 4,
    5: 7,
    8: 10,
    11: 13,
    14: 16,
  };

  // Default sort
  const [sortConfig, setSortConfig] = useState({
    key: 4,
    direction: "desc",
  });

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

  // Sort data
  const sortedRows = [...rows];
  if (sortConfig.key !== null) {
    sortedRows.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      const numA = parseFloat(valA);
      const numB = parseFloat(valB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return sortConfig.direction === "asc" ? numA - numB : numB - numA;
      } else {
        return sortConfig.direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });
  }

  return (
    <div className="overflow-x-auto border shadow-md">
      <Table className="min-w-full border-collapse text-sm">
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
                  className={`cursor-pointer select-none text-center border px-2 py-1 ${
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
              {row.map((cell, cidx) => {
                // Kolom 0 jadi nomor urut
                if (cidx === 0) {
                  return (
                    <TableCell
                      key={cidx}
                      className="text-center font-semibold border"
                    >
                      {idx + 1}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={cidx}
                    className={`border px-2 py-1 ${
                      typeof cell === "number" ? "text-right" : "text-center"
                    }`}
                  >
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>

        {/* Footer summary */}
        {summary && (
          <TableFooter>
            <TableRow className="bg-gray-100 font-bold">
              <TableCell colSpan={2} className="text-center border">
                {summary.total[0]}
              </TableCell>
              {summary.total.slice(1).map((cell, idx) => (
                <TableCell key={`total-${idx}`} className="text-center border">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="bg-gray-50 font-bold">
              <TableCell colSpan={2} className="text-center border">
                {summary.average[0]}
              </TableCell>
              {summary.average.slice(1).map((cell, idx) => (
                <TableCell key={`avg-${idx}`} className="text-center border">
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
