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
              <TableHead
                key={idx}
                className={idx === 1 ? "text-left" : "text-center"}
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
                <TableCell colSpan={headers.length} className="font-bold">
                  {cabang.cabang}
                </TableCell>
              </TableRow>

              {/* Data samsat */}
              {cabang.samsat.map((row, rIdx) => (
                <TableRow key={`${cabang.cabang}-${rIdx}`}>
                  {row.map((cell, cidx) => (
                    <TableCell
                      key={cidx}
                      className={cidx === 1 ? "text-left" : "text-center"}
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
              <TableCell />
              <TableCell />

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
