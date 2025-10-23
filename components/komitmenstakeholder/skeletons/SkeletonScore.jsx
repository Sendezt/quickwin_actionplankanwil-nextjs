// components\komitmenstakeholder\skeletons\SkeletonScore.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonScore = () => (
  <Card className="p-0 overflow-hidden">
    <div className="px-5 py-3 border-b flex items-center justify-between">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <CardContent className="text-center py-6">
      <Skeleton className="h-12 w-20 mx-auto mb-2" />
      <Skeleton className="h-3 w-32 mx-auto" />
    </CardContent>
  </Card>
);