"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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

export default function UserForm({
  open,
  setOpen,
  onSubmit,
  cabangs,
  initialData,
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Kacab",
    cabangId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {isEdit ? "Edit User" : "Tambah User Baru"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEdit
              ? "Perbarui informasi user"
              : "Isi form di bawah untuk menambahkan user baru"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Username
            </Label>
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="!border-gray-300 focus-visible:!border-blue-500 focus-visible:!ring-blue-500 focus-visible:!ring-0 focus-visible:!ring-offset-0"
              placeholder="Masukan Username"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Password {isEdit && "(kosongkan jika tidak diganti)"}
            </Label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="!border-gray-300 focus-visible:!border-blue-500 focus-visible:!ring-blue-500 focus-visible:!ring-0 focus-visible:!ring-offset-0"
              placeholder="Masukan Password"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(val) =>
                setFormData({ ...formData, role: val, cabangId: "" })
              }
            >
              <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Admin"
                  className="focus:bg-blue-50 focus:text-blue-900"
                >
                  {" "}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Admin
                  </span>
                </SelectItem>
                <SelectItem
                  value="Kacab"
                  className="focus:bg-emerald-50 focus:text-emerald-900"
                >
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    Kacab
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.role === "Kacab" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Cabang
              </Label>
              <Select
                value={formData.cabangId}
                onValueChange={(val) =>
                  setFormData({ ...formData, cabangId: val })
                }
              >
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors">
                  <SelectValue
                    placeholder="Pilih Cabang"
                    className="text-gray-500"
                  />
                </SelectTrigger>
                <SelectContent>
                  {cabangs.map((cabang) => (
                    <SelectItem
                      key={cabang.id}
                      value={String(cabang.id)}
                      className="focus:bg-gray-50 focus:text-gray-900"
                    >
                      {cabang.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
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
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                const success = await onSubmit(formData); // anggap return true kalau sukses
                if (success) {
                  setFormData({
                    username: "",
                    password: "",
                    role: "Kacab",
                    cabangId: "",
                  });
                  setOpen(false);
                }
              } finally {
                setLoading(false);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors focus:ring-blue-500"
          >
            {loading ? "Menyimpan..." : isEdit ? "Simpan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
