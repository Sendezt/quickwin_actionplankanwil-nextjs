// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Quickwin ActionPlan Kanwil Jateng",
  description:
    "Platform digital untuk mengelola, memantau, dan mengevaluasi Quickwin Action Plan pada Kantor Wilayah Jawa Tengah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
