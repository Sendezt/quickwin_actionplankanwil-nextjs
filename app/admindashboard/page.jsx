"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import { DashboardContent } from "@/components/admin/DashboardPage";

export default function Page() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
