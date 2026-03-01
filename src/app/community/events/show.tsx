'use client';

import { Calendar, MapPin, Users, ArrowLeft, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CommunityEvent } from './page';

interface ShowCommunityEventProps {
  event: CommunityEvent;
  onBack: () => void;
  onEdit: () => void;
}

const statusColors: Record<CommunityEvent['status'], string> = {
  upcoming: 'bg-green-100 text-green-800',
  ongoing: 'bg-blue-100 text-blue-800',
  completed: 'bg-neutral-100 text-neutral-600',
  cancelled: 'bg-red-100 text-red-700',
  postponed: 'bg-yellow-100 text-yellow-800',
};

export function ShowCommunityEvent({
  event,
  onBack,
  onEdit,
}: ShowCommunityEventProps) {
  const attendancePct = Math.round(
    (event.attendeeCount / event.capacity) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Back + actions */}
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-neutral-600 hover:text-neutral-900 -ml-2 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden xs:inline">Back to Events</span>
            <span className="xs:hidden">Back</span>
          </Button>
          <Button
            onClick={onEdit}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shrink-0"
          >
            <Pencil className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Edit Event</span>
          </Button>
        </div>

        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                {event.eventName}
              </CardTitle>
              <Badge className={statusColors[event.status]}>
                {event.status}
              </Badge>
            </div>
            <p className="text-sm text-neutral-500 mt-1">
              {event.communityLabel} · {event.chapterName}
            </p>
          </CardHeader>

          <CardContent className="pt-6 space-y-5">
            {/* Description */}
            {event.description && (
              <p className="text-neutral-700 text-sm leading-relaxed">
                {event.description}
              </p>
            )}

            <Separator />

            {/* Key details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff5f6d]/10">
                  <Calendar className="w-4 h-4 text-[#ff5f6d]" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                    Date &amp; Time
                  </p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-neutral-600">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff5f6d]/10">
                  <MapPin className="w-4 h-4 text-[#ff5f6d]" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-neutral-800">
                    {event.location}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Attendance */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#ff5f6d]" />
                <span className="text-sm font-medium text-neutral-700">
                  {event.attendeeCount} / {event.capacity} registered
                </span>
                <span className="text-xs text-neutral-500">
                  ({attendancePct}%)
                </span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(attendancePct, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
