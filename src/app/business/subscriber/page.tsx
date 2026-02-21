"use client";

import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Star,
  Clock,
  Heart,
  Bell,
  Mail,
  TrendingUp,
  Gift,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Static data for subscribers
const subscribers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    digitalId: "@sarahj",
    tier: "Premium",
    subscribedAt: "2024-01-15",
    status: "active",
    color: "bg-blue-500",
    lastActivity: "2024-02-10T14:30:00Z",
    totalSpent: 299.99,
    nextBilling: "2024-03-15",
    monthlyValue: "$29.99",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    digitalId: "@mikechen",
    tier: "Standard",
    subscribedAt: "2024-02-01",
    status: "active",
    color: "bg-green-500",
    lastActivity: "2024-02-09T10:15:00Z",
    totalSpent: 149.99,
    nextBilling: "2024-03-01",
    monthlyValue: "$14.99",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    digitalId: "@emilyrod",
    tier: "Basic",
    subscribedAt: "2024-01-20",
    status: "cancelled",
    color: "bg-red-500",
    lastActivity: "2024-02-05T16:45:00Z",
    totalSpent: 99.99,
    nextBilling: null,
    monthlyValue: "$9.99",
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@email.com",
    digitalId: "@davidp",
    tier: "Premium",
    subscribedAt: "2024-02-10",
    status: "active",
    color: "bg-purple-500",
    lastActivity: "2024-02-11T09:20:00Z",
    totalSpent: 59.98,
    nextBilling: "2024-03-10",
    monthlyValue: "$29.99",
  },
];

// Static data for subscriber activities
const subscriberActivities = [
  {
    id: "1",
    type: "subscription",
    subscriber: "David Park",
    action: "New Premium Subscription",
    timestamp: "2024-02-10T14:30:00Z",
    description: "Upgraded from Standard to Premium tier",
  },
  {
    id: "2",
    type: "engagement",
    subscriber: "Sarah Johnson",
    action: "High Engagement Activity",
    timestamp: "2024-02-09T16:00:00Z",
    description: "Completed 5 premium workshop sessions this week",
  },
  {
    id: "3",
    type: "cancellation",
    subscriber: "Emily Rodriguez",
    action: "Subscription Cancelled",
    timestamp: "2024-02-08T10:00:00Z",
    description: "Cancelled Basic tier subscription - cited pricing concerns",
  },
  {
    id: "4",
    type: "payment",
    subscriber: "Mike Chen",
    action: "Payment Received",
    timestamp: "2024-02-07T12:30:00Z",
    description: "Monthly subscription payment processed successfully",
  },
];

// Static analytics data
const engagementMetrics = [
  {
    id: "1",
    metric: "Churn Risk",
    count: 2,
    description: "Subscribers likely to cancel soon",
    trend: "up",
    color: "bg-red-500",
  },
  {
    id: "2",
    metric: "Payment Issues",
    count: 1,
    description: "Failed payment attempts this month",
    trend: "down",
    color: "bg-orange-500",
  },
];

export default function SubscriberPage() {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "cancelled"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.tier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const totalRevenue = subscribers
    .filter((s) => s.status === "active")
    .reduce(
      (sum, s) => sum + parseFloat(s.monthlyValue.replace(/[^0-9.]/g, "")),
      0,
    );

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Subscriber Management
          </h1>
          <p className="text-neutral-600">
            Monitor your subscribers and track subscription performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscribers
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "cancelled" ? "default" : "outline"}
              onClick={() => setFilterStatus("cancelled")}
              size="sm"
            >
              Cancelled
            </Button>
          </div>
        </div>

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
            <CardDescription>
              {filteredSubscribers.length} subscriber
              {filteredSubscribers.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-lg">
                          {subscriber.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {subscriber.email} · {subscriber.digitalId}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            subscriber.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {subscriber.status}
                        </Badge>
                        <Badge variant="outline">{subscriber.tier}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Monthly Value</p>
                        <p className="font-medium">{subscriber.monthlyValue}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Spent</p>
                        <p className="font-medium">${subscriber.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Subscribed</p>
                        <p className="font-medium">
                          {new Date(
                            subscriber.subscribedAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Activity</p>
                        <p className="font-medium">
                          {new Date(
                            subscriber.lastActivity,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {subscriber.nextBilling && (
                      <div className="text-sm">
                        <span className="text-gray-500">Next billing: </span>
                        <span className="font-medium">
                          {new Date(
                            subscriber.nextBilling,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    {subscriber.status === "active" ? (
                      <>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">Re-engage</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Subscriber Analytics
            </CardTitle>
            <CardDescription>
              Key metrics and insights about your subscriber base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {engagementMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{metric.metric}</h4>
                    <div className={`w-3 h-3 rounded-full ${metric.color}`} />
                  </div>

                  <div className="text-2xl font-bold mb-1">{metric.count}</div>

                  <p className="text-sm text-gray-600 mb-3">
                    {metric.description}
                  </p>

                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`h-3 w-3 ${
                        metric.trend === "up"
                          ? "text-green-500"
                          : metric.trend === "down"
                            ? "text-red-500"
                            : "text-gray-400"
                      }`}
                    />
                    <span className="text-xs text-gray-500">
                      {metric.trend === "up"
                        ? "Increasing"
                        : metric.trend === "down"
                          ? "Decreasing"
                          : "Stable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RequireSession>
  );
}
