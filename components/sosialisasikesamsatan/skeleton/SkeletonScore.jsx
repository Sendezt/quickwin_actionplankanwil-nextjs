// components\sosialisasikesamsatan\skeleton\SkeletonScore.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonScore = ({ bgColor }) => (
  <Card className="p-0 overflow-hidden pb-4 text-center">
    <div className={`${bgColor} px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <CardContent className="pb-4 space-y-2 pt-6">
      <Skeleton className="h-12 w-16 mx-auto" />
      <Skeleton className="h-3 w-24 mx-auto" />
    </CardContent>
  </Card>
);