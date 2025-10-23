// components\sosialisasikesamsatan\skeleton\SkeletonTable.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-64" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex space-x-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 flex-1" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex space-x-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-6 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);