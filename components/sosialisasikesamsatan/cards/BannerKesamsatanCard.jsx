// components\sosialisasikesamsatan\cards\BannerKesamsatanCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const BannerKesamsatanCard = () => (
  <Card className="shadow-sm border border-dashed bg-muted/30 hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-1">
      <CardTitle className="text-sm font-medium text-gray-700">Banner Kesamsatan</CardTitle>
      <FileText className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="p-5">
      <ol className="list-decimal pl-6 text-sm text-gray-900 font-semibold divide-y divide-gray-200">
        <li className="py-2">Banner Terkait Jasa Raharja</li>
        <li className="py-2">Banner Terkait JRku Reward</li>
        <li className="py-2">Banner Terkait Signal</li>
        <li className="py-2">Banner Terkait Layanan Online</li>
        <li className="py-2">Banner Terkait Fungsi Regident, PKB, dan SWDKLLJ</li>
      </ol>
    </CardContent>
  </Card>
);