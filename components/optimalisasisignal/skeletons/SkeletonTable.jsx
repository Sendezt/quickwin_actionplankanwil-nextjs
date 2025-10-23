// components\optimalisasisignal\skeletons\SkeletonTable.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-1/4 mt-1" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-[200px] w-full" />
    </CardContent>
  </Card>
);