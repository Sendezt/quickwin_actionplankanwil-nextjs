// components\komitmenstakeholder\skeletons\LoadingSkeleton.jsx
import { SkeletonPeriod } from "./SkeletonPeriod";
import { SkeletonScore } from "./SkeletonScore";
import { SkeletonBreakdown } from "./SkeletonBreakdown";
import { SkeletonInfoCard } from "./SkeletonInfoCard";
import { SkeletonTable } from "./SkeletonTable";
import { LandPlot, Radical } from "lucide-react";

export const LoadingSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    {/* Periode Section */}
    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonPeriod />
      <SkeletonPeriod />
    </div>

    {/* Score Section */}
    <div className="grid gap-4 md:grid-cols-3">
      <SkeletonScore />
      <SkeletonScore />
      <SkeletonScore />
    </div>

    {/* Breakdown + Info Section */}
    <div className="grid gap-4 md:grid-cols-2">
      <SkeletonBreakdown />
      <div className="flex flex-col gap-4">
        <SkeletonInfoCard icon={LandPlot} />
        <SkeletonInfoCard icon={Radical} />
      </div>
    </div>

    {/* Tables Section */}
    {[...Array(4)].map((_, i) => (
      <SkeletonTable key={i} />
    ))}
  </div>
);
