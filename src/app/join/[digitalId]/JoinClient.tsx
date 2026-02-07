"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useCommunityByDigitalIdQuery,
  useJoinCommunityMutation,
  useMyMembershipsQuery,
  useSessionQuery,
} from "@/hooks/useDummyApi";

export function JoinClient({ digitalId }: { digitalId: string }) {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const communityQuery = useCommunityByDigitalIdQuery(digitalId);
  const memberships = useMyMembershipsQuery(!!session);
  const join = useJoinCommunityMutation();

  const community = communityQuery.data;
  const membership = community
    ? memberships.data?.find((m) => m.communityId === community.id)
    : undefined;

  if (communityQuery.isLoading) {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="mx-auto max-w-md px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Community not found</CardTitle>
            <CardDescription>Digital ID: {digitalId}</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <div className="mb-4">
        <Button asChild variant="ghost" className="px-0">
          <Link href="/">← Home</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{community.name}</CardTitle>
          <CardDescription>{community.description ?? "Join to receive announcements."}</CardDescription>
          <div className="pt-2 text-xs text-muted-foreground">
            Digital ID: <span className="font-mono">{community.digitalId}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {membership ? (
            <>
              {membership.status === "active" ? (
                <p className="text-sm text-muted-foreground">You’re a member.</p>
              ) : (
                <p className="text-sm text-muted-foreground">Your request is pending approval.</p>
              )}
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              disabled={join.isPending}
              onClick={async () => {
                if (!session) {
                  router.push(
                    `/auth/personal?mode=signup&redirect=${encodeURIComponent(`/join/${digitalId}`)}`
                  );
                  return;
                }
                await join.mutateAsync(community.id);
              }}
            >
              {community.approvalRequired ? "Request to Join" : "Join Community"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

