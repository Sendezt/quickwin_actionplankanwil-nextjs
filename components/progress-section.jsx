import React from 'react'
import { TrendingUp, Users } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

function ProgressItem(props) {
  const { title, progress, isCompleted = false } = props

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{title}</span>
        <Badge variant={isCompleted ? "default" : "secondary"}>
          {progress}%
        </Badge>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

export function ProgressSection() {
  const quickwinData = [
    { title: "Peningkatan Infrastruktur Digital", progress: 85 },
    { title: "Optimalisasi Pelayanan Publik", progress: 92 },
    { title: "Pengembangan UMKM Lokal", progress: 78 },
    { title: "Program Kesehatan Masyarakat", progress: 100, isCompleted: true },
    { title: "Pelatihan SDM Aparatur", progress: 65 },
  ]

  const actionPlanData = [
    { title: "Reformasi Birokrasi", progress: 100, isCompleted: true },
    { title: "Digitalisasi Layanan", progress: 88 },
    { title: "Peningkatan SDM", progress: 75 },
    { title: "Infrastruktur", progress: 82 },
    { title: "Kesejahteraan Rakyat", progress: 95 },
    { title: "Ekonomi Nasional", progress: 70 },
    { title: "Kualitas Pendidikan", progress: 85 },
    { title: "Daerah Tertinggal", progress: 45 },
    { title: "Lingkungan Hidup", progress: 78 },
    { title: "Keamanan Nasional", progress: 90 },
    { title: "Pariwisata", progress: 68 },
    { title: "Ketahanan Pangan", progress: 72 },
    { title: "Investasi", progress: 80 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Quickwin Jateng Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Progress Quickwin Jateng
          </CardTitle>
          <CardDescription>
            Status pelaksanaan 5 program prioritas Jawa Tengah
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickwinData.map((item, index) => (
            <ProgressItem key={index} {...item} />
          ))}
        </CardContent>
      </Card>

      {/* Action Plan Pusat Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Progress Action Plan Pusat
          </CardTitle>
          <CardDescription>
            Status pelaksanaan 13 program strategis nasional
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {actionPlanData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="truncate">{item.title}</span>
                <Badge
                  variant={
                    item.progress >= 95
                      ? "default"
                      : item.progress < 50
                      ? "destructive"
                      : "secondary"
                  }
                  className="ml-2"
                >
                  {item.progress}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
