"use client";

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, LabelList } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function ChartBarGeneric({
  title,
  description,
  data,
  color = "#4F46E5", // Default color
  customTicks, // <<== tambahan
}) {
  if (!data || !Array.isArray(data)) return null;

  // Ambil kolom terakhir sebagai prosentase
  const chartData = data.map((item) => ({
    loket: item[0], // Loket ada di index 0
    prosentase: Number(item[item.length - 1].replace("%", "")), // ambil nilai persentase
  }));

  // Domain otomatis berdasarkan ticks kalau ada
  const domain = customTicks
    ? [Math.min(...customTicks), Math.max(...customTicks)]
    : [0, "auto"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[400px] px-0">
        <ChartContainer
          config={{
            prosentase: { label: "Realisasi", color },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid vertical={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                domain={domain}
                ticks={customTicks}
                label={{
                  value: "Nilai Max (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <XAxis dataKey="loket" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="prosentase" fill={color} radius={[4, 4, 0, 0]}>
                <LabelList dataKey="prosentase" position="top" formatter={(val) => `${val.toFixed(2)}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="text-muted-foreground leading-none font-bold">Loket</div>
      </CardFooter>
    </Card>
  );
}
