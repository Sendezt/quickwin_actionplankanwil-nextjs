// components\komitmenstakeholder\skeletons\SkeletonPeriod.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPeriod = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-3 rounded-full" />
    </CardHeader>
    <CardContent className="py-1 px-4">
      <Skeleton className="h-6 w-32 mb-1" />
      <Skeleton className="h-3 w-20" />
    </CardContent>
  </Card>
);
