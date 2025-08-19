import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export default function RenderTable({ data }) {
  const headers = data?.header?.[0] || [];
  const rows = Array.isArray(data?.data) ? data.data : [];
  const summary = data?.summary || null;

  // --- State untuk kontrol jumlah baris yang ditampilkan ---
  const [visibleCount, setVisibleCount] = useState(15);
  const containerRef = useRef(null);

  // Handler saat scroll
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      // Tambah 10 row tiap kali scroll mentok bawah
      setVisibleCount((prev) =>
        prev + 10 > rows.length ? rows.length : prev + 10
      );
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto max-h-[500px] border"
    >
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
          {rows.slice(0, visibleCount).map((row, idx) => (
            <TableRow key={idx} className="hover:bg-gray-50">
              {row.map((cell, cidx) => (
                <TableCell
                  key={cidx}
                  className={`border border-gray-300 px-3 py-2 ${
                    typeof cell === "number" || /^\d/.test(cell)
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {rows.length === 0 && (
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
    </div>
  );
}
