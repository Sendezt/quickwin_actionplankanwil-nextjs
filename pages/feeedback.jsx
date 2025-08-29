"use client";
import { useState, useEffect } from "react";
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
import FeedbackFormModal from "@/components/feedback/FeedbackFormModal";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [actionPlans, setActionPlans] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // state untuk modal tambah feedback
  const [showModal, setShowModal] = useState(false);
  const [selectedCabang, setSelectedCabang] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setFeedbacks(await fetchFeedbacks());
    setCabangs((await fetchCabangs()) || []);
    setActionPlans((await fetchActionPlans()) || []);
  };

  const handleOpenModal = (cabang) => {
    setSelectedCabang(cabang);
    setShowModal(true);
  };

  const handleCreate = async ({ actionPlanId, task, resetForm }) => {
    if (!selectedCabang || !task || !actionPlanId) return;

    setIsCreating(true);
    await createFeedback({
      task,
      cabangId: Number(selectedCabang.id),
      actionPlanId: Number(actionPlanId),
    });
    setIsCreating(false);
    setShowModal(false);
    resetForm();
    loadData();
  };

  const handleSelesai = async (id) => {
    await updateFeedbackStatus(id);
    loadData();
  };

  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Feedback Management</h1>

          <Accordion type="single" collapsible className="w-full">
            {cabangs.map((cabang) => (
              <AccordionItem key={cabang.id} value={`cabang-${cabang.id}`}>
                <AccordionTrigger>{cabang.nama}</AccordionTrigger>
                <AccordionContent>
                  {/* Button Tambah */}
                  <div className="flex justify-end mb-3">
                    <Button onClick={() => handleOpenModal(cabang)}>
                      Tambah Feedback
                    </Button>
                  </div>

                  {/* Tabel Feedback */}
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Task</th>
                          <th className="p-2 text-left">Action Plan</th>
                          <th className="p-2 text-left">Status</th>
                          <th className="p-2 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedbacks
                          .filter((fb) => fb.cabangId === cabang.id)
                          .map((fb) => (
                            <tr key={fb.id} className="border-t">
                              <td className="p-2">{fb.task}</td>
                              <td className="p-2">{fb.actionPlan?.title}</td>
                              <td className="p-2">{fb.status}</td>
                              <td className="p-2 text-right">
                                {fb.status !== "selesai" && (
                                  <Button
                                    size="sm"
                                    onClick={() => handleSelesai(fb.id)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Tandai Selesai
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}

                        {feedbacks.filter((fb) => fb.cabangId === cabang.id)
                          .length === 0 && (
                          <tr>
                            <td
                              colSpan="4"
                              className="p-3 text-center text-gray-500"
                            >
                              Belum ada feedback.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Modal Tambah Feedback */}
        <FeedbackFormModal
          cabangs={cabangs}
          actionPlans={actionPlans}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
          isCreating={isCreating}
          selectedCabang={selectedCabang} // ⬅️ tambahan prop
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
