"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  FileText,
  LandPlot,
  Radical,
} from "lucide-react";

export function InfoCard({ title, value, description, icon: Icon, isLoading }) {
  if (isLoading) {
    return (
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </CardHeader>
        <CardContent className="py-2 px-7 space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-dashed bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-xs font-medium">{title}</CardTitle>
        <Icon className="h-3 w-3 text-muted-foreground" />
      </CardHeader>
      <CardContent className="py-1 px-6">
        <div className="text-base font-semibold text-gray-900">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export function PeriodCards({ rangeData, loading }) {
  return (
    <>
      {rangeData?.periode_awal && rangeData?.periode_akhir && (
        <>
          <InfoCard
            title="Periode Awal"
            value={rangeData.periode_awal}
            description="Tanggal Mulai"
            icon={CalendarDays}
            isLoading={loading}
          />
          <InfoCard
            title="Periode Akhir"
            value={rangeData.periode_akhir}
            description="Tanggal Akhir"
            icon={CalendarDays}
            isLoading={loading}
          />
        </>
      )}
    </>
  );
}

export function ObjectCard({ loading }) {
  return (
    <InfoCard
      title="Obyek Penilaian"
      value="Kantor Samsat"
      description="1 Obyek Penilaian"
      icon={LandPlot}
      isLoading={loading}
    />
  );
}

export function SupportLetterCard({ loading }) {
  if (loading) {
    return (
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-3 rounded-full" />
        </CardHeader>
        <CardContent className="py-2 px-7 space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-dashed bg-muted/30">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-xs font-medium">
          Surat Dukungan Opsgab
        </CardTitle>
        <FileText className="h-3 w-3 text-muted-foreground" />
      </CardHeader>
      <CardContent className="py-1 px-6">
        <a
          href="https://drive.google.com/file/d/1PiK5uwKQ2LPZfLICZZKwmaDX-CW-wmx5/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-blue-600 hover:underline block"
        >
          Surat Dukungan Operasi Gabungan
        </a>
        <p className="text-xs text-muted-foreground mt-1">
          Surat Sekda kepada Kapolda No.900.1.13.1/0005203 Hal Kegiatan Operasi
          Gabungan Optimalisasi Pajak Kendaraan Bermotor Tahun 2025
        </p>
      </CardContent>
    </Card>
  );
}

export function ScoreCards({ totalSkor, targetSkor, breakdownData, loading }) {
  if (loading) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-0 overflow-hidden">
            <div className="bg-blue-100 px-5 py-3 flex items-center justify-between border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <CardContent className="py-6 space-y-3 text-center">
              {i === 0 ? (
                <>
                  <Skeleton className="h-14 w-20 mx-auto" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </>
              ) : (
                Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex justify-between items-center px-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {/* Skor Total */}
      <Card className="p-0 overflow-hidden pb-4 text-center">
        <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <h4 className="text-sm font-semibold text-blue-800">Skor Total</h4>
          <div className="bg-blue-200 rounded-full">
            <TrendingUp className="h-4 w-4 text-blue-700" />
          </div>
        </div>
        <CardContent className="pb-4">
          <div className="text-7xl font-bold text-blue-900">{totalSkor}</div>
          <p className="text-xs text-muted-foreground">Target: {targetSkor}</p>
        </CardContent>
      </Card>

      {/* Breakdown Skor */}
      <Card className="p-0 overflow-hidden">
        <div className="bg-blue-100 px-5 py-3 flex items-center justify-between rounded-t-xl border-b">
          <h4 className="text-sm font-semibold text-blue-800">Breakdown Skor</h4>
          <div className="bg-blue-200 rounded-full">
            <BarChart3 className="h-4 w-4 text-blue-700" />
          </div>
        </div>
        <CardContent className="py-2 space-y-2">
          {breakdownData?.data?.length > 0 ? (
            breakdownData.data.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-lg text-gray-600 flex-1 pr-2 font-bold">
                  {item.judul}
                </span>
                <span className="text-2xl font-extrabold text-blue-900">
                  {item.skor}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground">Tidak ada data</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export function FormulaCard({ loading }) {
  if (loading) {
    return (
      <Card className="shadow-sm border border-dashed bg-muted/30">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border-b last:border-0 pb-2">
              <Skeleton className="h-4 w-56" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle className="text-sm font-medium text-gray-700">Forumula</CardTitle>
        <Radical className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3 text-sm">
          {/* Formula 1 */}
          <div className="border-l-4 border-gray-400 pl-3">
            <p className="font-semibold text-gray-900 mb-1">
              Terlaksananya Kegiatan Operasi Gabungan
            </p>
            <p className="text-gray-600 text-xs">= Realisasi Kegiatan / Target</p>
          </div>

          {/* Formula 2 */}
          <div className="border-l-4 border-gray-400 pl-3">
            <p className="font-semibold text-gray-900 mb-1">
              Kontribusi SW terkutip dari Tunggakan SW
            </p>
            <p className="text-gray-600 text-xs">
              = Realisasi SW Terkutip / Tunggakan SW
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}