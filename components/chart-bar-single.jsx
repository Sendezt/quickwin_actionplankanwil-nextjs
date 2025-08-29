"use client";

import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
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

export const description = "Prosentase Keterisian Data";

const chartConfig = {
  prosentase: {
    label: "Realisasi",
    color: "#f2a900",
  },
};

export function ChartBarSingle({ data }) {
  // mapping data
  const chartData = data.map((item) => ({
    loket: item[1],
    prosentase: Number(item[3]),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-red-800">
          Prosentase Keterisian Data
        </CardTitle>
        <CardDescription className="text-center">Loket Kantor</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[400px] px-0">
        {" "}
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 60]}
                ticks={[0, 20, 40, 60]}
                label={{
                  value: "Realisasi (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <XAxis
                dataKey="loket"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="prosentase" fill="#f2a900" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="prosentase"
                  position="top"
                  formatter={(val) => val.toFixed(2)}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Prosentase Keterisian Data <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Data bersumber dari QuickWin Action Plan
        </div>
      </CardFooter>
    </Card>
  );
}
