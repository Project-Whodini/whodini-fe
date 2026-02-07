"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSessionQuery } from "@/hooks/useDummyApi";

export function RequireSession({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isLoading } = useSessionQuery();

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      const redirect = pathname || "/dashboard";
      router.replace(`/auth?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isLoading, pathname, router, session]);

  if (!session) return null;
  return <>{children}</>;
}

