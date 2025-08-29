// components\implementasiuuhkpd\DashboardStats.jsx
import React from "react";
import { PeriodCards } from "./PeriodCards";
import { ScoreCard } from "./ScoreCard";
import { InfoCards } from "./InfoCards";
import { FormulaCard } from "./FormulaCard";
import { LoadingSkeleton } from "./LoadingSkeleton";

export function DashboardStats({ dashboardData, rangeData, isLoading }) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <PeriodCards rangeData={rangeData} />

      <ScoreCard
        title="Skor Kanwil"
        value={dashboardData?.summary?.[6]}
        bgColor="bg-blue-100"
        textColor="text-blue-800"
        iconBg="bg-blue-200"
      />

      <ScoreCard
        title="Skor Cabang"
        value={dashboardData?.summary?.[7]}
        bgColor="bg-green-100"
        textColor="text-green-800"
        iconBg="bg-green-200"
      />

      <InfoCards />
      <FormulaCard />
    </>
  );
}
