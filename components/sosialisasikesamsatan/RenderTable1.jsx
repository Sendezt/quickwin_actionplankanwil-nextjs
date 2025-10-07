"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const RenderTable1 = ({ table1Data, loading, feedbackData }) => {
  const SkeletonTable = ({ rows = 1, cols = 6 }) => (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-max border border-gray-300 w-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: cols }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <Card className="w-full overflow-hidden">
        <CardContent>
          {loading || !table1Data ? (
            <SkeletonTable
              rows={1}
              cols={table1Data?.header?.[0]?.length || 6}
            />
          ) : (
            <div className="overflow-x-auto w-full scrollbar-hide">
              <Table className="min-w-max border border-gray-300 w-full">
                <TableHeader>
                  <TableRow>
                    {table1Data?.header?.[0]?.map((head, i) => (
                      <TableHead
                        key={i}
                        className="min-w-[120px] border border-gray-300 text-center"
                      >
                        {head}
                      </TableHead>
                    )) || null}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table1Data?.data?.map((row, i) => (
                    <TableRow key={i}>
                      {row?.map((cell, j) => (
                        <TableCell
                          key={j}
                          className={`border-b border-r border-dotted border-gray-300 ${
                            j === 1 ? "text-left " : "text-center"
                          }`}
                        >
                          {cell}
                        </TableCell>
                      )) || null}
                    </TableRow>
                  )) || null}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
