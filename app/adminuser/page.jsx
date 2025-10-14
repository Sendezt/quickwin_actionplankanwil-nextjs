// app\adminuser\page.jsx
import AdminLayout from "@/components/admin/AdminLayout";
import UserManagement from "@/components/admin/UserPage";

export default function AdminUser() {
  return (
    <AdminLayout>
      <UserManagement />
    </AdminLayout>
  );
}
