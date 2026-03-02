'use client';

import { Calendar, Users, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileMetrics } from '@/components/app/MobileMetrics';

const STATIC_EVENTS = [
  {
    id: 'org_evt_1',
    title: 'Tech Summit 2024',
    startsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: 'hybrid',
    registrations: 247,
    capacity: 500,
    status: 'upcoming',
  },
  {
    id: 'org_evt_2',
    title: 'Community Wellness Workshop',
    startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: 'in_person',
    registrations: 68,
    capacity: 75,
    status: 'upcoming',
  },
  {
    id: 'org_evt_3',
    title: 'Virtual Product Launch',
    startsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    locationType: 'virtual',
    registrations: 892,
    capacity: 1000,
    status: 'upcoming',
  },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function OrganizerDashboardPage() {
  const organizerLabel = 'Demo Organizer';

  const totalRegistrations = STATIC_EVENTS.reduce(
    (sum, e) => sum + e.registrations,
    0
  );
  const totalCapacity = STATIC_EVENTS.reduce((sum, e) => sum + e.capacity, 0);
  const avgFillRate = ((totalRegistrations / totalCapacity) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            {organizerLabel}
          </h1>
          <p className="text-base text-neutral-600">
            Professional event organizer dashboard with analytics and management
            tools.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mobile / tablet: compact metrics list */}
          <MobileMetrics
            className="!block lg:!hidden"
            items={[
              {
                label: 'Total Events',
                value: STATIC_EVENTS.length,
                icon: <Calendar className="w-4 h-4" />,
              },
              {
                label: 'Total Registrations',
                value: totalRegistrations,
                icon: <Users className="w-4 h-4" />,
              },
              {
                label: 'Avg Fill Rate',
                value: `${avgFillRate}%`,
                valueClassName: 'text-[#ff5f6d]',
                icon: <TrendingUp className="w-4 h-4" />,
              },
            ]}
          />

          {/* Desktop: card grid */}
          <div className="hidden lg:grid gap-6 lg:grid-cols-3">
            <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardDescription className="text-neutral-600">
                  Total Events
                </CardDescription>
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
                <CardDescription className="text-neutral-600">
                  Total Registrations
                </CardDescription>
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
                <CardDescription className="text-neutral-600">
                  Avg Fill Rate
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-neutral-900">
                  {avgFillRate}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <TrendingUp className="w-4 h-4 text-[#ff5f6d]" />
                  <span>Capacity utilization</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-neutral-900">
                Recent Events
              </CardTitle>
              <CardDescription className="text-neutral-600">
                Overview of your upcoming events and their performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {STATIC_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-neutral-900 leading-snug">
                        {event.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs capitalize shrink-0"
                      >
                        {event.locationType.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        {formatDate(event.startsAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        {event.registrations}/{event.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
