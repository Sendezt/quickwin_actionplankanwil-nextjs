import { Bell, Search, User, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

// ambil data sidebar
import { data } from "@/components/app-sidebar"; // pastikan export data di file app-sidebar.jsx

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // fungsi cari breadcrumb berdasarkan path
  const getBreadcrumbs = () => {
    for (const item of data.navMain) {
      if (item.url === pathname) {
        return [item];
      }
      if (item.items) {
        const sub = item.items.find((s) => s.url === pathname);
        if (sub) {
          return [item, sub];
        }
      }
    }
    return [{ title: "Dashboard", url: "/" }];
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShow(true);
      }
      if (currentScrollY > lastScrollY) {
        setShow(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 transform transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      } flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4`}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={bc.title}>
                <BreadcrumbItem>
                  {idx === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{bc.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={bc.url}>{bc.title}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program..."
            className="w-64 pl-8"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
