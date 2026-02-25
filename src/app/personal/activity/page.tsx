'use client';

import { useState } from 'react';
import {
  Activity,
  Calendar,
  Gift,
  Users,
  Building2,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockActivities = {
  today: [
    {
      id: 1,
      type: 'follow',
      title: 'Followed TechCorp',
      description: 'Started following brand updates and offers',
      timestamp: '2 hours ago',
      icon: '🔔',
      category: 'Follow',
    },
    {
      id: 2,
      type: 'involved',
      title: 'Involved in Tech Innovators discussion',
      description: "Commented on 'Future of AI' thread",
      timestamp: '4 hours ago',
      icon: '💬',
      category: 'Involved',
    },
    {
      id: 3,
      type: 'event',
      title: 'Checked in to Design Workshop',
      description: 'Attendance recorded successfully',
      timestamp: '6 hours ago',
      icon: '✅',
      category: 'Event',
    },
  ],
  thisWeek: [
    {
      id: 4,
      type: 'subscription',
      title: 'Subscribed to FashionForward',
      description: 'Subscription activated',
      timestamp: '2 days ago',
      icon: '👗',
      category: 'Subscription',
    },
    {
      id: 5,
      type: 'follow',
      title: 'Followed CoffeeHouse',
      description: 'Added to followed brands',
      timestamp: '3 days ago',
      icon: '☕',
      category: 'Follow',
    },
    {
      id: 6,
      type: 'community',
      title: 'Joined Fitness Warriors',
      description: 'Became a member of the fitness community',
      timestamp: '4 days ago',
      icon: '💪',
      category: 'Community',
    },
    {
      id: 7,
      type: 'event',
      title: 'Registered for Tech Conference 2026',
      description: 'Secured your spot for March 15, 2026',
      timestamp: '5 days ago',
      icon: '🚀',
      category: 'Event',
    },
  ],
  thisMonth: [
    {
      id: 8,
      type: 'subscription',
      title: 'Subscribed to Weekly Product Digest',
      description: 'Email digest subscription enabled',
      timestamp: '1 week ago',
      icon: '📬',
      category: 'Subscription',
    },
    {
      id: 9,
      type: 'subscription',
      title: 'Subscribed to BookWorld',
      description: 'Subscription activated',
      timestamp: '2 weeks ago',
      icon: '📚',
      category: 'Subscription',
    },
    {
      id: 10,
      type: 'involved',
      title: 'Involved in ElectroShop campaign',
      description: 'Reacted and shared campaign post',
      timestamp: '3 weeks ago',
      icon: '⚡',
      category: 'Involved',
    },
  ],
};

const activityStats = {
  subscriptions: 8,
  follows: 9,
  involvedActions: 7,
};

type TabType = 'today' | 'thisWeek' | 'thisMonth';

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('today');

  const tabs = [
    { id: 'today', label: 'Today', count: mockActivities.today.length },
    {
      id: 'thisWeek',
      label: 'This Week',
      count: mockActivities.thisWeek.length,
    },
    {
      id: 'thisMonth',
      label: 'This Month',
      count: mockActivities.thisMonth.length,
    },
  ];

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'Promotion':
        return <Gift className="w-4 h-4 text-[#ff5f6d]" />;
      case 'Follow':
        return <Gift className="w-4 h-4 text-[#ff5f6d]" />;
      case 'Community':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'Event':
        return <Calendar className="w-4 h-4 text-green-500" />;
      case 'Subscription':
        return <Building2 className="w-4 h-4 text-purple-500" />;
      case 'Involved':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'Reward':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'Achievement':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      default:
        return <Activity className="w-4 h-4 text-neutral-500" />;
    }
  };

  const renderActivities = () => {
    const activities = mockActivities[activeTab];

    if (activities.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
            <Activity className="w-8 h-8 text-neutral-400" />
          </div>
          <p className="text-neutral-500">
            No activities{' '}
            {activeTab === 'today'
              ? 'today'
              : activeTab === 'thisWeek'
                ? 'this week'
                : 'this month'}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="border border-neutral-200/80 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all"
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {getActivityIcon(activity.category)}
                    <Badge
                      variant="outline"
                      className="text-[11px] rounded-full px-2.5 border-neutral-300"
                    >
                      {activity.category}
                    </Badge>
                    <span className="text-[11px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                      {activity.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 text-sm sm:text-base mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="text-[11px] px-2.5 py-1 rounded-full bg-[#ff5f6d]/10 text-[#e04a58] font-medium">
                      Transaction log entry
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-[#ff5f6d]" />
        <h1 className="text-2xl font-semibold">Transaction Log</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <Card className="p-3.5 sm:p-4 border border-blue-100 rounded-xl bg-gradient-to-b from-blue-50/60 to-white shadow-sm">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl font-bold text-blue-500 leading-none">
                {activityStats.subscriptions}
              </div>
            </div>
            <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              Logs
            </span>
          </div>
          <div className="text-sm text-neutral-600">Subscriptions</div>
        </Card>

        <Card className="p-3.5 sm:p-4 border border-green-100 rounded-xl bg-gradient-to-b from-green-50/60 to-white shadow-sm">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-green-100 text-green-600 flex items-center justify-center">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl font-bold text-green-500 leading-none">
                {activityStats.follows}
              </div>
            </div>
            <span className="text-[11px] text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
              Logs
            </span>
          </div>
          <div className="text-sm text-neutral-600">Follows</div>
        </Card>

        <Card className="p-3.5 sm:p-4 border border-orange-100 rounded-xl bg-gradient-to-b from-orange-50/60 to-white shadow-sm">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="text-xl font-bold text-orange-500 leading-none">
                {activityStats.involvedActions}
              </div>
            </div>
            <span className="text-[11px] text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              Logs
            </span>
          </div>
          <div className="text-sm text-neutral-600">Involved</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#ff5f6d] shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-[#ff5f6d] text-white'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities Timeline */}
      {renderActivities()}
    </div>
  );
}
