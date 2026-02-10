"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useBrandByDigitalIdQuery,
  useMySubscriptionsQuery,
  useSessionQuery,
  useSubscribeToBrandMutation,
} from "@/hooks/useDummyApi";
import { ArrowLeft, Bell, Check } from "lucide-react";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "B";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export function SubscribeClient({ digitalId }: { digitalId: string }) {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const brandQuery = useBrandByDigitalIdQuery(digitalId);
  const subs = useMySubscriptionsQuery(!!session);
  const subscribe = useSubscribeToBrandMutation();

  const brand = brandQuery.data;
  const isSubscribed = !!brand && !!subs.data?.some((s) => s.brandId === brand.id);

  if (brandQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-white/70">Loading…</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle>Brand not found</CardTitle>
              <CardDescription>Digital ID: {digitalId}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/brands">Browse Brands</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/">Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Button
          asChild
          variant="ghost"
          className="mb-8 px-0 text-white/90 hover:bg-white/10 hover:text-white"
        >
          <Link href="/brands">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </span>
          </Link>
        </Button>

        <div className="flex justify-center">
          <Card className="w-full max-w-3xl rounded-3xl border-white/10 bg-background shadow-2xl">
            <CardHeader className="space-y-3 pb-4 text-center">
              {/* Logo placeholder */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <span className="text-xl font-semibold text-muted-foreground">
                  {initials(brand.name)}
                </span>
              </div>

              <CardTitle className="text-3xl">{brand.name}</CardTitle>
              <CardDescription className="text-base">
                {brand.description ?? "Subscribe to receive promotional notifications"}
              </CardDescription>

              {brand.industry && (
                <div className="text-sm text-muted-foreground capitalize">{brand.industry}</div>
              )}
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl bg-muted/40 p-5">
                <div className="flex h-10 w-10 items-center justify-center">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-base font-semibold">Get exclusive notifications</div>
                  <div className="text-sm text-muted-foreground">Deals, updates, and promotions</div>
                </div>
              </div>

              {isSubscribed ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4" />
                    You’re subscribed
                  </div>
                  <Button asChild className="h-12 w-full rounded-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              ) : (
                <Button
                  className="h-12 w-full rounded-full"
                  disabled={subscribe.isPending}
                  onClick={async () => {
                    if (!session) {
                      router.push(
                        `/auth/personal?mode=signup&redirect=${encodeURIComponent(`/subscribe/${digitalId}`)}`
                      );
                      return;
                    }
                    await subscribe.mutateAsync(brand.id);
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              )}

              <div className="pt-1 text-center text-xs text-muted-foreground">
                Digital ID: <span className="font-mono">{brand.digitalId}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

