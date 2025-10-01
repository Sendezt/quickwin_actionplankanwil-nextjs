import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FeedbackTable } from "@/components/kolaborasimerchant/feedback/FeedbackTable";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

export default function RenderTable({ data, feedbackData }) {
  const router = useRouter();
  const [selectedCabang, setSelectedCabang] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [previousCabang, setPreviousCabang] = useState(null);
  if (!data) return null;

  const getFeedbackByCabang = (namaCabang) =>
    feedbackData?.filter(
      (f) =>
        f.cabang?.nama?.trim().toLowerCase() ===
          namaCabang?.trim().toLowerCase() && f.actionPlanId === 12
    ) || [];

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

  const headers = data?.header?.[0] || [];
  const rows = data?.data || [];
  const summary = data?.summary || null;

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={idx === 1 ? "text-left" : "text-center"}
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                {row.map((cell, cidx) => (
                  <TableCell
                    key={cidx}
                    className={
                      cidx === 1
                        ? "border border-gray-300 px-4 py-2 text-left text-blue-600 cursor-pointer hover:underline"
                        : "border border-gray-300 px-4 py-2 text-center"
                    }
                    onClick={() => setSelectedCabang(row[1])}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          {/* Footer untuk summary */}
          {summary && (
            <TableFooter>
              <TableRow>
                {/* Merge kolom No + Samsat Induk */}
                <TableCell colSpan={2} className="font-bold text-center">
                  {summary[0]}
                </TableCell>
                {summary.slice(1).map((cell, idx) => (
                  <TableCell key={idx} className="font-semibold text-center">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
      {/* Modal Feedback */}
      <Dialog
        open={!!selectedCabang}
        onOpenChange={() => setSelectedCabang(null)}
      >
        <DialogContent className="bg-white rounded-xl shadow-2xl w-full max-w-5xl sm:max-w-[95vw] max-h-[90vh] overflow-hidden p-0">
          {selectedCabang && (
            <DialogTitle className="sticky top-0 z-10 bg-white px-6 py-4 border-b border-gray-200">
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

          <div className="p-6 overflow-y-auto max-h-[70vh]">
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
          </div>

          <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-6 px-6 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedCabang(null)}
                className="px-5 py-2.5 bg-white text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow"
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
                className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Detail
              </button>
            </div>
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
}
