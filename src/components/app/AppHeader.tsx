"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSessionQuery, useSetActiveRoleMutation, useSignOutMutation } from "@/hooks/useDummyApi";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "U";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const setRole = useSetActiveRoleMutation();
  const signOut = useSignOutMutation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost">
            <Link href="/">Whodini</Link>
          </Button>
          <div className="hidden text-sm text-muted-foreground md:block">
            Workflow prototype
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!session ? (
            <Button asChild>
              <Link href={`/auth?redirect=${encodeURIComponent(pathname || "/dashboard")}`}>Sign in</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{initials(session.displayName)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{session.displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-1">
                  <div className="text-sm font-medium">{session.displayName}</div>
                  <div className="text-xs font-normal text-muted-foreground">{session.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuLabel className="text-xs text-muted-foreground">Switch role</DropdownMenuLabel>
                {session.roles.map((r, idx) => (
                  <DropdownMenuItem
                    key={`${r.accountType}:${r.accountId}`}
                    onClick={async () => {
                      await setRole.mutateAsync(idx);
                      // Minimal UX: always route to the corresponding dashboard root
                      const next =
                        r.accountType === "business"
                          ? "/business"
                          : r.accountType === "community"
                            ? "/community"
                            : r.accountType === "organizer"
                              ? "/organizer"
                              : r.accountType === "agency"
                                ? "/agency"
                                : "/dashboard";
                      router.push(next);
                    }}
                  >
                    <span className="flex-1">
                      {idx === session.activeRoleIndex ? "✓ " : ""}
                      {r.label}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize">{r.accountType}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={async () => {
                    await signOut.mutateAsync();
                    router.push("/");
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}

