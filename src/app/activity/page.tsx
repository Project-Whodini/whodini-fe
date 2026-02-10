"use client";

import { useState } from "react";
import {
  Activity,
  Heart,
  MessageSquare,
  Calendar,
  Gift,
  Users,
  Building2,
  Star,
  Clock,
  CheckCircle,
  Bell,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockActivities = {
  today: [
    {
      id: 1,
      type: "promotion",
      title: "Saved TechCorp promotion",
      description: "50% off AI Assistant launch offer",
      timestamp: "2 hours ago",
      icon: "💾",
      category: "Promotion",
      points: 10,
    },
    {
      id: 2,
      type: "community",
      title: "Joined Tech Innovators discussion",
      description: "Commented on 'Future of AI' thread",
      timestamp: "4 hours ago",
      icon: "💬",
      category: "Community",
      points: 5,
    },
    {
      id: 3,
      type: "event",
      title: "Checked into Design Workshop",
      description: "Successfully attended the event",
      timestamp: "6 hours ago",
      icon: "✅",
      category: "Event",
      points: 25,
    },
  ],
  thisWeek: [
    {
      id: 4,
      type: "subscription",
      title: "Subscribed to FashionForward",
      description: "Started receiving brand promotions",
      timestamp: "2 days ago",
      icon: "👗",
      category: "Subscription",
      points: 15,
    },
    {
      id: 5,
      type: "reward",
      title: "Redeemed coffee discount",
      description: "Used 500 points for 10% off at CoffeeHouse",
      timestamp: "3 days ago",
      icon: "☕",
      category: "Reward",
      points: -500,
    },
    {
      id: 6,
      type: "community",
      title: "Joined Fitness Warriors",
      description: "Became a member of the fitness community",
      timestamp: "4 days ago",
      icon: "💪",
      category: "Community",
      points: 20,
    },
    {
      id: 7,
      type: "event",
      title: "Registered for Tech Conference 2026",
      description: "Secured your spot for March 15, 2026",
      timestamp: "5 days ago",
      icon: "🚀",
      category: "Event",
      points: 15,
    },
  ],
  thisMonth: [
    {
      id: 8,
      type: "achievement",
      title: "Reached 1000 points milestone",
      description: "Congratulations on your activity!",
      timestamp: "1 week ago",
      icon: "🏆",
      category: "Achievement",
      points: 100,
    },
    {
      id: 9,
      type: "subscription",
      title: "Subscribed to BookWorld",
      description: "Started following book promotions",
      timestamp: "2 weeks ago",
      icon: "📚",
      category: "Subscription",
      points: 15,
    },
    {
      id: 10,
      type: "promotion",
      title: "Used Black Friday discount",
      description: "70% off electronics at ElectroShop",
      timestamp: "3 weeks ago",
      icon: "⚡",
      category: "Promotion",
      points: 50,
    },
  ],
};

const activityStats = {
  totalPoints: 2450,
  activitiesThisWeek: 12,
  communitiesJoined: 4,
  eventsAttended: 3,
};

type TabType = "today" | "thisWeek" | "thisMonth";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("today");

  const tabs = [
    { id: "today", label: "Today", count: mockActivities.today.length },
    {
      id: "thisWeek",
      label: "This Week",
      count: mockActivities.thisWeek.length,
    },
    {
      id: "thisMonth",
      label: "This Month",
      count: mockActivities.thisMonth.length,
    },
  ];

  const getActivityIcon = (category) => {
    switch (category) {
      case "Promotion":
        return <Gift className="w-4 h-4 text-[#ff5f6d]" />;
      case "Community":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "Event":
        return <Calendar className="w-4 h-4 text-green-500" />;
      case "Subscription":
        return <Building2 className="w-4 h-4 text-purple-500" />;
      case "Reward":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "Achievement":
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
            No activities{" "}
            {activeTab === "today"
              ? "today"
              : activeTab === "thisWeek"
                ? "this week"
                : "this month"}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card
            key={activity.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getActivityIcon(activity.category)}
                    <Badge variant="outline" className="text-xs">
                      {activity.category}
                    </Badge>
                    <span className="text-sm text-neutral-500">•</span>
                    <span className="text-xs text-neutral-500">
                      {activity.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        activity.points > 0
                          ? "bg-green-100 text-green-700"
                          : activity.points < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {activity.points > 0 ? "+" : ""}
                      {activity.points} points
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
        <h1 className="text-2xl font-semibold">Activity</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ff5f6d] mb-1">
              {activityStats.totalPoints.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Points</div>
          </div>
        </Card>

        <Card className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {activityStats.activitiesThisWeek}
            </div>
            <div className="text-sm text-neutral-600">This Week</div>
          </div>
        </Card>

        <Card className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {activityStats.communitiesJoined}
            </div>
            <div className="text-sm text-neutral-600">Communities</div>
          </div>
        </Card>

        <Card className="p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {activityStats.eventsAttended}
            </div>
            <div className="text-sm text-neutral-600">Events</div>
          </div>
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
                  ? "bg-white text-[#ff5f6d] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id
                    ? "bg-[#ff5f6d] text-white"
                    : "bg-neutral-200 text-neutral-600"
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
