"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackTable } from "@/components/sosialisasikesamsatan/FeedbackTable";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

export const RenderTable1 = ({ table1Data, loading, feedbackData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const router = useRouter();

  // ambil semua feedback untuk actionPlanId 6 dan subActionPlanId 6 atau 7
  const getAllFeedbacks = () => {
    return (
      feedbackData?.filter(
        (f) => f.actionPlanId === 6 && f.subActionPlanId === 5
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

  const SkeletonTable = ({ rows = 1, cols = 6 }) => (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-max border border-gray-300 w-full">
        <TableHeader>
          <TableRow>
            {Array.from({ length: cols }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: cols }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <>
      <Card className="w-full overflow-hidden">
        <CardContent>
          {loading || !table1Data ? (
            <SkeletonTable
              rows={1}
              cols={table1Data?.header?.[0]?.length || 6}
            />
          ) : (
            <div className="overflow-x-auto w-full scrollbar-hide">
              <Table className="min-w-max border border-gray-300 w-full">
                <TableHeader>
                  <TableRow>
                    {table1Data?.header?.[0]?.map((head, i) => (
                      <TableHead
                        key={i}
                        className="min-w-[120px] border border-gray-300 text-center"
                      >
                        {head}
                      </TableHead>
                    )) || null}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table1Data?.data?.map((row, i) => (
                    <TableRow
                      key={i}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setOpenModal(true)} // semua row buka modal
                    >
                      {row?.map((cell, j) => (
                        <TableCell
                          key={j}
                          className={`border-b border-r border-dotted border-gray-300 ${
                            j === 1
                              ? "text-left font-medium cursor-pointer text-blue-600 hover:underline"
                              : "text-center"
                          }`}
                        >
                          {cell}
                        </TableCell>
                      )) || null}
                    </TableRow>
                  )) || null}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Feedback */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/30 p-4"
      >
        <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-4xl sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg font-bold text-gray-800">
                Feedback untuk Kanwil
              </h2>
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
              onClick={() => setOpenModal(false)}
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
