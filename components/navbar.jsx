import { Bell, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { data } from "@/components/app-sidebar"; // ambil data menu

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  // cari breadcrumbs
  const getBreadcrumbs = () => {
    for (const item of data.navMain) {
      if (item.url === pathname) return [item];
      if (item.items) {
        const sub = item.items.find((s) => s.url === pathname);
        if (sub) return [item, sub];
      }
    }
    const currentPage = pathname.split("/").filter(Boolean).pop();
    return [
      { title: "Dashboard", url: "/" },
      {
        title: currentPage ? currentPage.replace(/-/g, " ") : "Halaman",
        url: pathname,
      },
    ];
  };
  const breadcrumbs = getBreadcrumbs();

  // ambil semua program untuk search
  const allPrograms = data.navMain.flatMap((item) =>
    item.items ? item.items : [item]
  );

  const filteredPrograms = query
    ? allPrograms.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) setShow(true);
      if (currentScrollY > lastScrollY) setShow(false);
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
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={bc.title}>
                <BreadcrumbItem>
                  {idx === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="uppercase">
                      {bc.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={bc.url} className="uppercase">
                      {bc.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Search */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program..."
            className="w-64 pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Dropdown hasil pencarian */}
          {filteredPrograms.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50">
              {filteredPrograms.map((prog, idx) => (
                <Link
                  key={`${prog.url}-${prog.title}-${idx}`}
                  href={prog.url}
                  className="block px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setQuery("")}
                >
                  {prog.title.toUpperCase()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
