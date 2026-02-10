"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateEventMutation, useEventsQuery, useSessionQuery } from "@/hooks/useDummyApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function OrganizerDashboardPage() {
  return (
    <RequireSession>
      <OrganizerDashboardInner />
    </RequireSession>
  );
}

function OrganizerDashboardInner() {
  const { data: session } = useSessionQuery();
  const events = useEventsQuery();
  const createEvent = useCreateEventMutation();

  const organizerRole = useMemo(
    () => session?.roles.find((r) => r.accountType === "organizer") ?? null,
    [session]
  );

  const organizerLabel = organizerRole?.label ?? "Organizer";

  const [tab, setTab] = useState("events");
  const [eventTitle, setEventTitle] = useState("");
  const [eventWhen, setEventWhen] = useState(() => {
    const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    d.setMinutes(0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [locationType, setLocationType] = useState<"in_person" | "virtual" | "hybrid">("hybrid");
  const [locationLabel, setLocationLabel] = useState("");

  const myEvents = useMemo(() => {
    return (events.data ?? []).filter((e) => e.organizerLabel === organizerLabel);
  }, [events.data, organizerLabel]);

  if (!organizerRole) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>No organizer role yet</CardTitle>
            <CardDescription>Create an Event Organizer role to access this dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/auth/organizer?mode=signup">Create organizer role</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to personal dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">{organizerLabel}</h1>
        <p className="text-sm text-muted-foreground">
          Organizer dashboard: publish events (vendors can be added later).
        </p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="vendors">Vendors (later)</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create an event</CardTitle>
                <CardDescription>This event will appear on the public Events page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="t">Title</Label>
                  <Input id="t" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="w">When</Label>
                  <Input id="w" type="datetime-local" value={eventWhen} onChange={(e) => setEventWhen(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Location type</Label>
                  <div className="flex gap-2">
                    {(["in_person", "virtual", "hybrid"] as const).map((t) => (
                      <Button
                        key={t}
                        type="button"
                        variant={locationType === t ? "default" : "outline"}
                        onClick={() => setLocationType(t)}
                      >
                        {t.replace("_", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l">Location label (optional)</Label>
                  <Input
                    id="l"
                    value={locationLabel}
                    onChange={(e) => setLocationLabel(e.target.value)}
                    placeholder="Venue / Zoom link"
                  />
                </div>
                <Button
                  disabled={createEvent.isPending}
                  onClick={async () => {
                    const startsAt = new Date(eventWhen).toISOString();
                    await createEvent.mutateAsync({
                      title: eventTitle,
                      startsAt,
                      locationType,
                      locationLabel,
                      organizerLabel,
                    });
                    setEventTitle("");
                    setLocationLabel("");
                  }}
                >
                  Publish event
                </Button>
                <p className="text-xs text-muted-foreground">
                  View on <Link className="underline" href="/events">/events</Link>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your events</CardTitle>
                <CardDescription>Events created under your organizer name.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {myEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No events yet.</p>
                ) : (
                  myEvents.map((e) => (
                    <div key={e.id} className="flex items-center justify-between rounded-md border p-3">
                      <div>
                        <div className="text-sm font-medium">{e.title}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(e.startsAt)}</div>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/events/${encodeURIComponent(e.id)}`}>View</Link>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="pt-6">
          <Card>
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Vendor management is not implemented yet.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

