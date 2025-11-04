"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Info,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Upload,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { AcceptModal } from "./Modal/AcceptModal";
import { RejectModal } from "./Modal/RejectModal";

export default function FeedbackInfoProsesModal({
  open,
  onClose,
  feedback,
  onRefresh,
}) {
  const [currentFeedback, setCurrentFeedback] = useState(feedback);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    setCurrentFeedback(feedback);
  }, [feedback]);

  if (!currentFeedback) return null;

  // ✅ Saat tombol Accept ditekan, buka modal konfirmasi
  const handleAccept = () => {
    setIsAcceptModalOpen(true);
  };

  // ✅ Saat tombol Reject ditekan, buka modal penolakan
  const handleReject = () => {
    setIsRejectModalOpen(true);
  };

  // ✅ Callback setelah konfirmasi sukses (Accept)
  const handleAcceptSuccess = () => {
    setIsAcceptModalOpen(false);
    onClose?.();
    onRefresh?.();
  };

  // ✅ Callback setelah konfirmasi sukses (Reject)
  const handleRejectSuccess = () => {
    setIsRejectModalOpen(false);
    setRejectReason("");
    onClose?.();
    onRefresh?.();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " Pukul " +
      date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "selesai":
        return "text-green-600 bg-green-100";
      case "proses":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const canUploadFile =
    currentFeedback.status !== "selesai" &&
    currentFeedback.buktiGambar !== null;

  return (
    <>
      {/* ✅ Modal utama Feedback Info */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90vw] h-[90vh] overflow-hidden p-6 rounded-2xl sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" /> Detail Feedback
            </DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang feedback ini
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-scroll max-h-[calc(90vh-180px)] pr-3">
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kolom kiri */}
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Action Plan
                  </h3>
                  <p className="text-blue-800">
                    {currentFeedback.actionPlan?.title || "N/A"}
                  </p>
                </div>

                {currentFeedback.subActionPlan && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      Sub Action Plan
                    </h3>
                    <p className="text-yellow-800">
                      {currentFeedback.subActionPlan.title}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
                  <p className="text-gray-800 leading-relaxed">
                    {currentFeedback.task}
                  </p>
                </div>

                {canUploadFile && (
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Upload className="w-4 h-4" /> File Bukti
                    </h3>
                    {currentFeedback.buktiGambar && (
                      <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900 mb-2 font-medium">
                          File saat ini:
                        </p>
                        <a
                          href={currentFeedback.buktiGambar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline break-all"
                        >
                          Lihat File
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Kolom kanan */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Status
                      </h3>
                      <div className="flex justify-center sm:justify-start">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                            currentFeedback.status
                          )}`}
                        >
                          {currentFeedback.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Cabang
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {currentFeedback.cabang?.nama || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Timeline
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-yellow-900">
                            Mulai Proses
                          </p>
                          <p className="text-yellow-700 text-sm break-words">
                            {currentFeedback.timestampProses
                              ? formatDate(currentFeedback.timestampProses)
                              : "Belum dimulai"}
                          </p>
                        </div>
                      </div>

                      {currentFeedback.timestampSelesai && (
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-green-900">
                              Selesai
                            </p>
                            <p className="text-green-700 text-sm break-words">
                              {formatDate(currentFeedback.timestampSelesai)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tombol aksi */}
          <DialogFooter className="flex flex-col gap-4 mt-6 pt-4 border-t">
            <div className="flex justify-between w-full">
              <div className="flex gap-3">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleAccept}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" /> Accept
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleReject}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Tutup
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ✅ Modal Konfirmasi Accept */}
      <AcceptModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        data={{
          ...currentFeedback,
          action: "accept",
          onConfirm: handleAcceptSuccess,
        }}
      />

      {/* ✅ Modal Penolakan */}
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        data={{
          ...currentFeedback,
          action: "reject",
        }}
        showReasonInput={true}
        rejectReason={rejectReason}
        onReasonChange={setRejectReason}
        onConfirm={handleRejectSuccess}
      />
    </>
  );
}
