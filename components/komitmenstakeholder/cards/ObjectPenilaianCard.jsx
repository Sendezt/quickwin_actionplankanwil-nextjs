// components\komitmenstakeholder\cards\ObjectPenilaianCard.jsx
import { InfoCard } from "./InfoCard";
import { LandPlot } from "lucide-react";

export const ObjectPenilaianCard = () => (
  <InfoCard title="Obyek Penilaian" icon={LandPlot}>
    <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
      <li className="py-2">Kantor Wilayah</li>
      <li className="py-2">Kantor Cabang</li>
      <li className="py-2">Kantor Samsat</li>
    </ol>
    <p className="text-xs text-muted-foreground mt-1">3 Obyek Penilaian</p>
  </InfoCard>
);