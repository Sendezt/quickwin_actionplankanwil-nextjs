// components\implementasiuuhkpd\FormulaCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export function FormulaCard() {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row col items-center justify-between space-y-0">
        <CardTitle className="text-sm font-bold">Formula</CardTitle>
        <Radical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="px-6 italic">
        <div className="border-b last:border-0">
          <p className="text-sm leading-relaxed text-gray-600">
            <span className="font-semibold text-gray-900">
              Terlaksananya Program Kerja Peningkatan Tingkat Kepatuhan di
              seluruh Kota / Kabupaten
            </span>
            {" = "}
            <span>
              Kota atau Kabupaten yang melaksanakan Program Kerja / Total Kota
              atau Kabupaten
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}