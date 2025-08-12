"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, Activity } from "lucide-react";

export default function NotFound() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const now = new Date().toLocaleString("id-ID");
    setTimestamp(now);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Header with Icon */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-slate-800">404</h1>
            <h2 className="text-2xl font-semibold text-slate-700">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau mungkin
              telah dipindahkan.
            </p>
          </div>
        </div>

        {/* Monitoring Status Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-slate-600">
                  Sistem Monitoring: Online
                </span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-slate-600">Status: Normal</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <div className="flex justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Kembali ke Dashboard</span>
            </Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-500 space-y-1">
          <p>Jika masalah berlanjut, silakan hubungi tim support.</p>
          <p>Error Code: 404 | Timestamp: {timestamp}</p>
        </div>
      </div>
    </div>
  );
}
