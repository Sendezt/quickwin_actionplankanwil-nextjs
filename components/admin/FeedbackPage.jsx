// components\admin\FeedbackPage.jsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
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
import { Edit, Trash2, Plus } from "lucide-react";
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
} from "../ui/alert-dialog";

import FeedbackFormModal from "@/components/admin/Feedback/FeedbackFormModal";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ task: "", status: "" });
  const [saving, setSaving] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [actionPlans, setActionPlans] = useState([]);
  const [cabangs, setCabangs] = useState([]);

  // Fetch Cabang
  const fetchCabangs = useCallback(async () => {
    try {
      const res = await fetch(
        "https://magangproject.vercel.app/api/cabang/read"
      );
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
    fetch("https://magangproject.vercel.app/api/admin/feedback/getalldata", {
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
      const res = await fetch(
        "https://magangproject.vercel.app/api/actionplan"
      );
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
        `https://magangproject.vercel.app/api/admin/feedback/updatefeedback/${editingData.id}`,
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
  const handleDelete = (id) => {
    if (!confirm("Yakin hapus feedback ini?")) return;
    fetch(
      `https://magangproject.vercel.app/api/admin/feedback/deletedata/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then(() => fetchFeedbacks())
      .catch((err) => console.error("Error deleting feedback:", err));
  };

  // Clear all feedback
  const handleClearAll = () => {
    if (!confirm("Yakin hapus semua feedback?")) return;
    fetch("https://magangproject.vercel.app/api/admin/feedback/clearfeedback", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => fetchFeedbacks())
      .catch((err) => console.error("Error clearing feedback:", err));
  };

  // Submit feedback baru
  const handleCreateFeedback = async (formData) => {
    setIsCreating(true);
    try {
      const res = await fetch(
        "https://magangproject.vercel.app/api/admin/feedback/createfeedback",
        {
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
        }
      );

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
    return (
      <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
        -
      </Badge>
    );
  };

  return (
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
            <Button variant="destructive" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">Cabang</th>
                  <th className="px-6 py-3 text-left">Action Plan</th>
                  <th className="px-6 py-3 text-left">Task</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Proses</th>
                  <th className="px-6 py-3 text-left">Selesai</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb, index) => (
                  <tr
                    key={fb.id}
                    className="bg-white shadow rounded hover:bg-gray-50"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{fb.cabang?.nama}</td>
                    <td className="px-6 py-3">{fb.actionPlan?.title}</td>
                    <td className="px-6 py-3">{fb.task}</td>
                    <td className="px-6 py-3">{renderStatus(fb.status)}</td>
                    <td className="px-6 py-3">
                      {formatDate(fb.timestampProses)}
                    </td>
                    <td className="px-6 py-3">
                      {formatDate(fb.timestampSelesai)}
                    </td>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Feedback</DialogTitle>
            <DialogDescription>Perbarui informasi feedback</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Task</Label>
              <Input
                value={formData.task}
                onChange={(e) =>
                  setFormData({ ...formData, task: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(val) =>
                  setFormData({ ...formData, status: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proses">Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button disabled={saving} onClick={handleUpdate}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
