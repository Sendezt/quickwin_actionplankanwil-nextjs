// components\implementasiuuhkpd\PeriodCards.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export function PeriodCards({ rangeData }) {
  if (!rangeData?.periode_awal || !rangeData?.periode_akhir) {
    return null;
  }

  return (
    <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="shadow-sm border bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Periode Awal
          </CardTitle>
          <CalendarDays className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-2">
          <div className="text-lg font-semibold">{rangeData.periode_awal}</div>
          <p className="text-[10px] text-muted-foreground">Tanggal Mulai</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Periode Akhir
          </CardTitle>
          <CalendarDays className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-2">
          <div className="text-lg font-semibold">{rangeData.periode_akhir}</div>
          <p className="text-[10px] text-muted-foreground">Tanggal Akhir</p>
        </CardContent>
      </Card>
    </div>
  );
}