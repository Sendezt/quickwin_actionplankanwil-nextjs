"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import RenderTable from "@/components/quickwinsamsat/RenderTable";

export default function QuickwinSamsat() {
    const [table1data, setTableData] = useState(null);  
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://magangproject.vercel.app/api/dashboard/getquickwinsamsat");
                setTableData(await res.json());
            } catch (error) {
                console.error("Gagal fetch data:", error);
            }
        };

        fetchData();
    }, [])

    return (
        <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset className="flex-1 min-w-0">
            <Navbar />
            {/* Table */}
            <Card>
                <CardContent>
                    <RenderTable data={table1data} />
                </CardContent>
            </Card>
        </SidebarInset>
        </SidebarProvider>
    )
}