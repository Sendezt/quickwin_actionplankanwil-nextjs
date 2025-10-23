// components\optimalisasisignal\cards\KanwilScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const KanwilScoreCard = ({ score }) => (
  <Card className="p-0 overflow-hidden pb-4 text-center">
    <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
      <h4 className="text-sm font-semibold text-blue-800">Skor Kanwil</h4>
      <div className="bg-blue-200 rounded-full">
        <BarChart3 className="h-4 w-4 text-blue-700" />
      </div>
    </div>
    <CardContent className="pb-9">
      <div className="text-7xl font-bold text-blue-900">{score}</div>
      <p className="text-xs text-muted-foreground">
        Target Skor <span className="text-gray-500">| 4 (Nilai Max)</span>
      </p>
    </CardContent>
  </Card>
);