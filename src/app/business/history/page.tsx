"use client";

import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Bell,
  UserPlus,
  UserMinus,
  FileText,
  Settings,
  ShoppingCart,
  Star,
  Search,
  Calendar,
  TrendingUp,
  Activity,
  Download,
} from "lucide-react";

// TypeScript interfaces
interface BusinessEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
  metadata?: Record<string, string | number | boolean | string[]>;
  importance: "low" | "medium" | "high";
}

type EventType =
  | "subscriber_added"
  | "subscriber_removed"
  | "notification_sent"
  | "sale_completed"
  | "team_member_added"
  | "team_member_removed"
  | "settings_changed"
  | "content_updated"
  | "review_received"
  | "milestone_reached";

interface EventStats {
  totalEvents: number;
  todayEvents: number;
  weekEvents: number;
  monthEvents: number;
}

// Static data for business history
const businessEvents: BusinessEvent[] = [
  {
    id: "1",
    type: "milestone_reached",
    title: "1000 Subscribers Milestone",
    description:
      "Your business has reached 1,000 subscribers! This is a significant achievement.",
    timestamp: "2024-02-12T10:30:00Z",
    importance: "high",
    metadata: { milestone_type: "subscribers", count: 1000 },
  },
  {
    id: "2",
    type: "notification_sent",
    title: "Flash Sale Notification Sent",
    description:
      "Promotional notification sent to 1,247 subscribers about the 50% off flash sale.",
    timestamp: "2024-02-11T14:30:00Z",
    actor: "Sarah Chen",
    importance: "medium",
    metadata: { recipients: 1247, type: "promotional" },
  },
  {
    id: "3",
    type: "subscriber_added",
    title: "New Premium Subscriber",
    description: "David Park upgraded to Premium subscription tier.",
    timestamp: "2024-02-11T09:20:00Z",
    importance: "medium",
    metadata: { subscriber_tier: "Premium", revenue: 29.99 },
  },
  {
    id: "4",
    type: "team_member_added",
    title: "Team Member Invited",
    description:
      "Lisa Wang was invited to join the team as a Viewer in the Analytics department.",
    timestamp: "2024-02-10T16:45:00Z",
    actor: "Alex Johnson",
    importance: "medium",
    metadata: { role: "Viewer", department: "Analytics" },
  },
  {
    id: "5",
    type: "sale_completed",
    title: "Large Order Completed",
    description: "Premium package sale worth $299.99 completed successfully.",
    timestamp: "2024-02-10T11:15:00Z",
    importance: "high",
    metadata: { amount: 299.99, currency: "USD", product: "Premium Package" },
  },
  {
    id: "6",
    type: "review_received",
    title: "5-Star Review Received",
    description:
      "Excellent service! The premium features are exactly what I needed for my business.",
    timestamp: "2024-02-09T14:22:00Z",
    importance: "medium",
    metadata: { rating: 5, reviewer: "Emily Davis" },
  },
  {
    id: "7",
    type: "content_updated",
    title: "Business Profile Updated",
    description: "Business description and contact information were updated.",
    timestamp: "2024-02-09T09:30:00Z",
    actor: "Sarah Chen",
    importance: "low",
    metadata: { sections_updated: ["description", "contact_info"] },
  },
  {
    id: "8",
    type: "subscriber_removed",
    title: "Subscription Cancelled",
    description:
      "Emily Rodriguez cancelled their Basic subscription citing pricing concerns.",
    timestamp: "2024-02-08T16:45:00Z",
    importance: "medium",
    metadata: { tier: "Basic", reason: "pricing_concerns" },
  },
  {
    id: "9",
    type: "notification_sent",
    title: "Maintenance Notice Sent",
    description:
      "Urgent notification sent to 2,134 subscribers about scheduled maintenance.",
    timestamp: "2024-02-08T16:45:00Z",
    actor: "Alex Johnson",
    importance: "high",
    metadata: { recipients: 2134, type: "urgent" },
  },
  {
    id: "10",
    type: "settings_changed",
    title: "Notification Settings Updated",
    description:
      "Default notification preferences were updated for new subscribers.",
    timestamp: "2024-02-07T13:20:00Z",
    actor: "Sarah Chen",
    importance: "low",
    metadata: { setting_type: "notifications" },
  },
  {
    id: "11",
    type: "sale_completed",
    title: "Standard Package Sale",
    description: "Standard subscription package sold for $14.99/month.",
    timestamp: "2024-02-07T10:45:00Z",
    importance: "medium",
    metadata: { amount: 14.99, currency: "USD", product: "Standard Package" },
  },
  {
    id: "12",
    type: "subscriber_added",
    title: "New Standard Subscriber",
    description: "Mike Chen subscribed to Standard tier with monthly billing.",
    timestamp: "2024-02-06T15:30:00Z",
    importance: "medium",
    metadata: { subscriber_tier: "Standard", revenue: 14.99 },
  },
];

const getEventIcon = (type: EventType) => {
  switch (type) {
    case "subscriber_added":
      return <UserPlus className="h-4 w-4 text-green-600" />;
    case "subscriber_removed":
      return <UserMinus className="h-4 w-4 text-red-600" />;
    case "notification_sent":
      return <Bell className="h-4 w-4 text-blue-600" />;
    case "sale_completed":
      return <ShoppingCart className="h-4 w-4 text-green-600" />;
    case "team_member_added":
      return <UserPlus className="h-4 w-4 text-blue-600" />;
    case "team_member_removed":
      return <UserMinus className="h-4 w-4 text-red-600" />;
    case "settings_changed":
      return <Settings className="h-4 w-4 text-gray-600" />;
    case "content_updated":
      return <FileText className="h-4 w-4 text-orange-600" />;
    case "review_received":
      return <Star className="h-4 w-4 text-yellow-600" />;
    case "milestone_reached":
      return <TrendingUp className="h-4 w-4 text-purple-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-600" />;
  }
};

const getEventTypeLabel = (type: EventType): string => {
  const labels: Record<EventType, string> = {
    subscriber_added: "Subscriber Added",
    subscriber_removed: "Subscriber Removed",
    notification_sent: "Notification Sent",
    sale_completed: "Sale Completed",
    team_member_added: "Team Member Added",
    team_member_removed: "Team Member Removed",
    settings_changed: "Settings Changed",
    content_updated: "Content Updated",
    review_received: "Review Received",
    milestone_reached: "Milestone Reached",
  };
  return labels[type];
};

const getImportanceBadge = (importance: BusinessEvent["importance"]) => {
  switch (importance) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="outline">Medium</Badge>;
    case "low":
      return <Badge variant="secondary">Low</Badge>;
  }
};

export default function BusinessHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<EventType | "all">("all");
  const [filterImportance, setFilterImportance] = useState<
    BusinessEvent["importance"] | "all"
  >("all");
  const [dateFilter, setDateFilter] = useState<
    "all" | "today" | "week" | "month"
  >("all");

  const filteredEvents = businessEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.actor &&
        event.actor.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "all" || event.type === filterType;
    const matchesImportance =
      filterImportance === "all" || event.importance === filterImportance;

    let matchesDate = true;
    const eventDate = new Date(event.timestamp);
    const now = new Date();

    if (dateFilter === "today") {
      matchesDate = eventDate.toDateString() === now.toDateString();
    } else if (dateFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      matchesDate = eventDate >= weekAgo;
    } else if (dateFilter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      matchesDate = eventDate >= monthAgo;
    }

    return matchesSearch && matchesType && matchesImportance && matchesDate;
  });

  const now = new Date();

  const eventStats: EventStats = {
    totalEvents: businessEvents.length,
    todayEvents: businessEvents.filter(
      (e) => new Date(e.timestamp).toDateString() === now.toDateString(),
    ).length,
    weekEvents: businessEvents.filter((e) => {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return new Date(e.timestamp) >= weekAgo;
    }).length,
    monthEvents: businessEvents.filter((e) => {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return new Date(e.timestamp) >= monthAgo;
    }).length,
  };

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              Business History
            </h1>
            <p className="text-neutral-600">
              Track all business activities, events, and changes over time
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Events
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventStats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventStats.todayEvents}</div>
              <p className="text-xs text-muted-foreground">Events today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventStats.weekEvents}</div>
              <p className="text-xs text-muted-foreground">Past 7 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventStats.monthEvents}</div>
              <p className="text-xs text-muted-foreground">Past 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Events</CardTitle>
            <CardDescription>
              Search and filter through your business activity history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as EventType | "all")
                }
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Event Types</option>
                <option value="subscriber_added">Subscriber Added</option>
                <option value="subscriber_removed">Subscriber Removed</option>
                <option value="notification_sent">Notification Sent</option>
                <option value="sale_completed">Sale Completed</option>
                <option value="team_member_added">Team Member Added</option>
                <option value="milestone_reached">Milestone Reached</option>
              </select>

              <select
                value={filterImportance}
                onChange={(e) =>
                  setFilterImportance(
                    e.target.value as BusinessEvent["importance"] | "all",
                  )
                }
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Importance</option>
                <option value="high">High Importance</option>
                <option value="medium">Medium Importance</option>
                <option value="low">Low Importance</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(
                    e.target.value as "all" | "today" | "week" | "month",
                  )
                }
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity Timeline
            </CardTitle>
            <CardDescription>
              {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Timeline Line */}
                  {index !== filteredEvents.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
                  )}

                  {/* Event Item */}
                  <div className="flex items-start gap-4">
                    {/* Event Icon */}
                    <div className="shrink-0 w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                      {getEventIcon(event.type)}
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-lg">
                                {event.title}
                              </h3>
                              <Badge variant="outline">
                                {getEventTypeLabel(event.type)}
                              </Badge>
                              {getImportanceBadge(event.importance)}
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                              {event.description}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                              {event.actor && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {event.actor}
                                </span>
                              )}
                            </div>

                            {/* Event Metadata */}
                            {event.metadata && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                  {Object.entries(event.metadata).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex justify-between"
                                      >
                                        <span className="text-gray-500 capitalize">
                                          {key.replace("_", " ")}:
                                        </span>
                                        <span className="font-medium">
                                          {typeof value === "number" &&
                                          key.includes("amount")
                                            ? `$${value}`
                                            : String(value)}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No events found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more events
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RequireSession>
  );
}
