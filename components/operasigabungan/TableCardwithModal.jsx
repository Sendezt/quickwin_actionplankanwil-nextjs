"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FeedbackTable } from "../kebijakanrelaksasi/feedbackModal/FeedbackTable";
import FeedbackInfoModal from "../feedback/FeedbackInfoModal";

export default function TableCardWithModal({
  title,
  description,
  headers,
  data,
  summary,
  isLoading,
  feedbackData,
  actionPlanId,
  subActionPlanId,
}) {
  const router = useRouter();
  const [selectedCabang, setSelectedCabang] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [previousCabang, setPreviousCabang] = useState(null);

  const normalizedSummary = Array.isArray(summary?.[0])
    ? summary
    : summary && summary.length
    ? [summary]
    : [];

  const getFeedbackByCabang = (namaCabang) => {
    if (!feedbackData || !Array.isArray(feedbackData)) return [];
    return feedbackData.filter(
      (f) =>
        f.cabang?.nama?.trim().toLowerCase() ===
          namaCabang?.trim().toLowerCase() &&
        Number(f.actionPlanId) === Number(actionPlanId) &&
        Number(f.subActionPlanId) === Number(subActionPlanId)
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

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex space-x-2">
                  {Array.from({ length: headers.length || 6 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-24" />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <Table className="border border-gray-300 border-collapse w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  {headers.map((header, i) => (
                    <TableHead
                      key={i}
                      className="font-semibold text-gray-800 border border-gray-300 px-3 py-2 text-center"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((row, i) => {
                    const cabangName = row[1];
                    return (
                      <TableRow key={i} className="hover:bg-gray-50">
                        {Array.isArray(row)
                          ? row.map((cell, j) => (
                              <TableCell
                                key={j}
                                className={
                                  `border-b border-r border-dotted border-gray-300 ` +
                                  (j === 1
                                    ? "text-left font-medium cursor-pointer text-blue-600 hover:underline"
                                    : "text-center")
                                }
                                onClick={
                                  j === 1
                                    ? () => setSelectedCabang(cabangName)
                                    : undefined
                                }
                              >
                                {cell}
                              </TableCell>
                            ))
                          : null}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      className="text-center text-muted-foreground border border-gray-300 px-3 py-2"
                    >
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              {normalizedSummary.length > 0 && (
                <TableFooter>
                  {normalizedSummary.map((row, i) => (
                    <TableRow key={i} className="bg-gray-50 font-semibold">
                      {/* Merge kolom No + Loket Kantor */}
                      <TableCell
                        colSpan={2}
                        className="border border-gray-300 px-3 py-1 text-sm text-center"
                      >
                        {row[0]} {/* biasanya "Total" */}
                      </TableCell>

                      {/* Sisanya tetap normal, mulai dari kolom ke-3 */}
                      {row.slice(1).map((cell, j) => (
                        <TableCell
                          key={j}
                          className="border border-gray-300 px-3 py-1 text-sm text-center"
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableFooter>
              )}
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal Feedback */}
      <Dialog
        open={!!selectedCabang}
        onClose={() => setSelectedCabang(null)}
        className="relative z-[500]"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className="
              bg-white rounded-lg shadow-lg
              w-full max-w-4xl sm:max-w-[90vw]
              max-h-[90vh] overflow-y-auto
              p-6
            "
          >
            {selectedCabang && (
              <DialogTitle className="text-lg font-bold mb-4 pb-3 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Main Title */}
                  <h2 className="text-lg font-bold text-gray-800">
                    Feedback untuk {selectedCabang}
                  </h2>

                  {/* Statistics */}
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

              {/* Button Detail */}
              <button
                onClick={() => {
                  const cabang = feedbackData?.find(
                    (f) => f.cabang?.nama === selectedCabang
                  );
                  if (cabang?.cabang?.id) {
                    router.push(`/feedback?cabangId=${cabang.cabang.id}`);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Detail
              </button>
            </div>
          </DialogPanel>
        </div>
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
