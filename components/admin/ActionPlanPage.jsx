"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AgendaTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState(""); // untuk create
  const [editId, setEditId] = useState(null); // id yang sedang diedit
  const [editTitle, setEditTitle] = useState(""); // judul saat edit
  const pageSize = 8;

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://magangproject.vercel.app/api/admin/actionplan/getActionPlan",
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
  async function handleCreate() {
    if (!newTitle.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://magangproject.vercel.app/api/admin/actionplan/createActionPlan",
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
    }
  }

  // Update
  async function handleUpdate(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://magangproject.vercel.app/api/admin/actionplan/updateActionPlan/${id}`,
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

      setEditId(null);
      setEditTitle("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal update action plan");
    }
  }

  // Delete
  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://magangproject.vercel.app/api/admin/actionplan/deleteActionPlan/${id}`,
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daftar Action Plan</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Form Create */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Judul baru..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button onClick={handleCreate}>Tambah</Button>
        </div>

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
        {error && <div className="text-center py-6 text-red-500">{error}</div>}

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
                    <TableCell className="font-medium">
                      {editId === row.id ? (
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                      ) : (
                        row.title
                      )}
                    </TableCell>
                    <TableCell>{formatDate(row.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      {editId === row.id ? (
                        <>
                          <Button onClick={() => handleUpdate(row.id)}>
                            Simpan
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => setEditId(null)}
                          >
                            Batal
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => {
                              setEditId(row.id);
                              setEditTitle(row.title);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(row.id)}
                          >
                            Hapus
                          </Button>
                        </>
                      )}
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
    </Card>
  );
}
