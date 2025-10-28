"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import RenderQuickwinsTable from "@/components/quickwinjateng/RenderTable";

export default function QuickwinJateng() {
  const [table1Data, setTable1Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `${BASE_URL}/api/dashboard/getquickwinjateng`
        );
        setTable1Data(await res1.json());
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
          {/* Table */}
          <Card>
            <CardContent>
              <RenderQuickwinsTable data={table1Data} />
            </CardContent>
          </Card>
      </SidebarInset>
    </SidebarProvider>
  );
}
