"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FeedbackTable } from "@/components/komitmenstakeholder/feedback/FeedbackTable"; // bisa diganti sesuai path
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

// ✅ Select dari shadcn/ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RenderTableFeedback({ data, feedbackData }) {
  const router = useRouter();

  // State untuk modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  if (!data) return null;

  // Ambil daftar cabang unik
  const cabangOptions = [
    ...new Map(
      (feedbackData || [])
        .filter((f) => f.actionPlanId === 9 && f.subActionPlanId === 11) // filter default sesuai kebutuhan
        .map((f) => [f.cabang?.id, f.cabang?.nama])
    ).entries(),
  ];

  // Filter feedback berdasarkan cabang
  const getAllFeedbacks = () => {
    let filtered =
      feedbackData?.filter(
        (f) => f.actionPlanId === 9 && f.subActionPlanId === 11
      ) || [];
    if (selectedCabang !== "all") {
      filtered = filtered.filter((f) => f.cabangId === Number(selectedCabang));
    }
    return filtered;
  };

  // Hitung summary feedback
  const getFeedbackCounts = () => {
    const feedbacks = getAllFeedbacks();
    const totalCount = feedbacks.length;
    const selesaiCount = feedbacks.filter(
      (f) => f.status?.toLowerCase() === "selesai"
    ).length;
    const prosesCount = feedbacks.filter(
      (f) => f.status?.toLowerCase() === "proses"
    ).length;
    return { totalCount, selesaiCount, prosesCount };
  };

  const headers = data?.header?.[0] || [];
  const rows = data?.data || [];
  const summary = data?.summary || null;

  return (
    <div className="overflow-x-auto">
      {/* ====================== TABEL LAPORAN ====================== */}
      <Table className="table-auto w-full border-collapse">
        <TableHeader>
          <TableRow>
            {headers.map((col, idx) => (
              <TableHead
                key={idx}
                className={`px-2 py-2 text-sm whitespace-normal break-words ${
                  idx === 1 ? "text-left" : "text-center"
                }`}
              >
                {col}
              </TableHead>
            ))}
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {row.map((cell, cidx) => (
                <TableCell
                  key={cidx}
                  className={`px-2 py-1 text-sm whitespace-normal break-words ${
                    cidx === 1 ? "text-left" : "text-center"
                  }`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        {summary && (
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={2}
                className="font-bold text-center px-2 py-2"
              >
                {summary[0]}
              </TableCell>
              {summary.slice(1).map((cell, idx) => (
                <TableCell
                  key={idx}
                  className="font-semibold text-center px-2 py-2"
                >
                  {cell}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableFooter>
        )}
      </Table>

      {/* ====================== MODAL FEEDBACK ====================== */}
      <Dialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/30 p-4"
      >
        <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-4xl sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-800">Feedback</h2>

              {/* Filter Cabang */}
              <Select
                value={selectedCabang}
                onValueChange={(value) => setSelectedCabang(value)}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Pilih cabang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">🏢 Semua Cabang</SelectItem>
                  {cabangOptions.map(([id, nama]) => (
                    <SelectItem key={id} value={String(id)}>
                      📍 {nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Summary Count */}
              {(() => {
                const { totalCount, selesaiCount, prosesCount } =
                  getFeedbackCounts();
                return (
                  <div className="text-sm text-gray-600 flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                        {totalCount}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Selesai:</span>
                      <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                        {selesaiCount}
                      </span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium">Proses:</span>
                      <span className="font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                        {prosesCount}
                      </span>
                    </span>
                  </div>
                );
              })()}
            </div>
          </DialogTitle>

          {/* Tabel Feedback */}
          <FeedbackTable
            feedbacks={getAllFeedbacks()}
            hasActiveFilters={selectedCabang !== "all"}
            totalFeedbacks={getAllFeedbacks().length}
            onSelesai={(fb) => console.log("Selesai:", fb)}
            onInfo={(fb) => setSelectedFeedback(fb)}
            isUpdating={false}
            selectedFeedbackId={null}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Tutup
            </button>
            <button
              onClick={() => router.push("/feedback")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Detail
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ====================== MODAL INFO FEEDBACK ====================== */}
      <FeedbackInfoModal
        open={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        feedback={selectedFeedback}
      />
    </div>
  );
}
