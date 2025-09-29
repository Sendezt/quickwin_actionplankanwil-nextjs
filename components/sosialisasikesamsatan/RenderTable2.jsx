"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // hanya import yang ada
import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackTable } from "@/components/sosialisasikesamsatan/FeedbackTable";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

export const RenderTable2 = ({ table2Data, loading, feedbackData }) => {
  const [selectedCabang, setSelectedCabang] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [previousCabang, setPreviousCabang] = useState(null);
  const router = useRouter();

  const getFeedbackByCabang = (namaCabang) => {
    return (
      feedbackData?.filter(
        (f) =>
          f.cabang?.nama?.trim().toLowerCase() ===
            namaCabang?.trim().toLowerCase() &&
          f.actionPlanId === 6 &&
          (f.subActionPlanId === 6 || f.subActionPlanId === 7)
      ) || []
    );
  };

  const getFeedbackCounts = (namaCabang) => {
    const feedbacksCabang = getFeedbackByCabang(namaCabang) || [];
    const totalCount = feedbacksCabang.length;
    const selesaiCount = feedbacksCabang.filter(
      (f) => f.status?.toLowerCase() === "selesai"
    ).length;
    const prosesCount = feedbacksCabang.filter(
      (f) => f.status?.toLowerCase() === "proses"
    ).length;
    return { totalCount, selesaiCount, prosesCount };
  };

  const SkeletonTable = ({ rows = 5, cols = 6 }) => (
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
          {loading || !table2Data ? (
            <SkeletonTable
              rows={5}
              cols={table2Data?.header?.[0]?.length || 6}
            />
          ) : (
            <div className="overflow-x-auto w-full scrollbar-hide">
              <Table className="min-w-max border border-gray-300 w-full">
                <TableHeader>
                  <TableRow>
                    {table2Data?.header?.[0]?.map((head, i) => (
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
                  {table2Data?.data?.map((row, i) => {
                    const cabangName = row?.[1];
                    return (
                      <TableRow
                        key={i}
                        className="cursor-pointer hover:bg-gray-50"
                      >
                        {row?.map((cell, j) => (
                          <TableCell
                            key={j}
                            className={`border-b border-r border-dotted border-gray-300 ${
                              j === 1
                                ? "text-left font-medium cursor-pointer text-blue-600 hover:underline"
                                : "text-center"
                            }`}
                            onClick={
                              j === 1
                                ? () => setSelectedCabang(cabangName)
                                : undefined
                            }
                          >
                            {cell}
                          </TableCell>
                        )) || null}
                      </TableRow>
                    );
                  }) || null}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="font-bold border border-gray-300 text-center"
                    >
                      {table2Data?.summary?.[0] || ""}
                    </TableCell>
                    {table2Data?.summary?.slice(1)?.map((cell, j) => (
                      <TableCell
                        key={j}
                        className="font-bold border border-gray-300 text-center"
                      >
                        {cell}
                      </TableCell>
                    )) || null}
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal Feedback */}
      <Dialog
        open={!!selectedCabang}
        onClose={() => setSelectedCabang(null)}
        className="fixed inset-0 z-[500] flex items-center justify-center bg-black/30 p-4"
      >
        <DialogContent className="bg-white rounded-lg shadow-lg w-full max-w-4xl sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6">
          {selectedCabang && (
            <DialogTitle className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-800">
                  Feedback untuk {selectedCabang}
                </h2>
                {(() => {
                  const { totalCount, selesaiCount, prosesCount } =
                    getFeedbackCounts(selectedCabang);
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
          )}

          <FeedbackTable
            feedbacks={getFeedbackByCabang(selectedCabang)}
            hasActiveFilters={false}
            totalFeedbacks={0}
            onSelesai={(fb) => console.log("Selesai:", fb)}
            onInfo={(fb) => {
              setPreviousCabang(selectedCabang);
              setSelectedCabang(null);
              setSelectedFeedback(fb);
            }}
            isUpdating={false}
            selectedFeedbackId={null}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setSelectedCabang(null)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                const cabang = feedbackData?.find(
                  (f) => f.cabang?.nama === selectedCabang
                );
                if (cabang?.cabang?.id)
                  router.push(`/feedback?cabangId=${cabang.cabang.id}`);
              }}
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
        onClose={() => {
          setSelectedFeedback(null);
          setSelectedCabang(previousCabang);
        }}
        feedback={selectedFeedback}
      />
    </>
  );
};
