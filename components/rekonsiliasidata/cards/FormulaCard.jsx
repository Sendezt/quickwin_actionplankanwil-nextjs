// components\rekonsiliasidata\cards\FormulaCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export const FormulaCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Forumula</CardTitle>
      <Radical className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-4">
      <div className="space-y-3 text-sm">
        <div className="border-l-4 border-gray-400 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Terlaksananya Kegiatan Rekonsiliasi Data
          </p>
          <p className="text-gray-600 text-xs">= Realisasi Kegiatan / Target</p>
        </div>
      </div>
    </CardContent>
  </Card>
);