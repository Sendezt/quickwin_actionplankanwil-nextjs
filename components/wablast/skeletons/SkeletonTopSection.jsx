// components\wablast\skeletons\SkeletonTopSection.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTopSection = () => (
  <div className="grid gap-4">
    {/* Baris 1 */}
    <div className="grid gap-4 md:grid-cols-2">
      {/* Kolom kiri: Periode Awal & Akhir */}
      <div className="flex flex-col gap-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-1">
              <Skeleton className="h-3 w-20 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kolom kanan: Skor Total */}
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-28 mb-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-20 mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    </div>

    {/* Baris 2: Obyek Penilaian & Formula */}
    <div className="grid grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader className="pb-1">
            <Skeleton className="h-3 w-28 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
