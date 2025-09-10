"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginForm() {
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

      // Pastikan API membalas JSON
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Respons bukan JSON: ${text}`);
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login gagal");

      // ✅ Simpan token & user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Arahkan ke halaman admin
      router.push("/admindashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .login-theme {
          --background: #f3f8fc;
          --foreground: #0a2239;
          --card: #ffffff;
          --card-foreground: #0a2239;
          --primary: #0079c2; /* Biru Jasa Raharja */
          --primary-foreground: #ffffff;
          --secondary: #339dd9;
          --secondary-foreground: #ffffff;
          --muted: #e6f0f7;
          --muted-foreground: #4a6072;
          --accent: #0079c2;
          --accent-foreground: #ffffff;
          --border: #c9e2f2;
          --input: #ffffff;
          --ring: rgba(0, 121, 194, 0.5);
        }
      `}</style>

      <div className="login-theme min-h-screen flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-card border-border shadow-2xl w-full max-w-md">
          <CardHeader className="text-center space-y-4 pb-8">
            <Link href="/" className="block cursor-pointer">
              <div className="mx-auto mb-6">
                <img
                  src="/quickwin.png"
                  alt="QuickWin Logo"
                  className="w-30 h-30 mx-auto object-contain"
                />
              </div>

              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Selamat Datang
              </CardTitle>
              <CardDescription className="text-muted-foreground text-lg">
                Masuk ke akun Anda untuk melanjutkan
              </CardDescription>
            </Link>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 rounded-2xl border-2 border-border focus:border-primary focus:ring-primary bg-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-2xl border-2 border-border focus:border-primary focus:ring-primary bg-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold text-lg shadow-lg"
              >
                {loading ? "Memproses..." : "Masuk"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
