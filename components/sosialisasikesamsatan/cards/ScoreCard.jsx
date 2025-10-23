// components\sosialisasikesamsatan\cards\ScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const ScoreCard = ({ title, score, bgColor, textColor }) => (
  <Card className="p-0 overflow-hidden text-center hover:shadow-lg transition-shadow">
    <div className={`${bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
      <h4 className={`text-sm font-semibold ${textColor}`}>{title}</h4>
      <BarChart3 className={`h-4 w-4 ${textColor.replace('800', '700')}`} />
    </div>
    <CardContent className="pb-6 pt-6">
      <div className={`text-5xl font-bold ${textColor.replace('800', '900')} mb-2`}>
        {score}
      </div>
      <p className="text-xs text-muted-foreground">Nilai Akhir (Max 4)</p>
    </CardContent>
  </Card>
);