"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrandSubscribersQuery, useBrandsQuery, useCreateBrandNotificationMutation, useCreateEventMutation, useEventsQuery, useSessionQuery } from "@/hooks/useDummyApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function BusinessDashboardPage() {
  return (
    <RequireSession>
      <BusinessDashboardInner />
    </RequireSession>
  );
}

function BusinessDashboardInner() {
  const { data: session } = useSessionQuery();
  const brands = useBrandsQuery();
  const events = useEventsQuery();

  const businessRole = useMemo(() => session?.roles.find((r) => r.accountType === "business") ?? null, [session]);

  const brand = useMemo(() => {
    if (!businessRole) return null;
    return (brands.data ?? []).find((b) => b.id === businessRole.accountId) ?? null;
  }, [brands.data, businessRole]);

  const subscribers = useBrandSubscribersQuery(brand?.id ?? "", !!brand);
  const createNotif = useCreateBrandNotificationMutation();
  const createEvent = useCreateEventMutation();

  const [tab, setTab] = useState("overview");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");

  const [eventTitle, setEventTitle] = useState("");
  const [eventWhen, setEventWhen] = useState(() => {
    const d = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    d.setMinutes(0, 0, 0);
    return d.toISOString().slice(0, 16); // yyyy-mm-ddThh:mm
  });
  const [eventLocationType, setEventLocationType] = useState<"in_person" | "virtual" | "hybrid">("in_person");
  const [eventLocationLabel, setEventLocationLabel] = useState("");

  const myEvents = useMemo(() => {
    if (!brand) return [];
    return (events.data ?? []).filter((e) => e.organizerLabel === brand.name);
  }, [brand, events.data]);

  if (!businessRole) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>No business role yet</CardTitle>
            <CardDescription>
              Create a Business/Brand role to access this dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/auth/business?mode=signup">Create business role</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to personal dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Business brand not found</CardTitle>
            <CardDescription>
              This role points to a brand that doesn’t exist in local data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to personal dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subscribeLink = `/subscribe/${encodeURIComponent(brand.digitalId)}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">{brand.name}</h1>
        <p className="text-sm text-muted-foreground">Business dashboard: post updates and create events.</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscribers">
            Subscribers{" "}
            {(subscribers.data?.length ?? 0) > 0 && (
              <Badge className="ml-2" variant="secondary">
                {subscribers.data?.length ?? 0}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Share your subscribe link</CardTitle>
                <CardDescription>Use this to gain subscribers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Digital ID</div>
                  <div className="font-mono text-sm">{brand.digitalId}</div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={subscribeLink}>Open subscribe page</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href="/dashboard">View personal inbox</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workflow tip</CardTitle>
                <CardDescription>See the end state in the Personal dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>1) Open your subscribe link and subscribe as a personal user.</p>
                <p>2) Create a notification here.</p>
                <p>3) Switch to Personal dashboard → Alerts.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscribers" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscribers</CardTitle>
              <CardDescription>List (shows user IDs for now).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(subscribers.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No subscribers yet.</p>
              ) : (
                (subscribers.data ?? []).map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="text-sm">
                      <div className="font-mono text-xs text-muted-foreground">{s.userId}</div>
                      <div>Subscribed {formatDate(s.subscribedAt)}</div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a brand update</CardTitle>
              <CardDescription>
                This will be delivered to all your subscribers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notifTitle">Title</Label>
                <Input id="notifTitle" value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notifMessage">Message</Label>
                <Input id="notifMessage" value={notifMessage} onChange={(e) => setNotifMessage(e.target.value)} />
              </div>
              <Button
                disabled={createNotif.isPending}
                onClick={async () => {
                  await createNotif.mutateAsync({ brandId: brand.id, title: notifTitle, message: notifMessage });
                  setNotifTitle("");
                  setNotifMessage("");
                }}
              >
                Send update
              </Button>
              <p className="text-xs text-muted-foreground">
                After sending: go to <Link className="underline" href="/dashboard">Personal dashboard</Link> → Alerts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Create an event</CardTitle>
                <CardDescription>This event will appear on the public Events page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTitle">Title</Label>
                  <Input id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventWhen">When</Label>
                  <Input
                    id="eventWhen"
                    type="datetime-local"
                    value={eventWhen}
                    onChange={(e) => setEventWhen(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocType">Location type</Label>
                  <div className="flex gap-2">
                    {(["in_person", "virtual", "hybrid"] as const).map((t) => (
                      <Button
                        key={t}
                        type="button"
                        variant={eventLocationType === t ? "default" : "outline"}
                        onClick={() => setEventLocationType(t)}
                      >
                        {t.replace("_", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocLabel">Location label (optional)</Label>
                  <Input
                    id="eventLocLabel"
                    value={eventLocationLabel}
                    onChange={(e) => setEventLocationLabel(e.target.value)}
                    placeholder="Downtown store / Zoom link"
                  />
                </div>
                <Button
                  disabled={createEvent.isPending}
                  onClick={async () => {
                    // datetime-local returns "YYYY-MM-DDTHH:mm"
                    const startsAt = new Date(eventWhen).toISOString();
                    await createEvent.mutateAsync({
                      title: eventTitle,
                      startsAt,
                      locationType: eventLocationType,
                      locationLabel: eventLocationLabel,
                      organizerLabel: brand.name,
                      description: undefined,
                    });
                    setEventTitle("");
                    setEventLocationLabel("");
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
                <CardDescription>Events created under this business name.</CardDescription>
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
      </Tabs>
    </div>
  );
}

