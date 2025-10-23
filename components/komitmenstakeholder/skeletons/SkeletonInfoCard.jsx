// components\komitmenstakeholder\skeletons\SkeletonInfoCard.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInfoCard = ({ icon: Icon }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <Skeleton className="h-4 w-32" />
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-2 px-4">
      <Skeleton className="h-4 w-28 mb-1" />
      <Skeleton className="h-4 w-24 mb-1" />
      <Skeleton className="h-4 w-20" />
    </CardContent>
  </Card>
);