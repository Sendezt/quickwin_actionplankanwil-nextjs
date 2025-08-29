// components\implementasiuuhkpd\DataTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DetailTable from "@/components/implementasiuuhkpd/DetailTable";

export function DataTable({ 
  headers, 
  data, 
  summary, 
  expandedRows, 
  onToggleRow 
}) {
  return (
    <Table className="w-full table-fixed border border-gray-300 border-collapse">
      <TableHeader>
        <TableRow className="bg-gray-100">
          {headers.map((header, index) => (
            <TableHead
              key={index}
              className="border border-gray-300 text-center px-2 py-1 text-sm font-semibold whitespace-pre-line min-w-[120px]"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <React.Fragment key={index}>
            <TableRow className="border border-gray-300">
              {row
                .filter((cell) => cell !== "")
                .map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="border border-gray-300 text-center px-2 py-1 text-sm cursor-pointer"
                    onClick={() => {
                      if (cellIndex === 1) onToggleRow(index);
                    }}
                  >
                    {cellIndex === 1 ? (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 cursor-pointer">
                        {cell}
                      </Badge>
                    ) : cellIndex === 6 && cell === "100" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        {cell}
                      </Badge>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
            </TableRow>

            {expandedRows.includes(index) && (
              <TableRow className="bg-gray-50">
                <TableCell colSpan={row.length} className="p-2">
                  <DetailTable loket={row[1]} />
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}

        {/* Summary Row */}
        <TableRow className="bg-gray-200 font-medium">
          <TableCell
            colSpan={2}
            className="border border-gray-300 text-center font-semibold"
          >
            <Badge variant="secondary">{summary[1]}</Badge>
          </TableCell>
          {summary
            .slice(2)
            .filter((cell) => cell !== "")
            .map((cell, index) => (
              <TableCell
                key={index}
                className="border border-gray-300 text-center font-semibold"
              >
                {cell}
              </TableCell>
            ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}