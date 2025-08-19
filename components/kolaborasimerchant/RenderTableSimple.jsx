import React, { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function RenderTableSimple() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/google/getsheet8table4"
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const headers = data?.header || [];
  const rows = data?.data || [];
  const totalHeader = data?.totalHeader || null;
  const total = data?.total || null;

  // ambil nilai total dari array (ambil elemen terakhir yg bukan null)
  const totalValue = total?.filter((v) => v !== null)?.pop() ?? "";

  return (
    <div className="w-full">
      <Table className="w-full border border-gray-300">
        {/* Header */}
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className="border border-gray-300 px-2 py-1 text-center font-bold"
              >
                {col}
              </TableHead>
            ))}
            {total && (
              <TableHead className="border border-gray-300 px-2 py-1 text-center font-bold">
                {totalHeader}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {rows.map((row, ridx) => (
            <TableRow key={ridx}>
              {row.map((cell, cidx) => (
                <TableCell
                  key={cidx}
                  className="border border-gray-200 px-2 py-1 text-center"
                >
                  {cell}
                </TableCell>
              ))}
              {/* Kolom total */}
              {total && (
                <TableCell className="border border-gray-200 px-2 py-1 text-center font-semibold">
                  {totalValue}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
