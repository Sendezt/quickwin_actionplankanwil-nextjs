import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function SessionExpiredAlert({ loginHref = "/login" }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <Alert variant="destructive" className="text-left">
          <AlertTitle>Sesi Berakhir</AlertTitle>
          <AlertDescription>
            Token sesi Anda telah kedaluwarsa. Demi keamanan, silakan masuk
            kembali untuk melanjutkan.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href={loginHref}>Masuk lagi</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Kembali ke beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
