"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useBrandsQuery,
  useCommunitiesQuery,
  useEventsQuery,
  useMarkCommunityMessageReadMutation,
  useMyCommunityMessagesQuery,
  useMyMembershipsQuery,
  useMyNotificationsQuery,
  useMyRegistrationsQuery,
  useMySubscriptionsQuery,
  useSessionQuery,
} from "@/hooks/useDummyApi";
import type { Event } from "@/lib/dummy/types";
import SideBar from "@/components/app/SideBar";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PersonalDashboardPage() {
  return (
    <RequireSession>
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex-1">
          <PersonalDashboardInner />
        </div>
      </div>
    </RequireSession>
  );
}

function PersonalDashboardInner() {
  const { data: session } = useSessionQuery();
  const [tab, setTab] = useState("home");

  const brands = useBrandsQuery();
  const communities = useCommunitiesQuery();
  const events = useEventsQuery();

  const subscriptions = useMySubscriptionsQuery(true);
  const memberships = useMyMembershipsQuery(true);
  const notifications = useMyNotificationsQuery(true);
  const communityMessages = useMyCommunityMessagesQuery(true);
  const registrations = useMyRegistrationsQuery(true);

  const markRead = useMarkCommunityMessageReadMutation();

  const brandNameById = useMemo(() => {
    const map = new Map<string, string>();
    (brands.data ?? []).forEach((b) => map.set(b.id, b.name));
    return map;
  }, [brands.data]);

  const communityNameById = useMemo(() => {
    const map = new Map<string, string>();
    (communities.data ?? []).forEach((c) => map.set(c.id, c.name));
    return map;
  }, [communities.data]);

  const eventById = useMemo(() => {
    const map = new Map<string, Event>();
    (events.data ?? []).forEach((e) => map.set(e.id, e));
    return map;
  }, [events.data]);

  const pendingAlerts = (notifications.data ?? []).filter(
    (n) => n.status === "pending",
  );
  const unreadCommunity = (communityMessages.data ?? []).filter(
    (m) => !m.readAt,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">
          Welcome back{session?.displayName ? `, ${session.displayName}` : ""}!
        </h1>
        <p className="text-sm text-muted-foreground">
          This dashboard shows the “end states” of the workflow: alerts,
          community messages, and registrations.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="secondary">
          <Link href="/brands">Browse Brands</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts{" "}
            {pendingAlerts.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {pendingAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="community">
            Community{" "}
            {unreadCommunity.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {unreadCommunity.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="events">
            Events{" "}
            {(registrations.data?.length ?? 0) > 0 && (
              <Badge className="ml-2" variant="secondary">
                {registrations.data?.length ?? 0}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Pending Alerts</CardTitle>
                <CardDescription>
                  Brand updates you haven’t handled yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">
                  {pendingAlerts.length}
                </div>
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={() => setTab("alerts")}
                >
                  View alerts
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Unread Community Messages
                </CardTitle>
                <CardDescription>
                  Announcements from communities you joined.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">
                  {unreadCommunity.length}
                </div>
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={() => setTab("community")}
                >
                  View inbox
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event Registrations</CardTitle>
                <CardDescription>Events you registered for.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">
                  {registrations.data?.length ?? 0}
                </div>
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={() => setTab("events")}
                >
                  View events
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="pt-6">
          <div className="space-y-4">
            {(notifications.data ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No alerts yet. Subscribe to a brand and then create a brand
                  update from the Business dashboard.
                </CardContent>
              </Card>
            ) : (
              (notifications.data ?? []).map((n) => (
                <Card key={n.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{n.title}</CardTitle>
                        <CardDescription>
                          From{" "}
                          {brandNameById.get(n.fromBrandId) ?? "Unknown brand"}{" "}
                          • {formatDate(n.createdAt)}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          n.status === "pending" ? "default" : "secondary"
                        }
                        className="capitalize"
                      >
                        {n.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {n.message}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="community" className="pt-6">
          <div className="space-y-4">
            {(communityMessages.data ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No community messages yet. Join a community, then create an
                  announcement from the Community dashboard.
                </CardContent>
              </Card>
            ) : (
              (communityMessages.data ?? []).map((m) => (
                <Card key={m.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{m.title}</CardTitle>
                        <CardDescription>
                          From{" "}
                          {communityNameById.get(m.fromCommunityId) ??
                            "Unknown community"}{" "}
                          • {formatDate(m.createdAt)}
                        </CardDescription>
                      </div>
                      {m.readAt ? (
                        <Badge variant="secondary">Read</Badge>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={markRead.isPending}
                          onClick={() => markRead.mutate(m.id)}
                        >
                          Mark read
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {m.message}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="events" className="pt-6">
          <div className="space-y-4">
            {(registrations.data ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  You haven’t registered for any events yet.
                </CardContent>
              </Card>
            ) : (
              (registrations.data ?? []).map((r) => {
                const e = eventById.get(r.eventId);
                return (
                  <Card key={r.id}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {e?.title ?? "Unknown event"}
                      </CardTitle>
                      <CardDescription>
                        Registered {formatDate(r.registeredAt)}
                        {e ? ` • Starts ${formatDate(e.startsAt)}` : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Button asChild variant="outline">
                        <Link href="/events">Browse events</Link>
                      </Button>
                      {e && (
                        <Button asChild>
                          <Link href={`/events/${encodeURIComponent(e.id)}`}>
                            View details
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="pt-6">
          <div className="space-y-4">
            {(subscriptions.data ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  You’re not subscribed to any brands yet.
                </CardContent>
              </Card>
            ) : (
              (subscriptions.data ?? []).map((s) => (
                <Card key={s.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      {brandNameById.get(s.brandId) ?? "Unknown brand"}
                    </CardTitle>
                    <CardDescription>
                      Subscribed {formatDate(s.subscribedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline">
                      <Link href="/brands">Browse more brands</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="memberships" className="pt-6">
          <div className="space-y-4">
            {(memberships.data ?? []).length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  You haven’t joined any communities yet.
                </CardContent>
              </Card>
            ) : (
              (memberships.data ?? []).map((m) => (
                <Card key={m.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-base">
                          {communityNameById.get(m.communityId) ??
                            "Unknown community"}
                        </CardTitle>
                        <CardDescription>
                          Joined {formatDate(m.joinedAt)}
                        </CardDescription>
                      </div>
                      <Badge
                        className="capitalize"
                        variant={
                          m.status === "active" ? "secondary" : "default"
                        }
                      >
                        {m.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline">
                      <Link href="/">Back to home</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
