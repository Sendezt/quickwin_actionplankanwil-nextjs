"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home, Flame, Layers, MessagesSquare } from "lucide-react";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu data
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
        { title: "OPSGAB", url: "/404" },
        { title: "SOWAN", url: "/404" },
        { title: "OK DEALER!", url: "/404" },
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
        { title: "Keterisian Data Valid", url: "/keterisian-data" }, // index 4
        { title: "Sosialisasi Kesamsatan", url: "/sosialisasi-kesamsatan" },
        {
          title: "SIGNAL & ONLINE", // index 6
          url: "/optimalisasi-signal-layanan-online",
        },
        { title: "Merchant", url: "/kolaborasi-merchant" },
        { title: "Komitmen Stakeholder", url: "/komitmen-stakeholder" },
        { title: "SIGAP Prioritas", url: "/sigap-prioritas" },
        { title: "SIGAP Instansi", url: "/sigap-instansi" },
        { title: "WA Blast", url: "/wa-blast" },
        { title: "Pendataan Terlibat Laka", url: "/pendataan-laka" }, // index 12
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // render versi "kosong" dulu biar sama dengan SSR
    return null;
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 p-4">
          <Link href="/" className="flex flex-col items-center">
            {/* Logo */}
            <div className="h-24 w-24 flex items-center justify-center rounded-2xl bg-white shadow-md border border-gray-200">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

            {/* Judul di bawah logo */}
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
                                        {subItem.icon && (
                                          <subItem.icon className="size-4" />
                                        )}
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
      <SidebarRail />
    </Sidebar>
  );
}
