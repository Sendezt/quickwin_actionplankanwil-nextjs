// components\feedback\FeedbackFormModal.jsx
"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

export default function FeedbackFormModal({
  actionPlans,
  isOpen,
  onClose,
  onSubmit,
  isCreating,
  selectedCabang,
}) {
  const [actionPlanId, setActionPlanId] = useState("");
  const [subActionPlanId, setSubActionPlanId] = useState("");
  const [task, setTask] = useState("");
  const [subActionPlans, setSubActionPlans] = useState([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [cabangName, setCabangName] = useState("");

  const resetForm = useCallback(() => {
    setActionPlanId("");
    setSubActionPlanId("");
    setTask("");
    setSubActionPlans([]);
  }, []);

  // Ambil user info dari token saat modal terbuka
  useEffect(() => {
    if (!isOpen) return;
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        const decoded = jwtDecode(token); // jauh lebih simpel
        const parsedUser = JSON.parse(userData);

        setUserInfo({
          ...decoded,
          cabangNama: parsedUser.cabang?.nama || " ",
          cabangId: parsedUser.cabang?.id || decoded.cabangId,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [isOpen]);

  // Fetch subActionPlans sesuai actionPlanId
  const fetchSubActionPlans = useCallback(async () => {
    if (!actionPlanId) {
      setSubActionPlans([]);
      return;
    }

    try {
      setLoadingSub(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await fetch(
        `https://quickwin-jateng.vercel.app/api/admin/sub/getsub?actionPlanId=${actionPlanId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

      const json = await res.json();
      setSubActionPlans(json.data || []);
    } catch (err) {
      console.error("Gagal fetch subActionPlans:", err);
      setSubActionPlans([]);
    } finally {
      setLoadingSub(false);
    }
  }, [actionPlanId]);

  useEffect(() => {
    fetchSubActionPlans();
  }, [fetchSubActionPlans]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!actionPlanId || !task.trim()) return;
    if (subActionPlans.length > 0 && !subActionPlanId) return;

    onSubmit({
      actionPlanId,
      subActionPlanId: subActionPlanId || null,
      task: task.trim(),
      resetForm,
    });
  };

  const cabangDisplayName =
    selectedCabang?.nama ||
    (userInfo?.cabangNama ? `Cabang ${userInfo.cabangNama}` : "Cabang Anda");

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold mb-4">
            Tambah Feedback - {cabangDisplayName}
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Action Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Action Plan *
              </label>
              <select
                value={actionPlanId}
                onChange={(e) => {
                  setActionPlanId(e.target.value);
                  setSubActionPlanId("");
                }}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Action Plan</option>
                {actionPlans.map((plan, index) => (
                  <option key={plan.id} value={plan.id}>
                    {index + 1}. {plan.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Action Plan */}
            {loadingSub ? (
              <p className="text-sm text-gray-500 py-2">
                Memuat sub action plan...
              </p>
            ) : (
              subActionPlans.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Sub Action Plan *
                  </label>
                  <select
                    value={subActionPlanId}
                    onChange={(e) => setSubActionPlanId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Pilih Sub Action Plan</option>
                    {subActionPlans.map((sub, index) => (
                      <option key={sub.id} value={sub.id}>
                        {index + 1}. {sub.title}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}

            {/* Task */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task *
              </label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tuliskan detail task atau feedback..."
                rows={4}
                required
              />
            </div>

            {/* Tombol */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isCreating}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={
                  isCreating ||
                  !actionPlanId ||
                  !task.trim() ||
                  (subActionPlans.length > 0 && !subActionPlanId)
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isCreating ? "Menyimpan..." : "Simpan Feedback"}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
