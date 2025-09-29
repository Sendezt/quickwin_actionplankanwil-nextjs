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
import { Input } from "@/components/ui/input";

export default function FeedbackModal({ open, onClose, onConfirm, feedback }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!feedback) return null;

  const handleConfirm = async () => {
    if (!file) {
      alert("Upload foto bukti kegiatan wajib untuk menyelesaikan feedback.");
      return;
    }

    setLoading(true);

    // FormData untuk dikirim ke backend
    const formData = new FormData();
    formData.append("status", "selesai"); // status selalu selesai
    formData.append("file", file);
    if (feedback.task) {
      formData.append("task", feedback.task);
    }

    try {
      const response = await fetch(
        `https://quickwin-jateng.vercel.app/api/feedback/${feedback.id}/selesai`,
        {
          method: "PUT",
          body: formData,
        }
      );

      // Cek response content-type
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error("Server tidak merespon JSON: " + text);
      }

      if (!response.ok) {
        throw new Error(data.message || "Gagal update feedback");
      }

      onConfirm(data.data); // callback untuk refresh data
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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

          {/* Input file */}
          <div className="mt-4">
            <label className="font-semibold block mb-2">Upload Bukti:</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Ya, Selesai"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
