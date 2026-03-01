'use client';

import { useState } from 'react';
import {
  Plus,
  Calendar,
  MapPin,
  Users,
  MoreVertical,
  Trash2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateCommunityEvent, type CreateEventFormData } from './create';
import { ShowCommunityEvent } from './show';
import { UpdateCommunityEvent } from './update';

export type CommunityEvent = {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  attendeeCount: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled' | 'postponed';
  chapterName: string;
  communityLabel: string;
};

type ViewState = 'list' | 'create' | 'show' | 'update';

const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'event_1',
    eventName: 'Q1 Tech Innovation Summit',
    date: '2026-03-15',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    description: 'Annual gathering of tech innovators and entrepreneurs',
    capacity: 500,
    attendeeCount: 387,
    status: 'upcoming',
    chapterName: 'Tech Innovation Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'event_2',
    eventName: 'Leadership Round Table',
    date: '2026-03-08',
    time: '06:00 PM',
    location: 'Boston Executive Club',
    description: 'Intimate discussion on modern leadership challenges',
    capacity: 50,
    attendeeCount: 45,
    status: 'upcoming',
    chapterName: 'Leadership Excellence Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'event_3',
    eventName: 'Marketing Strategy Workshop',
    date: '2026-02-28',
    time: '02:00 PM',
    location: 'New York Marketing Hub',
    description: 'Hands-on workshop on digital marketing trends',
    capacity: 100,
    attendeeCount: 78,
    status: 'upcoming',
    chapterName: 'Marketing Masters Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'event_4',
    eventName: 'Startup Pitch Competition',
    date: '2026-03-22',
    time: '10:00 AM',
    location: 'Silicon Valley Tech Park',
    description: 'Showcase your startup ideas to investors',
    capacity: 200,
    attendeeCount: 156,
    status: 'upcoming',
    chapterName: 'Tech Startup Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'event_5',
    eventName: 'Design & Innovation Expo',
    date: '2026-03-05',
    time: '11:00 AM',
    location: 'New York Creative Space',
    description: 'Showcase of latest design and innovation projects',
    capacity: 300,
    attendeeCount: 245,
    status: 'upcoming',
    chapterName: 'Creative Design Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'event_6',
    eventName: 'Monthly Networking Breakfast',
    date: '2026-02-25',
    time: '08:00 AM',
    location: 'Chicago Business Club',
    description: 'Casual networking event for all members',
    capacity: 75,
    attendeeCount: 62,
    status: 'upcoming',
    chapterName: 'Business Growth Chapter',
    communityLabel: 'Digital Innovators',
  },
];

const EMPTY_FORM: CreateEventFormData = {
  eventName: '',
  date: '',
  time: '',
  location: '',
  description: '',
  capacity: 100,
  chapterName: '',
};

const statusColors: Record<CommunityEvent['status'], string> = {
  upcoming: 'bg-green-100 text-green-800',
  ongoing: 'bg-blue-100 text-blue-800',
  completed: 'bg-neutral-100 text-neutral-600',
  cancelled: 'bg-red-100 text-red-700',
  postponed: 'bg-yellow-100 text-yellow-800',
};

export default function CommunityEventsPage() {
  const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [view, setView] = useState<ViewState>('list');
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(
    null
  );
  const [formData, setFormData] = useState<CreateEventFormData>(EMPTY_FORM);

  // ── Create ──────────────────────────────────────────────────────────────
  const handleCreateEvent = () => {
    if (!formData.eventName.trim()) return;
    const newEvent: CommunityEvent = {
      id: `event_${Date.now()}`,
      ...formData,
      attendeeCount: 0,
      status: 'upcoming',
      communityLabel: 'Digital Innovators',
    };
    setEvents((prev) => [newEvent, ...prev]);
    setFormData(EMPTY_FORM);
    setView('list');
  };

  // ── Update ───────────────────────────────────────────────────────────────
  const handleUpdateEvent = (updated: CommunityEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setSelectedEvent(updated);
    setView('show');
  };

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDeleteEvent = (id: string) => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  // ── Cancel ───────────────────────────────────────────────────────────────
  const handleCancelEvent = (id: string) => {
    if (!window.confirm('Mark this event as cancelled?')) return;
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'cancelled' } : e))
    );
  };

  // ── Postpone ─────────────────────────────────────────────────────────────
  const handlePostponeEvent = (id: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    setSelectedEvent({ ...event, status: 'postponed' });
    setView('update');
  };

  // ── Sub-views ────────────────────────────────────────────────────────────
  if (view === 'create') {
    return (
      <CreateCommunityEvent
        formData={formData}
        setFormData={setFormData}
        onCreateEvent={handleCreateEvent}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'show' && selectedEvent) {
    return (
      <ShowCommunityEvent
        event={selectedEvent}
        onBack={() => setView('list')}
        onEdit={() => setView('update')}
      />
    );
  }

  if (view === 'update' && selectedEvent) {
    return (
      <UpdateCommunityEvent
        event={selectedEvent}
        onUpdate={handleUpdateEvent}
        onCancel={() => setView('show')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Community Events
            </h1>
            <p className="text-neutral-600 mt-1 text-sm sm:text-base">
              Upcoming and past events
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <Card
              key={event.id}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] transition-all"
            >
              <CardContent className="pt-6">
                {/* Title row */}
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3
                    className="text-lg font-semibold text-neutral-900 cursor-pointer hover:text-[#ff5f6d] transition-colors leading-snug"
                    onClick={() => {
                      setSelectedEvent(event);
                      setView('show');
                    }}
                  >
                    {event.eventName}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge className={statusColors[event.status]}>
                      {event.status}
                    </Badge>
                    {/* Actions dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-neutral-500 hover:text-neutral-900"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handlePostponeEvent(event.id)}
                          className="cursor-pointer"
                        >
                          <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                          Postpone
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancelEvent(event.id)}
                          className="cursor-pointer"
                        >
                          <XCircle className="w-4 h-4 mr-2 text-orange-500" />
                          Cancel
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteEvent(event.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Description */}
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                  {event.description}
                </p>
                {/* Meta */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Calendar className="w-4 h-4 text-[#ff5f6d] shrink-0" />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <MapPin className="w-4 h-4 text-[#ff5f6d] shrink-0" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-200 text-neutral-700">
                    <Users className="w-4 h-4 text-[#ff5f6d] shrink-0" />
                    {event.attendeeCount}/{event.capacity} registered
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
