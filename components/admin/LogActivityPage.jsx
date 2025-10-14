// components\admin\LogActivityPage.jsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  Calendar,
  Activity,
  LogIn,
  Plus,
  Edit,
  Trash2,
  Building2,
  User,
  icons,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actionTypeConfig = {
  login: {
    label: "Login",
    color: "bg-green-100 text-green-700",
    icon: LogIn,
    category: "login",
  },
  create_feedback: {
    label: "Create Feedback",
    color: "bg-blue-100 text-blue-700",
    icon: Plus,
    category: "create",
  },
  create_cabang: {
    label: "Create cabang",
    color: "bg-blue-100 text-blue-700",
    icon: Plus,
    category: "create",
  },
  create_action_plan: {
    label: "Create Action Plan",
    color: "bg-blue-100 text-blue-700",
    icon: Plus,
    category: "create",
  },
  create_sub_action_plan: {
    label: "Create Sub Action Plan",
    color: "bg-blue-100 text-blue-700",
    icon: Plus,
    category: "create",
  },
  create_user: {
    label: "Create User",
    color: "bg-blue-100 text-blue-700",
    icon: Plus,
    category: "create",
  },
  edit_cabang: {
    label: "Edit Cabang",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  update_feedback: {
    label: "Edit Feedback",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  update_user: {
    label: "Edit User",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  update_action_plan: {
    label: "Edit Action Plan",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  update_sub_action_plan: {
    label: "Edit Sub Action Plan",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  update_cabang: {
    label: "Edit Cabang",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  ganti_file_feedback: {
    label: "Ganti File Feedback",
    color: "bg-purple-100 text-purple-700",
    icon: Edit,
    category: "edit",
  },
  selesaikan_feedback: {
    label: "Feedback Selesai",
    color: "bg-yellow-100 text-yellow-700",
    icon: CheckCheck,
    category: "complete",
  },
  delete_user: {
    label: "Delete User",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
  delete_action_plan: {
    label: "Delete Action Plan",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
  delete_sub_action_plan: {
    label: "Delete Sub Action Plan",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
  delete_cabang: {
    label: "Delete Cabang",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
  delete_feedback: {
    label: "Delete Feedback",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
  clear_feedback: {
    label: "Clear Feedback",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
    category: "delete",
  },
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const getBrowserName = (userAgent) => {
  if (!userAgent) return "Unknown";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  return "Unknown";
};

export default function LogActivityContent() {
  const [logs, setLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/logs/getLog"
        );
        const data = await res.json();
        if (data.success) {
          setLogs(data.data);
        } else {
          console.error("Gagal memuat data log");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.admin.cabang?.nama || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (filterType === "all") return matchesSearch;
    const actionConfig = actionTypeConfig[log.action];
    const matchesType = actionConfig && actionConfig.category === filterType;
    return matchesSearch && matchesType;
  });

  const stats = {
    login: logs.filter((log) => log.action === "login").length,
    create: logs.filter(
      (log) => actionTypeConfig[log.action]?.category === "create"
    ).length,
    edit: logs.filter(
      (log) => actionTypeConfig[log.action]?.category === "edit"
    ).length,
    delete: logs.filter(
      (log) => actionTypeConfig[log.action]?.category === "delete"
    ).length,
    complete: logs.filter(
      (log) => actionTypeConfig[log.action]?.category === "complete"
    ).length,
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Activity className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-3" />
        <p className="text-gray-600 font-medium">
          Memuat data log aktivitas...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {[
          { label: "Login", count: stats.login, color: "green", icon: LogIn },
          { label: "Create", count: stats.create, color: "blue", icon: Plus },
          { label: "Edit", count: stats.edit, color: "purple", icon: Edit },
          { label: "Delete", count: stats.delete, color: "red", icon: Trash2 },
          {
            label: "Complete",
            count: stats.complete,
            color: "yellow",
            icon: CheckCheck,
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </p>
                  <p
                    className={`text-3xl font-bold text-${item.color}-600 mt-2`}
                  >
                    {item.count}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total {item.label.toLowerCase()} activity
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Aktivitas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Log Aktivitas</h3>
              <p className="text-sm text-gray-600 mt-1">
                Riwayat login, create, edit, delete dan complete dalam sistem
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              <span className="font-medium">Export</span>
            </button>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari username, cabang, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">Semua Tipe</option>
              <option value="login">Login</option>
              <option value="create">Create</option>
              <option value="edit">Edit</option>
              <option value="delete">Delete</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>

        {/* Tabel Log */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Role & Cabang
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Aksi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Waktu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => {
                const actionConfig = actionTypeConfig[log.action] || {
                  label: log.action,
                  color: "bg-gray-100 text-gray-700",
                  icon: Activity,
                };
                const ActionIcon = actionConfig.icon;

                return (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                          {log.admin.username.substring(0, 2).toUpperCase()}
                        </div>
                        <p className="font-medium text-gray-900">
                          {log.admin.username}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {log.admin.role}
                          </span>
                        </div>
                        {log.admin.cabang && (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {log.admin.cabang.nama}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5",
                          actionConfig.color
                        )}
                      >
                        <ActionIcon className="w-3.5 h-3.5" />
                        {actionConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-md">
                        {log.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Browser: {getBrowserName(log.userAgent)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(log.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {log.ipAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-12 text-center">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">
              Tidak ada aktivitas ditemukan
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
