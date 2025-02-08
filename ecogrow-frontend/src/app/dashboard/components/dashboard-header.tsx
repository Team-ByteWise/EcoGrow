"use client";

import { Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useUser } from "../context/UserContext";

export function DashboardHeader() {
  const { username, tokens } = useUser();
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  })();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <h2 className="text-lg font-semibold hidden md:block">
            {greeting}, {username}! 👋
          </h2>

          <div className="flex items-center gap-6">
            <Link
              href="/leaderboard"
              className="hidden md:block text-green-600 hover:text-green-700 font-medium text-lg"
            >
              Leaderboard
            </Link>
            <div className="hidden md:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="text-green-700">🌱</span>
              <span className="font-medium text-lg">{tokens} Tokens</span>
              <Link href="/ad"><Button variant="ghost" size="sm" className="h-7 text-green-700">
                Earn More
              </Button></Link>
              
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-4">
                  <p className="text-sm font-medium">Notifications</p>
                  <Badge variant="secondary">3 New</Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-sm">You planted 3 trees this week! 🌳</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <p className="text-sm">
                    New achievement unlocked: Forest Guardian 🏆
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 mt-2 p-4 bg-green-50 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{greeting}, Aniket! 👋</h2>
            <Link href="/leaderboard" className="text-green-600 font-medium">
              Leaderboard
            </Link>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <span className="text-green-700">🌱</span>
              <span className="font-medium">1,234 Tokens</span>
              <Button variant="ghost" size="sm" className="h-7 text-green-700">
                Earn More
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
