// components\sigapinstansi\skeletons\SkeletonInfoGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInfoGrid = () => (
  <div className="grid gap-4 md:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="shadow-sm border bg-white p-3">
        <CardHeader className="pb-1">
          <Skeleton className="h-3 w-1/3 mb-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-1/2 mb-1" />
          <Skeleton className="h-3 w-2/3" />
        </CardContent>
      </Card>
    ))}
  </div>
);