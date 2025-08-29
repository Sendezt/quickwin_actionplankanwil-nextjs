"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RenderTable({ data, isTable5 }) {
  if (!data) return <Skeleton className="h-[200px] w-full" />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            {(Array.isArray(data?.header?.[0])
              ? data.header[0]
              : data?.header || []
            ).map((header, idx) => (
              <th
                key={idx}
                className={
                  idx === 1
                    ? "border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
                    : "border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700"
                }
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data?.data) &&
            data.data.map((row, idx) => {
              // Nested (cabang + samsat)
              if (row?.cabang && Array.isArray(row?.samsat)) {
                return (
                  <React.Fragment key={idx}>
                    <tr className="bg-gray-100">
                      <td
                        colSpan={data.header?.[0]?.length || 7}
                        className="border border-gray-300 px-4 py-2 text-sm font-bold"
                      >
                        {row.cabang}
                      </td>
                    </tr>
                    {row.samsat.map((samsatRow, samsatIdx) => {
                      if (Array.isArray(samsatRow) && samsatRow.length === 1) {
                        return (
                          <tr key={samsatIdx} className="bg-green-100">
                            <td
                              colSpan={data.header?.[0]?.length || 7}
                              className="border border-gray-300 px-4 py-2 text-sm font-semibold text-green-800"
                            >
                              {samsatRow[0]}
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={samsatIdx} className="hover:bg-gray-50">
                          {samsatRow.map((cell, cIdx) => {
                            // Tabel5: hilangkan 0 di kolom TOTAL KANWIL & TOTAL CABANG
                            if (
                              isTable5 &&
                              (cell === 0 || cell === "0") &&
                              cIdx >= samsatRow.length - 2
                            )
                              return (
                                <td
                                  key={cIdx}
                                  className="border border-gray-300 px-4 py-2 text-sm"
                                ></td>
                              );
                            return (
                              <td
                                key={cIdx}
                                className={cIdx === 1 ? "border border-gray-300 px-4 py-2 text-sm text-left" : "border border-gray-300 px-4 py-2 text-sm text-center"}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              }

              // Flat data
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={
                        cIdx === 1
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

          {/* Summary */}
          {data?.summary &&
            (Array.isArray(data.summary) ? (
              <tr className="font-medium bg-blue-50">
                <td></td>
                {data.summary.map((cell, idx) => (
                  <td
                    key={idx}
                    className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ) : (
              Object.values(data.summary).map((row, idx) => (
                <tr
                  key={idx}
                  className="font-medium bg-blue-50 hover:bg-blue-100"
                >
                  {row.map((cell, cIdx) => {
                    if (
                      isTable5 &&
                      cIdx >= row.length - 2 &&
                      (cell === 0 || cell === "0")
                    ) {
                      return (
                        <td
                          key={cIdx}
                          className="border border-gray-300 px-4 py-2 text-sm font-semibold"
                        ></td>
                      );
                    }
                    return (
                      <td
                        key={cIdx}
                        className="border border-gray-300 px-4 py-2 text-sm font-semibold text-center"
                      >
                        {cell || ""}
                      </td>
                    );
                  })}
                </tr>
              ))
            ))}
        </tbody>
      </table>
    </div>
  );
}
