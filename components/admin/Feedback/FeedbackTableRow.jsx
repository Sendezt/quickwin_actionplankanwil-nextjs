import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
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
import { renderStatusBadge } from "@/constants/feedbackUtils";
import { Badge } from "@/components/ui/badge";

export const FeedbackTableRow = ({ feedback, index, onEdit, onDelete }) => (
  <tr className="bg-white shadow rounded hover:bg-gray-50 transition-colors">
    <td className="px-6 py-3">{index + 1}</td>
    <td className="px-6 py-3">{feedback.cabang?.nama}</td>
    <td className="px-6 py-3">{feedback.actionPlan?.title}</td>
    <td className="px-6 py-3">{feedback.task}</td>
    <td className="px-6 py-3">{renderStatusBadge(feedback.status, Badge)}</td>
    <td className="px-6 py-3 flex gap-2">
      <Button size="sm" variant="outline" onClick={() => onEdit(feedback)}>
        <Edit className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Yakin ingin menghapus feedback dari{" "}
              <strong>{feedback.cabang?.nama}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(feedback.id)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </td>
  </tr>
);
