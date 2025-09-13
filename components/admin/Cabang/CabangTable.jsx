"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit3, Calendar, Building2 } from "lucide-react";
import DeleteCabangDialog from "./DeleteCabangDialog";

export default function CabangTable({
  cabangs,
  onEdit,
  deletingId,
  handleDelete,
}) {
  if (!cabangs.length) {
    return (
      <div className="text-center py-16">
        <Building2 className="h-14 w-14 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-600 font-medium text-lg">Belum ada cabang</p>
        <p className="text-sm text-gray-400">Tambahkan cabang pertama Anda</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/70">
            <TableHead className="w-[60px] text-center">No</TableHead>
            <TableHead>Nama Cabang</TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                Dibuat
              </div>
            </TableHead>
            <TableHead className="text-center w-[160px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cabangs.map((cabang, index) => (
            <TableRow
              key={cabang.id}
              className="hover:bg-blue-50/50 transition-colors"
            >
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className="font-mono text-xs bg-gray-50 border-gray-300"
                >
                  {index + 1}
                </Badge>
              </TableCell>
              <TableCell className="font-medium text-gray-800">
                {cabang.nama}
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(cabang.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(cabang.id)}
                    className="h-8 px-3 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit3 className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <DeleteCabangDialog
                    cabang={cabang}
                    deletingId={deletingId}
                    handleDelete={handleDelete}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
