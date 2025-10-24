// ============ FILE: components/cards/ObjectPenilaianCard.jsx ============
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export const ObjectPenilaianCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
      <LandPlot className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
        <li className="py-2">Kantor Wilayah</li>
        <li className="py-2">Kantor Cabang</li>
        <li className="py-2">Kantor Samsat</li>
      </ol>
      <p className="text-xs text-muted-foreground mt-1">3 Obyek Penilaian</p>
    </CardContent>
  </Card>
);