// app\adminsubactionplan\page.jsx
"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import SubAgendaTable from "@/components/admin/SubActionPlanPage";

export default function AdminSubActionPlan() {
  return (
    <AdminLayout>
      <SubAgendaTable />
    </AdminLayout>
  );
}
