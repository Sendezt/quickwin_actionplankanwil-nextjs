import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export default function RenderTableInfo({ data }) {
  if (!data) return <p className="text-gray-500">Data tidak tersedia</p>;

  const headers = data?.header?.table || [];
  const mainHeaders = data?.header?.main || [];
  const inisiatifData = Array.isArray(data.data) ? data.data : [];
  const summary = Array.isArray(data.summary) ? data.summary : null;

  return (
    <div className="overflow-x-auto">
      <Table>
        {/* Header Main (judul di atas tabel) */}
        {mainHeaders.map((row, rIdx) =>
          row.length > 0 ? (
            <TableHeader key={rIdx}>
              <TableRow>
                <TableHead
                  colSpan={headers.length}
                  className="text-center font-bold text-lg"
                >
                  {row.filter(Boolean).join(" ")}
                </TableHead>
              </TableRow>
            </TableHeader>
          ) : null
        )}

        {/* Header Kolom */}
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead key={idx} className="text-center font-bold">
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {inisiatifData.length > 0 ? (
            inisiatifData.map((inisiatif, idx) => (
              <>
                {/* Baris data per inisiatif */}
                {inisiatif.rows.map((row, rIdx) => (
                  <TableRow key={`${idx}-${rIdx}`}>
                    {row.map((cell, cidx) => (
                      <TableCell key={cidx} className="text-center">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {/* Total per Inisiatif */}
                <TableRow className="bg-gray-100">
                  <TableCell
                    colSpan={headers.length - 2}
                    className="font-semibold text-right"
                  >
                    Total {inisiatif.inisiatif}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {inisiatif.total.target}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    {inisiatif.total.nilaiAkhir}
                  </TableCell>
                </TableRow>
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center text-gray-500"
              >
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* Summary Total Akhir */}
        {summary && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={headers.length - 2}
                className="font-bold text-right"
              >
                {summary[6] || "Total"}
              </TableCell>
              <TableCell className="font-bold text-center">
                {summary[7]}
              </TableCell>
              <TableCell className="font-bold text-center">
                {summary[8]}
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}
