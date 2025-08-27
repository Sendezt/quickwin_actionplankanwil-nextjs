"use client";
import { Search, Filter } from "lucide-react";

export default function FeedbackFilters({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="all">Semua Status</option>
          <option value="proses">Dalam Proses</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>
    </div>
  );
}
