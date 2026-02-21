"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, MapPin, Users, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const STATIC_EVENTS = [
  {
    id: "org_evt_1",
    title: "Tech Summit 2024",
    startsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: "hybrid",
    registrations: 247,
    capacity: 500,
    revenue: 73753,
    status: "upcoming",
  },
  {
    id: "org_evt_2",
    title: "Community Wellness Workshop",
    startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: "in_person",
    registrations: 68,
    capacity: 75,
    revenue: 0,
    status: "upcoming",
  },
  {
    id: "org_evt_3",
    title: "Virtual Product Launch",
    startsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: "virtual",
    registrations: 892,
    capacity: 1000,
    revenue: 0,
    status: "upcoming",
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function OrganizerDashboardPage() {
  const organizerLabel = "Demo Organizer";
  const [tab, setTab] = useState("overview");

  const totalRegistrations = STATIC_EVENTS.reduce((sum, e) => sum + e.registrations, 0);
  const totalRevenue = STATIC_EVENTS.reduce((sum, e) => sum + e.revenue, 0);
  const totalCapacity = STATIC_EVENTS.reduce((sum, e) => sum + e.capacity, 0);
  const avgFillRate = ((totalRegistrations / totalCapacity) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">{organizerLabel}</h1>
          <p className="text-base text-neutral-600">
            Professional event organizer dashboard with analytics and management tools.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardDescription className="text-neutral-600">Total Events</CardDescription>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    {STATIC_EVENTS.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4 text-[#ff5f6d]" />
                    <span>All upcoming</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardDescription className="text-neutral-600">Total Registrations</CardDescription>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    {totalRegistrations}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4 text-[#ff5f6d]" />
                    <span>{avgFillRate}% capacity</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardDescription className="text-neutral-600">Total Revenue</CardDescription>
                  <CardTitle className="text-3xl font-bold text-neutral-900">
                    {formatCurrency(totalRevenue)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <DollarSign className="w-4 h-4 text-[#ff5f6d]" />
                    <span>From paid events</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardDescription className="text-neutral-600">Avg Fill Rate</CardDescription>
                  <CardTitle className="text-3xl font-bold text-neutral-900">{avgFillRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <TrendingUp className="w-4 h-4 text-[#ff5f6d]" />
                    <span>Capacity utilization</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-neutral-900">Recent Events</CardTitle>
                <CardDescription className="text-neutral-600">
                  Overview of your upcoming events and their performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {STATIC_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-neutral-900">{event.title}</h3>
                        <Badge variant="outline" className="text-xs capitalize">
                          {event.locationType.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(event.startsAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.registrations}/{event.capacity}
                        </span>
                        {event.revenue > 0 && (
                          <span className="flex items-center gap-1 text-[#ff5f6d] font-medium">
                            <DollarSign className="w-4 h-4" />
                            {formatCurrency(event.revenue)}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button asChild variant="outline" className="rounded-lg">
                      <Link href={`/organizer/events`}>Manage</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-neutral-900">Your Events</CardTitle>
                    <CardDescription className="text-neutral-600">
                      Manage and create professional events
                    </CardDescription>
                  </div>
                  <Button asChild className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
                    <Link href="/organizer/events">
                      <Calendar className="w-4 h-4 mr-2" />
                      Manage Events
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {STATIC_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-neutral-900">{event.title}</h3>
                        <Badge
                          variant={event.revenue > 0 ? "default" : "secondary"}
                          className={event.revenue > 0 ? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90" : ""}
                        >
                          {event.revenue > 0 ? formatCurrency(event.revenue) : "Free"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <span>{formatDate(event.startsAt)}</span>
                        <span>•</span>
                        <span>{event.registrations} registered</span>
                      </div>
                    </div>
                    <Button asChild size="sm" variant="outline" className="rounded-lg">
                      <Link href="/organizer/events">View</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardContent className="py-20 text-center">
                <div className="text-6xl mb-4">🏪</div>
                <CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
                  Vendor Management
                </CardTitle>
                <CardDescription className="text-neutral-600 mb-6">
                  Vendor coordination features are coming soon. Manage event vendors, booth assignments, and
                  contracts.
                </CardDescription>
                <Button variant="outline" className="rounded-lg" disabled>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

