"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Info } from "lucide-react";
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
import { StatusBadge } from "./StatusBadge";
import FeedbackInfoModal from "./FeedbackInfoModal";
import FeedbackInfoProsesModal from "./FeedbackInfoProsesModal";

export const FeedbackTableRow = ({ feedback, index, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(null); // "detail" | "review" | null

  const handleOpenModal = () => {
    // Jika bukti gambar ada dan belum selesai → Review
    if (feedback.buktiGambar && !feedback.timestampSelesai) {
      setOpenModal("review");
    } else {
      setOpenModal("detail");
    }
  };

  const handleCloseModal = () => setOpenModal(null);

  return (
    <>
      <tr className="bg-white shadow rounded hover:bg-gray-50 transition-colors">
        <td className="px-6 py-3">{index + 1}</td>
        <td className="px-6 py-3">{feedback.cabang?.nama}</td>
        <td className="px-6 py-3">{feedback.actionPlan?.title}</td>
        <td className="px-6 py-3">{feedback.task}</td>
        <td className="px-6 py-3">
          <StatusBadge status={feedback.status} />
        </td>
        <td className="px-6 py-3 flex gap-2">
          {/* Tombol Edit */}
          <Button size="sm" variant="outline" onClick={() => onEdit(feedback)}>
            <Edit className="h-4 w-4" />
          </Button>

          {/* Tombol Delete */}
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

          {/* Tombol Detail/Review */}
          <Button
            size="sm"
            variant="outline"
            className={
              feedback.buktiGambar
                ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                : "border-gray-400 text-gray-600 hover:bg-gray-50"
            }
            onClick={handleOpenModal}
          >
            {feedback.buktiGambar && !feedback.timestampSelesai ? (
              <>
                <Eye className="h-4 w-4 mr-1" /> Review
              </>
            ) : (
              <>
                <Info className="h-4 w-4 mr-1" /> Detail
              </>
            )}
          </Button>
        </td>
      </tr>

      {/* Modal Detail */}
      {openModal === "detail" && (
        <FeedbackInfoModal
          open={true}
          onClose={handleCloseModal}
          feedback={feedback}
        />
      )}

      {/* Modal Review */}
      {openModal === "review" && (
        <FeedbackInfoProsesModal
          open={true}
          onClose={handleCloseModal}
          feedback={feedback}
        />
      )}
    </>
  );
};
