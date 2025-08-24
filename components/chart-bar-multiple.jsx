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

export function ChartBarMultiple({ data }) {
  const chartData = data.map((item) => ({
    loket: item[1],
    target: Number(item[3]),
    realisasi: Number(item[4]),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagram Implementasi UU HKPD Per Cabang</CardTitle>
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
    </Card>
  );
}
