"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { currentStudent } from "@/lib/data";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export function Header({ title, onMenuClick, sidebarOpen }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {title && (
          <h2 className="text-lg font-semibold text-foreground lg:hidden">{title}</h2>
        )}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-48 rounded-lg border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 lg:w-64"
            />
          </div>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setNotificationsOpen(true)}
            className="relative rounded-lg p-2 text-muted transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <Link
            href="/profile"
            className="flex items-center gap-3 border-l border-border pl-3 sm:pl-4"
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">{currentStudent.name}</p>
              <p className="text-xs text-muted">{currentStudent.semester}</p>
            </div>
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                "bg-gradient-to-br from-teal-600 to-teal-800 text-sm font-semibold text-white"
              )}
            >
              {currentStudent.avatar}
            </div>
          </Link>
        </div>
      </header>

      <NotificationCenter
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </>
  );
}
