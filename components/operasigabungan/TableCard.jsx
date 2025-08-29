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
                    className="font-semibold text-gray-800 border border-gray-300 px-3 py-2"
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
                            className="border border-gray-300 px-3 py-1 text-sm"
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
                {normalizedSummary.map((row, i) => {
                  const emptyCells = headers.length - row.length;
                  return (
                    <TableRow key={i} className="bg-gray-50 font-semibold">
                      {Array.from({ length: emptyCells }).map((_, idx) => (
                        <TableCell
                          key={`empty-${idx}`}
                          className="border border-gray-300 px-3 py-1 text-sm"
                        ></TableCell>
                      ))}
                      {row.map((cell, j) => (
                        <TableCell
                          key={j}
                          className="border border-gray-300 px-3 py-1 text-sm"
                        >
                          {cell}
                        </TableCell>
                      ))}
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
