"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TableSamsat({
  title,
  description,
  tableData,
}) {
  if (!tableData) return null;

  const headers = tableData.header?.[0] || [];
  const groupedData = tableData.data || [];
  const summary = tableData.summary || [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {title || "Skor Pelaksanaan Operasi Gabungan - Per Samsat"}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="border border-gray-300 border-collapse w-full text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100">
              {headers.map((header, i) => (
                <TableHead
                  key={i}
                  className="font-semibold text-gray-800 border border-gray-300 px-3 py-2"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {groupedData.length > 0 ? (
              groupedData.map((group, groupIdx) =>
                group.samsat.map((row, rowIdx) => (
                  <TableRow
                    key={`${groupIdx}-${rowIdx}`}
                    className="hover:bg-gray-50"
                  >
                    {/* Kolom cabang dengan rowSpan */}
                    {rowIdx === 0 ? (
                      <TableCell
                        rowSpan={group.samsat.length}
                        className="border border-gray-300 px-3 py-2 font-semibold align-top bg-gray-50"
                      >
                        {group.cabang}
                      </TableCell>
                    ) : null}

                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className="border border-gray-300 px-3 py-1 text-center"
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="text-center text-muted-foreground border border-gray-300 px-3 py-2"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Summary row */}
          {summary.length > 0 && (
            <TableFooter>
              <TableRow className="bg-gray-50 font-semibold">
                {/* Sel pertama kosong karena kolom cabang */}
                <TableCell className="border border-gray-300 px-3 py-1"></TableCell>
                {summary.map((cell, i) => (
                  <TableCell
                    key={i}
                    className="border border-gray-300 px-3 py-1 text-center"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}