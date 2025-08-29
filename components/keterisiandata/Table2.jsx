"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkorSamsat({ table2Data }) {
  if (!table2Data) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {Array.isArray(table2Data?.header?.[0]) &&
              table2Data.header[0].map((header, idx) => (
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
          {Array.isArray(table2Data?.data) &&
            table2Data.data.map((cabangData, cabangIdx) => (
              <React.Fragment key={cabangIdx}>
                {/* Header cabang */}
                <tr className="bg-gray-100">
                  <td
                    colSpan={table2Data.header?.[0]?.length || 7}
                    className="border border-gray-300 px-4 py-2 text-sm font-bold"
                  >
                    {cabangData.cabang}
                  </td>
                </tr>

                {/* Data samsat dalam cabang */}
                {Array.isArray(cabangData.samsat) &&
                  cabangData.samsat.map((samsatRow, samsatIdx) => {
                    // Jika hanya 1 kolom (seperti "CAB SURAKARTA")
                    if (Array.isArray(samsatRow) && samsatRow.length === 1) {
                      return (
                        <tr key={samsatIdx} className="bg-green-100 ">
                          <td
                            colSpan={table2Data.header?.[0]?.length || 7}
                            className="border border-gray-300 px-4 py-2 text-sm font-semibold text-green-800"
                          >
                            {samsatRow[0]}
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={samsatIdx} className="hover:bg-gray-50">
                        {Array.isArray(samsatRow) &&
                          samsatRow.map((cell, cellIdx) => (
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
                    );
                  })}
              </React.Fragment>
            ))}
          {/* Summary row */}
          {Array.isArray(table2Data?.summary) && (
            <tr className="font-medium">
              {/* Merge kolom pertama dan kedua */}
              <td
                colSpan={2}
                className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
              >
                {table2Data.summary[0]} {/* isi dengan summary pertama */}
              </td>

              {/* Sisanya render mulai dari index ke-1 */}
              {table2Data.summary.slice(1).map((cell, cellIdx) => (
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
