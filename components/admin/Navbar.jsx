  "use client";

  import React, { useEffect, useState } from "react";
  import { Menu } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip";
  import { useRouter } from "next/navigation";

  export default function Navbar({ toggleSidebar, title = "Admin Dashboard" }) {
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user?.username) {
        setUsername(user.username);
        setAvatarUrl(user.avatar || "");
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, []);

    const getInitials = (name) =>
      name ? name.substring(0, 2).toUpperCase() : "AD";

    return (
      <header className="bg-white border-b border-gray-200 px-8 py-4 shadow-sm">
        <div className="flex items-center">
          {/* Tombol toggle sidebar + judul */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
            <h2 className="text-2xl font-bold text-gray-800 flex-shrink-0">
              {title}
            </h2>
          </div>

          {/* Spacer agar avatar selalu di kanan */}
          <div className="flex-1" />

          {/* Avatar admin */}
          {loggedIn && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => router.push("/userdetail")}
                  className="flex items-center gap-3 flex-shrink-0"
                >
                  <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition">
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
