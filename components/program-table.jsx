import React from 'react'
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const programs = [
  {
    id: 1,
    name: "SENGKUYUNG",
    category: "Quickwin Jateng",
    progress: 100,
    status: "Selesai",
    deadline: "2024-06-30",
    pic: "Tim Digital",
  },
  {
    id: 2,
    name: "PROMITRA",
    category: "Quickwin Jateng",
    progress: 85,
    status: "Progress",
    deadline: "2024-07-15",
    pic: "Tim UMKM",
  },
  {
    id: 3,
    name: "Implementasi UU HKPD",
    category: "Action Plan Pusat",
    progress: 92,
    status: "Progress",
    deadline: "2024-08-30",
    pic: "Tim Hukum",
  },
  {
    id: 4,
    name: "OK DEALER!",
    category: "Quickwin Jateng",
    progress: 45,
    status: "Terlambat",
    deadline: "2024-06-15",
    pic: "Tim Samsat",
  },
  {
    id: 5,
    name: "Kebijakan Relaksasi",
    category: "Action Plan Pusat",
    progress: 78,
    status: "Progress",
    deadline: "2024-09-30",
    pic: "Tim Kebijakan",
  },
]

function getStatusBadge(status) {
  switch (status) {
    case 'Selesai':
      return <Badge variant="default" className="bg-green-100 text-green-800">Selesai</Badge>
    case 'Progress':
      return <Badge variant="secondary">Progress</Badge>
    case 'Terlambat':
      return <Badge variant="destructive">Terlambat</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function getCategoryBadge(category) {
  return category === 'Quickwin Jateng' 
    ? <Badge variant="outline" className="bg-blue-50 text-blue-700">Quickwin</Badge>
    : <Badge variant="outline" className="bg-purple-50 text-purple-700">Action Plan</Badge>
}

export function ProgramTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Program</CardTitle>
        <CardDescription>
          Monitoring detail semua program yang sedang berjalan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>PIC</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell>{getCategoryBadge(program.category)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-2" />
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(program.status)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(program.deadline).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell className="text-sm">{program.pic}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Program
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
