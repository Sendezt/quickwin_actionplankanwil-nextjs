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

export default function AgendaTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pageSize = 8;

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://quickwin-jateng.vercel.app/api/admin/actionplan/getActionPlan",
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

  useEffect(() => {
    fetchData();
  }, []);

  // Create
  async function handleCreate(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://quickwin-jateng.vercel.app/api/admin/actionplan/createActionPlan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );

      if (!res.ok) throw new Error("Gagal membuat action plan");

      setNewTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal membuat action plan");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Open dialog edit
  function handleOpenEdit(row) {
    setEditId(row.id);
    setEditTitle(row.title);
    setOpen(true);
  }

  // Update
  async function handleUpdate() {
    if (!editId) return;
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://quickwin-jateng.vercel.app/api/admin/actionplan/updateActionPlan/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: editTitle }),
        }
      );

      if (!res.ok) throw new Error("Gagal update action plan");

      setOpen(false);
      setEditId(null);
      setEditTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal update action plan");
    } finally {
      setSaving(false);
    }
  }

  // Delete
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://quickwin-jateng.vercel.app/api/admin/actionplan/deleteActionPlan/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus action plan");

      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus action plan");
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
    try {
      return new Date(iso).toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return iso;
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ListTodo className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Manajemen Action Plan</h1>
          <p className="text-gray-600">
            Kelola semua action plan perusahaan Anda
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            Tambah Cabang Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.form
            onSubmit={handleCreate}
            className="flex gap-3 items-center bg-white p-4 rounded-2xl shadow-md border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Input */}
            <motion.div className="flex-1">
              <Input
                type="text"
                placeholder="Masukkan nama cabang baru..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                disabled={isSubmitting}
              />
            </motion.div>

            {/* Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isSubmitting || !newTitle.trim()} // ✅ fix pakai newTitle
                className="h-11 px-6 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daftar Action Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form Create */}
          {/* <div className="flex gap-2 mb-4">
          <Input
            placeholder="Judul baru..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={handleCreate}>Tambah</Button>
        </div> */}

          {/* Search */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Cari by id atau judul..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
            <Button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
            >
              Reset
            </Button>
          </div>

          {loading && (
            <div className="text-center py-6 text-muted-foreground">
              Memuat data...
            </div>
          )}
          {error && (
            <div className="text-center py-6 text-red-500">{error}</div>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">No</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="w-56">Dibuat</TableHead>
                    <TableHead className="w-40">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginated.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell className="font-medium">{row.title}</TableCell>
                      <TableCell>{formatDate(row.createdAt)}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenEdit(row)}
                          className="h-8 px-3 hover:border-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <Edit3 className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Hapus
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Konfirmasi Hapus
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus action plan "
                                {row.title}"? Tindakan ini tidak dapat
                                dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(row.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Ya, Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}

                  {paginated.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          Tidak ada data.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination simple */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {filtered.length} hasil
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Sebelumnya
              </Button>
              <div className="flex items-center px-3">
                {page} / {totalPages}
              </div>
              <Button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Dialog Edit */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Action Plan</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Masukkan judul baru"
              />
            </div>
            <DialogFooter className="gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setEditId(null);
                  setEditTitle("");
                }}
              >
                Batal
              </Button>
              <Button disabled={saving} onClick={handleUpdate}>
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
}
