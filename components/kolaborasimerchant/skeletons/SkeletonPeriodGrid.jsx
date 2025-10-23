// components\kolaborasimerchant\skeletons\SkeletonPeriodGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonPeriodGrid = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <div className="flex flex-col gap-4">
      {[1, 2].map((i) => (
        <Card key={i} className="shadow-sm border border-dashed bg-muted/30">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </CardHeader>
          <CardContent className="px-3 pb-2">
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-2 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
    <Card className="p-0 overflow-hidden">
      <div className="bg-gray-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <CardContent className="py-3 px-5 space-y-2">
        <div className="pl-5 space-y-2">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-4 w-32" />)}
        </div>
        <Skeleton className="h-3 w-36 mt-2" />
      </CardContent>
    </Card>
  </div>
);