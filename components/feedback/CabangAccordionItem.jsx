import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FeedbackFilters } from "./FeedbackFilters";
import { FeedbackTable } from "./FeedbackTable";

export function CabangAccordionItem({
  cabang,
  filteredFeedbacks,
  totalFeedbacks,
  hasActiveFilters,
  actionPlans,
  filterActionPlan,
  setFilterActionPlan,
  filterSubActionPlan,
  setFilterSubActionPlan,
  filterStatus,
  setFilterStatus,
  clearFilters,
  onAddFeedback,
  onSelesai,
  onInfo,
  isRefreshing,
  isUpdating,
  selectedFeedbackId,
  setOpenCabang, // ✅ terima di sini
  userCabangId,
}) {
  return (
    <AccordionItem key={cabang.id} value={`cabang-${cabang.id}`}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3">
          <span>{cabang.nama}</span>
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
        <FeedbackFilters
          cabangNama={cabang.nama}
          actionPlans={actionPlans}
          filterActionPlan={filterActionPlan}
          setFilterActionPlan={setFilterActionPlan}
          filterSubActionPlan={filterSubActionPlan}
          setFilterSubActionPlan={setFilterSubActionPlan}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
          onAddFeedback={() => onAddFeedback(cabang)}
          isRefreshing={isRefreshing}
        />
        <FeedbackTable
          feedbacks={filteredFeedbacks}
          hasActiveFilters={hasActiveFilters}
          totalFeedbacks={totalFeedbacks}
          onSelesai={onSelesai}
          onInfo={onInfo}
          isUpdating={isUpdating}
          selectedFeedbackId={selectedFeedbackId}
          userCabangId={userCabangId}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
