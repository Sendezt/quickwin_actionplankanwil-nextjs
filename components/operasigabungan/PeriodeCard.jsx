"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export default function PeriodeCard({ title, date, description }) {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="bg-yellow-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
        <h4 className="text-sm font-semibold text-yellow-800">
          {title}
        </h4>
        <div className="bg-yellow-200 rounded-full p-1">
          <CalendarDays className="h-4 w-4 text-yellow-700" />
        </div>
      </div>
      <CardContent className="py-6 px-5">
        <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
          {date}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
