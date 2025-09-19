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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableCard({
  title,
  description,
  headers,
  data,
  summary,
  isLoading,
}) {
  const normalizedSummary = Array.isArray(summary?.[0])
    ? summary
    : summary && summary.length
    ? [summary]
    : [];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-2">
                {Array.from({ length: headers.length || 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-6 w-24" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <Table className="border border-gray-300 border-collapse w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                {headers.map((header, i) => (
                  <TableHead
                    key={i}
                    className={`font-semibold text-gray-800 border border-gray-300 px-3 py-2 ${
                      i === 0 || i === 1 ? "text-left" : "text-center"
                    }`}
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    {Array.isArray(row)
                      ? row.map((cell, j) => (
                          <TableCell
                            key={j}
                            className={`border border-gray-300 px-3 py-1 text-sm ${
                              j === 0 || j === 1 ? "text-left" : "text-center"
                            }`}
                          >
                            {cell}
                          </TableCell>
                        ))
                      : null}
                  </TableRow>
                ))
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
            {normalizedSummary.length > 0 && (
              <TableFooter>
                {normalizedSummary.map((origRow, i) => {
                  const totalCols = headers.length; // jumlah kolom di tabel
                  let row = Array.isArray(origRow) ? [...origRow] : [];

                  // jika cell pertama kemungkinan label (ada huruf), ambil sebagai label
                  let label = null;
                  if (
                    row.length &&
                    typeof row[0] === "string" &&
                    /[A-Za-z]/.test(row[0])
                  ) {
                    label = row.shift(); // remove first element jadi row = data angka selanjutnya
                  }

                  const dataCount = row.length;
                  // posisi paling kiri tempat data harus mulai agar data berakhir di kolom terakhir
                  // pastikan tidak mulai sebelum kolom ke-2 (karena 0+1 untuk No + Loket Kantor)
                  const startCol = Math.max(2, totalCols - dataCount);

                  return (
                    <TableRow
                      key={`summary-${i}`}
                      className="bg-gray-50 font-semibold"
                    >
                      {/* baris pertama: merge 2 kolom pertama dan tampilkan label (atau "Total") */}
                      {i === 0 ? (
                        <TableCell
                          colSpan={2}
                          className="border border-gray-300 px-3 py-1 text-sm text-center"
                        >
                          {label ?? "Total"}
                        </TableCell>
                      ) : (
                        // baris lainnya: dua cell kosong di depan (agar angka bergeser kanan)
                        <>
                          <TableCell className="border border-gray-300 px-3 py-1 text-sm" />
                          <TableCell className="border border-gray-300 px-3 py-1 text-sm" />
                        </>
                      )}

                      {/* render sisa kolom (dari kolom index 2 sampai akhir) */}
                      {Array.from({ length: totalCols - 2 }).map(
                        (_, colIndex) => {
                          const col = colIndex + 2;
                          const dataIndex = col - startCol; // index di row[] jika ada
                          const cellContent =
                            dataIndex >= 0 && dataIndex < dataCount
                              ? row[dataIndex]
                              : null;

                          return (
                            <TableCell
                              key={`summary-${i}-c${col}`}
                              className={`border border-gray-300 px-3 py-1 text-sm ${
                                cellContent ? "text-center" : "text-center"
                              }`}
                            >
                              {cellContent}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  );
                })}
              </TableFooter>
            )}
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
