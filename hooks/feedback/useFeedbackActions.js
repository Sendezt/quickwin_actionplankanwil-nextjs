import { useState } from "react";
import { toast } from "sonner";
import { createFeedback, updateFeedbackStatus } from "@/lib/apifeedback";

export function useFeedbackActions(loadData) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCreate = async (formData) => {
    console.log("=== DEBUG handleCreate ===");
    console.log("Received formData:", formData);

    const { actionPlanId, subActionPlanId, task, resetForm } = formData;

    // Validasi input
    if (!task || !actionPlanId) {
      toast.error("Action Plan dan Task wajib diisi");
      return false;
    }

    // Validasi token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Silakan login ulang");
      return false;
    }

    try {
      setIsCreating(true);

      const feedbackData = {
        actionPlanId: Number(actionPlanId),
        subActionPlanId: subActionPlanId ? Number(subActionPlanId) : null,
        task: task.trim(),
      };

      const result = await createFeedback(feedbackData);

      toast.success("Feedback berhasil ditambahkan");

      // ✅ Tutup dan reset form langsung, tanpa menunggu loadData
      if (typeof resetForm === "function") {
        resetForm();
      }

      // ✅ Load data jalan di background
      loadData(true).catch((err) => console.error("Gagal Reload", err));

      return true;
    } catch (error) {
      console.error("Error in handleCreate:", error);

      if (
        error.message.includes("401") ||
        error.message.includes("unauthorized")
      ) {
        toast.error("Session expired. Silakan login ulang");
      } else if (error.message.includes("400")) {
        toast.error("Data tidak valid. Periksa kembali form Anda");
      } else if (error.message.includes("cabang")) {
        toast.error("User tidak memiliki akses ke cabang");
      } else {
        toast.error(error.message || "Gagal menambahkan feedback");
      }

      return false;
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelesai = async (feedbackId) => {
    if (!feedbackId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired. Silakan login ulang");
      return false;
    }

    try {
      setIsUpdating(true);
      await updateFeedbackStatus(feedbackId);
      toast.success("Feedback berhasil ditandai selesai");

      // reload data setelah update
      await loadData(true);

      return true;
    } catch (error) {
      console.error("Error in handleSelesai:", error);

      if (error.message.includes("401")) {
        toast.error("Session expired. Silakan login ulang");
      } else {
        toast.error("Gagal memperbarui status feedback");
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isCreating,
    isUpdating,
    handleCreate,
    handleSelesai,
  };
}
