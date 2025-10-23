// components\keterisiandata\skeleton\SkeletonPeriodGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPeriodGrid = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-4">
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="py-1 px-6">
          <Skeleton className="h-6 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="py-1 px-6">
          <Skeleton className="h-6 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    </div>

    <Card className="p-0 overflow-hidden">
      <div className="bg-muted px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
      </div>
      <CardContent className="flex flex-col items-center justify-center text-center py-14 px-14">
        <Skeleton className="h-20 w-20 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  </div>
);
