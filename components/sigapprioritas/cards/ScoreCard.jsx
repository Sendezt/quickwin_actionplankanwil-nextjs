import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const CardSkor = ({ title, color, score }) => (
  <Card className="p-0 overflow-hidden pb-4 text-center">
    <div
      className={`px-5 py-3 flex justify-between border-b rounded-t-xl bg-${color}-100`}
    >
      <h4 className={`text-sm font-semibold text-${color}-800`}>{title}</h4>
      <div className={`bg-${color}-200 rounded-full p-1`}>
        <BarChart3 className={`h-4 w-4 text-${color}-700`} />
      </div>
    </div>
    <CardContent>
      <div className={`text-7xl font-bold text-${color}-700`}>
        {score ?? "?"}
      </div>
      <p className="text-xs text-muted-foreground">
        Target Skor | 4 (Nilai Max)
      </p>
    </CardContent>
  </Card>
);

export function ScoreCards({ skorKanwil, skorCabang, skorSamsat }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <CardSkor title="Skor Kanwil" color="blue" score={skorKanwil} />
      <CardSkor title="Skor Cabang" color="green" score={skorCabang} />
      <CardSkor
        title="Skor Samsat Se-Jateng"
        color="yellow"
        score={skorSamsat}
      />
    </div>
  );
}
