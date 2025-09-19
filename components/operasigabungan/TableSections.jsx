"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import TableCard from "@/components/operasigabungan/TableCard";
import TableCardWithModal from "@/components/operasigabungan/TableCardwithModal";

export function TableSections({
  table1Data,
  table2Data,
  table3Data,
  table4Data,
  table5Data,
  loading,
  feedback,
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
    return (
      data?.data?.flatMap((item) => [
        [`${item.cabang}`, "", "", "", "", "", ""],
        ...item.samsat.map((row) => ["", ...row.slice(1)]),
      ]) ?? []
    );
  };

  return (
    <>
      <TableCardWithModal
        title={
          <span className="text-2xl font-bold">
            Skor Pelaksanaan{" "}
            <span className="text-red-600 font-bold">Operasi Gabungan</span> -
            Per Cabang
          </span>
        }
        headers={table1Data?.header?.[0] ?? []}
        data={table1Data?.data ?? []}
        summary={table1Data?.summary ?? []}
        isLoading={!table1Data}
        feedbackData={feedback}
        actionPlanId={3}
        subActionPlanId={3}
      />

      <TableCardWithModal
        title={
          <span className="text-2xl font-bold">
            Skor Kontribusi Penerimaan{" "}
            <span className="text-red-600">Operasi Gabungan</span> - Per Cabang
          </span>
        }
        headers={table2Data?.header?.[0] ?? []}
        data={table2Data?.data ?? []}
        summary={table2Data?.summary ?? []}
        isLoading={!table2Data}
        feedbackData={feedback}
        actionPlanId={3}
        subActionPlanId={4}
      />

      <TableCard
        title={
          <span className="text-2xl font-bold">
            Skor Pelaksanaan{" "}
            <span className="text-red-600">Operasi Gabungan</span> - Per Samsat
          </span>
        }
        headers={table3Data?.header?.[0] ?? []}
        data={transformSamsatData(table3Data)}
        summary={table3Data?.summary ?? []}
        isLoading={!table3Data}
      />

      <TableCard
        title={
          <span className="text-2xl font-bold">
            Skor Kontribusi Penerimaan{" "}
            <span className="text-red-600">Operasi Gabungan</span> - Per Samsat
          </span>
        }
        headers={table4Data?.header?.[0] ?? []}
        data={transformSamsatData(table4Data)}
        summary={table4Data?.summary ?? []}
        isLoading={!table4Data}
      />

      <TableCard
        title={
          <span className="text-2xl font-bold">
            Hasil Penerimaan Atas Kegiatan{" "}
            <span className="text-red-600">Operasi Gabungan</span>
          </span>
        }
        headers={table5Data?.header?.[0] ?? []}
        data={transformSamsatData(table5Data)}
        summary={table5Data?.summary ?? []}
        isLoading={!table5Data}
      />
    </>
  );
}
