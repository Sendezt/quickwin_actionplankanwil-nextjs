"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Dashboard</h2>
        <p>Selamat datang di panel admin 🚀</p>
      </CardContent>
    </Card>
  );
}
