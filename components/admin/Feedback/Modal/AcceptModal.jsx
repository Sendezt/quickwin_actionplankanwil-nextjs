"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "../../modal/Modal";

export function AcceptModal({ isOpen, onClose, data }) {
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleConfirm = async () => {
    try {
      setLoading(true);

      // ✅ Ambil token dari localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/admin/feedback/${data.id}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Kirim token di header
          },
          body: JSON.stringify({ action: "accept" }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal melakukan konfirmasi.");
      }

      // ✅ Jika sukses
      if (data.onConfirm) data.onConfirm();
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
      title="Persetujuan"
      className="border-l-4 border-l-green-500"
    >
      <div className="space-y-4">
        {/* Icon dan Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
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

        {/* Pesan */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Pesan
          </p>
          <div className="rounded-md bg-green-50 p-3 border border-green-200">
            <p className="text-foreground">
              Permintaan Anda telah diterima dan disetujui.
            </p>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {loading ? "Memproses..." : "Konfirmasi"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent"
          >
            Batal
          </Button>
        </div>
      </div>
    </Modal>
  );
}
