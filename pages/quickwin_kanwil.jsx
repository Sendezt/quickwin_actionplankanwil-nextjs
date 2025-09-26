"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import RenderQuickwinsTable from "@/components/quickwinkanwil/RenderTable";

export default function QuickwinKanwil() {
  const [table1Data, setTable1Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://quickwin-jateng.vercel.app/api/dashboard/getquickwinkanwil"
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
