import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

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
          <div className="p-4 bg-blue-100 rounded-full">
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed">
          Silakan login dengan akun Anda untuk melanjutkan.
        </p>

        {/* Action Button */}
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/login" className="w-full">
            <Button className="w-full h-11 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white">
              Masuk ke Akun
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        {showBackButton && (
          <div className="pt-4">
            <Link
              href={backButtonHref}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
