// ============ FILE: components/cards/ScoreCard.jsx ============
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ScoreCard = ({ title, score, bgColor, textColor }) => (
  <Card className="overflow-hidden p-0">
    <div className={`${bgColor} px-5 py-3 border-b flex items-center justify-between`}>
      <h4 className={`text-sm font-semibold ${textColor}`}>{title}</h4>
      <BarChart3 className={`h-4 w-4 ${textColor.replace('800', '700')}`} />
    </div>
    <CardContent className="py-6 px-5 text-center">
      <div className={`text-6xl font-bold ${textColor.replace('800', '600')}`}>{score}</div>
      <p className="text-sm text-gray-500 mt-2">Target Skor | 4 (Nilai Max)</p>
    </CardContent>
  </Card>
);