"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function FeedbackModal({ open, onClose, onConfirm, feedback }) {
  if (!feedback) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Belum dimulai";

    const date = new Date(dateString);

    return (
      date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menandai feedback ini sebagai{" "}
            <span className="text-green-600">Selesai</span>?
          </DialogDescription>

          {/* Informasi singkat */}
          <div className="mt-4 space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p>
              <span className="font-semibold">Action Plan:</span>{" "}
              {feedback.actionPlan?.title || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Feedback:</span> {feedback.task}
            </p>
            <p>
              <span className="font-semibold">Mulai Proses:</span>{" "}
              {formatDate(feedback.timestampProses)}
            </p>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => {
              onConfirm(feedback.id);
              onClose();
            }}
          >
            Ya, Selesai
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
