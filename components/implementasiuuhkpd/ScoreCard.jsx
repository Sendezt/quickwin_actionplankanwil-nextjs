// components\implementasiuuhkpd\ScoreCard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function ScoreCard({ title, value, bgColor, textColor, iconBg }) {
  return (
    <Card className="col-span-2 p-0 overflow-hidden pb-4 text-center">
      <div className={`${bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
        <h4 className={`text-sm font-semibold ${textColor}`}>{title}</h4>
        <div className={`${iconBg} rounded-full`}>
          <BarChart3 className={`h-4 w-4 ${textColor.replace('800', '700')}`} />
        </div>
      </div>
      <CardContent className="pb-4">
        <div className={`text-7xl font-bold ${textColor.replace('800', '900')}`}>
          {value ?? "-"}
        </div>
        <p className="text-xs text-muted-foreground">
          Nilai Total {title.split(' ')[1]}{" "}
          <span className="text-gray-500">| 4 (Nilai Max)</span>
        </p>
      </CardContent>
    </Card>
  );
}