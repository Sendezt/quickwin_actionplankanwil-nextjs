// components\komitmenstakeholder\cards\BreakdownStakholderCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const BreakdownStakeholderCard = ({ breakdownData }) => (
  <Card className="shadow-lg border-2 border-blue-500 bg-blue-50">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-base md:text-lg font-bold text-blue-800">
        Breakdown Komitmen Stakeholder
      </CardTitle>
      <BarChart3 className="h-5 w-5 text-blue-700" />
    </CardHeader>
    <CardContent className="py-3 px-5">
      <div className="space-y-3">
        {breakdownData?.data?.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm md:text-base text-gray-700 font-medium flex-1 pr-2">
              {item.judul}
            </span>
            <span className="text-lg md:text-xl font-extrabold text-blue-900">
              {item.skor}
            </span>
          </div>
        ))}
      </div>
      {breakdownData?.target && (
        <div className="mt-4 border-t border-blue-200 pt-3 flex justify-between items-center">
          <span className="font-semibold text-gray-800 text-base">
            {breakdownData.target.judul}
          </span>
          <span className="text-lg md:text-xl font-extrabold text-blue-900">
            {breakdownData.target.skor}
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);
