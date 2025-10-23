// components\keterisiandata\cards\BranchScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const BranchScoreCard = ({ scores, targetScore }) => (
  <Card className="p-0 overflow-hidden row-span-2">
    <div className="bg-green-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
      <h4 className="text-sm font-semibold text-green-800">Skor Cabang</h4>
      <div className="bg-green-200 rounded-full">
        <BarChart3 className="h-4 w-4 text-green-700" />
      </div>
    </div>
    <CardContent className="px-5 py-4 space-y-3">
      {scores.length > 0 ? (
        scores.map(([cabang, skor], idx) => (
          <div key={idx} className="flex justify-between text-base border-b pb-1 last:border-0">
            <span>{cabang}</span>
            <span className="font-bold text-green-900">{skor}</span>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground">Tidak ada data cabang</p>
      )}
      {targetScore && (
        <p className="text-xs text-muted-foreground pt-2">Target Skor: {targetScore}</p>
      )}
    </CardContent>
  </Card>
);