"use client";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogBackdrop,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";

export default function FeedbackFormModal({
  actionPlans,
  isOpen,
  onClose,
  onSubmit,
  isCreating,
  selectedCabang,
}) {
  const [actionPlanId, setActionPlanId] = useState("");
  const [task, setTask] = useState("");

  const resetForm = () => {
    setActionPlanId("");
    setTask("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ actionPlanId, task, resetForm });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold mb-4">
            Tambah Feedback {selectedCabang && `- ${selectedCabang.nama}`}
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pilih Action Plan
              </label>
              <select
                value={actionPlanId}
                onChange={(e) => setActionPlanId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">-- Pilih Action Plan --</option>
                {actionPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task
              </label>
              <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
                placeholder="Tuliskan task..."
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isCreating || !actionPlanId || !task}
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
