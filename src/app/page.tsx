"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Ticket, Briefcase, User } from "lucide-react";

const accountTypes = [
  {
    type: "personal",
    title: "Personal",
    description: "Subscribe to brands, join communities, and receive updates.",
    icon: User,
  },
  {
    type: "business",
    title: "Business / Brand",
    description: "Post promotions and create events for subscribers.",
    icon: Building2,
  },
  {
    type: "community",
    title: "Community / Organization",
    description: "Post announcements and manage members.",
    icon: Users,
  },
  {
    type: "organizer",
    title: "Event Organizer",
    description: "Publish events and manage vendors.",
    icon: Ticket,
  },
  {
    type: "agency",
    title: "Agency",
    description: "Manage campaigns for multiple clients.",
    icon: Briefcase,
  },
] as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-6xl text-center">
          {/* Top brand block */}
          <div className="mx-auto mb-8 max-w-2xl space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5">
                <span className="text-lg font-semibold">W</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Whodini</h1>
            <p className="text-sm text-white/70 sm:text-base">Your Digital Identity Platform</p>
          </div>

          <div className="mb-6 text-sm font-semibold text-white/80 sm:text-base">
            Choose your account type
          </div>

          {/* Account cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {accountTypes.map((a) => (
              <Link key={a.type} href={`/auth/${a.type}?mode=signup`} className="block">
                <Card className="flex h-full min-h-[190px] flex-col border-white/10 bg-white/5 text-white shadow-sm backdrop-blur transition hover:bg-white/10">
                  <CardHeader className="flex-1 space-y-2">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                      <a.icon className="h-6 w-6 text-white/80" />
                    </div>
                    <CardTitle className="text-base">{a.title}</CardTitle>
                    <CardDescription className="text-xs text-white/60">
                      {a.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button className="w-full" variant="secondary">
                      Get started
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Bottom actions */}
          <div className="mt-8 space-y-2">
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="secondary">
                <Link href="/events">Browse Events</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/brands">Browse Brands</Link>
              </Button>
            </div>
            <div className="text-sm text-white/70">
              Already have an account?{" "}
              <Link href="/auth" className="underline underline-offset-4 hover:text-white">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
