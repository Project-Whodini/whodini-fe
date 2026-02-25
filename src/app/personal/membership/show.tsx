'use client';

import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type MembershipCommunity = {
  id: string;
  name: string;
  category: string;
  description: string;
  members: number;
  location: string;
  joined: boolean;
};

export type MembershipEvent = {
  id: string;
  title: string;
  type: string;
  description: string;
  date: string;
  venue: string;
  registered: boolean;
  attended: boolean;
};

export type MembershipSelection =
  | { type: 'community'; data: MembershipCommunity }
  | { type: 'event'; data: MembershipEvent };

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

type ShowMembershipItemProps = {
  item: MembershipSelection;
  onClose: () => void;
};

export function ShowMembershipItem({ item, onClose }: ShowMembershipItemProps) {
  if (item.type === 'community') {
    const community = item.data;

    return (
      <Card className="max-w-3xl mx-auto border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader className="space-y-4 border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
          <Button
            variant="ghost"
            className="w-fit text-neutral-700 hover:text-neutral-900"
            onClick={onClose}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Memberships
          </Button>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">{community.name}</CardTitle>
              <p className="text-sm text-neutral-600 mt-1">
                {community.description}
              </p>
            </div>
            <Badge variant="outline">{community.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-neutral-700">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{community.members.toLocaleString()} total members</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{community.location}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white">
              {community.joined ? 'You are a Member' : 'Become a Member'}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border border-neutral-300 hover:bg-neutral-50"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const event = item.data;

  return (
    <Card className="max-w-3xl mx-auto border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader className="space-y-4 border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
        <Button
          variant="ghost"
          className="w-fit text-neutral-700 hover:text-neutral-900"
          onClick={onClose}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Memberships
        </Button>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-2xl">{event.title}</CardTitle>
            <p className="text-sm text-neutral-600 mt-1">{event.description}</p>
          </div>
          <Badge variant="outline">{event.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-neutral-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {event.attended ? 'Attended' : 'Upcoming'}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white">
            {event.registered ? 'Registered' : 'Join Event'}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border border-neutral-300 hover:bg-neutral-50"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
