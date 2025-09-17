// "use client";
// import { Search, Filter } from "lucide-react";

// export default function FeedbackFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-4">
//       {/* Search */}
//       <div className="flex-1 relative">
//         <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Cari feedback..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//         />
//       </div>

//       {/* Status Filter */}
//       <div className="flex items-center gap-2">
//         <Filter className="w-5 h-5 text-gray-400" />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//         >
//           <option value="all">Semua Status</option>
//           <option value="proses">Dalam Proses</option>
//           <option value="selesai">Selesai</option>
//         </select>
//       </div>
//     </div>
//   );
// }

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Filter {cabangNama}:
            </span>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {[
                  filterActionPlan !== "all" ? "Action Plan" : null,
                  filterStatus !== "all" ? "Status" : null,
                ].filter(Boolean).length}{" "}
                aktif
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              Action Plan:
            </label>
            <Select value={filterActionPlan} onValueChange={setFilterActionPlan}>
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

        {/* <div className="flex-shrink-0">
          <Button
            className="bg-blue-500 hover:bg-blue-600 transition-all duration-200"
            onClick={onAddFeedback}
            disabled={isRefreshing}
          >
            Tambah Feedback
          </Button>
        </div> */}
      </div>
    </div>
  );
}
