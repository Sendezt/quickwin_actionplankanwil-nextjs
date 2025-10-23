
// components\komitmenstakeholder\cards\FormulaStakholdeCard.jsx
import { InfoCard } from "./InfoCard";
import { Radical } from "lucide-react";

export const FormulaStakeholderCard = () => (
  <InfoCard title="Forumula" icon={Radical}>
    <div className="border-l-4 border-gray-400 pl-3 space-y-1 text-sm">
      <p className="font-semibold text-gray-900 mb-1">
        Terlaksananya sinergi yang diwujudkan dalam bentuk Komitmen Bersama, yang
        terimplementasi ke dalam sebuah inisiatif strategis, yang selanjutnya dilakukan
        analisa dan evaluasi atas inisiatif yang dilakukan
      </p>
      <p className="text-gray-600 text-xs">
        = Ketersediaan komitmen (50%), Implementasi inisiatif strategis (25%), dan
        ketersediaan hasil analisa dan evaluasi (25%) / Target
      </p>
    </div>
  </InfoCard>
);