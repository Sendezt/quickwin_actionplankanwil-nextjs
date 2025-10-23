// components\kolaborasimerchant\cards\BreakdownScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const BreakdownScoreCard = ({ breakdownData }) => (
  <Card className="p-0 overflow-hidden">
    <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
      <h4 className="text-sm font-semibold text-blue-800">Breakdown Skor</h4>
      <div className="bg-blue-200 rounded-full">
        <BarChart3 className="h-4 w-4 text-blue-700" />
      </div>
    </div>
    <CardContent className="py-2 space-y-2">
      {Array.isArray(breakdownData?.data) && breakdownData.data.length > 0 ? (
        breakdownData.data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-lg text-gray-600 flex-1 pr-2 font-bold">{item.judul}</span>
            <span className="text-2xl font-extrabold text-blue-900">{item.skor}</span>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground">Tidak ada data</p>
      )}
      {breakdownData?.target && (
        <div className="flex justify-between items-center border-t pt-2 text-gray-700">
          <span className="text-sm font-semibold">{breakdownData.target.judul}</span>
          <span className="text-lg font-bold">{breakdownData.target.skor}</span>
        </div>
      )}
    </CardContent>
  </Card>
);