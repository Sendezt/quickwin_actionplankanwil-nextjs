"use client";
import { useState, useEffect } from "react";
// Removed useRouter import - using browser API instead
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useFeedbackData } from "@/hooks/feedback/useFeedbackData";
import { useFeedbackFilters } from "@/hooks/feedback/useFeedbackFilters";
import { useFeedbackActions } from "@/hooks/feedback/useFeedbackActions";

import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";
import { CabangAccordionItem } from "@/components/feedback/CabangAccordionItem";
import FeedbackFormModal from "@/components/feedback/FeedbackFormModal";
import FeedbackModal from "@/components/feedback/FeedbackModal";
import FeedbackInfoModal from "@/components/feedback/FeedbackInfoModal";

export default function FeedbackPage() {
  // ✅ Get cabangId from URL using browser API
  const [cabangIdFromUrl, setCabangIdFromUrl] = useState(null);

  const { feedbacks, cabangs, actionPlans, isLoading, isRefreshing, loadData } =
    useFeedbackData();
  const {
    filterActionPlan,
    setFilterActionPlan,
    filterStatus,
    setFilterStatus,
    getFilteredFeedbacks,
    clearFilters,
    hasActiveFilters,
  } = useFeedbackFilters();
  const { isCreating, isUpdating, handleCreate, handleSelesai } =
    useFeedbackActions(loadData);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoFeedback, setInfoFeedback] = useState(null);

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Open Cabang
  const [openCabang, setOpenCabang] = useState(null);

  // ✅ Extract cabangId from URL on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const cabangId = urlParams.get("cabangId");
      setCabangIdFromUrl(cabangId);
    }
  }, []);

  // ✅ Auto-open accordion berdasarkan cabangId dari URL
  useEffect(() => {
    if (cabangIdFromUrl && cabangs.length > 0) {
      // Cari cabang berdasarkan ID
      const targetCabang = cabangs.find(
        (cabang) => cabang.id === parseInt(cabangIdFromUrl)
      );

      if (targetCabang) {
        // Set accordion terbuka untuk cabang tersebut
        setOpenCabang(`cabang-${cabangIdFromUrl}`);

        // Optional: Scroll ke accordion yang terbuka setelah render
        setTimeout(() => {
          const accordionElement = document.querySelector(
            `[data-accordion-item="cabang-${cabangIdFromUrl}"]`
          );
          if (accordionElement) {
            accordionElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);

        // Clear URL parameter setelah accordion terbuka
        if (typeof window !== "undefined") {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, "", newUrl);
        }
      }
    }
  }, [cabangIdFromUrl, cabangs]);

  // ✅ Clear URL params after accordion is opened (optional)
  useEffect(() => {
    if (openCabang && cabangIdFromUrl) {
      // Hapus cabangId dari URL setelah accordion terbuka
      // untuk mencegah auto-open lagi saat refresh
      if (typeof window !== "undefined") {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        setCabangIdFromUrl(null); // Reset state
      }
    }
  }, [openCabang, cabangIdFromUrl]);

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setUserInfo(null);
        return;
      }

      try {
        // Decode JWT to check if it's expired
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setUserInfo(null);
          return;
        }

        setIsLoggedIn(true);
        setUserInfo(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    checkAuthStatus();

    // Check auth status every 30 seconds
    const interval = setInterval(checkAuthStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (cabang) => {
    setSelectedCabang(cabang);
    setShowModal(true);
  };

  const handleTambahFeedbackClick = () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }
    setShowModal(true);
  };

  const handleGoToLogin = () => {
    // Redirect to login page
    window.location.href = "/login"; // Adjust path as needed
    // Or use Next.js router if available:
    // router.push("/login");
  };

  const handleFormSubmit = async (formData) => {
    const success = await handleCreate({ ...formData, selectedCabang });
    if (success) {
      setShowModal(false);
    }
  };

  const handleOpenConfirm = (feedback) => {
    setSelectedFeedback(feedback);
    setConfirmOpen(true);
  };

  const handleConfirmSelesai = async () => {
    if (!selectedFeedback) return;
    const success = await handleSelesai(selectedFeedback.id);
    if (success) {
      setConfirmOpen(false);
      setSelectedFeedback(null);
    }
  };

  const handleOpenInfo = (feedback) => {
    setInfoFeedback(feedback);
    setInfoOpen(true);
  };

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
          <div className="mb-6">
            {/* Judul di baris pertama */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Feedback Management</h1>

              {/* User info display */}
              {isLoggedIn && userInfo && (
                <div className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  <span className="font-medium">{userInfo.username}</span>
                  <span className="mx-1">•</span>
                  <span>{userInfo.role}</span>
                </div>
              )}
            </div>

            {/* Tombol di baris kedua, rata kanan */}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => loadData(true)}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <Loader2
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>

              <Button
                className={`transition-all duration-200 flex items-center gap-2 ${
                  isLoggedIn
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
                onClick={handleTambahFeedbackClick}
                disabled={isRefreshing}
              >
                {!isLoggedIn && <LogIn className="w-4 h-4" />}
                Tambah Feedback
              </Button>
            </div>

            {/* Login status indicator */}
            {!isLoggedIn && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Anda belum login. Silakan login untuk menambah feedback.
                  </span>
                </div>
              </div>
            )}
          </div>

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
              <Accordion
                type="single"
                collapsible
                value={openCabang}
                onValueChange={setOpenCabang}
                className="w-full"
              >
                {cabangs.map((cabang) => {
                  const filteredFeedbacks = getFilteredFeedbacks(
                    feedbacks,
                    cabang.id
                  );
                  const totalFeedbacks = feedbacks.filter(
                    (fb) => fb.cabangId === cabang.id
                  ).length;

                  return (
                    <CabangAccordionItem
                      key={cabang.id}
                      cabang={cabang}
                      filteredFeedbacks={filteredFeedbacks}
                      totalFeedbacks={totalFeedbacks}
                      hasActiveFilters={hasActiveFilters}
                      actionPlans={actionPlans}
                      filterActionPlan={filterActionPlan}
                      setFilterActionPlan={setFilterActionPlan}
                      filterStatus={filterStatus}
                      setFilterStatus={setFilterStatus}
                      clearFilters={clearFilters}
                      onAddFeedback={handleOpenModal}
                      onSelesai={handleOpenConfirm}
                      onInfo={(feedback) => {
                        setOpenCabang(`cabang-${cabang.id}`);
                        handleOpenInfo(feedback);
                      }}
                      isRefreshing={isRefreshing}
                      isUpdating={isUpdating}
                      selectedFeedbackId={selectedFeedback?.id}
                      isLoggedIn={isLoggedIn}
                    />
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>

        {/* Feedback Form Modal - only show if logged in */}
        {isLoggedIn && (
          <FeedbackFormModal
            actionPlans={actionPlans}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleFormSubmit}
            isCreating={isCreating}
            selectedCabang={selectedCabang}
          />
        )}

        {/* Login Alert Dialog */}
        <Dialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Login Diperlukan
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Anda harus login terlebih dahulu untuk dapat menambahkan
                feedback. Silakan login dengan akun Anda untuk melanjutkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLoginAlert(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleGoToLogin}
                className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Ke Halaman Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <FeedbackModal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          feedback={selectedFeedback}
          onConfirm={handleConfirmSelesai}
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
