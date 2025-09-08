import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
  YAxis,
  LabelList,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  FileText,
  LandPlot,
  Radical,
} from "lucide-react";

// Skeleton Components
export const SkeletonCard = () => (
  <Card className="col-span-1 p-0 overflow-hidden">
    <div className="px-5 py-3 border-b">
      <Skeleton className="h-4 w-1/4 mb-2" />
    </div>
    <CardContent className="py-6 px-5 space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
  </Card>
);

export const SkeletonTable = ({ rows = 5, cols = 6 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-2">
        {Array.from({ length: cols }).map((_, j) => (
          <Skeleton key={j} className="h-6 w-24" />
        ))}
      </div>
    ))}
  </div>
);

// Periode Cards Component
export const PeriodeCards = ({ rangeData, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {/* Periode Cards */}
          {rangeData?.periode_awal && rangeData?.periode_akhir && (
            <>
              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Periode Awal</CardTitle>
                  <CalendarDays className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-1 px-6">
                  <div className="text-base font-semibold text-gray-900">
                    {rangeData.periode_awal}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tanggal Mulai</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-dashed bg-muted/30">
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Periode Akhir</CardTitle>
                  <CalendarDays className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="py-1 px-6">
                  <div className="text-base font-semibold text-gray-900">
                    {rangeData.periode_akhir}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tanggal Akhir</p>
                </CardContent>
              </Card>
            </>
          )}

          {/* Obyek Penilaian */}
          <Card className="shadow-sm border border-dashed bg-muted/30">
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium">Obyek Penilaian</CardTitle>
              <LandPlot className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-1 px-6">
              <div className="text-base font-semibold text-gray-900">Kantor Wilayah</div>
              <p className="text-xs text-muted-foreground mt-1">1 Obyek Penilaian</p>
            </CardContent>
          </Card>

          {/* SK Gubernur */}
          <Card className="shadow-sm border border-dashed bg-muted/30">
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-xs font-medium">SK Gubernur Jateng</CardTitle>
              <FileText className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent className="py-1 px-6">
              <a
                href="https://drive.google.com/file/d/1zJc41CQkQ4MFStjR_TD9uIwD9FAN9ODm/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-600 hover:underline block"
              >
                Surat Keputusan Gubernur Jawa Tengah
              </a>
              <p className="text-xs text-muted-foreground mt-1">
                No. 100.3.3.1/87 Tahun 2025 tentang Pembebasan Pajak Kendaraan Bermotor
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Score Cards Component
export const ScoreCards = ({ breakdownData, loading }) => {
  const totalSkor = breakdownData?.data?.reduce((total, item) => total + item.skor, 0) ?? 0;
  const targetSkor = 8;

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Skor Total */}
      <Card className="p-0 overflow-hidden pb-4 text-center">
        <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <h4 className="text-sm font-semibold text-blue-800">Skor Total</h4>
          <div className="bg-blue-200 rounded-full">
            <TrendingUp className="h-4 w-4 text-blue-700" />
          </div>
        </div>
        <CardContent className="pb-4">
          <div className="text-7xl font-bold text-blue-900">{totalSkor}</div>
          <p className="text-xs text-muted-foreground">
            Target: {targetSkor} (Nilai Max)
          </p>
        </CardContent>
      </Card>

      {/* Breakdown Skor */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <h4 className="text-sm font-semibold text-blue-800">Breakdown Skor</h4>
          <div className="bg-blue-200 rounded-full">
            <BarChart3 className="h-4 w-4 text-blue-700" />
          </div>
        </div>
        <CardContent className="py-2 space-y-2">
          {breakdownData?.data?.length > 0 ? (
            breakdownData.data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-lg text-gray-600 flex-1 pr-2 font-bold">
                  {item.judul}
                </span>
                <span className="text-2xl font-extrabold text-blue-900">
                  {item.skor}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">Tidak ada data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Formula Card Component
export const FormulaCard = ({ loading }) => {
  if (loading) return null;

  return (
    <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-sm font-medium text-gray-700">Forumula</CardTitle>
        <Radical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3 text-sm">
          <div className="border-l-4 border-gray-400 pl-3">
            <p className="font-semibold text-gray-900 mb-1">
              Terlaksananya Kebijakan Relaksasi
            </p>
            <p className="text-gray-600 text-xs">
              = Ketersediaan Surat Keputusan Gubernur atas Kebijakan Pembebasan Denda, BBNKB II, dan Pajak Progresif / Target
            </p>
          </div>
          <div className="border-l-4 border-gray-400 pl-3">
            <p className="font-semibold text-gray-900 mb-1">
              Pertumbuhan penerimaan SW di periode Relaksasi
            </p>
            <p className="text-gray-600 text-xs">
              = Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n / Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n-1 × 100 - 100
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Growth Chart Component
export const GrowthChart = ({ table1Data, loading }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle>Grafik Pertumbuhan</CardTitle>
        <CardDescription>Pertumbuhan per Loket Kantor</CardDescription>
      </CardHeader>
      <CardContent>
        {!loading && table1Data ? (
          <ChartContainer
            config={{
              growth: {
                label: "Pertumbuhan (%)",
                color: "var(--chart-1)",
              },
            }}
            className="h-[300px] w-full"
          >
            <LineChart
              data={table1Data.data.map((row) => ({
                name: row[1],
                growth: parseFloat(row[4].replace("%", "")),
              }))}
              margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
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
                }}
              />
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                angle={-30}
                textAnchor="end"
                padding={{ left: 20, right: 20 }}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value;
                    return (
                      <div className="p-2 bg-white shadow rounded border text-sm">
                        <div className="font-semibold">{label}</div>
                        <div>Pertumbuhan: {value} %</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                dataKey="growth"
                type="natural"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--chart-1)" }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="growth"
                  position="top"
                  dy={-10}
                  formatter={(val) => `${val}%`}
                  className="text-xs fill-gray-700"
                />
              </Line>
            </LineChart>
          </ChartContainer>
        ) : (
          <Skeleton className="h-[300px] w-full" />
        )}
      </CardContent>
    </Card>
  );
};

// Data Table 1 Component
export const DataTable1 = ({ table1Data, loading }) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          Rekapitulasi{" "}
          <span className="text-yellow-500">
            Pertumbuhan Penerimaan SW Periode Pemutihan
          </span>{" "}
          Per Cabang
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonTable
            rows={5}
            cols={table1Data?.header[0]?.length || 6}
          />
        ) : (
          <div className="overflow-x-auto w-full scrollbar-hide">
            <Table className="min-w-max border border-gray-300 w-full">
              <TableHeader>
                <TableRow>
                  {table1Data.header[0].map((head, i) => (
                    <TableHead
                      key={i}
                      className={
                        "min-w-[120px] border border-gray-300 " +
                        (i === 1 ? "text-center" : "text-center")
                      }
                    >
                      {head}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {table1Data.data.map((row, i) => (
                  <TableRow key={i}>
                    {row.map((cell, j) => (
                      <TableCell
                        key={j}
                        className={
                          `border-b border-r border-dotted border-gray-300 ` +
                          (j === 1
                            ? "text-left font-medium"
                            : "text-center")
                        }
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="font-bold border border-gray-300 text-center"
                  >
                    {table1Data.summary[0]}
                  </TableCell>
                  {table1Data.summary.slice(1).map((cell, j) => (
                    <TableCell
                      key={j}
                      className="font-bold border border-gray-300 text-center"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Data Table 2 Component  
export const DataTable2 = ({ tableData, loading }) => {
  const { headerTop, headerBottom, data, summary } = tableData || {};

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          Rekapitulasi{" "}
          <span className="text-yellow-500">
            Pertumbuhan Penerimaan SW Periode Pemutihan
          </span>{" "}
          Per Cabang
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <SkeletonTable rows={5} cols={headerBottom?.length || 6} />
        ) : (
          <div className="overflow-x-auto w-full">
            <Table className="min-w-max border border-gray-300 w-full">
              <TableHeader>
                {/* Header Top Row */}
                <TableRow>
                  <TableHead
                    rowSpan={2}
                    className="text-center min-w-[120px] sticky left-0 bg-white border border-gray-300 z-10 px-2 py-3"
                  >
                    {headerTop[0][0]}
                  </TableHead>
                  {headerTop[0].slice(1, 11).map((header, index) => (
                    <TableHead
                      key={index}
                      colSpan={1}
                      className="text-center min-w-[150px] border border-gray-300 px-2 py-1"
                    >
                      {header}
                    </TableHead>
                  ))}
                  <TableHead
                    colSpan={4}
                    className="text-center min-w-[600px] border border-gray-300 px-2 py-1"
                  >
                    {headerTop[0][11]}
                  </TableHead>
                </TableRow>

                {/* Header Bottom Row */}
                <TableRow>
                  {headerBottom.map((item, index) => (
                    <TableHead
                      key={index}
                      className="text-center min-w-[120px] border border-gray-300 px-2 py-2 text-sm"
                    >
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className={
                          `border-b border-r border-dotted border-gray-300 ` +
                          (cellIndex === 0
                            ? "text-left font-medium sticky left-0 bg-white"
                            : "text-center") +
                          (cellIndex === 3 ||
                          cellIndex === 11 ||
                          cellIndex === 12 ||
                          cellIndex === 13 ||
                          cellIndex === 14
                            ? " text-green-600"
                            : "")
                        }
                      >
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  {summary.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={
                        `font-bold border border-gray-300 ` +
                        (cellIndex === 0
                          ? "text-left sticky left-0 bg-white"
                          : "text-center")
                      }
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};