"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FeedbackTable } from "@/components/sosialisasikesamsatan/feedback/FeedbackTable";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

const normalizeTableData = (data) => {
  if (!Array.isArray(data)) return [];
  const normalizedRows = [];
  data.forEach((cabangItem) => {
    if (cabangItem.cabang) {
      normalizedRows.push([cabangItem.cabang, "", "", "", "", "", "", ""]);
    }
    if (Array.isArray(cabangItem.samsat)) {
      cabangItem.samsat.forEach((samsatRow) => {
        normalizedRows.push(samsatRow);
      });
    }
  });
  return normalizedRows;
};

const normalizeSummary = (summary) => {
  if (!Array.isArray(summary)) return [];
  return summary;
};

export default function TableCardFeedback({
  title,
  description,
  headers,
  data,
  summary,
  feedbackData = [],
  isNested = false,
}) {
  const [selectedCabang, setSelectedCabang] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [previousCabang, setPreviousCabang] = useState(null);

  const tableData = isNested ? normalizeTableData(data) : data;
  const tableSummary = isNested ? normalizeSummary(summary) : summary;

  // Ambil feedback by cabang
  const getFeedbackByCabang = (namaCabang) => {
    return (
      feedbackData?.filter(
        (f) =>
          f.cabang?.nama?.trim().toLowerCase() ===
            namaCabang?.trim().toLowerCase() && f.actionPlanId === 4
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

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  {Array.isArray(headers) &&
                    headers.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-900 whitespace-pre-line"
                      >
                        {header}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tableData) &&
                  tableData.map((row, rowIndex) => {
                    const isCabangHeader =
                      isNested && row[1] === "" && row[0] !== "";

                    return (
                      <tr
                        key={rowIndex}
                        className={
                          isCabangHeader
                            ? "bg-gray-100 font-semibold"
                            : "hover:bg-gray-50"
                        }
                      >
                        {isCabangHeader ? (
                          <td
                            className="border border-gray-300 px-4 py-2 text-sm text-gray-900 font-semibold cursor-pointer hover:underline"
                            colSpan={headers.length}
                            onClick={() => setSelectedCabang(row[0])}
                          >
                            {row[0]}
                          </td>
                        ) : (
                          Array.isArray(row) &&
                          row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={
                                cellIndex === 1
                                  ? "border border-gray-300 px-4 py-2 text-sm font-medium text-blue-600 text-left cursor-pointer hover:underline"
                                  : "border border-gray-300 px-4 py-2 text-sm text-gray-700 text-center"
                              }
                              onClick={
                                cellIndex === 1
                                  ? () => setSelectedCabang(cell)
                                  : undefined
                              }
                            >
                              {cell}
                            </td>
                          ))
                        )}
                      </tr>
                    );
                  })}
                {Array.isArray(tableSummary) && tableSummary.length > 0 && (
                  <tr className="bg-blue-50 font-semibold text-center">
                    <td
                      colSpan={2}
                      className="border border-gray-300 px-4 py-2 text-sm text-gray-900 text-center"
                    >
                      {tableSummary[0]}
                    </td>
                    {tableSummary.slice(1).map((summaryCell, summaryIndex) => (
                      <td
                        key={summaryIndex}
                        className="border border-gray-300 px-4 py-2 text-sm text-gray-900"
                      >
                        {summaryCell}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Feedback per Cabang */}
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

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button
              onClick={() => setSelectedCabang(null)}
              className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
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
              className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Detail
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Detail Feedback */}
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
