// components\kolaborasimerchant\skeletons\SkeletonScoreGrid.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonScoreGrid = () => (
  <div className="grid gap-4 md:grid-cols-3">
    {["blue", "green", "yellow"].map((color) => (
      <Card key={color} className="overflow-hidden p-0">
        <div className={`bg-${color}-100 px-5 py-3 border-b flex items-center justify-between`}>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <CardContent className="py-6 px-5 text-center">
          <Skeleton className="h-16 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardContent>
      </Card>
    ))}
  </div>
);