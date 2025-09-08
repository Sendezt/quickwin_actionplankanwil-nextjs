import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radical } from "lucide-react";

export const FormulaCard = () => {
  const formulas = [
    {
      title: "Terlaksananya Kebijakan Relaksasi",
      description: "= Ketersediaan Surat Keputusan Gubernur atas Kebijakan Pembebasan Denda, BBNKB II, dan Pajak Progresif / Target",
      color: "border-blue-400"
    },
    {
      title: "Pertumbuhan penerimaan SW di periode Relaksasi",
      description: "= Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n / Jumlah Penerimaan di Periode Relaksasi Kebijakan tahun n-1 × 100 - 100",
      color: "border-green-400"
    }
  ];

  return (
    <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Radical className="h-4 w-4 text-muted-foreground" />
          Formula Perhitungan
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-4">
        <div className="space-y-4 text-sm">
          {formulas.map((formula, index) => (
            <FormulaItem 
              key={index} 
              title={formula.title}
              description={formula.description}
              color={formula.color}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const FormulaItem = ({ title, description, color }) => (
  <div className={`border-l-4 ${color} pl-4 py-2 bg-white rounded-r-md shadow-sm`}>
    <p className="font-semibold text-gray-900 mb-2 text-sm">
      {title}
    </p>
    <p className="text-gray-600 text-xs leading-relaxed">
      {description}
    </p>
  </div>
);