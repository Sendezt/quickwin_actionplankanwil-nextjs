"use client";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "../../modal/Modal";

export function RejectModal({
  isOpen,
  onClose,
  data,
  onConfirm,
  showReasonInput = false,
  onReasonChange,
  rejectReason = "",
}) {
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleReject = async () => {
    if (!rejectReason.trim()) return;

    try {
      setLoading(true);

      // 🔑 Ambil token dari localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/admin/feedback/${data.id}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Tambahkan token
          },
          body: JSON.stringify({
            action: "reject",
            alasanReject: rejectReason,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengirim alasan penolakan.");
      }

      // Callback jika ada
      if (onConfirm) onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Penolakan"
      className="border-l-4 border-l-red-500"
    >
      <div className="space-y-4">
        {/* Icon dan Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p className="text-lg font-semibold text-foreground capitalize">
              {data.action}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Input atau tampilan alasan */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Alasan Penolakan
          </p>
          {showReasonInput ? (
            <textarea
              value={rejectReason}
              onChange={(e) => onReasonChange?.(e.target.value)}
              placeholder="Masukkan alasan penolakan..."
              className="w-full p-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
            />
          ) : (
            <div className="rounded-md bg-red-50 p-3 border border-red-200">
              <p className="text-foreground">{data.alasanReject}</p>
            </div>
          )}
        </div>

        {/* Tombol aksi */}
        <div className="flex gap-2 pt-4">
          {showReasonInput ? (
            <>
              <Button
                onClick={handleReject}
                disabled={!rejectReason.trim() || loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Mengirim..." : "Konfirmasi Penolakan"}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Batal
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onClose} className="flex-1">
                Tutup
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Kembali
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
