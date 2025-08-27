"use client";
import { useState } from "react";

export default function FeedbackForm({
  cabangs,
  actionPlans,
  onSubmit,
  onCancel,
  isCreating,
}) {
  const [task, setTask] = useState("");
  const [cabangId, setCabangId] = useState("");
  const [actionPlanId, setActionPlanId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ task, cabangId, actionPlanId, resetForm });
  };

  const resetForm = () => {
    setTask("");
    setCabangId("");
    setActionPlanId("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Buat Feedback Baru</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <select
          value={cabangId}
          onChange={(e) => setCabangId(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Pilih Cabang</option>
          {cabangs.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nama}
            </option>
          ))}
        </select>
        <select
          value={actionPlanId}
          onChange={(e) => setActionPlanId(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Pilih Action Plan</option>
          {actionPlans.map((ap) => (
            <option key={ap.id} value={ap.id}>
              {ap.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={isCreating}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isCreating ? "Menyimpan..." : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border rounded-lg"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
