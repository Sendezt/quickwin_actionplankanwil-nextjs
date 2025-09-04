import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export function FormulaCard() {
  return (
    <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-sm font-medium text-gray-700">
          Forumula
        </CardTitle>
        <Radical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3 text-sm">
          <div className="border-l-4 border-gray-400 pl-3">
            <p className="font-semibold text-gray-900 mb-1">
              Terlaksananya Program Kerja Peningkatan Tingkat Kepatuhan di
              seluruh Kota / Kabupaten
            </p>
            <p className="text-gray-600 text-xs">
              = Kota atau Kabupaten yang melaksanakan Program Kerja / Total Kota
              atau Kabupaten
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
