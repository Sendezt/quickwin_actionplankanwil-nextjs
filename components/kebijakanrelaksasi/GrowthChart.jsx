import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, CartesianGrid, XAxis, Line, YAxis, LabelList } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export const GrowthChart = ({ table1Data, loading }) => {
  // Transform data untuk chart
  const chartData = table1Data?.data?.map((row) => ({
    name: row[1], // Nama lokasi/cabang
    growth: parseFloat(row[4]?.replace("%", "") || 0), // Pertumbuhan dalam angka
    fullName: row[1] // Untuk tooltip yang lebih panjang
  })) || [];

  const chartConfig = {
    growth: {
      label: "Pertumbuhan (%)",
      color: "hsl(var(--chart-1))",
    },
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border text-sm">
          <div className="font-semibold text-gray-900 mb-1">{label}</div>
          <div className="text-blue-600">
            Pertumbuhan: <span className="font-bold">{value}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Grafik Pertumbuhan</CardTitle>
          <CardDescription>Pertumbuhan per Loket Kantor</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!chartData.length) {
    return (
      <Card className="w-full overflow-hidden">
        <CardHeader>
          <CardTitle>Grafik Pertumbuhan</CardTitle>
          <CardDescription>Pertumbuhan per Loket Kantor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Tidak ada data untuk ditampilkan
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Grafik Pertumbuhan</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {chartData.length} Lokasi
          </span>
        </CardTitle>
        <CardDescription>Pertumbuhan per Loket Kantor</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 30, right: 30, left: 30, bottom: 60 }}
          >
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{
                value: "Pertumbuhan (%)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { textAnchor: 'middle' }
              }}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            
            <CartesianGrid 
              vertical={false} 
              strokeDasharray="3 3"
              opacity={0.4}
            />
            
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-45}
              textAnchor="end"
              padding={{ left: 20, right: 20 }}
              height={60}
            />
            
            <ChartTooltip
              cursor={{
                stroke: 'hsl(var(--chart-1))',
                strokeWidth: 1,
                strokeDasharray: '5 5'
              }}
              content={<CustomTooltip />}
            />
            
            <Line
              dataKey="growth"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ 
                fill: "hsl(var(--chart-1))", 
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{ 
                r: 7,
                stroke: "hsl(var(--chart-1))",
                strokeWidth: 2,
                fill: "white"
              }}
            >
              <LabelList
                dataKey="growth"
                position="top"
                dy={-10}
                formatter={(val) => `${val}%`}
                className="text-xs fill-gray-700 font-medium"
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};