import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

/**
 * Komponen utama yang bisa digunakan secara langsung sebagai halaman
 * atau dipanggil dari komponen lain dengan props khusus.
 */
export default function NotAuthenticatedPage({
  title = "Akses Terbatas",
  description = "Anda perlu login untuk mengakses halaman ini",
  showBackButton = true,
  backButtonHref = "/",
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full">
            <Lock className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed">
          Silakan login dengan akun Anda untuk melanjutkan. Jika Anda belum
          memiliki akun, Anda dapat mendaftar terlebih dahulu.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/login" className="w-full">
            <Button className="w-full h-11 text-base font-semibold">
              Masuk ke Akun
            </Button>
          </Link>
          <Link href="/signup" className="w-full">
            <Button
              variant="outline"
              className="w-full h-11 text-base font-semibold bg-transparent"
            >
              Buat Akun Baru
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        {showBackButton && (
          <div className="pt-4">
            <Link
              href={backButtonHref}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
