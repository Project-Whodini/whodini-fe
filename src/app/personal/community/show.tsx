'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Users, MapPin, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type CommunityDetail = {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  tags: string[];
  location: string;
  followed: boolean;
  isMember: boolean;
  recentActivities: Array<{
    id: number;
    title: string;
    timestamp: string;
  }>;
};

export default function CommunityShowPage() {
  const [community, setCommunity] = useState<CommunityDetail | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('whodini:selected-community');
    if (!raw) return;

    try {
      setCommunity(JSON.parse(raw) as CommunityDetail);
    } catch {
      setCommunity(null);
    }
  }, []);

  const goBack = () => {
    const navigationEvent = new CustomEvent('whodini:navigate', {
      detail: { path: '/community' },
      cancelable: true,
    });

    window.dispatchEvent(navigationEvent);
  };

  if (!community) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardContent className="py-8 sm:py-10 text-center space-y-3">
            <Users className="w-10 h-10 text-neutral-400 mx-auto" />
            <p className="text-neutral-600">No community selected.</p>
            <Button
              onClick={goBack}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Community
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          Community Profile
        </h1>
        <Button onClick={goBack} variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="text-4xl">{community.image}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
                {community.name}
              </CardTitle>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                {community.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                <MapPin className="w-4 h-4" />
                {community.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                <Users className="w-4 h-4" />
                {community.members.toLocaleString()} members
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {community.category}
                </Badge>
                {community.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {community.followed && (
                  <Badge className="text-xs">Followed</Badge>
                )}
                {community.isMember && (
                  <Badge className="text-xs bg-emerald-600 text-white">
                    Member
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#ff5f6d]" />
            Last 3 Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {community.recentActivities.slice(0, 3).map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 border border-neutral-200 rounded-lg p-3"
            >
              <p className="text-sm text-neutral-800">{activity.title}</p>
              <span className="text-xs text-neutral-500 whitespace-nowrap">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
