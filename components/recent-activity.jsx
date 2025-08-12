import React from 'react'
import { Clock, CheckCircle, AlertTriangle, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    title: "Program SENGKUYUNG selesai",
    description: "Implementasi sistem baru berhasil diselesaikan",
    time: "2 jam lalu",
    type: "completed",
    user: "Admin Jateng",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    title: "Update progress PROMITRA",
    description: "Progress meningkat menjadi 85%",
    time: "4 jam lalu",
    type: "progress",
    user: "Tim Monitoring",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    title: "Peringatan deadline",
    description: "Program OK DEALER! mendekati batas waktu",
    time: "6 jam lalu",
    type: "warning",
    user: "System",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    title: "Laporan bulanan dibuat",
    description: "Laporan progress bulan Juni telah digenerate",
    time: "1 hari lalu",
    type: "completed",
    user: "Admin User",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    title: "Meeting koordinasi",
    description: "Rapat evaluasi program Action Plan Pusat",
    time: "2 hari lalu",
    type: "progress",
    user: "Koordinator",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

function getActivityIcon(type) {
  switch (type) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case 'progress':
      return <Clock className="h-4 w-4 text-blue-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-600" />
  }
}

function getActivityBadge(type) {
  switch (type) {
    case 'completed':
      return <Badge variant="default" className="bg-green-100 text-green-800">Selesai</Badge>
    case 'warning':
      return <Badge variant="destructive">Peringatan</Badge>
    case 'progress':
      return <Badge variant="secondary">Progress</Badge>
    default:
      return <Badge variant="outline">Info</Badge>
  }
}

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Aktivitas Terbaru
        </CardTitle>
        <CardDescription>
          Update terkini dari sistem monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.title}</p>
                  {getActivityIcon(activity.type)}
                </div>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  {getActivityBadge(activity.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
