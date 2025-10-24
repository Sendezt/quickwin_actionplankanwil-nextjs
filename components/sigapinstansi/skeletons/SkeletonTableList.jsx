// components\sigapinstansi\skeletons\SkeletonTableList.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTableList = ({ count = 4 }) => (
  <div className="flex flex-col gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="shadow-sm border bg-white">
        <CardHeader>
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);