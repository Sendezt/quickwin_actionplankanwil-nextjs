// components\rekonsiliasidata\skeleton\SkeletonGrid.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = ({ children }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30">
    {children}
  </Card>
);

export const SkeletonGrid = () => (
  <div className="flex flex-col gap-6 min-h-screen w-full bg-gray-100 p-4 md:p-6">
    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonCard>
        <CardHeader><Skeleton className="h-4 w-20" /></CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </SkeletonCard>

      <Card className="row-span-2 p-6 flex items-center justify-center">
        <Skeleton className="h-20 w-20 rounded-full" />
      </Card>

      <SkeletonCard>
        <CardHeader><Skeleton className="h-4 w-20" /></CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </CardContent>
      </SkeletonCard>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonCard>
        <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-28 mb-2" />
          <Skeleton className="h-4 w-24" />
        </CardContent>
      </SkeletonCard>

      <Card className="row-span-2 p-6">
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-10" />
            </div>
          ))}
        </div>
      </Card>

      <SkeletonCard>
        <CardHeader><Skeleton className="h-4 w-24" /></CardHeader>
        <CardContent className="py-6 space-y-2">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-40" />
        </CardContent>
      </SkeletonCard>
    </div>

    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-4">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-full" />
          ))}
        </div>
      </Card>
    ))}
  </div>
);
