"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useEventByIdQuery,
  useMyRegistrationsQuery,
  useRegisterForEventMutation,
  useSessionQuery,
} from "@/hooks/useDummyApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });
}

export function EventDetailClient({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const eventQuery = useEventByIdQuery(eventId);
  const regs = useMyRegistrationsQuery(!!session);
  const register = useRegisterForEventMutation();

  const event = eventQuery.data;
  const isRegistered = !!regs.data?.some((r) => r.eventId === eventId);

  if (eventQuery.isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm text-muted-foreground">Loading event…</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Event not found</CardTitle>
            <CardDescription>That event doesn’t exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/events">Back to Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Button asChild variant="ghost" className="px-0">
          <Link href="/events">← Events</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/brands">Browse Brands</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{event.title}</CardTitle>
          <CardDescription>{event.description ?? "Event details coming soon."}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">When:</span> {formatDate(event.startsAt)}
            </div>
            <div className="capitalize">
              <span className="font-medium text-foreground">Where:</span>{" "}
              {event.locationType.replace("_", " ")}
              {event.locationLabel ? ` • ${event.locationLabel}` : ""}
            </div>
            <div>
              <span className="font-medium text-foreground">Organizer:</span> {event.organizerLabel}
            </div>
          </div>

          <Button
            disabled={register.isPending || isRegistered}
            onClick={async () => {
              if (!session) {
                router.push(`/auth?redirect=${encodeURIComponent(`/events/${eventId}`)}`);
                return;
              }
              await register.mutateAsync(event.id);
            }}
          >
            {isRegistered ? "Registered" : "Register"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

