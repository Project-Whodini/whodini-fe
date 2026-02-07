"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBrandsQuery, useMySubscriptionsQuery, useSessionQuery, useSubscribeToBrandMutation } from "@/hooks/useDummyApi";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building2, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function BrandsPage() {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const brands = useBrandsQuery();
  const subs = useMySubscriptionsQuery(!!session);
  const subscribe = useSubscribeToBrandMutation();

  const subscribedBrandIds = new Set(subs.data?.map((s) => s.brandId) ?? []);

  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  const industries = useMemo(() => {
    const set = new Set<string>();
    (brands.data ?? []).forEach((b) => {
      if (b.industry) set.add(b.industry);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [brands.data]);

  const filteredBrands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (brands.data ?? []).filter((b) => {
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        (b.description ?? "").toLowerCase().includes(q);
      const matchesIndustry = industryFilter === "all" || b.industry === industryFilter;
      return matchesQuery && matchesIndustry;
    });
  }, [brands.data, industryFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header (format like the reference screenshot) */}
      <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-800 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              <div className="text-lg font-semibold">Discover Brands</div>
            </div>
          </div>

          {!session && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button>
          )}
        </div>
      </header>

      {/* Filters */}
      <div className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full md:w-[220px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All industries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind} className="capitalize">
                    {ind}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {brands.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading brands…</p>
        ) : filteredBrands.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No brands match your search.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBrands.map((b) => {
              const isSubscribed = subscribedBrandIds.has(b.id);
              return (
                <Card key={b.id} className="h-full">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="truncate text-base">{b.name}</CardTitle>
                          {b.industry ? (
                            <Badge variant="secondary" className="shrink-0 capitalize">
                              {b.industry}
                            </Badge>
                          ) : null}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {b.description ?? "Subscribe to receive promotions and updates."}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Button
                      className="flex-1"
                      disabled={subscribe.isPending || isSubscribed}
                      onClick={async () => {
                        if (!session) {
                          router.push(
                            `/auth/personal?mode=signup&redirect=${encodeURIComponent("/brands")}`
                          );
                          return;
                        }
                        await subscribe.mutateAsync(b.id);
                      }}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/subscribe/${encodeURIComponent(b.digitalId)}`}>Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

