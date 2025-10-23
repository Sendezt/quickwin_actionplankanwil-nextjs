// components\rekonsiliasidata\cards\ObjectCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export const ObjectCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
      <LandPlot className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="flex flex-col justify-center min-h-24 px-6">
      <div className="text-base font-semibold text-gray-900">Kantor Samsat</div>
      <p className="text-xs text-muted-foreground mt-1">1 Obyek Penilaian</p>
    </CardContent>
  </Card>
);