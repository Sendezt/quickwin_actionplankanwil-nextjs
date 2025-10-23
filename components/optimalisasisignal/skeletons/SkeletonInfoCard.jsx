// components\optimalisasisignal\skeletons\SkeletonInfoCard.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInfoCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-3 rounded-full" />
    </CardHeader>
    <CardContent className="py-2 px-4 space-y-2">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-3 w-1/2" />
    </CardContent>
  </Card>
);