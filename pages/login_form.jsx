"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://magangproject.vercel.app/api/login", {
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

      // Redirect berdasarkan role
      if (data.user.role === "Admin") {
        router.push("/admindashboard");
      } else if (data.user.role === "Kacab") {
        router.push("/feedback");
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
        "flex flex-col gap-6 min-h-screen items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0 shadow-lg w-full max-w-3xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* === FORM LOGIN === */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Selamat Datang</h1>
                <p className="text-muted-foreground text-balance">
                  Masuk ke akun Anda untuk melanjutkan
                </p>
              </div>

              {/* Username */}
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </Field>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              {/* Submit Button */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                >
                  {loading ? (
                    <>
                      <span>Memproses...</span>
                      <span className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* === GAMBAR SAMPING === */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/wilayah.jpg"
              alt="Login illustration"
              fill
              className="object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Aplikasi ini diperuntukkan bagi pegawai{" "}
        <span className="font-semibold">PT Jasa Raharja</span>. Setiap aktivitas
        login akan tercatat untuk keperluan audit dan keamanan sistem.
      </FieldDescription>
    </div>
  );
}
