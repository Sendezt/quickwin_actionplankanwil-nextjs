// components\optimalisasisignal\cards\ObjectCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot } from "lucide-react";

export const ObjectCard = ({ objectName, objectCount }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
      <LandPlot className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      <div className="text-base font-semibold text-gray-900">{objectName}</div>
      <p className="text-xs text-muted-foreground mt-1">{objectCount} Objek Penelitian</p>
    </CardContent>
  </Card>
);