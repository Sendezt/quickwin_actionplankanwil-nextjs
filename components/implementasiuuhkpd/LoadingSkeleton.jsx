// components/implementasiuuhkpd/LoadingSkeleton.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="col-span-2 p-0 overflow-hidden">
          <div className="px-5 py-3 border-b">
            <Skeleton className="h-4 w-1/4 mb-2" />
          </div>
          <CardContent className="py-6 px-5 space-y-2">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
