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
      <Table className="table-auto w-full border-collapse">
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className={`px-2 py-2 text-sm whitespace-normal break-words ${
                  idx === 1 ? "text-left" : "text-center"
                }`}
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
                  className={`px-2 py-1 text-sm whitespace-normal break-words ${
                    cidx === 1 ? "text-left" : "text-center"
                  }`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {summary && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="font-bold text-center px-2 py-2"
              >
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="font-semibold text-center px-2 py-2"
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
