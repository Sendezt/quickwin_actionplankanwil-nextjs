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

export default function RenderTable2({ data }) {
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const rows = data?.data || [];
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
                className={
                  idx === 1 ? "text-left font-bold" : "text-center font-bold"
                }
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {rows.map((row, rIdx) => (
            <TableRow key={rIdx}>
              {row.map((cell, cIdx) => (
                <TableCell
                  key={cIdx}
                  className={cIdx === 1 ? "text-left" : "text-center"}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {/* Footer summary */}
        {summary && (
          <TableFooter>
            <TableRow>
              {/* colspan untuk gabung sel pertama */}
              <TableCell colSpan={2} className="font-bold text-center">
                Total
              </TableCell>

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
