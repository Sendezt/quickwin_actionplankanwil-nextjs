import React from "react";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export default function RenderTableArray({ data }) {
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const cabangs = data?.data || [];
  const summary = data?.summary || null;

  return (
    <div className="overflow-x-auto">
      <Table className="table-auto w-full border-collapse">
        {/* Header */}
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className={`px-2 py-2 text-sm whitespace-normal break-words ${
                  idx === 1 ? "text-left" : "text-center"
                }`}
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {cabangs.map((cabang, idx) => (
            <React.Fragment key={cabang.cabang || idx}>
              {/* Baris judul cabang */}
              <TableRow className="bg-gray-100">
                <TableCell
                  colSpan={headers.length}
                  className="font-bold px-2 py-2 text-left whitespace-normal break-words"
                >
                  {cabang.cabang}
                </TableCell>
              </TableRow>

              {/* Data samsat */}
              {cabang.samsat.map((row, rIdx) => (
                <TableRow key={`${cabang.cabang}-${rIdx}`}>
                  {row.map((cell, cidx) => (
                    <TableCell
                      key={cidx}
                      className={`px-2 py-1 text-sm whitespace-nowrap ${
                        cidx === 1 ? "text-left" : "text-center"
                      }`}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>

        {/* Footer summary */}
        {summary && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="font-bold text-center px-2 py-2 whitespace-normal break-words"
              >
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="font-semibold text-center px-2 py-2 whitespace-nowrap"
                >
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
