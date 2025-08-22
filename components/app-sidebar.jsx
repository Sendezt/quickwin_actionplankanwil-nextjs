"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Home,
  Settings,
  Users,
  FileText,
} from "lucide-react";

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
      items: [
        { title: "SENGKUYUNG", url: "/sengkuyung" },
        { title: "PROMITRA", url: "/404" },
        { title: "OPSGAB", url: "/404" },
        { title: "SOWAN", url: "/404" },
        { title: "OK DEALER!", url: "/404" },
      ],
    },
    {
      title: "Action Plan Pusat",
      url: "/",
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
  ],
};

export function AppSidebar(props) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center gap-2">
                <div className="h-8 aspect-[4/3]">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-full w-full object-contain rounded-md"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Dashboard Jasa Raharja
                  </span>
                  <span className="truncate text-xs">
                    Monitoring Jasa Raharja
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
                              {item.items.map((subItem) => {
                                const isSubActive = pathname.startsWith(
                                  subItem.url
                                );
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton
                                      asChild
                                      className={`hover:bg-gray-500 hover:text-white ${
                                        isSubActive
                                          ? "bg-gray-700 text-white"
                                          : ""
                                      }`}
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="rounded-lg">AU</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
