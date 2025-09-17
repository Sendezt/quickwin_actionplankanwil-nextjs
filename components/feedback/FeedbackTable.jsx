import { Button } from "@/components/ui/button";
import { Loader2, Info } from "lucide-react";

export function FeedbackTable({
  feedbacks,
  hasActiveFilters,
  totalFeedbacks,
  onSelesai,
  onInfo,
  isUpdating,
  selectedFeedbackId,
}) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <tr>
            <th className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              Action Plan
            </th>
            <th className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              Sub Action Plan
            </th>
            <th className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              Feedback
            </th>
            <th className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200">
              Status
            </th>
            <th className="p-4 text-center font-semibold text-gray-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {feedbacks.map((fb, index) => (
            <tr
              key={fb.id}
              className={`
                hover:bg-gray-50 transition-colors duration-150
                ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}
                ${
                  isUpdating && selectedFeedbackId === fb.id ? "opacity-50" : ""
                }
              `}
            >
              {/* Action Plan */}
              <td className="p-4 border-r border-gray-100">
                <div className="font-medium text-gray-900">
                  {fb.actionPlan?.title}
                </div>
              </td>

              {/* Sub Action Plan */}
              <td className="p-4 border-r border-gray-100">
                <div className="font-medium text-gray-700">
                  {fb.subActionPlan?.title || (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </div>
              </td>

              {/* Task / Feedback */}
              <td className="p-4 border-r border-gray-100">
                <div className="text-gray-700 break-words">{fb.task}</div>
              </td>

              {/* Status */}
              <td className="p-4 border-r border-gray-100">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                    ${
                      fb.status === "selesai"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : fb.status === "proses"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }
                  `}
                >
                  {fb.status}
                </span>
              </td>

              {/* Aksi */}
              <td className="p-4 text-right">
                {fb.status !== "selesai" ? (
                  <Button
                    size="sm"
                    onClick={() => onSelesai(fb)}
                    disabled={isUpdating && selectedFeedbackId === fb.id}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUpdating && selectedFeedbackId === fb.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Tandai Selesai"
                    )}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onInfo(fb)}
                    className="flex items-center gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Info className="w-4 h-4" />
                    Info
                  </Button>
                )}
              </td>
            </tr>
          ))}

          {/* Jika feedback kosong */}
          {feedbacks.length === 0 && (
            <tr>
              <td colSpan="5" className="p-8 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-500 font-medium">
                    {hasActiveFilters
                      ? "Tidak ada feedback yang sesuai dengan filter"
                      : "Belum ada feedback"}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {hasActiveFilters
                      ? "Coba ubah atau hapus filter untuk melihat lebih banyak data"
                      : "Feedback akan muncul di sini setelah ditambahkan"}
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
