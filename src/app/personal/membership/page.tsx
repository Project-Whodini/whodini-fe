'use client';

import { useMemo, useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShowMembershipItem,
  type MembershipCommunity,
  type MembershipEvent,
  type MembershipSelection,
} from '@/app/personal/membership/show';

const COMMUNITIES: MembershipCommunity[] = [
  {
    id: 'community_1',
    name: 'Tech Innovators',
    category: 'Professional',
    description: 'Industry professionals sharing insights and opportunities.',
    members: 2450,
    location: 'Downtown Hub',
    joined: true,
  },
  {
    id: 'community_2',
    name: 'Weekend Creators',
    category: 'Hobbyist',
    description: 'Creators building side projects and learning together.',
    members: 1180,
    location: 'City Arts Center',
    joined: false,
  },
  {
    id: 'community_3',
    name: 'Neighborhood Connect',
    category: 'Local',
    description: 'Local residents organizing events and support circles.',
    members: 860,
    location: 'Community Hall',
    joined: true,
  },
  {
    id: 'community_4',
    name: 'Founder Roundtable',
    category: 'Professional',
    description: 'Startup founders exchanging lessons, feedback, and support.',
    members: 530,
    location: 'Innovation Center',
    joined: false,
  },
];

const EVENTS: MembershipEvent[] = [
  {
    id: 'event_1',
    title: 'Product Strategy Seminar',
    type: 'Seminar',
    description:
      'A practical session on product planning and roadmap alignment.',
    date: '2026-03-10',
    venue: 'Innovation Center',
    registered: true,
    attended: false,
  },
  {
    id: 'event_2',
    title: 'Community Workshop: Design Sprint',
    type: 'Workshop',
    description: 'Hands-on workshop focused on rapid ideation and prototyping.',
    date: '2026-03-18',
    venue: 'City Arts Center',
    registered: false,
    attended: false,
  },
  {
    id: 'event_3',
    title: 'Local Networking Gathering',
    type: 'Gathering',
    description: 'Meet local members and discover collaboration opportunities.',
    date: '2026-04-02',
    venue: 'Community Hall',
    registered: true,
    attended: false,
  },
  {
    id: 'event_4',
    title: 'Annual Members Meetup',
    type: 'Gathering',
    description: 'Highlights, awards, and shared wins from the past year.',
    date: '2025-11-20',
    venue: 'Convention Center',
    registered: false,
    attended: true,
  },
];

type ViewState = 'list' | 'show';
type PrimaryTab = 'discover' | 'dashboard';
type DashboardTab = 'my-communities' | 'my-events';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function MembershipPage() {
  const [view, setView] = useState<ViewState>('list');
  const [activePrimaryTab, setActivePrimaryTab] =
    useState<PrimaryTab>('discover');
  const [activeDashboardTab, setActiveDashboardTab] =
    useState<DashboardTab>('my-communities');
  const [selectedItem, setSelectedItem] = useState<MembershipSelection | null>(
    null
  );

  const discoverEvents = useMemo(
    () =>
      [...EVENTS]
        .filter((event) => new Date(event.date) >= new Date('2026-01-01'))
        .sort(
          (current, next) =>
            new Date(current.date).getTime() - new Date(next.date).getTime()
        ),
    []
  );

  const myCommunities = useMemo(
    () => COMMUNITIES.filter((community) => community.joined),
    []
  );

  const myEvents = useMemo(
    () => EVENTS.filter((event) => event.registered || event.attended),
    []
  );

  const handleOpenCommunity = (community: MembershipCommunity) => {
    setSelectedItem({ type: 'community', data: community });
    setView('show');
  };

  const handleOpenEvent = (event: MembershipEvent) => {
    setSelectedItem({ type: 'event', data: event });
    setView('show');
  };

  if (view === 'show' && selectedItem) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-neutral-50">
        <ShowMembershipItem
          item={selectedItem}
          onClose={() => {
            setView('list');
            setSelectedItem(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          Communities & Events
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Discover groups and activities, then manage your memberships in one
          place.
        </p>
      </div>

      <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit">
        <button
          onClick={() => setActivePrimaryTab('discover')}
          className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
            activePrimaryTab === 'discover'
              ? 'bg-white text-[#ff5f6d] shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          Discover
        </button>
        <button
          onClick={() => setActivePrimaryTab('dashboard')}
          className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
            activePrimaryTab === 'dashboard'
              ? 'bg-white text-[#ff5f6d] shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          My Dashboard
        </button>
      </div>

      {activePrimaryTab === 'discover' && (
        <div className="space-y-6 pt-1">
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Explore Communities
              </h2>
              <p className="text-sm text-neutral-600">
                Browse available communities and become a member.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {COMMUNITIES.map((community) => (
                <Card
                  key={community.id}
                  className="h-full border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg">
                        {community.name}
                      </CardTitle>
                      <Badge variant="outline">{community.category}</Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {community.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {community.members.toLocaleString()} members
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{community.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border border-neutral-300 hover:bg-neutral-50"
                      >
                        {community.joined ? 'Member' : 'Join'}
                      </Button>
                      <Button
                        className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                        onClick={() => handleOpenCommunity(community)}
                      >
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Browse Events
              </h2>
              <p className="text-sm text-neutral-600">
                Upcoming workshops, seminars, and gatherings in chronological
                order.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {discoverEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base sm:text-lg">
                        {event.title}
                      </CardTitle>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {event.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border border-neutral-300 hover:bg-neutral-50"
                      >
                        {event.registered ? 'Registered' : 'Register'}
                      </Button>
                      <Button
                        className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                        onClick={() => handleOpenEvent(event)}
                      >
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}

      {activePrimaryTab === 'dashboard' && (
        <div className="space-y-5 pt-1">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Personalized Membership View
            </h2>
            <p className="text-sm text-neutral-600">
              Track the communities you joined and events you registered for or
              attended.
            </p>
          </div>

          <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit">
            <button
              onClick={() => setActiveDashboardTab('my-communities')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                activeDashboardTab === 'my-communities'
                  ? 'bg-white text-[#ff5f6d] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Communities
            </button>
            <button
              onClick={() => setActiveDashboardTab('my-events')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                activeDashboardTab === 'my-events'
                  ? 'bg-white text-[#ff5f6d] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              My Events
            </button>
          </div>

          {activeDashboardTab === 'my-communities' && (
            <div className="pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {myCommunities.map((community) => (
                  <Card
                    key={community.id}
                    className="border border-neutral-200 rounded-xl bg-white shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">
                        {community.name}
                      </CardTitle>
                      <p className="text-sm text-neutral-600">
                        {community.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge>Member</Badge>
                      <Button
                        variant="outline"
                        className="w-full border border-neutral-300 hover:bg-neutral-50"
                        onClick={() => handleOpenCommunity(community)}
                      >
                        Open Community
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeDashboardTab === 'my-events' && (
            <div className="pt-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {myEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border border-neutral-200 rounded-xl bg-white shadow-sm"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      <p className="text-sm text-neutral-600">
                        {event.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge variant="outline">
                        {event.attended ? 'Attended' : 'Registered'}
                      </Badge>
                      <Button
                        variant="outline"
                        className="w-full border border-neutral-300 hover:bg-neutral-50"
                        onClick={() => handleOpenEvent(event)}
                      >
                        Open Event
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
