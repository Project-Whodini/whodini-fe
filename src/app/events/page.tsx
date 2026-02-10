"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEventsQuery, useMyRegistrationsQuery, useRegisterForEventMutation, useSessionQuery } from "@/hooks/useDummyApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function EventsPage() {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const events = useEventsQuery();
  const regs = useMyRegistrationsQuery(!!session);
  const register = useRegisterForEventMutation();

  const registeredEventIds = new Set(regs.data?.map((r) => r.eventId) ?? []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Events</h1>
          <p className="text-sm text-muted-foreground">Browse upcoming events and register.</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/brands">Browse Brands</Link>
        </Button>
      </div>

      {events.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading events…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(events.data ?? []).map((e) => {
            const isRegistered = registeredEventIds.has(e.id);
            return (
              <Card key={e.id} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{e.title}</CardTitle>
                    {isRegistered && <Badge>Registered</Badge>}
                  </div>
                  <CardDescription>{e.description ?? "Event details coming soon."}</CardDescription>
                  <div className="pt-2 text-xs text-muted-foreground">
                    <div>{formatDate(e.startsAt)}</div>
                    <div className="capitalize">
                      {e.locationType.replace("_", " ")}
                      {e.locationLabel ? ` • ${e.locationLabel}` : ""}
                    </div>
                    <div>Organizer: {e.organizerLabel}</div>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/events/${encodeURIComponent(e.id)}`}>Details</Link>
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={register.isPending || isRegistered}
                    onClick={async () => {
                      if (!session) {
                        router.push(`/auth?redirect=${encodeURIComponent("/events")}`);
                        return;
                      }
                      await register.mutateAsync(e.id);
                    }}
                  >
                    {isRegistered ? "Registered" : "Register"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

