// components\sigapinstansi\cards\ScoreCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ScoreCard = ({ title, score, bgColor, textColor, scoreColor }) => (
  <Card className="shadow-md border-0 p-0">
    <CardHeader className={`flex flex-row items-center justify-between px-6 py-4 ${bgColor} rounded-t-lg`}>
      <CardTitle className={`text-sm font-medium ${textColor}`}>{title}</CardTitle>
      <BarChart3 className={`h-4 w-4 ${textColor.replace('800', '600')}`} />
    </CardHeader>
    <CardContent className="flex flex-col items-center justify-center py-6">
      <div className={`text-6xl font-extrabold ${scoreColor}`}>{score}</div>
      <p className={`text-sm ${textColor.replace('800', '600')} mt-2`}>
        Target Skor | 4 (Nilai Max)
      </p>
    </CardContent>
  </Card>
);