'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  Bell,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const exploreEvents = [
  {
    id: 1,
    title: 'Whodini Product Launch Night',
    description: 'Explore new platform features and partner showcases.',
    date: 'April 12, 2026',
    time: '7:00 PM - 10:00 PM',
    location: 'Whodini Hall, Makati',
    attendees: 380,
    business: 'Whodini',
    followed: true,
    interested: true,
    notifyOnDate: true,
    image: '🎉',
  },
  {
    id: 2,
    title: 'Creative Founders Meetup',
    description: 'Meet local creators, founders, and collaborators.',
    date: 'April 20, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Studio Commons',
    attendees: 190,
    business: 'Design Studio PH',
    followed: true,
    interested: false,
    notifyOnDate: true,
    image: '🧠',
  },
  {
    id: 3,
    title: 'Startup Investor Networking',
    description: 'Connect with startups and early-stage investors.',
    date: 'May 2, 2026',
    time: '5:30 PM - 8:30 PM',
    location: 'Innovation Center',
    attendees: 260,
    business: 'Startup Connect',
    followed: false,
    interested: true,
    notifyOnDate: false,
    image: '🤝',
  },
  {
    id: 4,
    title: 'Tech Builders Workshop',
    description: 'Hands-on workshop on AI and product prototyping.',
    date: 'May 10, 2026',
    time: '1:00 PM - 5:00 PM',
    location: 'BuildLab Campus',
    attendees: 120,
    business: 'TechCorp',
    followed: false,
    interested: false,
    notifyOnDate: false,
    image: '🛠️',
  },
];

export default function ExploreEventsPage() {
  const router = useRouter();

  const goBackToEvents = () => {
    const navigationEvent = new CustomEvent('whodini:navigate', {
      detail: { path: '/events' },
      cancelable: true,
    });

    const handledByDashboard = !window.dispatchEvent(navigationEvent);
    if (!handledByDashboard) {
      router.push('/personal/events');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Explore Events
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Static preview of all events inside Whodini.
          </p>
        </div>
        <Button
          onClick={goBackToEvents}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Events
          </>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {exploreEvents.map((event) => (
          <Card
            key={event.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="text-3xl">{event.image}</div>
                <Badge variant={event.followed ? 'default' : 'outline'}>
                  {event.followed ? 'Following' : 'Open'}
                </Badge>
              </div>
              <CardTitle className="text-base sm:text-lg mt-2">
                {event.title}
              </CardTitle>
              <p className="text-sm text-neutral-600">{event.description}</p>
            </CardHeader>

            <CardContent className="pt-0 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Building2 className="w-4 h-4 text-neutral-400" />
                <span>{event.business}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Users className="w-4 h-4 text-neutral-400" />
                <span>{event.attendees} attendees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Bell className="w-4 h-4 text-neutral-400" />
                <span>
                  {event.followed && event.notifyOnDate
                    ? 'Event date notification enabled'
                    : 'Follow event to enable date notification'}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <Button variant="outline" className="flex-1 text-sm">
                  {event.followed ? 'Following' : 'Follow Event'}
                </Button>
                <Button className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white">
                  {event.interested ? 'Interested' : 'Mark Interested'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
