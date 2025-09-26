"use client";

import React, { useEffect, useState } from "react";
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
import { Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [formData, setFormData] = useState({ task: "", status: "" });
  const [saving, setSaving] = useState(false);

  // Fetch data
  const fetchFeedbacks = () => {
    setLoading(true);
    fetch("https://quickwin-jateng.vercel.app/api/admin/feedback/getalldata", {
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
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Open dialog for edit
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
        `https://quickwin-jateng.vercel.app/api/admin/feedback/updatefeedback/${editingData.id}`,
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
      `https://quickwin-jateng.vercel.app/api/admin/feedback/deletedata/${id}`,
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
    fetch("https://quickwin-jateng.vercel.app/api/admin/feedback/clearfeedback", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => fetchFeedbacks())
      .catch((err) => console.error("Error clearing feedback:", err));
  };

  // Helper format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Helper render badge status
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
          <Button variant="destructive" onClick={handleClearAll}>
            Clear All
          </Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    No
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Cabang
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Action Plan
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Proses
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Selesai
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-700 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((fb,index) => (
                  <tr
                    key={fb.id}
                    className="bg-white shadow rounded hover:bg-gray-50 transition"
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
                            className="border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white border border-gray-200">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-gray-900">
                              Konfirmasi Hapus
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600">
                              Yakin ingin menghapus cabang{" "}
                              <strong className="text-gray-900">
                                {fb.cabang?.nama}
                              </strong>
                              ? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="gap-2">
                            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                              Batal
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(user.id)}
                              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-colors"
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

      {/* Dialog Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Edit Feedback
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Perbarui informasi feedback
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Task</Label>
              <Input
                value={formData.task}
                onChange={(e) =>
                  setFormData({ ...formData, task: e.target.value })
                }
                placeholder="Masukan Task"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(val) =>
                  setFormData({ ...formData, status: val })
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proses">Proses</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Batal
            </Button>
            <Button
              disabled={saving}
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:ring-blue-500"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
