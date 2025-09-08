import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart3 } from "lucide-react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const ScoreCards = ({ breakdownData, loading }) => {
  const totalSkor = breakdownData?.data?.reduce((total, item) => total + item.skor, 0) ?? 0;
  const targetSkor = 8;

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <LoadingSkeleton.Card key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ScoreCard
        title="Skor Total"
        value={totalSkor}
        description={`Target: ${targetSkor} (Nilai Max)`}
        icon={TrendingUp}
        color="blue"
      />
      
      <BreakdownCard data={breakdownData?.data} />
    </div>
  );
};

const ScoreCard = ({ title, value, description, icon: Icon, color = "blue" }) => (
  <Card className="p-0 overflow-hidden pb-4 text-center hover:shadow-lg transition-shadow">
    <div className={`bg-${color}-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b`}>
      <h4 className={`text-sm font-semibold text-${color}-800`}>{title}</h4>
      <div className={`bg-${color}-200 rounded-full p-1`}>
        <Icon className={`h-4 w-4 text-${color}-700`} />
      </div>
    </div>
    <CardContent className="pb-4">
      <div className={`text-7xl font-bold text-${color}-900 my-4`}>{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const BreakdownCard = ({ data }) => (
  <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
    <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
      <h4 className="text-sm font-semibold text-blue-800">Breakdown Skor</h4>
      <div className="bg-blue-200 rounded-full p-1">
        <BarChart3 className="h-4 w-4 text-blue-700" />
      </div>
    </div>
    <CardContent className="py-4 space-y-3">
      {data?.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
            <span className="text-lg text-gray-600 flex-1 pr-2 font-bold">
              {item.judul}
            </span>
            <span className="text-2xl font-extrabold text-blue-900">
              {item.skor}
            </span>
          </div>
        ))
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">
          Tidak ada data breakdown skor
        </p>
      )}
    </CardContent>
  </Card>
);