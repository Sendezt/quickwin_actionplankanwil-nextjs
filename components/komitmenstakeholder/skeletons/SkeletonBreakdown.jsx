// components\komitmenstakeholder\skeletons\SkeletonBreakdown.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonBreakdown = () => (
  <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-5 w-5 rounded-full" />
    </CardHeader>
    <CardContent className="py-3 px-5 space-y-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex justify-between">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
      <div className="border-t pt-3 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-8" />
      </div>
    </CardContent>
  </Card>
);