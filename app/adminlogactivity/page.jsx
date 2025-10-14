// app\adminlogactivity\page.jsx
"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import LogActivityContent from "@/components/admin/LogActivityPage";

export default function AdminLogActivity() {
  return (
    <AdminLayout>
      <LogActivityContent />
    </AdminLayout>
  );
}
