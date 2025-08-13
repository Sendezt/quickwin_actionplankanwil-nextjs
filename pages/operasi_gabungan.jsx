"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from "lucide-react";
import Navbar from "@/components/navbar";

export default function MenuTiga() {
  const [table3Data, setTable3Data] = useState(null);

  useEffect(() => {
    let interval;

    async function fetchTable3Data() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet3table1"
        );
        const json = await res.json();
        if (json && json.data && Array.isArray(json.data)) {
          setTable3Data(json);
        } else {
          console.warn("Struktur tabel 3 tidak valid:", json);
        }
      } catch (err) {
        console.error("Gagal fetch tabel 3:", err);
      }
    }

    fetchTable3Data();
    interval = setInterval(fetchTable3Data, 10000);

    return () => clearInterval(interval);
  }, []);

  const isLoadingTable3 = !table3Data;
  const table3Headers = table3Data?.header?.[0] ?? [];

  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <Navbar />

          {/* === KONTEN === */}
          <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  Skor Pelaksanaan Operasi Gabungan - Per Cabang
                </CardTitle>
                <CardDescription>
                  Tabel nilai target, realisasi, dan skor cabang
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {isLoadingTable3 ? (
                    <div className="space-y-2">
                      {[...Array(5)].map((_, idx) => (
                        <div key={idx} className="flex gap-2">
                          {[...Array(7)].map((__, i2) => (
                            <Skeleton key={i2} className="h-6 flex-1" />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table className="w-full table-fixed border border-gray-300 border-collapse">
                      <TableHeader>
                        <TableRow className="bg-gray-100">
                          {table3Headers.map((header, index) => (
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
                        {table3Data.data.map((row, index) => (
                          <TableRow
                            key={index}
                            className="border border-gray-300"
                          >
                            {row.map((cell, cellIndex) => (
                              <TableCell
                                key={cellIndex}
                                className="border border-gray-300 text-center px-2 py-1 text-sm"
                              >
                                {cellIndex === 1 ? (
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
                            {table3Data.summary[0]}
                          </TableCell>
                          {table3Data.summary.slice(1).map((cell, index) => (
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
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
