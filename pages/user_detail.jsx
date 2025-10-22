"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Building2,
  Calendar,
  MapPin,
  ArrowLeft,
  LogOut,
} from "lucide-react";

export default function UserDetailPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
          throw new Error("User belum login");
        }

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.id;

        const response = await fetch(
          `https://quickwin-jateng.vercel.app/api/admin/admin/getuser/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Gagal mengambil data user (${response.status})`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (username) => {
    return username?.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/"); // redirect ke halaman root
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-12 w-64" />
          <Card>
            <CardHeader>
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12">
        <div className="mx-auto max-w-4xl">
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Error</CardTitle>
              <CardDescription>
                {error || "Gagal memuat data user"}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Tombol Kembali */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground">
            Detail User
          </h1>
          <p className="mt-2 text-muted-foreground">
            Informasi lengkap akun pengguna yang sedang login
          </p>
        </div>

        {/* Card detail user */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-8">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                  {getInitials(userData.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <CardTitle className="text-3xl font-bold text-foreground">
                  {userData.username}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="text-sm font-medium">
                    {userData.role}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    ID: {userData.id}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Informasi user & cabang */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <User className="h-5 w-5 text-primary" />
                  Informasi Akun
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Username
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {userData.username}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Role</span>
                    <span className="text-sm font-medium text-foreground">
                      {userData.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      User ID
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      #{userData.id}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Building2 className="h-5 w-5 text-primary" />
                  Informasi Cabang
                </h3>
                <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Nama Cabang
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {userData.cabang?.nama || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Cabang ID
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      #{userData.cabangId || userData.cabang?.id}
                    </span>
                  </div>
                  <div className="flex items-start justify-between">
                    <span className="text-sm text-muted-foreground">
                      Lokasi
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                      <MapPin className="h-3 w-3" />
                      {userData.cabang?.nama || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Riwayat waktu */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Calendar className="h-5 w-5 text-primary" />
                Riwayat Waktu
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Akun Dibuat</p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {formatDate(userData.createdAt)}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Cabang Dibuat</p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    {formatDate(userData.cabang?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tombol Logout di bawah Card */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-lg bg-destructive px-4 py-3 text-sm font-semibold text-white shadow hover:bg-destructive/90"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
