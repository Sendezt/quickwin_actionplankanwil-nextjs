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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menandai feedback{" "}
            <span className="font-semibold">"{feedback.task}"</span> sebagai{" "}
            <span className="text-green-600">Selesai</span>?
          </DialogDescription>
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
