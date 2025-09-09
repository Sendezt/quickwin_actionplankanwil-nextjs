"use client";

import React, { useMemo, useState } from "react";
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

// Data contoh
const defaultData = [
  { id: 1, title: "Implementasi UU HKPD", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 2, title: "Kebijakan Relaksasi", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 3, title: "Operasi Gabungan", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 4, title: "Rekonsiliasi Data", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 5, title: "Keterisian Data Valid", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 6, title: "Sosialisasi Kesamsatan", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 7, title: "SIGNAL & ONLINE", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 8, title: "Merchant", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 9, title: "Komitmen Stakeholder", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 10, title: "SIGAP Prioritas", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 11, title: "SIGAP Instansi", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 12, title: "WA Blast", createdAt: "2025-09-03T15:15:04.000Z" },
  { id: 13, title: "Pendataan Terlibat Laka", createdAt: "2025-09-03T15:15:04.000Z" },
];

export default function AgendaTable({ items = defaultData }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

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
        <CardTitle>Daftar Agenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Cari by id atau judul..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <Button onClick={() => { setQuery(""); setPage(1); }}>
            Reset
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">ID</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead className="w-56">Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="font-medium">{row.title}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}

              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      Tidak ada data.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

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
