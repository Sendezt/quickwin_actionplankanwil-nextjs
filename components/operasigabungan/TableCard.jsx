"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function TableCard({ title, description, headers, data, summary, isLoading, highlightIndex }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : (
            <Table className="w-full table-fixed border border-gray-300 border-collapse">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  {headers.map((header, index) => (
                    <TableHead
                      key={index}
                      className="border border-gray-300 text-center px-2 py-1 text-sm font-semibold whitespace-pre-line min-w-[100px]"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} className="border border-gray-300">
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className="border border-gray-300 text-center px-2 py-1 text-sm"
                      >
                        {cellIndex === highlightIndex ? (
                          <Badge variant="outline">{cell}</Badge>
                        ) : cellIndex === 4 && cell === "100.00" ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {cell}
                          </Badge>
                        ) : (
                          cell
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {/* Summary Row */}
                <TableRow className="bg-gray-200 font-medium">
                  <TableCell
                    colSpan={2}
                    className="border border-gray-300 text-center font-semibold"
                  >
                    {summary[0]}
                  </TableCell>
                  {summary.slice(1).map((cell, index) => (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
