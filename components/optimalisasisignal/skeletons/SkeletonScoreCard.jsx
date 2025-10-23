// components\optimalisasisignal\skeletons\SkeletonScoreCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonScoreCard = () => (
  <Card className="p-0 overflow-hidden pb-4 text-center">
    <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <CardContent className="pb-9 space-y-2">
      <Skeleton className="h-16 w-32 mx-auto" />
      <Skeleton className="h-3 w-24 mx-auto" />
    </CardContent>
  </Card>
);
