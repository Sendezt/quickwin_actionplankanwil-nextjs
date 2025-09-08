"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TableCard from "@/components/operasigabungan/TableCard";

export function TableSections({ 
  table1Data, 
  table2Data, 
  table3Data, 
  table4Data, 
  table5Data, 
  loading 
}) {
  if (loading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="px-5 py-3 border-b">
              <Skeleton className="h-4 w-52" />
            </div>
            <CardContent className="py-4 space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-5 w-full" />
              ))}
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  const transformSamsatData = (data) => {
    return data?.data?.flatMap((item) => [
      [`${item.cabang}`, "", "", "", "", "", ""],
      ...item.samsat.map((row) => ["", ...row.slice(1)]),
    ]) ?? [];
  };

  return (
    <>
      <TableCard
        title="Skor Pelaksanaan Operasi Gabungan - Per Cabang"
        headers={table1Data?.header?.[0] ?? []}
        data={table1Data?.data ?? []}
        summary={table1Data?.summary ?? []}
        isLoading={!table1Data}
      />
      
      <TableCard
        title="Skor Kontribusi Penerimaan Operasi Gabungan - Per Cabang"
        headers={table2Data?.header?.[0] ?? []}
        data={table2Data?.data ?? []}
        summary={table2Data?.summary ?? []}
        isLoading={!table2Data}
      />
      
      <TableCard
        title="Skor Pelaksanaan Operasi Gabungan - Per Samsat"
        headers={table3Data?.header?.[0] ?? []}
        data={transformSamsatData(table3Data)}
        summary={table3Data?.summary ?? []}
        isLoading={!table3Data}
      />
      
      <TableCard
        title="Skor Kontribusi Penerimaan Operasi Gabungan - Per Samsat"
        headers={table4Data?.header?.[0] ?? []}
        data={transformSamsatData(table4Data)}
        summary={table4Data?.summary ?? []}
        isLoading={!table4Data}
      />
      
      <TableCard
        title="Hasil Penerimaan Atas Kegiatan Operasi Gabungan"
        headers={table5Data?.header?.[0] ?? []}
        data={transformSamsatData(table5Data)}
        summary={table5Data?.summary ?? []}
        isLoading={!table5Data}
      />
    </>
  );
}