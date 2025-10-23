// components\kolaborasimerchant\skeletons\SkeleteonBreakdownGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonBreakdownGrid = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="p-0 overflow-hidden">
      <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <CardContent className="py-2 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-6 w-8" />
          </div>
        ))}
        <div className="flex justify-between items-center border-t pt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-6" />
        </div>
      </CardContent>
    </Card>
    <Card className="shadow-sm border border-dashed bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="pl-4 space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="border-b pb-2">
              <Skeleton className="h-3 w-full mb-1" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
