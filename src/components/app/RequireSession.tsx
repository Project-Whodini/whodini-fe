"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSessionQuery } from "@/hooks/useDummyApi";

export function RequireSession({ children }: { children: React.ReactNode }) {
  // Allow disabling auth session via env variable
  const disableAuth =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isLoading } = useSessionQuery();

  useEffect(() => {
    if (disableAuth) return;
    if (isLoading) return;
    if (!session) {
      const redirect = pathname || "/dashboard";
      router.replace(`/auth?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [disableAuth, isLoading, pathname, router, session]);

  if (disableAuth) return <>{children}</>;
  if (!session) return null;
  return <>{children}</>;
}
