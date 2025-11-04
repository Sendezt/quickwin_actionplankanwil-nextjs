import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Plus,
  Loader2,
  FileText,
  X,
  Eye,
  Info,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import FeedbackFormModal from "@/components/admin/Feedback/FeedbackFormModal";
import FeedbackInfoModal from "./Feedback/FeedbackInfoModal";
import FeedbackInfoProsesModal from "./Feedback/FeedbackInfoProsesModal";

// Loading Skeleton Component
const TableSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white shadow rounded p-4 animate-pulse">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded flex-1"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="h-4 bg-gray-200 rounded w-28"></div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading Spinner Overlay
const LoadingOverlay = ({ message = "Memuat data..." }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

// File Dropzone Component
const FileDropzone = ({ file, onFileSelect, onFileRemove }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        onFileSelect(selectedFile);

        // Create preview for images
        if (selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setPreview(null);
        }
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onFileRemove();
  };

  const isImage = file && file.type.startsWith("image/");
  const isPdf = file && file.type === "application/pdf";

  return (
    <div>
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <FileText className="h-10 w-10 mx-auto mb-2 text-gray-400" />
          {isDragActive ? (
            <p className="text-sm text-blue-600">Letakkan file di sini...</p>
          ) : (
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Seret & lepas file atau klik untuk memilih
              </p>
              <p className="text-xs text-gray-400">
                Format: PNG, JPG, PDF (Max 1 file)
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Image Preview */}
          {isImage && preview && (
            <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-48 object-contain"
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="absolute top-2 right-2 shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* File Info */}
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                  {isImage && " • Gambar"}
                  {isPdf && " • PDF"}
                </p>
              </div>
            </div>
            {!isImage && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleRemove}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ task: "", status: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [clearing, setClearing] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [actionPlans, setActionPlans] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openProsesModal, setOpenProsesModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch Cabang
  const fetchCabangs = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cabang/read`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCabangs(data || []);
    } catch (err) {
      console.error("Gagal memuat cabang:", err);
    }
  }, []);

  // Fetch feedbacks
  const fetchFeedbacks = useCallback(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/admin/feedback/getalldata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFeedbacks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  }, []);

  // Fetch action plans
  const fetchActionPlans = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/actionplan`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setActionPlans(data || []);
    } catch (err) {
      console.error("Gagal memuat action plan:", err);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
    fetchActionPlans();
    fetchCabangs();
  }, [fetchFeedbacks, fetchActionPlans, fetchCabangs]);

  // Edit handler
  const handleEdit = (fb) => {
    setEditingData(fb);
    setFormData({ task: fb.task, status: fb.status || "" });
    setOpen(true);
  };

  // Update feedback
  const handleUpdate = async () => {
    if (!editingData) return;
    try {
      setSaving(true);
      const res = await fetch(
        `${BASE_URL}/api/admin/feedback/updatefeedback/${editingData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        fetchFeedbacks();
        setOpen(false);
        setEditingData(null);
      }
    } catch (err) {
      console.error("Error updating feedback:", err);
    } finally {
      setSaving(false);
    }
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await fetch(
        `${BASE_URL}/api/admin/feedback/deletedata/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchFeedbacks();
    } catch (err) {
      console.error("Error deleting feedback:", err);
    } finally {
      setDeleting(false);
    }
  };

  // Clear all feedback
  const handleClearAll = async () => {
    try {
      setClearing(true);
      const res = await fetch(`${BASE_URL}/api/admin/feedback/clearfeedback`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchFeedbacks();
    } catch (err) {
      console.error("Error clearing feedback:", err);
    } finally {
      setClearing(false);
    }
  };

  // Submit feedback baru
  const handleCreateFeedback = async (formData) => {
    setIsCreating(true);
    try {
      const res = await fetch(`${BASE_URL}/api/admin/feedback/createfeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cabangId: formData.cabangId,
          actionPlanId: formData.actionPlanId,
          subActionPlanId: formData.subActionPlanId,
          task: formData.task,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchFeedbacks();
        setModalOpen(false);
        formData.resetForm();
      } else {
        console.error("Gagal menyimpan feedback:", data);
      }
    } catch (err) {
      console.error("Error create feedback:", err);
    } finally {
      setIsCreating(false);
    }
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Render badge status
  const renderStatus = (status) => {
    if (status === "selesai") {
      return (
        <Badge className="bg-green-100 text-green-800 border border-green-200">
          Selesai
        </Badge>
      );
    }
    if (status === "proses") {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
          Proses
        </Badge>
      );
    }
    if (status === "reject") {
      return (
        <Badge className="bg-yellow-100 text-red-800 border border-red-200">
          Reject
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
        -
      </Badge>
    );
  };

  const handleReview = (fb) => {
    const isReview =
      fb.buktiGambar && fb.timestampUpload && !fb.timestampSelesai;

    setSelectedFeedback(fb);

    if (isReview) {
      setOpenProsesModal(true);
    } else {
      setOpenInfoModal(true);
    }
  };

  return (
    <>
      {/* Loading Overlays */}
      {deleting && <LoadingOverlay message="Menghapus feedback..." />}
      {clearing && <LoadingOverlay message="Menghapus semua feedback..." />}

      <Card className="p-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manajemen Feedback</h2>
            <div className="flex gap-2">
              <Button
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Tambah Feedback
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm("Yakin hapus semua feedback?")) {
                    handleClearAll();
                  }
                }}
                disabled={clearing}
              >
                {clearing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  "Clear All"
                )}
              </Button>
            </div>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : feedbacks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <svg
                  className="w-16 h-16 text-gray-400"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Feedback
              </h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-2 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left">No</th>
                    <th className="px-6 py-3 text-left">Cabang</th>
                    <th className="px-6 py-3 text-left">Action Plan</th>
                    <th className="px-6 py-3 text-left">Feedback</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb, index) => (
                    <tr
                      key={fb.id}
                      className="bg-white shadow rounded hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="px-6 py-3">{fb.cabang?.nama}</td>
                      <td className="px-6 py-3">{fb.actionPlan?.title}</td>
                      <td className="px-6 py-3">{fb.task}</td>
                      <td className="px-6 py-3">{renderStatus(fb.status)}</td>
                      <td className="px-6 py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(fb)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Konfirmasi Hapus
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Yakin ingin menghapus feedback dari{" "}
                                <strong>{fb.cabang?.nama}</strong>?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(fb.id)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <Button
                          size="sm"
                          variant="outline"
                          className={
                            fb.buktiGambar &&
                            fb.timestampUpload &&
                            !fb.timestampSelesai
                              ? "border-blue-500 text-blue-600 hover:bg-blue-50"
                              : "border-gray-400 text-gray-600 hover:bg-gray-50"
                          }
                          onClick={() => handleReview(fb)}
                        >
                          {fb.buktiGambar &&
                          fb.timestampUpload &&
                          !fb.timestampSelesai ? (
                            <>
                              <Eye className="h-4 w-4 mr-1" /> Review
                            </>
                          ) : (
                            <>
                              <Info className="h-4 w-4 mr-1" /> Detail
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>

        {/* Modal Tambah Feedback */}
        <FeedbackFormModal
          actionPlans={actionPlans}
          cabangs={cabangs}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateFeedback}
          isCreating={isCreating}
          selectedCabang={null}
        />

        {/* Dialog Edit */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit Feedback</DialogTitle>
              <DialogDescription>
                {editingData?.status === "proses"
                  ? "Perbarui task atau unggah file untuk menyelesaikan feedback."
                  : editingData?.status === "selesai"
                  ? "Feedback telah selesai. Anda dapat mengedit task atau mengembalikannya ke status proses."
                  : "Perbarui informasi feedback."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 overflow-y-auto px-1 [&::-webkit-scrollbar]:hidden scrollbar-none">
              {/* Edit Task */}
              <div>
                <Label className="pb-1">Feedback</Label>
                <Input
                  value={formData.task}
                  onChange={(e) =>
                    setFormData({ ...formData, task: e.target.value })
                  }
                />
              </div>

              {/* Jika status PROSES → tampilkan upload file dengan dropzone */}
              {editingData?.status === "proses" && (
                <div>
                  <Label className="pb-1">Upload File Bukti</Label>
                  <FileDropzone
                    file={formData.file}
                    onFileSelect={(file) => setFormData({ ...formData, file })}
                    onFileRemove={() =>
                      setFormData({ ...formData, file: null })
                    }
                  />
                </div>
              )}
            </div>

            <DialogFooter className="flex flex-wrap justify-end gap-2 pt-4">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>

              {/* Jika status SELESAI → tampilkan 2 tombol: Edit & Kembalikan */}
              {editingData?.status === "selesai" ? (
                <>
                  <Button
                    disabled={saving}
                    onClick={async () => {
                      try {
                        setSaving(true);
                        const updateRes = await fetch(
                          `${BASE_URL}/api/admin/feedback/updatefeedback/${editingData.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({ task: formData.task }),
                          }
                        );
                        const result = await updateRes.json();
                        if (!result.success) throw new Error(result.message);
                        fetchFeedbacks();
                        setOpen(false);
                        setEditingData(null);
                      } catch (err) {
                        console.error("Error updating task:", err);
                      } finally {
                        setSaving(false);
                      }
                    }}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Edit Task"
                    )}
                  </Button>

                  <Button
                    variant="destructive"
                    disabled={saving}
                    onClick={async () => {
                      const confirmReset = confirm(
                        "Apakah Anda yakin ingin mengembalikan feedback ini ke status 'proses'? File bukti akan dihapus."
                      );
                      if (!confirmReset) return;
                      try {
                        setSaving(true);
                        const res = await fetch(
                          `${BASE_URL}/api/admin/feedback/updatefeedback/${editingData.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({ status: "proses" }),
                          }
                        );
                        const data = await res.json();
                        if (data.success) {
                          fetchFeedbacks();
                          setOpen(false);
                          setEditingData(null);
                        }
                      } catch (err) {
                        console.error("Error reverting feedback:", err);
                      } finally {
                        setSaving(false);
                      }
                    }}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      "Kembalikan ke Proses"
                    )}
                  </Button>
                </>
              ) : (
                /* Jika status bukan selesai (misal proses atau pending) */
                <Button
                  className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  disabled={saving}
                  onClick={async () => {
                    try {
                      setSaving(true);

                      // Jika ada file dan status proses → upload file
                      if (formData.file && editingData?.status === "proses") {
                        const fd = new FormData();
                        fd.append("file", formData.file);

                        const uploadRes = await fetch(
                          `${BASE_URL}/api/admin/feedback/uploadfeedback/${editingData.id}`,
                          {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: fd,
                          }
                        );
                        const result = await uploadRes.json();
                        if (!result.success) throw new Error(result.message);
                      } else {
                        // Update task biasa
                        const updateRes = await fetch(
                          `${BASE_URL}/api/admin/feedback/updatefeedback/${editingData.id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({ task: formData.task }),
                          }
                        );
                        const result = await updateRes.json();
                        if (!result.success) throw new Error(result.message);
                      }

                      fetchFeedbacks();
                      setOpen(false);
                      setEditingData(null);
                    } catch (err) {
                      console.error("Error saving feedback:", err);
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan"
                  )}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Modal Detail Feedback */}
        {selectedFeedback && (
          <FeedbackInfoModal
            open={openInfoModal}
            onClose={() => setOpenInfoModal(false)}
            feedback={selectedFeedback}
          />
        )}

        {/* Modal Review Feedback (Proses) */}
        {selectedFeedback && (
          <FeedbackInfoProsesModal
            open={openProsesModal}
            onClose={() => setOpenProsesModal(false)}
            feedback={selectedFeedback}
          />
        )}
      </Card>
    </>
  );
}
