"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function FeedbackPage() {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Manajemen Feedback</h2>
        <p>Halaman CRUD untuk feedback user.</p>
      </CardContent>
    </Card>
  );
}
