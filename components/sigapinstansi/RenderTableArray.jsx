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
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead key={idx} className="text-center">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {cabangs.map((cabang, idx) => (
            <React.Fragment key={cabang.cabang || idx}>
              {/* Baris judul cabang → kiri */}
              <TableRow className="bg-gray-100">
                <TableCell
                  colSpan={headers.length}
                  className="font-bold text-left"
                >
                  {cabang.cabang}
                </TableCell>
              </TableRow>

              {/* Data samsat → center */}
              {cabang.samsat.map((row, rIdx) => (
                <TableRow key={`${cabang.cabang}-${rIdx}`}>
                  {row.map((cell, cidx) => (
                    <TableCell key={cidx} className="text-center">
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
              <TableCell className="text-center" />
              <TableCell className="text-center" />

              {summary.map((cell, idx) => (
                <TableCell key={idx} className="font-semibold text-center">
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
