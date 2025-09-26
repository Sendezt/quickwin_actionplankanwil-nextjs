"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import RenderTable from "@/components/quickwinsamsat/RenderTable";
import RenderTableArray from "@/components/quickwinsamsat/RenderTableArray";
import ChartBarSamsat from "@/components/quickwinsamsat/ChartBarSamsat";

export default function QuickwinSamsat() {
    const [table1data, setTable1Data] = useState(null);  
    const [table2data, setTable2Data] = useState(null);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch table 1
                const res1 = await fetch("https://quickwin-jateng.vercel.app/api/dashboard/getquickwinsamsat");
                setTable1Data(await res1.json());

                // fetch table 2
                const res2 = await fetch("https://quickwin-jateng.vercel.app/api/dashboard/getquickwinsamsattable");
                const json2 = await res2.json();
                setTable2Data(json2);

                // 🔹 ekstrak data untuk chart
                const cabangs = json2?.data || [];
                const parsedChartData = cabangs.flatMap((cabang) =>
                    cabang.samsat.map((row) => ({
                        loket: row["Loket"],
                        nilai: parseFloat(
                            row["Action Plan Total"]?.["Nilai (Max 100%)"]?.replace("%", "") || "0"
                        ),
                    }))
                );
                setChartData(parsedChartData);
            } catch (error) {
                console.error("Gagal fetch data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="flex-1 min-w-0">
                <Navbar />
                {/* Table 1 */}
                <Card className="mb-6">
                    <CardContent>
                        <RenderTable data={table1data} />
                    </CardContent>
                </Card>

                {/* Chart Bar */}
                <Card>
                    <CardContent>
                        <ChartBarSamsat data={chartData} />
                    </CardContent>
                </Card>
                
                {/* Table 2 */}
                <Card className="mb-6">
                    <CardContent>
                        <RenderTableArray data={table2data} />
                    </CardContent>
                </Card>

            </SidebarInset>
        </SidebarProvider>
    )
}
