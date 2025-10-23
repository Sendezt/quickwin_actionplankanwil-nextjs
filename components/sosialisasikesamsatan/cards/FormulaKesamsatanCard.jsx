// components\sosialisasikesamsatan\cards\FormulaKesamsatanCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export const FormulaKesamsatanCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-sm font-medium text-gray-700">Forumula</CardTitle>
      <Radical className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-4">
      <div className="space-y-3 text-sm">
        <div className="border-l-4 border-blue-200 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Terlaksananya Sosialisasi Kesamsatan di IG Kanwil
          </p>
          <p className="text-gray-600 text-xs">
            = Realisasi / Target (8 Postingan per Bulan)
          </p>
        </div>
        <div className="border-l-4 border-green-200 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Terlaksananya Sosialisasi Kesamsatan di IG Cabang
          </p>
          <p className="text-gray-600 text-xs">
            = Realisasi / Target (8 Postingan per Bulan Per Cabang)
          </p>
        </div>
        <div className="border-l-4 border-yellow-200 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Tersedianya Banner Kesamsatan
          </p>
          <p className="text-gray-600 text-xs">= Realisasi / Target</p>
        </div>
      </div>
    </CardContent>
  </Card>
);