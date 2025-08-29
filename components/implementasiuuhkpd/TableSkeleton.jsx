// components\implementasiuuhkpd\TableSkeleton.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 5, cols = 8 }) {
  return (
    <div className="space-y-2">
      {[...Array(rows)].map((_, idx) => (
        <div key={idx} className="flex gap-2">
          {[...Array(cols)].map((__, i2) => (
            <Skeleton key={i2} className="h-6 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}