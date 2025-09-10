"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CabangPage() {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Manajemen Cabang</h2>
        <p>Halaman CRUD untuk data cabang.</p>
      </CardContent>
    </Card>
  );
}
