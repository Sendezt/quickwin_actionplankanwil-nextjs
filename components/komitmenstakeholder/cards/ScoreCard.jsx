// components\komitmenstakeholder\cards\ScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ScoreCard = ({ title, score, config }) => (
  <Card className="p-0 overflow-hidden">
    <div className={`${config.bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
      <h4 className={`text-sm font-semibold ${config.textColor}`}>{title}</h4>
      <BarChart3 className={`h-4 w-4 ${config.iconColor}`} />
    </div>
    <CardContent className="text-center py-6">
      <div className={`text-6xl font-bold ${config.scoreColor}`}>{score}</div>
      <p className="text-sm text-gray-600 mt-2">Target Skor | 4 (Nilai Max)</p>
    </CardContent>
  </Card>
);