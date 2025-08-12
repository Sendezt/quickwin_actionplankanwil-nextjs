"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartConfig = {
  target: {
    label: "Target",
    color: "var(--chart-1)",
  },
  realisasi: {
    label: "Realisasi",
    color: "var(--chart-2)",
  },
};

// components/chart-bar-multiple.jsx
export function ChartBarMultiple({ data }) {
  const chartData = data.map((item) => ({
    loket: item[1],
    target: Number(item[3]),
    realisasi: Number(item[4]),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Target vs Realisasi</CardTitle>
        <CardDescription>Per Loket Kantor</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontsize: 12 }} />
            <XAxis
              dataKey="loket"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="target" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="realisasi" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Target dan Realisasi Pelaksanaan UU HKPD{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Data bersumber dari API Sheet1 (Magang Project)
        </div>
      </CardFooter>
    </Card>
  );
}
