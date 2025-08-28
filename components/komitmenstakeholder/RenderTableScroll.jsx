import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

export default function RenderTablePagination({ data }) {
  const headers = data?.header?.[0] || [];
  const rows = Array.isArray(data?.data) ? data.data : [];
  const summary = data?.summary || null;

  // --- Pagination state ---
  const [page, setPage] = useState(1);
  const rowsPerPage = 15;

  // Reset page setiap kali data berubah
  useEffect(() => {
    setPage(1);
  }, [rows]);

  // Filter rows: sembunyikan kalau index 1 kosong/null
  const filteredRows = rows.filter((row) => row[1] !== "" && row[1] != null);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="border">
      <Table className="border border-gray-300 border-collapse text-sm w-full">
        <TableHeader className="bg-gray-100 sticky top-0 z-10">
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className="border border-gray-300 px-3 py-2 text-center whitespace-nowrap"
              >
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentRows.map((row, ridx) => {
            const normalizedRow = [
              ...row,
              ...Array(headers.length - row.length).fill(""),
            ];

            return (
              <TableRow key={ridx} className="hover:bg-gray-50">
                {normalizedRow.map((cell, cidx) => (
                  <TableCell
                    key={cidx}
                    className={`border border-gray-300 px-3 py-2 ${
                      typeof cell === "number" || /^\d+$/.test(cell)
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {filteredRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={headers?.length || 1}
                className="text-center text-gray-500 py-4"
              >
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {summary && (
          <TableFooter>
            <TableRow className="bg-gray-50 font-semibold">
              <TableCell
                colSpan={2}
                className="border border-gray-300 text-center"
              >
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="border border-gray-300 text-center"
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>

      {/* --- Pagination Controls pakai shadcn/ui --- */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center py-3 border-t bg-gray-50">
          <Pagination>
            <PaginationContent className="justify-end">
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  }`}
                />
              </PaginationItem>

              {/* First Page */}
              <PaginationItem>
                <PaginationLink
                  isActive={page === 1}
                  onClick={() => setPage(1)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    page === 1
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Ellipsis sebelum current */}
              {page > 3 && (
                <PaginationItem>
                  <span className="px-2 text-gray-500">...</span>
                </PaginationItem>
              )}

              {/* Halaman sekitar current */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (num) =>
                    num !== 1 &&
                    num !== totalPages &&
                    num >= page - 1 &&
                    num <= page + 1
                )
                .map((num) => (
                  <PaginationItem key={num}>
                    <PaginationLink
                      isActive={num === page}
                      onClick={() => setPage(num)}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        num === page
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-200 hover:text-gray-900"
                      }`}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              {/* Ellipsis setelah current */}
              {page < totalPages - 2 && (
                <PaginationItem>
                  <span className="px-2 text-gray-500">...</span>
                </PaginationItem>
              )}

              {/* Last Page */}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={page === totalPages}
                    onClick={() => setPage(totalPages)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      page === totalPages
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
