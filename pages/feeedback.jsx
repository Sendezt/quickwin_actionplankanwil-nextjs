"use client";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import FeedbackList from "@/components/feedback/FeedbackList";
import FeedbackFilters from "@/components/feedback/FeedbackFilters";
import FeedbackModal from "@/components/feedback/FeedbackModal"; // ⬅️ import modal konfirmasi
import FeedbackFormModal from "@/components/feedback/FeedbackFormModal";
import {
  fetchFeedbacks,
  fetchCabangs,
  fetchActionPlans,
  createFeedback,
  updateFeedbackStatus,
} from "@/lib/apifeedback";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [actionPlans, setActionPlans] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // state untuk modal tambah feedback
  const [task, setTask] = useState("");
  const [cabangId, setCabangId] = useState("");
  const [actionPlanId, setActionPlanId] = useState("");

  // filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // state untuk modal konfirmasi selesai
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = feedbacks;
    if (searchTerm) {
      filtered = filtered.filter((fb) =>
        fb.task.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((fb) => fb.status === statusFilter);
    }
    setFilteredFeedbacks(filtered);
  }, [feedbacks, searchTerm, statusFilter]);

  const loadData = async () => {
    setFeedbacks(await fetchFeedbacks());
    setCabangs((await fetchCabangs()) || []);
    setActionPlans((await fetchActionPlans()) || []);
  };

  const handleCreate = async () => {
    if (!task || !cabangId || !actionPlanId) return;
    setIsCreating(true);
    await createFeedback({
      task,
      cabangId: Number(cabangId),
      actionPlanId: Number(actionPlanId),
    });
    setTask("");
    setCabangId("");
    setActionPlanId("");
    setIsCreating(false);
    setShowModal(false);
    loadData();
  };

  // buka modal konfirmasi selesai
  const handleSelesai = (feedback) => {
    setSelectedFeedback(feedback);
    setShowConfirmModal(true);
  };

  // konfirmasi selesai
  const confirmSelesai = async (id) => {
    await updateFeedbackStatus(id);
    setShowConfirmModal(false);
    setSelectedFeedback(null);
    loadData();
  };

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Feedback Management</h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Plus className="mr-2" /> Tambah Feedback
            </button>
          </div>

          {/* Filters */}
          <FeedbackFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Feedback List */}
          <FeedbackList
            feedbacks={filteredFeedbacks}
            onSelesai={handleSelesai}
          />

          {/* Modal Konfirmasi Selesai */}
          <FeedbackModal
            open={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={confirmSelesai}
            feedback={selectedFeedback}
          />

          {/* Modal Tambah Feedback */}
          <FeedbackFormModal
            cabangs={cabangs}
            actionPlans={actionPlans}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={async ({ cabangId, actionPlanId, task, resetForm }) => {
              setIsCreating(true);
              await createFeedback({
                task,
                cabangId: Number(cabangId),
                actionPlanId: Number(actionPlanId),
              });
              setIsCreating(false);
              setShowModal(false);
              resetForm(); // reset step dan form
              loadData();
            }}
            isCreating={isCreating}
          />  
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
