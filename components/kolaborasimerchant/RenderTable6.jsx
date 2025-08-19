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

export default function RenderTable6({ data }) {
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const cabangRows = data?.data || [];
  const summary = data?.summary || null;
  const totalHeader = data?.totalHeader || "Total (Max 4)";
  const totalSummary = data?.totalSummary ?? "";
  const totalsRaw = Array.isArray(data?.total) ? data.total : [];

  // ---- LOGIKA INTI: totalIdx 1 -> 1, 2 -> 2, dst ----
  // buang hanya null/undefined (jangan buang "0.00")
  const flatTotal = totalsRaw.filter((v) => v !== null && v !== undefined);
  // jadikan 1-based index: totalByNo[1] = nilai untuk No=1, dst
  const totalByNo = [null, ...flatTotal];

  const fullHeaders = [...headers, totalHeader.replace("\n", " ")];

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-gray-300">
        {/* Header */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            {fullHeaders.map((col, idx) => (
              <TableHead
                key={idx}
                className={`border border-gray-300 px-2 py-2 font-bold ${
                  idx === 0
                    ? "text-center"
                    : idx === 1
                    ? "text-left"
                    : "text-right"
                }`}
              >
                {col.replace("\n", " ")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {cabangRows.map((group, gIdx) => (
            <React.Fragment key={gIdx}>
              {/* Baris Nama Cabang */}
              <TableRow className="bg-gray-200">
                <TableCell
                  colSpan={fullHeaders.length}
                  className="border border-gray-300 px-2 py-1 font-bold text-left"
                >
                  {group.cabang}
                </TableCell>
              </TableRow>

              {/* Baris Samsat */}
              {group.samsat.map((row, rIdx) => {
                const no = Number(row?.[0]); // kolom "No"
                const totalValue =
                  Number.isFinite(no) && no > 0 ? totalByNo[no] ?? "" : "";

                return (
                  <TableRow key={rIdx} className="hover:bg-gray-50">
                    {row.map((cell, cidx) => (
                      <TableCell
                        key={cidx}
                        className={`border border-gray-200 px-2 py-1 ${
                          cidx === 0
                            ? "text-center"
                            : cidx === 1
                            ? "text-left"
                            : "text-right"
                        }`}
                      >
                        {cell}
                      </TableCell>
                    ))}
                    {/* Kolom Total per baris (sejajar via No) */}
                    <TableCell className="border border-gray-200 px-2 py-1 font-semibold text-right">
                      {totalValue}
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
        </TableBody>

        {/* Summary (termasuk totalSummary di kolom terakhir) */}
        {(summary || totalSummary) && (
          <TableFooter>
            <TableRow className="bg-gray-50">
              {/* Merge TOTAL + kolom kosong supaya TOTAL di tengah */}
              <TableCell
                colSpan={2}
                className="border border-gray-300 px-2 py-1 font-semibold text-center"
              >
                {summary?.[0] ?? "TOTAL"}
              </TableCell>

              {/* Sisanya geser 1 kolom */}
              {summary?.slice(1).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="border border-gray-300 px-2 py-1 font-semibold text-right"
                >
                  {cell}
                </TableCell>
              ))}

              {/* Kolom terakhir totalSummary */}
              <TableCell className="border border-gray-300 px-2 py-1 font-bold text-right">
                {totalSummary}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
