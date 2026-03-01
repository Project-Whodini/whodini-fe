'use client';

import {
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  MobileMetrics,
  type MobileMetricItem,
} from '@/components/app/MobileMetrics';

const forums = [
  {
    id: 1,
    title: 'AI in Business',
    posts: 245,
    lastActive: '2 hours ago',
    category: 'Technology',
  },
  {
    id: 2,
    title: 'Leadership & Growth',
    posts: 189,
    lastActive: '5 hours ago',
    category: 'Career',
  },
  {
    id: 3,
    title: 'Startup Funding',
    posts: 134,
    lastActive: '1 day ago',
    category: 'Finance',
  },
  {
    id: 4,
    title: 'Product Design',
    posts: 98,
    lastActive: '1 day ago',
    category: 'Design',
  },
  {
    id: 5,
    title: 'Remote Work Best Practices',
    posts: 76,
    lastActive: '2 days ago',
    category: 'Productivity',
  },
];

export default function CommunityDashboardPage() {
  const communityName = 'Digital Innovators Community';
  const totalMembers = 2847;
  const totalChapters = 8;
  const totalEvents = 12;

  const mobileMetrics: MobileMetricItem[] = [
    {
      label: 'Members',
      value: totalMembers.toLocaleString(),
    },
    {
      label: 'Chapters',
      value: totalChapters,
    },
    {
      label: 'Events',
      value: totalEvents,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Dashboard
          </h1>
          <p className="text-neutral-600 mt-1 text-sm sm:text-base">
            Welcome to <span className="font-semibold">{communityName}</span>
          </p>
        </div>

        {/* Mobile metrics strip */}
        <MobileMetrics items={mobileMetrics} />

        {/* Desktop stat cards */}
        <div className="hidden sm:grid grid-cols-3 gap-4 sm:gap-6">
          {/* Events */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Events
                </CardTitle>
                <Calendar className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-900">
                {totalEvents}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Total events</p>
            </CardContent>
          </Card>

          {/* Chapters */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Chapters
                </CardTitle>
                <BookOpen className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-900">
                {totalChapters}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Active chapters</p>
            </CardContent>
          </Card>

          {/* Members */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Members
                </CardTitle>
                <Users className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-900">
                {totalMembers.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Growing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Forums list */}
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-[#ff5f6d]" />
                  Forums
                </CardTitle>
                <CardDescription className="mt-1">
                  Active discussion topics in the community
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex border-neutral-300"
              >
                View All
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {forums.map((forum) => (
                <div
                  key={forum.id}
                  className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg bg-[#ff5f6d]/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-[#ff5f6d]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {forum.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Last active {forum.lastActive}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <Badge
                      variant="outline"
                      className="hidden sm:inline-flex text-xs border-neutral-200 text-neutral-600"
                    >
                      {forum.category}
                    </Badge>
                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                      {forum.posts} posts
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:hidden px-4 py-3 border-t border-neutral-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-neutral-300"
              >
                View All Forums
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
