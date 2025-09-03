import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, Calendar, CheckCircle, Clock, MapPin } from "lucide-react";

export default function FeedbackInfoModal({ open, onClose, feedback }) {
  if (!feedback) return null;

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
      date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-w-[95vw] max-h-[90vh] w-full rounded-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Detail Feedback
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang feedback ini
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Grid responsif */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Kolom kiri */}
            <div className="space-y-6">
              {/* Action Plan Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Action Plan
                </h3>
                <p className="text-blue-800">
                  {feedback.actionPlan?.title || "N/A"}
                </p>
              </div>

              {/* Feedback Task */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-800 leading-relaxed">{feedback.task}</p>
              </div>
            </div>

            {/* Kolom kanan */}
            <div className="space-y-6">
              {/* Status dan Cabang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Status
                    </h3>
                    <div className="flex justify-center sm:justify-start">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                          feedback.status
                        )}`}
                      >
                        {feedback.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cabang */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Cabang
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {feedback.cabang?.nama || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Timeline
                  </h3>

                  <div className="space-y-3">
                    {/* Timestamp Proses */}
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-yellow-900">
                          Mulai Proses
                        </p>
                        <p className="text-yellow-700 text-sm break-words">
                          {feedback.timestampProses
                            ? formatDate(feedback.timestampProses)
                            : "Belum dimulai"}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp Selesai */}
                    {feedback.timestampSelesai && (
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-green-900">Selesai</p>
                          <p className="text-green-700 text-sm break-words">
                            {formatDate(feedback.timestampSelesai)}
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

        {/* Tombol tutup */}
        <div className="flex justify-end pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
