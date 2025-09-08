import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, LandPlot, FileText } from "lucide-react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const PeriodCards = ({ rangeData, loading }) => {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingSkeleton.Card key={i} />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Periode Awal",
      value: rangeData?.periode_awal,
      description: "Tanggal Mulai",
      icon: CalendarDays,
      show: rangeData?.periode_awal && rangeData?.periode_akhir,
    },
    {
      title: "Periode Akhir",
      value: rangeData?.periode_akhir,
      description: "Tanggal Akhir",
      icon: CalendarDays,
      show: rangeData?.periode_awal && rangeData?.periode_akhir,
    },
    {
      title: "Obyek Penilaian",
      value: "Kantor Wilayah",
      description: "1 Obyek Penilaian",
      icon: LandPlot,
      show: true,
    },
    {
      title: "SK Gubernur Jateng",
      value: "Surat Keputusan Gubernur Jawa Tengah",
      description:
        "No. 100.3.3.1/87 Tahun 2025 tentang Pembebasan Pajak Kendaraan Bermotor",
      icon: FileText,
      show: true,
      isLink: true,
      href: "https://drive.google.com/file/d/1zJc41CQkQ4MFStjR_TD9uIwD9FAN9ODm/view",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          {cards
            .filter((card) => card.show)
            .map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value, description, icon: Icon, isLink, href }) => (
  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-xs font-medium">{title}</CardTitle>
      <Icon className="h-3 w-3 text-muted-foreground" />
    </CardHeader>
    <CardContent className="py-1 px-6">
      {isLink ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-blue-600 hover:underline block transition-colors"
        >
          {value}
        </a>
      ) : (
        <div className="text-base font-semibold text-gray-900">{value}</div>
      )}
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);
