// components\pendataanlaka\cards\TotalScoreCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const TotalScoreCard = ({ score }) => (
  <Card className="bg-blue-50 border-blue-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-lg font-semibold">Skor Total</CardTitle>
      <BarChart3 className="h-5 w-5 text-blue-600" />
    </CardHeader>
    <CardContent>
      <div className="text-5xl font-extrabold text-blue-700">{score}</div>
      <p className="text-sm text-muted-foreground">Nilai Akhir (Max 4)</p>
    </CardContent>
  </Card>
);