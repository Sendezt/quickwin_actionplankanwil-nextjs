import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchSubActionPlans } from "@/hooks/feedback/apifeedback";

export function FeedbackFilters({
  cabangNama,
  actionPlans,
  filterActionPlan,
  setFilterActionPlan,
  filterStatus,
  setFilterStatus,
  hasActiveFilters,
  clearFilters,
  onAddFeedback,
  isRefreshing,
  filterSubActionPlan,
  setFilterSubActionPlan,
}) {
  const [subActionPlans, setSubActionPlans] = useState([]);

  useEffect(() => {
    const loadSubs = async () => {
      const res = await fetchSubActionPlans();
      if (res.success) {
        setSubActionPlans(res.data);
      }
    };
    loadSubs();
  }, []);

  // ✅ filter subActionPlan sesuai actionPlan yang dipilih
  const filteredSubs =
    filterActionPlan && filterActionPlan !== "all"
      ? subActionPlans.filter(
          (sub) => sub.actionPlanId === Number(filterActionPlan)
        )
      : [];

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
      {/* Header dengan Badge */}
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          Filter {cabangNama}:
        </span>
        {hasActiveFilters && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {
              [
                filterActionPlan !== "all" ? "Action Plan" : null,
                filterSubActionPlan !== "all" ? "SubAction Plan" : null,
                filterStatus !== "all" ? "Status" : null,
              ].filter(Boolean).length
            }{" "}
            aktif
          </span>
        )}
      </div>

      {/* Filter Controls - Flex Wrap Layout */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter Action Plan */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Action Plan:
          </label>
          <Select
            value={filterActionPlan}
            onValueChange={(val) => {
              setFilterActionPlan(val);
              setFilterSubActionPlan("all"); // reset subaction jika actionplan ganti
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Semua Action Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Action Plan</SelectItem>
              {actionPlans.map((plan, index) => (
                <SelectItem key={plan.id} value={plan.id.toString()}>
                  {index + 1}. {plan.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* ✅ Filter SubActionPlan - akan wrap ke baris baru jika tidak cukup ruang */}
        {filterActionPlan !== "all" && filteredSubs.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              SubAction Plan:
            </label>
            <Select
              value={filterSubActionPlan}
              onValueChange={setFilterSubActionPlan}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Semua SubAction Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua SubAction Plan</SelectItem>
                {filteredSubs.map((sub, index) => (
                  <SelectItem key={sub.id} value={sub.id.toString()}>
                    {index + 1}. {sub.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Filter Status */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 whitespace-nowrap">
            Status:
          </label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="proses">Proses</SelectItem>
              <SelectItem value="selesai">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filter Button */}
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
    </div>
  );
}
