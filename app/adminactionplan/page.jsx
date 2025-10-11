// import AgendaTable from "@/pages/ActionPlanPage";

// export default function Page() {
//   return <AgendaTable />;
// }
"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import ActionPlanPage from "@/components/admin/ActionPlanPage";

export default function AdminActionPlan() {
  return (
    <AdminLayout>
      <ActionPlanPage />
    </AdminLayout>
  );
}
