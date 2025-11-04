// components\feedback\FeedbackReuploadModal.jsx
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

export default function ReuploadFeedbackModal({
  open,
  onClose,
  onConfirm,
  feedback,
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];

      // Validasi ukuran file maksimal 2MB
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2 MB");
        return;
      }

      // Validasi tipe file
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Hanya file gambar (JPG, PNG, WEBP) atau PDF yang diperbolehkan");
        return;
      }

      setFile(selectedFile);

      // Tampilkan preview hanya jika file adalah gambar
      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  // Reset state saat modal ditutup
  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setLoading(false);
    }
  }, [open]);

  // Bersihkan object URL saat unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (!feedback) return null;

  const handleReupload = async () => {
    if (!file) {
      alert("Silakan upload file baru terlebih dahulu sebelum mengirim ulang.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${BASE_URL}/api/feedback/${feedback.id}/reupload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error("Server tidak merespon JSON yang valid");
      }

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim ulang file.");
      }

      onConfirm(data.data);
      onClose();
    } catch (err) {
      console.error("Error reupload feedback:", err);
      alert(err.message || "Terjadi kesalahan saat mengirim ulang file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle>Kirim Ulang Bukti Kegiatan</DialogTitle>
          <DialogDescription>
            File sebelumnya telah{" "}
            <span className="text-red-600 font-semibold">ditolak</span>. Silakan
            periksa file saat ini, lalu unggah ulang bukti kegiatan yang benar.
          </DialogDescription>
        </DialogHeader>

        {/* FILE SAAT INI */}
        {feedback.buktiGambar && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-900 mb-2 font-medium">
              File saat ini (ditolak):
            </p>
            <a
              href={feedback.buktiGambar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:text-red-800 underline break-all"
            >
              Lihat File
            </a>
            {feedback.rejectReason && (
              <p className="text-xs text-red-700 mt-2">
                Alasan ditolak:{" "}
                <span className="font-medium">{feedback.rejectReason}</span>
              </p>
            )}
          </div>
        )}

        {/* Dropzone Upload Ulang */}
        <div className="mt-2">
          <label className="font-semibold block mb-2 text-sm">
            Upload File Baru <span className="text-red-500">*</span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              isDragActive
                ? "border-green-500 bg-green-50"
                : file
                ? "border-green-400 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex flex-col items-center gap-3">
                {file.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                    <span className="text-4xl">📄</span>
                  </div>
                )}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 break-all px-2">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Klik untuk mengganti file
                </p>
              </div>
            ) : (
              <div className="py-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  {isDragActive
                    ? "Lepaskan file di sini..."
                    : "Seret & jatuhkan file, atau klik untuk pilih"}
                </p>
                <p className="text-xs text-gray-500">
                  Format: JPG, PNG, WEBP, PDF (Max. 2MB)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleReupload}
            disabled={loading || !file}
          >
            {loading ? "Mengirim..." : "Kirim Ulang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
