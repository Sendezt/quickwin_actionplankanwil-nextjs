// components\keterisiandata\cards\PeriodCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PeriodCard = ({ title, date, icon: Icon }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <div className="text-base font-semibold text-gray-900">{date || "-"}</div>
      <p className="text-xs text-muted-foreground mt-1">
        {title === "Periode Awal" ? "Tanggal Mulai" : "Tanggal Akhir"}
      </p>
    </CardContent>
  </Card>
);