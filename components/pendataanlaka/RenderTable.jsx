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
  if (!data) return null;

  const headers = data?.header?.[0] || [];
  const rows = data?.data || [];
  const summary = data?.summary || null;

  return (
    <div className="overflow-x-auto">
      <Table>
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

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
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
        </TableBody>

        {/* Footer untuk summary */}
        {summary && (
          <TableFooter>
            <TableRow>
              {/* Merge kolom No + Samsat Induk */}
              <TableCell colSpan={2} className="font-bold text-center">
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
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
