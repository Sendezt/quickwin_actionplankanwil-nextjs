"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="text-gray-700 font-semibold">No</TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Username
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">Role</TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Cabang
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Created At
            </TableHead>
            <TableHead className="text-center text-gray-700 font-semibold">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <TableCell className="text-gray-600 font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="text-gray-900 font-medium">
                {user.username}
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    user.role === "Admin"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200"
                      : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200"
                  }
                  variant="secondary"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">
                {user.cabang ? (
                  user.cabang.nama
                ) : (
                  <span className="text-gray-400 italic">-</span>
                )}
              </TableCell>
              <TableCell className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(user)}
                    className="border-gray-300 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white border border-gray-200">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-900">
                          Konfirmasi Hapus
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                          Yakin ingin menghapus user{" "}
                          <strong className="text-gray-900">
                            {user.username}
                          </strong>
                          ? Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2">
                        <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                          Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(user.id)}
                          className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-colors"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
