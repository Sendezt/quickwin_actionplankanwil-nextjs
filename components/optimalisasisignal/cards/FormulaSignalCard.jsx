// components\optimalisasisignal\cards\FormulaSignalCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export const FormulaSignalCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">Forumula</CardTitle>
      <Radical className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-4">
      <div className="space-y-3 text-sm">
        <div className="border-l-4 border-gray-400 pl-3">
          <p className="font-semibold text-gray-900 mb-1">
            Pertumbuhan Penerimaan SWDKLLJ via SIGNAL dan Layanan Online
          </p>
          <p className="text-gray-600 text-xs">= Realisasi / Target</p>
          <p className="text-blue-600 text-xs">*) Target pertumbuhan 5%</p>
        </div>
      </div>
    </CardContent>
  </Card>
);