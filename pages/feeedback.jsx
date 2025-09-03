"use client";
import { useState, useEffect, act } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import {
  fetchFeedbacks,
  fetchCabangs,
  fetchActionPlans,
  createFeedback,
  updateFeedbackStatus,
} from "@/lib/apifeedback";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Filter, X, Info } from "lucide-react";
import { toast } from "sonner";
import FeedbackFormModal from "@/components/feedback/FeedbackFormModal";
import FeedbackModal from "@/components/feedback/FeedbackModal";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

// Loading Component
const LoadingSpinner = ({ message = "Memuat data..." }) => (
  <div className="flex items-center justify-center py-12">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [actionPlans, setActionPlans] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter states
  const [filterActionPlan, setFilterActionPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // state modal tambah feedback
  const [showModal, setShowModal] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState(null);

  // state modal konfirmasi tandai selesai
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [infoOpen, setInfoOpen] = useState(false);
  const [infoFeedback, setInfoFeedback] = useState(null);

  const handleOpenInfo = (feedback) => {
    setInfoFeedback(feedback);
    setInfoOpen(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const [feedbacksData, cabangsData, actionPlansData] = await Promise.all([
        fetchFeedbacks(),
        fetchCabangs(),
        fetchActionPlans(),
      ]);

      setFeedbacks(feedbacksData || []);
      setCabangs(cabangsData || []);
      setActionPlans(actionPlansData || []);
    } catch (error) {
      toast.error("Gagal memuat data");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Filter function
  const getFilteredFeedbacks = (cabangId) => {
    let filtered = feedbacks.filter((fb) => fb.cabangId === cabangId);

    if (filterActionPlan && filterActionPlan !== "all") {
      filtered = filtered.filter(
        (fb) => fb.actionPlanId === parseInt(filterActionPlan)
      );
    }

    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter((fb) => fb.status === filterStatus);
    }

    return filtered;
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterActionPlan("all");
    setFilterStatus("all");
  };

  // Check if any filter is active
  const hasActiveFilters = filterActionPlan !== "all" || filterStatus !== "all";

  const handleOpenModal = (cabang) => {
    setSelectedCabang(cabang);
    setShowModal(true);
  };

  const handleCreate = async ({ actionPlanId, task, resetForm }) => {
    if (!selectedCabang || !task || !actionPlanId) return;

    try {
      setIsCreating(true);
      await createFeedback({
        task,
        cabangId: Number(selectedCabang.id),
        actionPlanId: Number(actionPlanId),
      });

      toast.success("Feedback berhasil ditambahkan");

      setShowModal(false);
      resetForm();
      await loadData(true); // Refresh data
    } catch (error) {
      toast.error("Gagal menambahkan feedback");
    } finally {
      setIsCreating(false);
    }
  };

  // buka modal konfirmasi tandai selesai
  const handleOpenConfirm = (feedback) => {
    setSelectedFeedback(feedback);
    setConfirmOpen(true);
  };

  const handleSelesai = async () => {
    if (!selectedFeedback) return;

    try {
      setIsUpdating(true);
      await updateFeedbackStatus(selectedFeedback.id);

      toast.success("Feedback berhasil ditandai selesai");

      await loadData(true); // Refresh data
    } catch (error) {
      toast.error("Gagal memperbarui status feedback");
    } finally {
      setIsUpdating(false);
      setConfirmOpen(false);
      setSelectedFeedback(null);
    }
  };

  const handleRefresh = () => {
    loadData(true);
  };

  // Show loading while initial loading
  if (isLoading) {
    return (
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Feedback Management</h1>
            <LoadingSpinner message="Memuat data feedback..." />
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Feedback Management</h1>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <Loader2
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {/* Loading overlay saat refresh */}
          <div className="relative">
            {isRefreshing && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-lg border">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    Memuat ulang data...
                  </span>
                </div>
              </div>
            )}

            {cabangs.length === 0 && !isRefreshing ? (
              <LoadingSpinner message="Tidak ada data cabang..." />
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {cabangs.map((cabang) => {
                  const filteredFeedbacks = getFilteredFeedbacks(cabang.id);
                  const totalFeedbacks = feedbacks.filter(
                    (fb) => fb.cabangId === cabang.id
                  ).length;

                  return (
                    <AccordionItem
                      key={cabang.id}
                      value={`cabang-${cabang.id}`}
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span>{cabang.nama}</span>
                          {/* Badge jumlah feedback */}
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {hasActiveFilters ? (
                                <>
                                  {filteredFeedbacks.length} / {totalFeedbacks}
                                </>
                              ) : (
                                totalFeedbacks
                              )}
                            </span>
                            {hasActiveFilters &&
                              filteredFeedbacks.length !== totalFeedbacks && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                  filtered
                                </span>
                              )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {/* Filter Section dan Button Tambah - 1 Baris */}
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
                          <div className="flex items-center justify-between gap-4">
                            {/* Bagian Filter - Kiri */}
                            <div className="flex items-center gap-4 flex-1">
                              {/* Label Filter */}
                              <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                  Filter {cabang.nama}:
                                </span>
                                {hasActiveFilters && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {
                                      [
                                        filterActionPlan !== "all"
                                          ? "Action Plan"
                                          : null,
                                        filterStatus !== "all"
                                          ? "Status"
                                          : null,
                                      ].filter(Boolean).length
                                    }{" "}
                                    aktif
                                  </span>
                                )}
                              </div>

                              {/* Filter Action Plan */}
                              <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                  Action Plan:
                                </label>
                                <Select
                                  value={filterActionPlan}
                                  onValueChange={setFilterActionPlan}
                                >
                                  <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Semua Action Plan" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">
                                      Semua Action Plan
                                    </SelectItem>
                                    {actionPlans.map((plan, index) => (
                                      <SelectItem
                                        key={plan.id}
                                        value={plan.id.toString()}
                                      >
                                        {index + 1}. {plan.title}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Filter Status */}
                              <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                  Status:
                                </label>
                                <Select
                                  value={filterStatus}
                                  onValueChange={setFilterStatus}
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Semua Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="all">
                                      Semua Status
                                    </SelectItem>
                                    <SelectItem value="proses">
                                      Proses
                                    </SelectItem>
                                    <SelectItem value="selesai">
                                      Selesai
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Clear Filters Button */}
                              {hasActiveFilters && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={clearFilters}
                                  className="flex items-center justify-center w-8 h-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                  title="Clear Filters"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>

                            {/* Button Tambah - Kanan */}
                            <div className="flex-shrink-0">
                              <Button
                                className="bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                                onClick={() => handleOpenModal(cabang)}
                                disabled={isRefreshing}
                              >
                                Tambah Feedback
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* Tabel Feedback */}
                        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
                          <table className="w-full text-sm table-fixed">
                            <colgroup>
                              <col />
                              <col className="w-[25%]" />
                              <col />
                              <col />
                              <col />
                              <col />
                            </colgroup>
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                              <tr>
                                <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200">
                                  Action Plan
                                </th>
                                <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200">
                                  Feedback
                                </th>
                                <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200">
                                  Status
                                </th>
                                <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200">
                                  Proses
                                </th>
                                <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200">
                                  Selesai
                                </th>
                                <th className="p-4 text-right font-semibold text-gray-700">
                                  Aksi
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {filteredFeedbacks.map((fb, index) => (
                                <tr
                                  key={fb.id}
                                  className={`
                                  hover:bg-gray-50 transition-colors duration-150
                                  ${index % 2 === 0 ? "bg-white" : "bg-gray-25"}
                                  ${
                                    isUpdating && selectedFeedback?.id === fb.id
                                      ? "opacity-50"
                                      : ""
                                  }
                                `}
                                >
                                  <td className="p-4 border-r border-gray-100">
                                    <div className="font-medium text-gray-900">
                                      {fb.actionPlan?.title}
                                    </div>
                                  </td>
                                  <td className="p-4 border-r border-gray-100">
                                    <div className="text-gray-700 break-words">
                                      {fb.task}
                                    </div>
                                  </td>
                                  <td className="p-4 border-r border-gray-100">
                                    <span
                                      className={`
                                      px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                                      ${
                                        fb.status === "selesai"
                                          ? "bg-green-100 text-green-800 border border-green-200"
                                          : fb.status === "proses"
                                          ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                          : "bg-gray-100 text-gray-800 border border-gray-200"
                                      }
                                    `}
                                    >
                                      {fb.status}
                                    </span>
                                  </td>
                                  <td className="p-4 border-r border-gray-100">
                                    <div className="text-gray-600">
                                      {fb.timestampProses ? (
                                        new Date(
                                          fb.timestampProses
                                        ).toLocaleString("id-ID")
                                      ) : (
                                        <span className="text-gray-400 italic">
                                          -
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-4 border-r border-gray-100">
                                    <div className="text-gray-600">
                                      {fb.timestampSelesai ? (
                                        new Date(
                                          fb.timestampSelesai
                                        ).toLocaleString("id-ID")
                                      ) : (
                                        <span className="text-gray-400 italic">
                                          -
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-4 text-right">
                                    {fb.status !== "selesai" ? (
                                      <Button
                                        size="sm"
                                        onClick={() => handleOpenConfirm(fb)}
                                        disabled={
                                          isUpdating &&
                                          selectedFeedback?.id === fb.id
                                        }
                                        className="
        bg-green-600 hover:bg-green-700 
        text-white font-medium
        px-4 py-2 rounded-md
        transition-all duration-200
        shadow-sm hover:shadow-md
        focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-2
      "
                                      >
                                        {isUpdating &&
                                        selectedFeedback?.id === fb.id ? (
                                          <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Processing...
                                          </>
                                        ) : (
                                          "Tandai Selesai"
                                        )}
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleOpenInfo(fb)}
                                        className="flex items-center gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
                                      >
                                        <Info className="w-4 h-4" />
                                        Info
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))}

                              {filteredFeedbacks.length === 0 && (
                                <tr>
                                  <td colSpan="6" className="p-8 text-center">
                                    <div className="flex flex-col items-center space-y-3">
                                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg
                                          className="w-8 h-8 text-gray-400"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                          />
                                        </svg>
                                      </div>
                                      <div className="text-gray-500 font-medium">
                                        {hasActiveFilters
                                          ? "Tidak ada feedback yang sesuai dengan filter"
                                          : "Belum ada feedback"}
                                      </div>
                                      <div className="text-gray-400 text-xs">
                                        {hasActiveFilters
                                          ? "Coba ubah atau hapus filter untuk melihat lebih banyak data"
                                          : "Feedback akan muncul di sini setelah ditambahkan"}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>

        {/* Modal Tambah Feedback */}
        <FeedbackFormModal
          actionPlans={actionPlans}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          isCreating={isCreating}
          selectedCabang={selectedCabang}
        />

        {/* Modal Konfirmasi Tandai Selesai */}
        <FeedbackModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          feedback={selectedFeedback}
          onConfirm={handleSelesai}
          isUpdating={isUpdating}
        />

        <FeedbackInfoModal
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          feedback={infoFeedback}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
