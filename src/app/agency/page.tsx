"use client";

import Link from "next/link";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSessionQuery } from "@/hooks/useDummyApi";

export default function AgencyDashboardPage() {
  return (
    <RequireSession>
      <AgencyDashboardInner />
    </RequireSession>
  );
}

function AgencyDashboardInner() {
  const { data: session } = useSessionQuery();
  const hasAgency = !!session?.roles.some((r) => r.accountType === "agency");

  if (!hasAgency) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>No agency role yet</CardTitle>
            <CardDescription>Create an Agency role to access this dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/auth/agency?mode=signup">Create agency role</Link>
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
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Agency Dashboard</CardTitle>
          <CardDescription>Client permissions and multi-account management can be implemented later.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/business">Go to Business dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Personal dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

