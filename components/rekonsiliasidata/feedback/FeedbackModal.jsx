"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FeedbackTable } from "@/components/optimalisasisignal/FeedbackTable";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

export const FeedbackModal = ({ open, onClose, feedbackData }) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const router = useRouter();

  // Ambil semua feedback untuk actionPlanId = 6 DAN subActionPlanId = 6 atau 7
  const getAllFeedbacks = () => {
    return (
      feedbackData?.filter(
        (f) => f.actionPlanId === 7 && f.subActionPlanId === 8
      ) || []
    );
  };

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

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/30 p-4"
      >
        <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-4xl sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-800">Feedback</h2>
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

          <FeedbackTable
            feedbacks={getAllFeedbacks()}
            hasActiveFilters={false}
            totalFeedbacks={0}
            onSelesai={(fb) => console.log("Selesai:", fb)}
            onInfo={(fb) => setSelectedFeedback(fb)}
            isUpdating={false}
            selectedFeedbackId={null}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
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

      {/* Modal Info Feedback */}
      <FeedbackInfoModal
        open={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        feedback={selectedFeedback}
      />
    </>
  );
};
