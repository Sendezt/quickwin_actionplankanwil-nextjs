// components\komitmenstakeholder\cards\PeriodCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PeriodCard = ({ title, value, description, icon: Icon }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <div className="text-base font-semibold text-gray-900">{value || "-"}</div>
      <p className="text-xs">{description}</p>
    </CardContent>
  </Card>
);