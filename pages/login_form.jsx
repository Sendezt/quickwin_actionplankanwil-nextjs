"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Respons bukan JSON: ${text}`);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      // Simpan token & user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const redirectPath = localStorage.getItem("redirectAfterLogin");

      localStorage.removeItem("redirectAfterLogin");

      // Redirect berdasarkan role
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 min-h-screen items-center justify-center bg-blue-50 dark:bg-gray-900 p-4",
        className
      )}
      {...props}
    >
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Kembali</span>
      </button>
      <Card className="overflow-hidden p-0 shadow-2xl w-full max-w-3xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 transition-all duration-300 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* === FORM LOGIN === */}
          <form onSubmit={handleSubmit} className="p-8 md:p-10 relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-2xl -z-10"></div>

            <FieldGroup>
              <div className="flex flex-col items-center gap-3 text-center mb-6">
                <img
                  src="/jasaraharja.png"
                  alt="Jasa Raharja Logo"
                  className="w-20 h-20 object-contain"
                />
                <h1 className="text-3xl font-bold text-blue-600">
                  Selamat Datang
                </h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Masuk ke akun Anda untuk melanjutkan
                </p>
              </div>

              {/* Username */}
              <Field>
                <FieldLabel
                  htmlFor="username"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Username
                </FieldLabel>
                <div className="relative group">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-4 pr-4 py-6 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:border-blue-300 dark:group-hover:border-blue-600"
                  />
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </FieldLabel>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-4 pr-12 py-6 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl transition-all duration-300 bg-white dark:bg-gray-800 group-hover:border-blue-300 dark:group-hover:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Field>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-lg animate-in slide-in-from-top-2 duration-300">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <span>Memproses...</span>
                      <span className="w-5 h-5 border-3 border-t-3 border-white border-t-transparent rounded-full animate-spin"></span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                    </>
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* === LOGO & DESKRIPSI === */}
          <div className="bg-blue-500 relative hidden md:flex flex-col items-center justify-center p-10 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Logo Placeholder - Ganti dengan logo asli */}
              <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/quickwin.png"
                  alt="QuickWin Jateng Logo"
                  className="w-50 h-50 object-contain"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white">
                  Quickwin Jateng
                </h2>
                <div className="h-1 w-24 bg-white/30 rounded-full mx-auto"></div>
              </div>

              {/* Description */}
              <div className="space-y-4 max-w-sm">
                {/* <p className="text-white/90 text-lg font-medium">
                  Sistem Informasi Manajemen Internal
                </p> */}
                <p className="text-white/70 text-sm leading-relaxed">
                  QuickWin Jateng adalah sistem informasi yang digunakan oleh
                  Kantor Wilayah Jasa Raharja Jawa Tengah untuk mengelola
                  evaluasi kinerja cabang dan samsat. Melalui fitur Feedback,
                  cabang dapat mengajukan perbaikan dan mengunggah bukti
                  pelaksanaan. Silakan login untuk mengelola feedback Anda.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center max-w-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <svg
          className="w-4 h-4 inline mr-2 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Aplikasi ini diperuntukkan bagi pegawai{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          PT Jasa Raharja
        </span>
        . Setiap aktivitas login akan tercatat untuk keperluan audit dan
        keamanan sistem.
      </FieldDescription>
    </div>
  );
}
