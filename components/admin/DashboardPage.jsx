"use client";

import {
  TrendingUp,
  Users,
  Building2,
  ClipboardCheck,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ListTree,
} from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const stats = [
  {
    label: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    label: "Cabang Aktif",
    value: "48",
    change: "+3",
    trend: "up",
    icon: Building2,
    color: "bg-green-500",
  },
  {
    label: "Action Plans",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ClipboardCheck,
    color: "bg-purple-500",
  },
  {
    label: "Sub Action Plan",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ListTree,
    color: "bg-yellow-500",
  },
  {
    label: "Feedback",
    value: "89",
    change: "-2.4%",
    trend: "down",
    icon: Activity,
    color: "bg-orange-500",
  },
];

const recentActivities = [
  {
    user: "Ahmad Rizki",
    action: "menambahkan Action Plan baru",
    time: "5 menit yang lalu",
    avatar: "AR",
  },
  {
    user: "Siti Nurhaliza",
    action: "memberikan feedback",
    time: "15 menit yang lalu",
    avatar: "SN",
  },
  {
    user: "Budi Santoso",
    action: "memperbarui data cabang",
    time: "1 jam yang lalu",
    avatar: "BS",
  },
  {
    user: "Dewi Lestari",
    action: "menyelesaikan Sub Action Plan",
    time: "2 jam yang lalu",
    avatar: "DL",
  },
];

export function DashboardContent() {
  const router = useRouter();

  useEffect(() => {
    const decodeJwt = (token) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    };

    const removeAllTokens = () => {
      // Hapus dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");

      // Hapus dari cookie juga (jika ada)
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      console.log("🔒 Token dihapus dari localStorage dan cookie.");
    };

    const checkSession = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        removeAllTokens();
        router.push("/expiredpage");
        return;
      }

      const decoded = decodeJwt(token);
      if (!decoded || !decoded.exp) {
        removeAllTokens();
        router.push("/expiredpage");
        return;
      }

      const now = Date.now() / 1000; // detik
      if (decoded.exp < now) {
        removeAllTokens();
        router.push("/expiredpage");
      }
    };

    // 🔹 Cek saat halaman pertama kali dimuat
    checkSession();

    // 🔹 Cek ulang setiap 30 detik
    const interval = setInterval(checkSession, 30 * 1000);

    // Bersihkan interval saat komponen unmount
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-3xl font-bold mb-2">Selamat Datang Kembali!</h3>
        <p className="text-blue-100 text-lg">
          Kelola sistem admin Anda dengan mudah dan efisien
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`${stat.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h4>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Aktivitas & Aksi Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-gray-800">
              Aktivitas Terbaru
            </h4>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="text-xl font-bold text-gray-800 mb-6">Aksi Cepat</h4>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-all duration-200 hover:shadow-md">
              <ClipboardCheck className="w-5 h-5" />
              <span>Buat Action Plan</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition-all duration-200 hover:shadow-md">
              <Building2 className="w-5 h-5" />
              <span>Tambah Cabang</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium transition-all duration-200 hover:shadow-md">
              <Users className="w-5 h-5" />
              <span>Kelola User</span>
            </button>
            <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-medium transition-all duration-200 hover:shadow-md">
              <TrendingUp className="w-5 h-5" />
              <span>Lihat Laporan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
