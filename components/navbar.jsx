"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Bell, Search, LayoutDashboard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { data } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState(""); // 🔹 Tambah state role
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    const tokenValid = checkToken();
    setLoggedIn(tokenValid);

    if (tokenValid) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUsername(userData.username || "");
      setAvatarUrl(userData.avatar || "");
      setRole(userData.role || ""); // 🔹 Ambil role dari userData
    }

    const handleStorageChange = () => {
      const valid = checkToken();
      setLoggedIn(valid);
      if (valid) {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        setUsername(userData.username || "");
        setAvatarUrl(userData.avatar || "");
        setRole(userData.role || ""); // 🔹 Update role jika berubah
      } else {
        setUsername("");
        setAvatarUrl("");
        setRole("");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  };

  // Breadcrumbs
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

  // Search filter
  const extraPrograms = [
    { title: "Quickwin Jateng", url: "/quickwin-jateng" },
    { title: "Quickwin Kanwil", url: "/quickwin-kanwil" },
    { title: "Quickwin Cabang", url: "/quickwin-cabang" },
    { title: "Quickwin Samsat", url: "/quickwin-samsat" },
  ];

  const allProgramsFromSidebar = data.navMain.flatMap((item) =>
    item.items ? item.items : [item]
  );

  const allPrograms = [...allProgramsFromSidebar, ...extraPrograms];

  const filteredPrograms = query
    ? allPrograms.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(currentScrollY < lastScrollY || currentScrollY === 0);
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

      {/* Right: Search + Admin Button (conditional) + Avatar */}
      <div className="ml-auto flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari program..."
            className="w-64 pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filteredPrograms.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md border bg-white shadow-md z-50">
              {filteredPrograms.map((prog, idx) => (
                <Link
                  key={`${prog.title}-${prog.url}-${idx}`}
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

        {/* 🔹 Tampilkan tombol admin hanya jika role = Admin */}
        {loggedIn && role === "Admin" && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => router.push("/admindashboard")}
              >
                <LayoutDashboard className="h-6 w-6 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-sm">
              Ke Admin Dashboard
            </TooltipContent>
          </Tooltip>
        )}

        {/* Avatar User */}
        {loggedIn && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => router.push("/userdetail")}>
                <Avatar className="w-10 h-10 cursor-pointer">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="User Avatar" />
                  ) : (
                    <AvatarFallback>{getInitials(username)}</AvatarFallback>
                  )}
                </Avatar>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-sm">
              {username}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </header>
  );
}

export default Navbar;
