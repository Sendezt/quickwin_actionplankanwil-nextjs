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

export default function RenderTable5({ data }) {
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const rows = (data?.data || []).filter((r) => r.length > 0);
  const summary = data?.summary || null;
  const total = (data?.total || []).filter((t) => t !== null);

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-300">
        {/* Header */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className={`border border-gray-300 px-2 py-2 font-bold ${
                  idx === 0 ? "text-center" : idx === 1 ? "text-left" : "text-right"
                }`}
              >
                {col.replace("\n", " ")}
              </TableHead>
            ))}
            {total && (
              <TableHead className="border border-gray-300 px-2 py-2 font-bold text-center">
                {data?.totalHeader ?? "TOTAL"}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} className="hover:bg-gray-50">
              {row.map((cell, cidx) => (
                <TableCell
                  key={cidx}
                  className={`border border-gray-200 px-2 py-1 ${
                    cidx === 0 ? "text-center" : cidx === 1 ? "text-left" : "text-right"
                  }`}
                >
                  {cell}
                </TableCell>
              ))}
              {total && (
                <TableCell className="border border-gray-200 px-2 py-1 font-semibold text-right">
                  {total[idx] ?? ""}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>

        {/* Footer / Summary */}
        {summary && (
          <TableFooter>
            <TableRow className="bg-gray-50">
              {/* gabungkan cell kosong + "Total" */}
              <TableCell
                colSpan={2}
                className="border border-gray-300 px-2 py-1 font-semibold text-center"
              >
                {summary[1] ?? "TOTAL"}
              </TableCell>

              {/* sisanya tetap jalan normal */}
              {summary.slice(2).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="border border-gray-300 px-2 py-1 font-semibold text-right"
                >
                  {cell}
                </TableCell>
              ))}

              {/* isi kolom total terakhir */}
              {total && (
                <TableCell className="border border-gray-300 px-2 py-1 font-semibold text-right">
                  {total[total.length - 1] ?? ""}
                </TableCell>
              )}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
