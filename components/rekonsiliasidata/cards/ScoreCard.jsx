// components\rekonsiliasidata\cards\SkorCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ScoreCard = ({ title, score, maxScore, bgColor, textColor }) => (
  <Card className="p-0 overflow-hidden row-span-2">
    <div className={`${bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
      <h4 className={`text-sm font-semibold ${textColor}`}>{title}</h4>
      <div className={`${bgColor.replace('100', '200')} rounded-full`}>
        <BarChart3 className={`h-4 w-4 ${textColor.replace('800', '700')}`} />
      </div>
    </div>
    <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
      <div className={`text-7xl font-bold ${textColor.replace('800', '900')}`}>
        {score}
      </div>
      <p className="text-xs text-muted-foreground">
        Nilai Akhir (Max {maxScore})
      </p>
    </CardContent>
  </Card>
);