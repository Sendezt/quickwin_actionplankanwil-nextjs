// components\kolaborasimerchant\cards\ObjekPenilaianCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export const ObjectPenilaianCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
      <LandPlot className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="p-5">
      <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
        <li className="py-2">Kantor Wilayah</li>
        <li className="py-2">Kantor Cabang</li>
        <li className="py-2">Kantor Samsat</li>
      </ol>
      <p className="text-[10px] text-muted-foreground px-2">3 Obyek Penilaian</p>
    </CardContent>
  </Card>
);