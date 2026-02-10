"use client";

import { useState } from "react";
import {
  Bell,
  Heart,
  Clock,
  Building2,
  Gift,
  Percent,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockNotifications = {
  pending: [
    {
      id: 1,
      brand: "TechCorp",
      title: "New Product Launch - 50% Off",
      message:
        "Get early access to our revolutionary AI assistant with exclusive launch pricing.",
      type: "promotion",
      timestamp: "2 hours ago",
      expiresAt: "2 days" as string,
      icon: "🚀",
    },
    {
      id: 2,
      brand: "FashionForward",
      title: "Spring Collection Drop",
      message:
        "Be the first to shop our new spring collection with special member pricing.",
      type: "announcement",
      timestamp: "5 hours ago",
      expiresAt: "1 week" as string,
      icon: "👗",
    },
    {
      id: 3,
      brand: "FitLife Gym",
      title: "Community Event Invitation",
      message: "Join us for a free fitness bootcamp this Saturday at 9 AM.",
      type: "event",
      timestamp: "1 day ago",
      expiresAt: "3 days" as string,
      icon: "💪",
    },
  ],
  saved: [
    {
      id: 4,
      brand: "BookWorld",
      title: "Buy 2 Get 1 Free Books",
      message: "Mix and match any books in our store with this special offer.",
      type: "promotion",
      savedAt: "3 days ago",
      expiresAt: "1 month" as string,
      icon: "📚",
    },
    {
      id: 5,
      brand: "CoffeeHouse",
      title: "Free Coffee Friday",
      message:
        "Get a free coffee every Friday this month with your membership.",
      type: "promotion",
      savedAt: "1 week ago",
      expiresAt: "2 weeks" as string,
      icon: "☕",
    },
  ],
  expired: [
    {
      id: 6,
      brand: "ElectroShop",
      title: "Black Friday Sale",
      message: "Up to 70% off on all electronics and gadgets.",
      type: "promotion",
      expiredAt: "2 weeks ago",
      icon: "⚡",
    },
  ],
};

type TabType = "pending" | "saved" | "expired";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");

  const tabs = [
    {
      id: "pending",
      label: "Pending",
      count: mockNotifications.pending.length,
    },
    { id: "saved", label: "Saved", count: mockNotifications.saved.length },
    {
      id: "expired",
      label: "Expired",
      count: mockNotifications.expired.length,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "promotion":
        return <Gift className="w-4 h-4 text-[#ff5f6d]" />;
      case "event":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "announcement":
        return <Bell className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-neutral-500" />;
    }
  };

  const renderNotifications = () => {
    const notifications = mockNotifications[activeTab];

    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
            <Bell className="w-8 h-8 text-neutral-400" />
          </div>
          <p className="text-neutral-500">No {activeTab} notifications</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{notification.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-neutral-400" />
                      <span className="text-sm font-medium text-neutral-600">
                        {notification.brand}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-semibold text-neutral-900 mb-2">
                      {notification.title}
                    </CardTitle>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getNotificationIcon(notification.type)}
                  <Badge variant="outline" className="text-xs capitalize">
                    {notification.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activeTab === "pending" &&
                      (notification as (typeof mockNotifications.pending)[0])
                        .timestamp}
                    {activeTab === "saved" &&
                      `Saved ${(notification as (typeof mockNotifications.saved)[0]).savedAt}`}
                    {activeTab === "expired" &&
                      `Expired ${(notification as (typeof mockNotifications.expired)[0]).expiredAt}`}
                  </div>
                  {(activeTab === "pending" || activeTab === "saved") && (
                    <div className="flex items-center gap-1">
                      <span>
                        Expires in{" "}
                        {activeTab === "pending"
                          ? (
                              notification as (typeof mockNotifications.pending)[0]
                            ).expiresAt
                          : (
                              notification as (typeof mockNotifications.saved)[0]
                            ).expiresAt}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {activeTab === "pending" && (
                    <>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                      >
                        View
                      </Button>
                    </>
                  )}
                  {activeTab === "saved" && (
                    <Button
                      size="sm"
                      className="text-xs bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                    >
                      Use Now
                    </Button>
                  )}
                  {activeTab === "expired" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      disabled
                    >
                      Expired
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Brand Notifications
        </h1>
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
              {tab.count > 0 && (
                <span
                  className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-[#ff5f6d] text-white"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications Content */}
      {renderNotifications()}
    </div>
  );
}
