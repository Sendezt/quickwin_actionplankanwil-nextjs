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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardContent() {
  const router = useRouter();
  const [cabangCount, setCabangCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [actionPlanCount, setActionPlanCount] = useState(null);
  const [subActionPlanCount, setSubActionPlanCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [username, setUsername] = useState("");
  const [activities, setActivities] = useState([]);

  const stats = [
    {
      label: "Total Users",
      value: userCount ?? "Loading...",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Cabang Aktif",
      value: cabangCount ?? "Loading...",
      icon: Building2,
      color: "bg-green-500",
    },
    {
      label: "Action Plans",
      value: actionPlanCount ?? "Loading...",
      icon: ClipboardCheck,
      color: "bg-purple-500",
    },
    {
      label: "Sub Action Plan",
      value: subActionPlanCount ?? "Loading...",
      icon: ListTree,
      color: "bg-yellow-500",
    },
    {
      label: "Feedback",
      value: feedbackCount ?? "Loading...",
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  useEffect(() => {
    // 🔹 Ambil data cabang dari API
    const fetchCabang = async () => {
      try {
        const res = await fetch(
          "https://magangproject.vercel.app/api/cabang/read"
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setCabangCount(data.length);
        } else {
          console.error("Format data cabang tidak valid:", data);
        }
      } catch (error) {
        console.error("Gagal mengambil data cabang:", error);
      }
    };

    fetchCabang();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await fetch(
          "https://magangproject.vercel.app/api/admin/admin/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchActionPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await fetch(
          "https://magangproject.vercel.app/api/admin/actionplan/getActionPlan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const count = result?.data ? result.data.length : 0;
        setActionPlanCount(count);
      } catch (error) {
        console.error("Gagal mengambil data action plan:", error);
      }
    };

    fetchActionPlan();
  }, []);

  useEffect(() => {
    const fetchSubActionPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await fetch(
          "https://magangproject.vercel.app/api/admin/sub/getsub",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const count = result?.data ? result.data.length : 0;
        setSubActionPlanCount(count);
      } catch (error) {
        console.error("Gagal mengambil data action plan:", error);
      }
    };

    fetchSubActionPlan();
  }, []);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await fetch(
          "https://magangproject.vercel.app/api/admin/feedback/getalldata",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const count = result?.data ? result.data.length : 0;
        setFeedbackCount(count);
      } catch (error) {
        console.error("Gagal mengambil data action plan:", error);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "https://magangproject.vercel.app/api/logs/getLog",
          { headers: { Authorization: `Bearear ${token}` } }
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const sorted = result.data
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .slice(0, 5);

          setActivities(sorted);
        } else {
          setActivities([]);
        }
      } catch (error) {
        console.error("Gagal mengambil log aktivitas", error);
      }
    };
  });

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUsername(parsedUser.username || "");
      } catch (e) {
        console.error("Gagal parse user dari localStorage:", e);
      }
    }
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-3xl font-bold mb-2">
          Selamat Datang Kembali, {username}
        </h3>
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
              <div className="flex items-start mb-4">
                <div
                  className={`${stat.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
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
            <button
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/adminlogactivity")}
            >
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                Tidak ada aktivitas terbaru
              </p>
            ) : (
              activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {activity.admin?.username
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "??"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium">
                      <span className="font-semibold">
                        {activity.admin?.username || "Unknown"}
                      </span>{" "}
                      - {activity.description}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {timeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
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
