// components\sosialisasikesamsatan\cards\PeriodCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const PeriodCard = ({ title, date }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium text-gray-600">{title}</CardTitle>
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="flex flex-col justify-center">
      <div className="text-lg font-bold text-gray-900 mb-1">{date || "-"}</div>
      <p className="text-xs text-muted-foreground mt-1">
        {title === "Periode Awal" ? "Tanggal Mulai" : "Tanggal Akhir"}
      </p>
    </CardContent>
  </Card>
);