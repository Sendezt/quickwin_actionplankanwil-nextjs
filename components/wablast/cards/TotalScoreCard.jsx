// components\wablast\cards\TotalScoreCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const TotalScoreCard = ({ score }) => (
  <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-base font-semibold text-blue-900">
        Skor Total
      </CardTitle>
      <BarChart3 className="h-5 w-5 text-blue-800" />
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-extrabold text-blue-900">{score}</div>
      <p className="text-sm text-blue-700">Nilai Akhir (Max 4)</p>
    </CardContent>
  </Card>
);
