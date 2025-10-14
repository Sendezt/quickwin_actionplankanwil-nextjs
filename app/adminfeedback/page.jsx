// app\adminfeedback\page.jsx
"use client";
import AdminLayout from "@/components/admin/AdminLayout";
import FeedbackPage from "@/components/admin/FeedbackPage";

export default function adminfeedback() {
  return (
    <AdminLayout>
      <FeedbackPage />
    </AdminLayout>
  );
}
