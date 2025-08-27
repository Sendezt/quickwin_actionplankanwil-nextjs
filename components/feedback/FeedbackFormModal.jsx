"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

export default function FeedbackFormModal({
  cabangs,
  actionPlans,
  isOpen,
  onClose,
  onSubmit,
  isCreating,
}) {
  const [step, setStep] = useState(1);
  const [cabangId, setCabangId] = useState("");
  const [actionPlanId, setActionPlanId] = useState("");
  const [task, setTask] = useState("");

  const resetForm = () => {
    setStep(1);
    setCabangId("");
    setActionPlanId("");
    setTask("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cabangId, actionPlanId, task, resetForm });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Tambah Feedback
          </Dialog.Title>

          {/* STEP INDICATOR */}
          <div className="mb-4 text-sm text-gray-600">Step {step} dari 2</div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              {/* <label className="block text-sm font-medium text-gray-700">
                Pilih Cabang
              </label>
              <select
                value={cabangId}
                onChange={(e) => setCabangId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">-- Pilih Cabang --</option>
                {cabangs.map((cabang) => (
                  <option key={cabang.id} value={cabang.id}>
                    {cabang.nama}
                  </option>
                ))}
              </select> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Cabang
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {cabangs.map((cabang) => (
                    <button
                      key={cabang.id}
                      type="button"
                      onClick={() => setCabangId(cabang.id)}
                      className={`p-3 rounded-lg border text-left ${
                        cabangId === cabang.id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {cabang.nama}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  disabled={!cabangId}
                  onClick={() => setStep(2)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Lanjut
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
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

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || !actionPlanId || !task}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isCreating ? "Menyimpan..." : "Simpan Feedback"}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
