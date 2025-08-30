"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RenderTableSort from "@/components/sengkuyung/RenderTableSort";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import RenderTable from "@/components/sengkuyung/RenderTable";

export default function MenuSengkuyung() {
  const [table1, setTable1] = useState(null);
  const [table2, setTable2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/sheetI/getsheetItable1" 
        );
        const json = await res.json();
        setTable1(json.table1);
        setTable2(json.table2);
      } catch (err) {
        console.error("Gagal fetch data sengkuyung:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex-1 min-w-0">
        <Navbar />
        <div className="p-6 space-y-8">
          {/* Bagian Potensi */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Potensi{" "}
              <span className="text-sm text-gray-500">
                (* dalam ribu rupiah)
              </span>
            </h2>

            <Card>
              <CardContent>
                <div className="grid grid-cols-5 divide-x text-center">
                  {/* Kend Potensi */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      Kend Potensi
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-20 mx-auto mt-2" />
                    ) : (
                      <div className="text-2xl font-bold text-green-700">
                        {table2?.summary?.total?.[1]}
                      </div>
                    )}
                  </div>

                  {/* PKB Prov */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PKB Prov*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <div className="text-2xl font-bold text-purple-800">
                        Rp{table2?.summary?.total?.[7]}
                      </div>
                    )}
                  </div>

                  {/* PKB Opsen */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PKB Opsen*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <div className="text-2xl font-bold text-red-600">
                        Rp{table2?.summary?.total?.[10]}
                      </div>
                    )}
                  </div>

                  {/* SWDKLLJ */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      SWDKLLJ*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <div className="text-2xl font-bold text-blue-700">
                        Rp{table2?.summary?.total?.[4]}
                      </div>
                    )}
                  </div>

                  {/* PNBP */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PNBP*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <div className="text-2xl font-bold text-orange-600">
                        Rp{table2?.summary?.total?.[13]}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bagian Progress */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Progress Pembayaran Sengkuyung Prioritas{" "}
              <span className="text-sm text-gray-500">
                (* dalam ribu rupiah)
              </span>
            </h2>

            <Card>
              <CardContent>
                <div className="grid grid-cols-5 divide-x text-center">
                  {/* Kend Bayar */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      Kend Bayar
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-20 mx-auto mt-2" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-green-700">
                          {table2?.summary?.total?.[2]}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="text-base font-semibold text-green-700">
                            {table2?.summary?.total?.[3]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* PKB Prov */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PKB Prov Bayar*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-purple-800">
                          Rp{table2?.summary?.total?.[8]}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="text-base font-semibold text-purple-800">
                            {table2?.summary?.total?.[9]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* PKB Opsen */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PKB Opsen Bayar*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-red-600">
                          Rp{table2?.summary?.total?.[11]}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="text-base font-semibold text-red-600">
                            {table2?.summary?.total?.[12]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* SWDKLLJ */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      SWDKLLJ Bayar*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-blue-700">
                          Rp{table2?.summary?.total?.[5]}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="text-base font-semibold text-blue-700">
                            {table2?.summary?.total?.[6]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* PNBP */}
                  <div className="p-4">
                    <div className="text-sm font-medium text-gray-600">
                      PNBP*
                    </div>
                    {loading ? (
                      <Skeleton className="h-8 w-24 mx-auto mt-2" />
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-orange-600">
                          Rp{table2?.summary?.total?.[14]}
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Success Rate
                          </p>
                          <p className="text-base font-semibold text-orange-600">
                            {table2?.summary?.total?.[15]}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold mb-2">
              Ranking Per Kabupaten Kota Berdasarkan Success Rate Penerimaan SWDKLLJ
            </h2>
            <Card>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-40 w-full" />
                ) : (
                  <RenderTableSort data={table2} />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold mb-2">
              Ranking Per Cabang Success Rate Penerimaan SWDKLLJ
            </h2>
            <Card>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-40 w-full" />
                ) : (
                  <RenderTable data={table1} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
