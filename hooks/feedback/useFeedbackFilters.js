import { useState } from "react";

export function useFeedbackFilters() {
  const [filterActionPlan, setFilterActionPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getFilteredFeedbacks = (feedbacks, cabangId) => {
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

  const clearFilters = () => {
    setFilterActionPlan("all");
    setFilterStatus("all");
  };

  const hasActiveFilters = filterActionPlan !== "all" || filterStatus !== "all";

  return {
    filterActionPlan,
    setFilterActionPlan,
    filterStatus,
    setFilterStatus,
    getFilteredFeedbacks,
    clearFilters,
    hasActiveFilters,
  };
}