"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit3, ListTodo, Loader2, Plus, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AgendaTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [open, setOpen] = useState(false); // modal create & edit
  const [saving, setSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionPlans, setActionPlans] = useState([]);
  const [selectedActionPlan, setSelectedActionPlan] = useState("");
  const [openEdit, setOpenEdit] = useState(false); // khusus edit modal

  const pageSize = 10;

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://quickwin-jateng.vercel.app/api/api/admin/sub/getsub",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      setItems(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal memuat data agenda");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchActionPlans() {
    try {
      const res = await fetch(
        "https://quickwin-jateng.vercel.app/api/api/actionplan"
      );
      if (!res.ok) throw new Error("Gagal fetch action plans");

      const json = await res.json();
      setActionPlans(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    fetchActionPlans();
  }, []);

  // Create
  async function handleCreate(e) {
    e.preventDefault();
    if (!newTitle.trim() || !selectedActionPlan) return;
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://quickwin-jateng.vercel.app/api/api/admin/sub/createsub",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            actionPlanId: Number(selectedActionPlan),
            title: newTitle,
          }),
        }
      );

      if (!res.ok) throw new Error("Gagal membuat sub action plan");

      setNewTitle("");
      setSelectedActionPlan("");
      setOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal membuat sub action plan");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Open dialog edit
  function handleOpenEdit(row) {
    setEditId(row.id);
    setEditTitle(row.title);
    setOpenEdit(true);
  }

  // Update
  async function handleUpdate() {
    if (!editId) return;
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://quickwin-jateng.vercel.app/api/api/admin/sub/updatesub/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: editTitle }),
        }
      );

      if (!res.ok) throw new Error("Gagal update sub action plan");

      setOpenEdit(false);
      setEditId(null);
      setEditTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal update sub action plan");
    } finally {
      setSaving(false);
    }
  }

  // Delete
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://quickwin-jateng.vercel.app/api/api/admin/sub/deletesub/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus sub action plan");

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus sub action plan");
    }
  }

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (it) => String(it.id).includes(q) || it.title.toLowerCase().includes(q)
    );
  }, [items, query]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  function formatDate(iso) {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  return (
    <div className="container mx-auto p-3 md:p-6 space-y-4 max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 rounded-md">
          <ListTodo className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Manajemen Sub Action Plan
          </h1>
          <p className="text-sm text-gray-600 hidden md:block">
            Kelola semua sub action plan perusahaan Anda
          </p>
        </div>
      </div>

      {/* Main Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-base md:text-lg">
              Daftar Sub Action Plan
            </CardTitle>
            <Button onClick={() => setOpen(true)} size="sm">
              <Plus className="mr-1 h-4 w-4" /> Tambah Sub ActionPlan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <Input
              placeholder="Cari by ID atau judul..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="h-9 text-sm flex-1"
            />
            <Button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              variant="outline"
              size="sm"
              className="h-9 px-4 text-sm sm:w-auto w-full"
            >
              Reset
            </Button>
          </div>

          {loading && (
            <div className="text-center py-8 text-sm text-muted-foreground">
              Memuat data...
            </div>
          )}
          {error && (
            <div className="text-center py-8 text-sm text-red-500">{error}</div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <div className="min-w-full px-6 md:px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="text-xs">
                      <TableHead className="w-12 py-2 text-center">
                        ID
                      </TableHead>
                      <TableHead className="py-2 text-center">Judul</TableHead>
                      <TableHead className="w-20 py-2 hidden sm:table-cell text-center">
                        ActionPlan ID
                      </TableHead>
                      <TableHead className="w-32 py-2 hidden md:table-cell text-center">
                        Dibuat
                      </TableHead>
                      <TableHead className="w-28 py-2 text-center">
                        Aksi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((row, index) => (
                      <TableRow key={row.id} className="text-sm">
                        <TableCell className="py-2 font-mono text-xs text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="py-2 font-medium pr-2 whitespace-normal break-words">
                          <div>{row.title}</div>
                        </TableCell>
                        <TableCell className="py-2 hidden sm:table-cell font-mono text-xs text-center">
                          {row.actionPlanId}
                        </TableCell>
                        <TableCell className="py-2 hidden md:table-cell text-xs text-muted-foreground text-center">
                          {formatDate(row.created_at)}
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex gap-1 justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenEdit(row)}
                              className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="max-w-md">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-base">
                                    Konfirmasi Hapus
                                  </AlertDialogTitle>
                                  <AlertDialogDescription className="text-sm">
                                    Hapus sub action plan "{row.title}"?
                                    Tindakan ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="text-sm">
                                    Batal
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(row.id)}
                                    className="bg-red-600 hover:bg-red-700 text-sm"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {paginated.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <div className="py-8 text-center text-sm text-muted-foreground">
                            Tidak ada data.
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
            <div className="text-xs text-muted-foreground order-2 sm:order-1">
              {filtered.length} hasil
            </div>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                ← Prev
              </Button>
              <div className="flex items-center px-2 text-xs font-medium">
                {page}/{totalPages}
              </div>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs"
              >
                Next →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Create Sub Action Plan */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">
              Tambah Sub Action Plan
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <Select
              onValueChange={(value) => setSelectedActionPlan(value)}
              value={selectedActionPlan}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Pilih Action Plan" />
              </SelectTrigger>
              <SelectContent>
                {actionPlans.map((ap) => (
                  <SelectItem key={ap.id} value={String(ap.id)}>
                    {ap.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Nama Sub Action Plan..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="h-9 text-sm"
            />

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                size="sm"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting || !newTitle.trim() || !selectedActionPlan
                }
                size="sm"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Sub Action Plan */}
      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">
              Edit Sub Action Plan
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Masukkan judul baru"
              className="h-9 text-sm"
            />
          </div>
          <DialogFooter className="gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpenEdit(false);
                setEditId(null);
                setEditTitle("");
              }}
              size="sm"
            >
              Batal
            </Button>
            <Button disabled={saving} onClick={handleUpdate} size="sm">
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
