import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CalendarDays, Radical, LandPlot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function InfoCards({ loading, rangeData }) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row justify-between pb-1">
          <CardTitle className="text-xs font-medium">Periode Awal</CardTitle>
          <CalendarDays className="h-3 w-3" />
        </CardHeader>
        <CardContent>
          <div className="text-base font-semibold">
            {rangeData?.periode_awal ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Tanggal Mulai</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row justify-between pb-1">
          <CardTitle className="text-xs font-medium">Periode Akhir</CardTitle>
          <CalendarDays className="h-3 w-3" />
        </CardHeader>
        <CardContent>
          <div className="text-base font-semibold">
            {rangeData?.periode_akhir ?? "-"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Tanggal Akhir</p>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row justify-between pb-1">
          <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
          <LandPlot className="h-3 w-3" />
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-6 text-sm font-semibold">
            <li>Kantor Wilayah</li>
            <li>Kantor Cabang</li>
            <li>Kantor Samsat</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row justify-between pb-1">
          <CardTitle className="text-xs font-medium">Formula</CardTitle>
          <Radical className="h-3 w-3" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-600">
            <strong>Kontribusi SW Terkutip</strong> = Realisasi SW Terkutip /
            Tunggakan SW
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
