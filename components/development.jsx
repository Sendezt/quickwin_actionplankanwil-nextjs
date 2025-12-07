"use client";

import { useEffect, useState } from "react";

export function DevelopmentPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0A2A43" }}
    >
      <header className="pt-8 px-4 flex justify-center">
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <img
              src="/quickwin.png"
              alt="Logo Quickwin"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm mt-2" style={{ color: "#C9A042" }}>
            Quickwin Actionplan Kanwil Jawa Tengah
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20">
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  backgroundColor: "transparent",
                  border: "3px solid rgba(201, 160, 66, 0.2)",
                  borderTopColor: "#C9A042",
                }}
              />
              <div
                className="absolute inset-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: "rgba(201, 160, 66, 0.1)",
                }}
              />
            </div>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            style={{ color: "#FFFFFF" }}
          >
            Halaman ini sedang dalam proses pengembangan
          </h1>

          <p
            className="text-lg md:text-xl mb-8 leading-relaxed"
            style={{ color: "#FFFFFF", opacity: 0.9 }}
          >
            Terima kasih atas kesabaran dan pengertiannya. Kami sedang bekerja
            keras untuk menghadirkan sesuatu yang luar biasa untuk Anda.
          </p>

          <div
            className="inline-block px-6 py-3 rounded-lg mb-8"
            style={{
              backgroundColor: "rgba(201, 160, 66, 0.1)",
              borderLeft: "4px solid #C9A042",
            }}
          >
            <p style={{ color: "#C9A042" }} className="text-sm font-medium">
              🔨 Sedang dalam tahap konstruksi
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
            style={{ backgroundColor: "#C9A042", color: "0A2A43" }}
          >
            Kembali
          </button>
        </div>
      </main>
    </div>
  );
}
