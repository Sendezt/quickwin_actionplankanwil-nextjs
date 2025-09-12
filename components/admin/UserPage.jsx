"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import UserForm from "./User/UserForm";
import UserTable from "./User/UserTable";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "https://magangproject.vercel.app/api/admin/admin/getuser",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      toast.error("Gagal memuat data user");
    }
  };

  // fetch cabangs
  const fetchCabangs = async () => {
    try {
      const res = await fetch(
        "https://magangproject.vercel.app/api/cabang/read"
      );
      const data = await res.json();
      setCabangs(data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
    fetchCabangs();
  }, []);

  // create user
  const handleCreate = async (formData) => {
    try {
      const res = await fetch(
        "https://magangproject.vercel.app/api/admin/admin/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            cabangId:
              formData.role === "Kacab" ? parseInt(formData.cabangId) : null,
          }),
        }
      );

      if (!res.ok) throw new Error();
      toast.success("User berhasil ditambahkan");
      fetchUsers();
      setIsCreateOpen(false);
    } catch {
      toast.error("Gagal menambahkan user");
    }
  };

  // edit user
  const handleEdit = async (formData) => {
    try {
      const res = await fetch(
        `https://magangproject.vercel.app/api/admin/admin/updateuser/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...formData,
            cabangId:
              formData.role === "Kacab" ? parseInt(formData.cabangId) : null,
          }),
        }
      );

      if (!res.ok) throw new Error();
      toast.success("User berhasil diperbarui");
      fetchUsers();
      setIsEditOpen(false);
      setSelectedUser(null);
    } catch {
      toast.error("Gagal memperbarui user");
    }
  };

  // delete user
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `https://magangproject.vercel.app/api/admin/admin/deleteuser/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!res.ok) throw new Error();
      toast.success("User berhasil dihapus");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Gagal menghapus user");
    }
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Daftar User</h2>
          <p className="text-muted-foreground">Kelola data pengguna sistem</p>
        </div>
        <Button
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" /> Tambah User
        </Button>
      </div>

      {/* tabel */}
      <Card>
        <CardHeader>
          <CardTitle>Data User</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable
            users={users}
            onEdit={(user) => {
              setSelectedUser(user);
              setIsEditOpen(true);
            }}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* form create */}
      <UserForm
        open={isCreateOpen}
        setOpen={setIsCreateOpen}
        onSubmit={handleCreate}
        cabangs={cabangs}
      />

      {/* form edit */}
      {selectedUser && (
        <UserForm
          open={isEditOpen}
          setOpen={setIsEditOpen}
          onSubmit={handleEdit}
          cabangs={cabangs}
          initialData={{
            username: selectedUser.username,
            password: "",
            role: selectedUser.role,
            cabangId: selectedUser.cabang ? String(selectedUser.cabang.id) : "",
          }}
          isEdit
        />
      )}
    </div>
  );
}
