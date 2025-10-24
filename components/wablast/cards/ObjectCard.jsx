// components\wablast\cards\ObjectCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export const ObjectCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
      <LandPlot className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <div className="text-base font-semibold text-gray-900">Kantor Wilayah</div>
      <p className="text-xs">1 Obyek Penilaian</p>
    </CardContent>
  </Card>
);