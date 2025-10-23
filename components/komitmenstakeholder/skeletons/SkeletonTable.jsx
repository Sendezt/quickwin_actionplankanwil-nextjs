// components\komitmenstakeholder\skeletons\SkeletonTable.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-64 mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-2">
      {[...Array(3)].map((_, j) => (
        <Skeleton key={j} className="h-4 w-full" />
      ))}
    </CardContent>
  </Card>
);