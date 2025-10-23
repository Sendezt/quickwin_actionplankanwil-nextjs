// components\kolaborasimerchant\cards\PeriodCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const PeriodCard = ({ title, date }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1 px-6">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <CalendarDays className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="px-6 pb-2">
      <div className="text-base font-semibold text-gray-900">{date ?? "-"}</div>
      <p className="text-[10px] text-muted-foreground">
        {title === "Periode Awal" ? "Tanggal Mulai Periode" : "Tanggal Akhir Periode"}
      </p>
    </CardContent>
  </Card>
);