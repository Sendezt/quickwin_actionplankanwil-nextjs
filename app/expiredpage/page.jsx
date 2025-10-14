"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { SessionExpiredAlert } from "@/components/admin/Expired";

export default function AdminSession() {
  return (
    <AdminLayout>
      <SessionExpiredAlert />
    </AdminLayout>
  );
}
