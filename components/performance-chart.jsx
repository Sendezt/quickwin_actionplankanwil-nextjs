"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const chartData = [
  { month: "Jan", quickwin: 65, actionplan: 45 },
  { month: "Feb", quickwin: 70, actionplan: 52 },
  { month: "Mar", quickwin: 75, actionplan: 58 },
  { month: "Apr", quickwin: 78, actionplan: 65 },
  { month: "Mei", quickwin: 82, actionplan: 72 },
  { month: "Jun", quickwin: 85, actionplan: 78 },
];

const chartConfig = {
  quickwin: {
    label: "Quickwin Jateng",
    color: "var(--chart-1)",
  },
  actionplan: {
    label: "Action Plan Pusat",
    color: "var(--chart-2)",
  },
};

export function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Kinerja Program</CardTitle>
        <CardDescription>
          Perbandingan progress Quickwin Jateng dan Action Plan Pusat dalam 6
          bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="actionplan"
              type="natural"
              fill="var(--color-actionplan)"
              fillOpacity={0.4}
              stroke="var(--color-actionplan)"
              stackId="a"
            />
            <Area
              dataKey="quickwin"
              type="natural"
              fill="var(--color-quickwin)"
              fillOpacity={0.4}
              stroke="var(--color-quickwin)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Peningkatan 12% bulan ini <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Januari - Juni 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
