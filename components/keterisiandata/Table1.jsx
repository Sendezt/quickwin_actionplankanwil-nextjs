"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableRekapitulasi({ table1Data }) {
  if (!table1Data) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {table1Data?.header?.[0]?.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(table1Data?.data) &&
            table1Data.data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                {Array.isArray(row) &&
                  row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={
                        cellIdx === 1
                          ? "border border-gray-300 px-4 py-2 text-sm text-left"
                          : "border border-gray-300 px-4 py-2 text-sm text-center"
                      }
                    >
                      {cell}
                    </td>
                  ))}
              </tr>
            ))}
          {/* Summary row */}
          {Array.isArray(table1Data?.summary) && (
            <tr className="bg-gray-200 font-medium">
              {/* Merge kolom 1 & 2, isi dengan summary pertama */}
              <td
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
              >
                {table1Data.summary[0]}
              </td>

              {/* Render sisa summary mulai dari index 1 */}
              {table1Data.summary.slice(1).map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                >
                  {cell}
                </td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
