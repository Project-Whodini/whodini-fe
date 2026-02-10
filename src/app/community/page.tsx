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
import { useApproveMembershipMutation, useCommunitiesQuery, useCommunityMembersQuery, useCreateCommunityAnnouncementMutation, useSessionQuery } from "@/hooks/useDummyApi";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function CommunityDashboardPage() {
  return (
    <RequireSession>
      <CommunityDashboardInner />
    </RequireSession>
  );
}

function CommunityDashboardInner() {
  const { data: session } = useSessionQuery();
  const communities = useCommunitiesQuery();

  const communityRole = useMemo(
    () => session?.roles.find((r) => r.accountType === "community") ?? null,
    [session]
  );

  const community = useMemo(() => {
    if (!communityRole) return null;
    return (communities.data ?? []).find((c) => c.id === communityRole.accountId) ?? null;
  }, [communities.data, communityRole]);

  const members = useCommunityMembersQuery(community?.id ?? "", !!community);
  const approve = useApproveMembershipMutation();
  const announce = useCreateCommunityAnnouncementMutation();

  const [tab, setTab] = useState("overview");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  if (!communityRole) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>No community role yet</CardTitle>
            <CardDescription>Create a Community/Organization role to access this dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/auth/community?mode=signup">Create community role</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Go to personal dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Community not found</CardTitle>
            <CardDescription>This role points to a community that doesn’t exist in local data.</CardDescription>
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

  const joinLink = `/join/${encodeURIComponent(community.digitalId)}`;
  const pendingCount = (members.data ?? []).filter((m) => m.status === "pending").length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold">{community.name}</h1>
        <p className="text-sm text-muted-foreground">Community dashboard: approve members and post announcements.</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">
            Members{" "}
            {pendingCount > 0 && (
              <Badge className="ml-2" variant="secondary">
                {pendingCount} pending
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Share your join link</CardTitle>
                <CardDescription>Members join through this link.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-md border bg-muted/30 p-3">
                  <div className="text-xs text-muted-foreground">Digital ID</div>
                  <div className="font-mono text-sm">{community.digitalId}</div>
                </div>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={joinLink}>Open join page</Link>
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
                <p>1) Join your community as a personal user.</p>
                <p>2) If approval is required, approve them in the Members tab.</p>
                <p>3) Post an announcement → switch to Personal dashboard → Community.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>List (shows user IDs for now).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {(members.data ?? []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No members yet.</p>
              ) : (
                (members.data ?? []).map((m) => (
                  <div key={m.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="text-sm">
                      <div className="font-mono text-xs text-muted-foreground">{m.userId}</div>
                      <div>
                        Joined {formatDate(m.joinedAt)} •{" "}
                        <span className="capitalize">{m.status}</span>
                      </div>
                    </div>
                    {m.status === "pending" ? (
                      <Button
                        size="sm"
                        onClick={() => approve.mutate(m.id)}
                        disabled={approve.isPending}
                      >
                        Approve
                      </Button>
                    ) : (
                      <Badge variant="secondary">Active</Badge>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Post an announcement</CardTitle>
              <CardDescription>
                This will appear in the Personal dashboard Community inbox for active members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aTitle">Title</Label>
                <Input id="aTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aMsg">Message</Label>
                <Input id="aMsg" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button
                disabled={announce.isPending}
                onClick={async () => {
                  await announce.mutateAsync({ communityId: community.id, title, message });
                  setTitle("");
                  setMessage("");
                }}
              >
                Send announcement
              </Button>
              <p className="text-xs text-muted-foreground">
                After sending: go to <Link className="underline" href="/dashboard">Personal dashboard</Link> → Community.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
