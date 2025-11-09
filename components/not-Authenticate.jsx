"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function NotAuthenticatedPage({
  title = "Akses Terbatas",
  description = "Anda perlu login untuk mengakses halaman ini",
  showBackButton = true,
  backButtonHref = "/",
}) {
  const handleLoginClick = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6 mx-auto my-8 max-w-lg w-full text-center border border-gray-100">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-50 rounded-full">
          <Lock className="w-12 h-12 text-blue-600" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="text-md text-gray-500 mt-2">{description}</p>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-3">
        Silakan login dengan akun Anda untuk melanjutkan.
      </p>

      {/* Action Button */}
      <div className="w-full mt-5">
        <Link href="/login" className="w-full" onClick={handleLoginClick}>
          <Button className="w-full h-9 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
            Masuk ke Akun
          </Button>
        </Link>
      </div>

      {/* Back Link */}
      {showBackButton && (
        <div className="pt-3">
          <Link
            href={backButtonHref}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      )}
    </div>
  );
}
