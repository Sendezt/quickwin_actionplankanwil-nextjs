import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Info,
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { replaceFeedbackFile } from "@/lib/apifeedback"; // Sesuaikan path

export default function FeedbackInfoModal({
  open,
  onClose,
  feedback,
  onFileReplaced,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState(feedback);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Update currentFeedback ketika prop feedback berubah
  useEffect(() => {
    setCurrentFeedback(feedback);
  }, [feedback]);

  if (!currentFeedback) return null;

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

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Hanya file gambar (JPG, PNG, WEBP) atau PDF yang diperbolehkan"
      );
      return;
    }

    // Validasi ukuran file (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 2 MB");
      return;
    }

    setSelectedFile(file);
    setUploadError(null);
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const response = await replaceFeedbackFile(
        currentFeedback.id,
        selectedFile
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengunggah file");
      }

      // Reset file selection dulu sebelum update state
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Gunakan setTimeout untuk memastikan DOM sudah siap
      setTimeout(() => {
        // Update state lokal dengan data terbaru dari server
        setCurrentFeedback(data.data);

        // Tampilkan notifikasi sukses
        setUploadSuccess(true);

        // Callback untuk update parent component
        if (onFileReplaced) {
          onFileReplaced(data.data);
        }
      }, 100);

      // Hilangkan notifikasi setelah 3 detik
      setTimeout(() => setUploadSuccess(false), 3100);
    } catch (error) {
      setUploadError(error.message || "Terjadi kesalahan saat mengunggah file");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    setUploadSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canUploadFile = currentFeedback.status === "selesai";

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
                  {currentFeedback.actionPlan?.title || "N/A"}
                </p>
              </div>

              {/* SubAction Plan Info */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-2">
                  Sub Action Plan
                </h3>
                <p className="text-yellow-800">
                  {currentFeedback.subActionPlan?.title || "N/A"}
                </p>
              </div>

              {/* Feedback Task */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Feedback</h3>
                <p className="text-gray-800 leading-relaxed">
                  {currentFeedback.task}
                </p>
              </div>

              {/* File Upload Section - Hanya tampil jika status selesai */}
              {canUploadFile && (
                <div
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                  key={`upload-${currentFeedback.id}-${
                    currentFeedback.timestampUpdate || "initial"
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Ganti File Bukti
                  </h3>

                  {/* Success notification */}
                  {uploadSuccess && (
                    <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2 animate-in fade-in duration-300">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-sm text-green-700 font-medium">
                        File berhasil diganti!
                      </p>
                    </div>
                  )}

                  {/* File saat ini */}
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

                  {/* File input */}
                  {!isUploading && (
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      />

                      {/* Selected file preview */}
                      {selectedFile && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-green-900 flex-1 truncate">
                            {selectedFile.name}
                          </span>
                          <button
                            onClick={handleCancelFile}
                            disabled={isUploading}
                            className="text-green-600 hover:text-green-800 disabled:opacity-50"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Error message */}
                      {uploadError && (
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-700">{uploadError}</p>
                        </div>
                      )}

                      {/* Upload button */}
                      {selectedFile && (
                        <Button
                          onClick={handleUpload}
                          disabled={isUploading}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload File Baru
                        </Button>
                      )}

                      <p className="text-xs text-gray-500">
                        Format: JPG, PNG, WEBP, PDF (Max. 2MB)
                      </p>
                    </div>
                  )}

                  {/* Loading state */}
                  {isUploading && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="ml-3 text-gray-600">
                        Mengunggah file...
                      </span>
                    </div>
                  )}
                </div>
              )}
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
                          currentFeedback.status
                        )}`}
                      >
                        {currentFeedback.status}
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
                      {currentFeedback.cabang?.nama || "N/A"}
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
                          {currentFeedback.timestampProses
                            ? formatDate(currentFeedback.timestampProses)
                            : "Belum dimulai"}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp Selesai */}
                    {currentFeedback.timestampSelesai && (
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-green-900">Selesai</p>
                          <p className="text-green-700 text-sm break-words">
                            {formatDate(currentFeedback.timestampSelesai)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Timestamp Update */}
                    {currentFeedback.timestampUpdate && (
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <Upload className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-purple-900">
                            Terakhir Diupdate
                          </p>
                          <p className="text-purple-700 text-sm break-words">
                            {formatDate(currentFeedback.timestampUpdate)}
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
