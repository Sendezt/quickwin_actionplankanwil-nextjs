// components\sigapinstansi\skeletons\SkeletonScoreGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonScoreGrid = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <Card key={i} className="shadow-md border-0 p-0">
        <CardHeader className="px-6 py-4 bg-slate-100">
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Skeleton className="h-12 w-20 mb-3" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
);
