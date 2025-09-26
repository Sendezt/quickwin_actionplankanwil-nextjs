"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Building2, Plus } from "lucide-react";
import AddCabangForm from "@/components/admin/Cabang/AddCabangForm";
import EditCabangModal from "@/components/admin/Cabang/EditCabangModal";
import CabangTable from "@/components/admin/Cabang/CabangTable";
import LoadingSkeleton from "@/components/admin/Cabang/LoadingSkeleton";
import AlertMessage from "@/components/admin/Cabang/AlertMessage";

export default function CabangPage() {
  const baseURL = "https://quickwin-jateng.vercel.app";
  const [cabangs, setCabangs] = useState([]);
  const [filteredCabangs, setFilteredCabangs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [newCabang, setNewCabang] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editNama, setEditNama] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editCabang, setEditCabang] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCabangs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCabangs(
        cabangs.filter((c) =>
          c.nama.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCabangs(cabangs);
    }
  }, [cabangs, searchTerm]);

  async function fetchCabangs() {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/admin/cabang/getcabang`);
      const data = await res.json();
      if (data.success) setCabangs(data.cabangs);
      else setError("Gagal memuat data cabang");
    } catch (err) {
      setError("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCabang(e) {
    e.preventDefault();
    if (!newCabang.trim()) return setError("Nama cabang tidak boleh kosong");
    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseURL}/api/admin/cabang/createcabang`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: newCabang.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setNewCabang("");
        setSuccess("Cabang berhasil ditambahkan!");
        fetchCabangs();

        setTimeout(() => {
          setSuccess("");
        }, 5000);
      } else setError(data.message || "Gagal menambahkan cabang");
    } catch {
      setError("Terjadi kesalahan saat menambahkan cabang");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openEditModal(id) {
    try {
      const res = await fetch(`${baseURL}/api/admin/cabang/getcabang/${id}`);
      const data = await res.json();
      if (data.success) {
        setEditCabang(data.cabang);
        setEditNama(data.cabang.nama);
        setOpenEdit(true);
      }
    } catch {
      setError("Gagal membuka modal edit");
    }
  }

  async function handleUpdateCabang(e) {
    e.preventDefault();
    if (!editNama.trim()) return setError("Nama cabang tidak boleh kosong");
    setIsUpdating(true);
    try {
      const res = await fetch(
        `${baseURL}/api/admin/cabang/updatecabang/${editCabang.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nama: editNama.trim() }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setOpenEdit(false);
        setSuccess("Cabang berhasil diperbarui!");
        fetchCabangs();
      } else setError(data.message || "Gagal memperbarui cabang");
    } catch {
      setError("Terjadi kesalahan saat memperbarui cabang");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDeleteCabang(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${baseURL}/api/admin/cabang/deletecabang/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccess("Cabang berhasil dihapus!");
        fetchCabangs();
      } else setError(data.message || "Gagal menghapus cabang");
    } catch {
      setError("Terjadi kesalahan saat menghapus cabang");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Manajemen Cabang</h1>
          <p className="text-gray-600">Kelola semua cabang perusahaan Anda</p>
        </div>
      </div>

      <AlertMessage error={error} success={success} />

      {/* Add Cabang */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            Tambah Cabang Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddCabangForm
            newCabang={newCabang}
            setNewCabang={setNewCabang}
            handleAddCabang={handleAddCabang}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>

      {/* List Cabang */}
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Daftar Cabang</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari cabang..."
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <CabangTable
              cabangs={filteredCabangs}
              onEdit={openEditModal}
              deletingId={deletingId}
              handleDelete={handleDeleteCabang}
            />
          )}
        </CardContent>
      </Card>

      {/* Modal Edit */}
      <EditCabangModal
        open={openEdit}
        setOpen={setOpenEdit}
        editNama={editNama}
        setEditNama={setEditNama}
        handleUpdateCabang={handleUpdateCabang}
        isUpdating={isUpdating}
      />
    </div>
  );
}
