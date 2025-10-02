"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";

export default function FeedbackModal({ open, onClose, onConfirm, feedback }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hooks SELALU dipanggil di sini
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Reset file & loading setiap kali modal ditutup
  useEffect(() => {
    if (!open) {
      setFile(null);
      setLoading(false);
    }
  }, [open]);

  if (!feedback) return null; // <- ini setelah semua hook

  const handleConfirm = async () => {
    if (!file) {
      alert("Upload foto bukti kegiatan wajib untuk menyelesaikan feedback.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("status", "selesai");
    formData.append("file", file);
    if (feedback.task) {
      formData.append("task", feedback.task);
    }

    try {
      const response = await fetch(
        `https://magangproject.vercel.app/api/feedback/${feedback.id}/selesai`,
        {
          method: "PUT",
          body: formData,
        }
      );

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

      onConfirm(data.data);
      setFile(null);
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

          {/* Dropzone */}
          <div className="mt-4">
            <label className="font-semibold block mb-2">Upload Bukti:</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                isDragActive
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-sm text-gray-700">
                  {file.name} ({Math.round(file.size / 1024)} KB)
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  {isDragActive
                    ? "Lepaskan file di sini..."
                    : "Seret & jatuhkan gambar, atau klik untuk pilih file"}
                </p>
              )}
            </div>
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
