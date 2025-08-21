import React from "react";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

export default function RenderTableArray({ data }) {
  if (!data) return null;

  const headers = data?.headers || [];
  const cabangs = data?.data || [];
  const summary = data?.summary || null;

  // hitung colSpan
  const getColSpan = (header) => {
    return header.children ? header.children.length : 1;
  };

  // flatten header
  const flatHeaders = headers.flatMap((h) =>
    h.children
      ? h.children.map((child) => ({ parent: h.title, child }))
      : [{ parent: null, child: h.title }]
  );

  return (
    <div className="overflow-x-auto">
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            {headers.map((h, idx) => (
              <TableHead
                key={idx}
                colSpan={getColSpan(h)}
                rowSpan={h.children ? 1 : 2} // kalau tidak punya children → merge 2 baris
                className="text-center align-middle"
              >
                {h.title}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            {headers.map(
              (h, idx) =>
                h.children &&
                h.children.map((c, cIdx) => (
                  <TableHead key={`${idx}-${cIdx}`} className="text-center">
                    {c}
                  </TableHead>
                ))
            )}
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {cabangs.map((cabang, idx) => (
            <React.Fragment key={cabang.cabang || idx}>
              {/* Baris judul cabang */}
              <TableRow className="bg-gray-100">
                <TableCell colSpan={flatHeaders.length} className="font-bold">
                  {cabang.cabang}
                </TableCell>
              </TableRow>

              {/* Data samsat */}
              {cabang.samsat.map((row, rIdx) => (
                <TableRow key={`${cabang.cabang}-${rIdx}`}>
                  {flatHeaders.map((fh, fIdx) => {
                    if (!fh.parent) {
                      return <TableCell key={fIdx}>{row[fh.child]}</TableCell>;
                    } else {
                      return (
                        <TableCell key={fIdx}>
                          {row[fh.parent]?.[fh.child]}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>

        {/* Footer summary */}
        {summary && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-bold text-center">
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
                <TableCell key={idx} className="font-semibold">
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
