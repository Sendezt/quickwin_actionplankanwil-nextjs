import { useState } from "react";

export function useFeedbackFilters() {
  const [filterActionPlan, setFilterActionPlan] = useState("all");
  const [filterSubActionPlan, setFilterSubActionPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const getFilteredFeedbacks = (feedbacks, cabangId) => {
    let filtered = feedbacks.filter((fb) => fb.cabangId === cabangId);

    if (filterActionPlan && filterActionPlan !== "all") {
      filtered = filtered.filter(
        (fb) => fb.actionPlanId === parseInt(filterActionPlan)
      );
    }

    if (filterSubActionPlan && filterSubActionPlan !== "all") {
      filtered = filtered.filter(
        (fb) => fb.subActionPlanId === parseInt(filterSubActionPlan)
      );
    }

    if (filterStatus && filterStatus !== "all") {
      filtered = filtered.filter((fb) => fb.status === filterStatus);
    }

    return filtered;
  };

  const clearFilters = () => {
    setFilterActionPlan("all");
    setFilterSubActionPlan("all");
    setFilterStatus("all");
  };

  const hasActiveFilters =
    filterActionPlan !== "all" ||
    filterSubActionPlan !== "all" ||
    filterStatus !== "all";

  return {
    filterActionPlan,
    setFilterActionPlan,
    filterSubActionPlan,
    setFilterSubActionPlan,
    filterStatus,
    setFilterStatus,
    getFilteredFeedbacks,
    clearFilters,
    hasActiveFilters,
  };
}
