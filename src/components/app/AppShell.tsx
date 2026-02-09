"use client";

import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/app/AppHeader";
import path from "path";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  // Keep certain screens clean (they render their own header).
  const hideHeader =
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/brands") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/subscribe") ||
    pathname.startsWith("/join") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {/* {!hideHeader && <AppHeader />} */}
      {children}
    </>
  );
}
