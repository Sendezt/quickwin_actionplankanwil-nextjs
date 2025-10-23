// components\kolaborasimerchant\skeletons\SkeletonTableCard.jsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTableCard = ({ hasDescription = false }) => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-80 mb-2" />
      {hasDescription && <Skeleton className="h-4 w-48" />}
    </CardHeader>
    <CardContent>
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b p-3">
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-20" />)}
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="border-b p-3 last:border-b-0">
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-4 w-20" />)}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);