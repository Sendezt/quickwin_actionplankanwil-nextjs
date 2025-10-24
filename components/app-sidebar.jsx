"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  Flame,
  Layers,
  MessagesSquare,
  LogIn,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

export const data = {
  user: {
    name: "Admin User",
    email: "admin@jateng.go.id",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Quickwin Jateng",
      url: "/",
      icon: Flame,
      items: [
        { title: "SENGKUYUNG", url: "/sengkuyung" },
        { title: "PROMITRA", url: "/404" },
      ],
    },
    {
      title: "Action Plan",
      url: "/",
      icon: Layers,
      items: [
        { title: "Implementasi UU HKPD", url: "/implementasi-uu-hkpd" },
        { title: "Kebijakan Relaksasi", url: "/kebijakan-relaksasi" },
        { title: "Operasi Gabungan", url: "/operasi-gabungan" },
        { title: "Rekonsiliasi Data", url: "/rekonsiliasi-data" },
        { title: "Keterisian Data Valid", url: "/keterisian-data" },
        { title: "Sosialisasi Kesamsatan", url: "/sosialisasi-kesamsatan" },
        {
          title: "SIGNAL & ONLINE",
          url: "/optimalisasi-signal-layanan-online",
        },
        { title: "Merchant", url: "/kolaborasi-merchant" },
        { title: "Komitmen Stakeholder", url: "/komitmen-stakeholder" },
        { title: "SIGAP Prioritas", url: "/sigap-prioritas" },
        { title: "SIGAP Instansi", url: "/sigap-instansi" },
        { title: "WA Blast", url: "/wa-blast" },
        { title: "Pendataan Terlibat Laka", url: "/pendataan-laka" },
      ].map((item, index) => ({
        ...item,
        title: `${index + 1}. ${item.title}`,
      })),
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: MessagesSquare,
    },
  ],
};

export function AppSidebar(props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();

  // fungsi cek token valid
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decoded = JSON.parse(jsonPayload);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  };

  // hapus token & user
  const clearAuthData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTokenValid(false);
    console.log("🔴 Token expired, data dihapus dari localStorage");
  };

  useEffect(() => {
    setMounted(true);

    // set state saat mount
    const valid = checkToken();
    setTokenValid(valid);

    // interval cek token kadaluarsa tiap 30 detik
    const interval = setInterval(() => {
      const stillValid = checkToken();
      if (!stillValid) {
        clearAuthData();
      } else {
        setTokenValid(true);
      }
    }, 30000);

    // sinkron antar-tab
    const handleStorageChange = () => {
      const valid = checkToken();
      if (!valid) clearAuthData();
      setTokenValid(valid);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    clearAuthData();
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 p-4">
          <Link href="/" className="flex flex-col items-center">
            <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-200">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="text-center mt-1">
              <span className="block font-bold text-gray-900 text-md">
                QuickWin
              </span>
              <span className="block text-xs text-gray-600">
                ACTION PLAN KANWIL JATENG
              </span>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => {
                const isDashboardActive = item.url === "/" && pathname === "/";
                const isParentActive =
                  item.items?.some((sub) => pathname.startsWith(sub.url)) ||
                  (item.url !== "/" && pathname.startsWith(item.url));

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.items ? (
                      <Collapsible
                        asChild
                        defaultOpen={item.items.some((sub) =>
                          pathname.startsWith(sub.url)
                        )}
                      >
                        <div>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              className={`hover:bg-gray-800 hover:text-white ${
                                isParentActive ? "bg-gray-700 text-white" : ""
                              }`}
                            >
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((subItem, index) => {
                                const isSubActive = pathname.startsWith(
                                  subItem.url
                                );
                                const merahTitles = [
                                  "Keterisian Data Valid",
                                  "SIGNAL & ONLINE",
                                  "Pendataan Terlibat Laka",
                                ];
                                const isMerah = merahTitles.some((t) =>
                                  subItem.title.includes(t)
                                );

                                return (
                                  <SidebarMenuSubItem
                                    key={subItem.url + "-" + index}
                                  >
                                    <SidebarMenuSubButton
                                      asChild
                                      className={
                                        isMerah
                                          ? isSubActive
                                            ? "bg-red-600 text-white hover:bg-red-700 hover:text-white"
                                            : "text-red-600 hover:text-red-700"
                                          : isSubActive
                                          ? "bg-gray-700 text-white hover:bg-gray-800 hover:text-white"
                                          : "hover:bg-gray-500 hover:text-white"
                                      }
                                    >
                                      <a href={subItem.url}>
                                        <span>{subItem.title}</span>
                                      </a>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                );
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        tooltip={item.title}
                        asChild
                        className={`hover:bg-gray-700 hover:text-white ${
                          isDashboardActive ? "bg-gray-700 text-white" : ""
                        }`}
                      >
                        <a href={item.url}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer login/logout */}
      <SidebarFooter className="p-4 border-t border-gray-200">
        {tokenValid ? (
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Link href="/login" className="w-full">
            <Button
              variant="default"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
