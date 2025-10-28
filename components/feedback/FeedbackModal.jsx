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
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fungsi saat file dijatuhkan
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];

      // Validasi ukuran file (max 2MB)
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
      if (
        !allowedTypes.some(
          (type) =>
            selectedFile.type === type ||
            selectedFile.type.startsWith(type.split("/")[0])
        )
      ) {
        alert("Hanya file gambar (JPG, PNG, WEBP) atau PDF yang diperbolehkan");
        return;
      }

      setFile(selectedFile);

      // Preview hanya untuk gambar
      if (selectedFile.type.startsWith("image/")) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
      } else {
        setPreview(null);
      }
    }
  }, []);

  // Dropzone configuration
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

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (!feedback) return null;

  const handleConfirm = async () => {
    if (!file) {
      alert(
        "Upload bukti kegiatan (gambar atau PDF) wajib untuk menyelesaikan feedback."
      );
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Buat FormData - field name bebas, backend hanya baca file stream
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://magangproject.vercel.app/api/feedback/${feedback.id}/selesai`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // JANGAN tambahkan Content-Type, biar browser yang set otomatis dengan boundary
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
        throw new Error(
          data.message || `Error ${response.status}: Gagal update feedback`
        );
      }

      // Berhasil
      onConfirm(data.data);
      setFile(null);
      setPreview(null);
      onClose();
    } catch (err) {
      console.error("Error updating feedback:", err);
      alert(err.message || "Terjadi kesalahan saat mengupdate feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl shadow-lg max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Selesai</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menandai feedback ini sebagai{" "}
            <span className="text-green-600 font-semibold">Selesai</span>?
          </DialogDescription>
        </DialogHeader>

        {/* Dropzone */}
        <div className="mt-4">
          <label className="font-semibold block mb-2 text-sm">
            Upload Bukti Kegiatan <span className="text-red-500">*</span>
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
                {/* Preview file */}
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

                {/* Info file */}
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700 break-all px-2">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                {/* Tombol ganti file */}
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

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Batal
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleConfirm}
            disabled={loading || !file}
          >
            {loading ? "Mengirim..." : "Ya, Selesai"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
