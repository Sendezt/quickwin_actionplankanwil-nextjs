// components\implementasiuuhkpd\InfoCards.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot, File } from "lucide-react";

export function InfoCards() {
  return (
    <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card className="shadow-sm border bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Obyek Penilaian
          </CardTitle>
          <LandPlot className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="py-0 px-3">
          <ol className="list-decimal pl-4 text-base font-semibold text-gray-800 mb-1">
            <li>Kantor Wilayah</li>
            <li>Kantor Cabang</li>
          </ol>
          <p className="text-xs text-muted-foreground">2 Obyek Penilaian</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border bg-slate-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            Juknis Sengkuyung Prioritas
          </CardTitle>
          <File className="h-3 w-3 text-muted-foreground" />
        </CardHeader>
        <CardContent className="py-0 px-3">
          <a
            href="https://drive.google.com/file/d/1LzzM_lllpBQMgkcBXhPXC53s7pr21srN/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-blue-600 hover:underline mb-1 block"
          >
            Juknis Sengkuyung Prioritas
          </a>
          <p className="text-xs text-muted-foreground">
            No. 900.1.13.1/ 177 Tahun 2025 tentang Petunjuk Teknis
            Pelaksanaan Kegiatan Sengkuyung Prioritas Tahun 2025
          </p>
        </CardContent>
      </Card>
    </div>
  );
}