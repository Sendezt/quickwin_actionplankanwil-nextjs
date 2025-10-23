// components\keterisiandata\skeleton\SkeletonInfoGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInfoGrid = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="space-y-4">
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="flex flex-col justify-center min-h-24 px-6">
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent className="py-6 px-5 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    </div>

    <Card className="p-0 overflow-hidden">
      <div className="bg-muted px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex justify-between border-b pb-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
        <Skeleton className="h-3 w-32 pt-2" />
      </CardContent>
    </Card>
  </div>
);