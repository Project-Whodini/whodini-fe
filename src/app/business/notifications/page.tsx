"use client";

import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Send,
  MapPin,
  Clock,
  Target,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Megaphone,
  Calendar,
  Search,
} from "lucide-react";

// TypeScript interfaces
interface NotificationForm {
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  locationRadius: string;
  scheduledTime?: string;
  actionUrl?: string;
  imageUrl?: string;
}

type NotificationType = "promotional" | "informational" | "urgent" | "event";
type AudienceType =
  | "all_subscribers"
  | "location_based"
  | "premium_only"
  | "new_subscribers";

interface SentNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  sentAt: string;
  delivered: number;
  opened: number;
  clicked: number;
  status: "sent" | "scheduled" | "draft" | "failed";
}

// Static data for sent notifications
const sentNotifications: SentNotification[] = [
  {
    id: "1",
    title: "Flash Sale: 50% Off Everything!",
    message:
      "Don't miss our biggest sale of the year! Use code SAVE50 for 50% off all items. Valid until midnight!",
    type: "promotional",
    audience: "all_subscribers",
    sentAt: "2024-02-11T14:30:00Z",
    delivered: 1247,
    opened: 423,
    clicked: 89,
    status: "sent",
  },
  {
    id: "2",
    title: "New Product Launch: Smart Fitness Tracker",
    message:
      "Introducing our latest innovation! The SmartFit Pro is now available with exclusive early access for our premium members.",
    type: "informational",
    audience: "premium_only",
    sentAt: "2024-02-10T09:15:00Z",
    delivered: 356,
    opened: 234,
    clicked: 67,
    status: "sent",
  },
  {
    id: "3",
    title: "Store Opening - Grand Celebration!",
    message:
      "Join us for the grand opening of our new downtown location! Free samples, live music, and exclusive opening day discounts.",
    type: "event",
    audience: "location_based",
    sentAt: "2024-02-09T12:00:00Z",
    delivered: 892,
    opened: 445,
    clicked: 178,
    status: "sent",
  },
  {
    id: "4",
    title: "Important: Service Maintenance Notice",
    message:
      "Our services will be temporarily unavailable tonight from 11 PM to 3 AM for scheduled maintenance. We apologize for any inconvenience.",
    type: "urgent",
    audience: "all_subscribers",
    sentAt: "2024-02-08T16:45:00Z",
    delivered: 2134,
    opened: 1567,
    clicked: 234,
    status: "sent",
  },
  {
    id: "5",
    title: "Welcome to Our Community!",
    message:
      "Thank you for subscribing! Here's a special 20% discount code just for you: WELCOME20",
    type: "promotional",
    audience: "new_subscribers",
    sentAt: "2024-02-07T10:30:00Z",
    delivered: 156,
    opened: 134,
    clicked: 67,
    status: "sent",
  },
];

const getNotificationTypeColor = (type: NotificationType): string => {
  switch (type) {
    case "promotional":
      return "bg-green-500";
    case "informational":
      return "bg-blue-500";
    case "urgent":
      return "bg-red-500";
    case "event":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const getNotificationTypeIcon = (type: NotificationType) => {
  switch (type) {
    case "promotional":
      return <Megaphone className="h-4 w-4" />;
    case "informational":
      return <Info className="h-4 w-4" />;
    case "urgent":
      return <AlertCircle className="h-4 w-4" />;
    case "event":
      return <Calendar className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default function BusinessNotificationPage() {
  const [formData, setFormData] = useState<NotificationForm>({
    title: "",
    message: "",
    type: "informational",
    audience: "all_subscribers",
    locationRadius: "5",
    scheduledTime: "",
    actionUrl: "",
    imageUrl: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<NotificationType | "all">("all");

  const handleInputChange = (field: keyof NotificationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo purpose - simulate sending notification
    console.log("Sending notification:", formData);
    alert("Notification sent successfully! (Demo)");

    // Reset form
    setFormData({
      title: "",
      message: "",
      type: "informational",
      audience: "all_subscribers",
      locationRadius: "5",
      scheduledTime: "",
      actionUrl: "",
      imageUrl: "",
    });
  };

  const filteredNotifications = sentNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || notification.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalDelivered = sentNotifications.reduce(
    (sum, notif) => sum + notif.delivered,
    0,
  );
  const totalOpened = sentNotifications.reduce(
    (sum, notif) => sum + notif.opened,
    0,
  );
  const avgOpenRate =
    totalDelivered > 0
      ? ((totalOpened / totalDelivered) * 100).toFixed(1)
      : "0";

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Notification Center
          </h1>
          <p className="text-neutral-600">
            Create and send notifications to your subscribers and nearby users
          </p>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sentNotifications.length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalDelivered.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total recipients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgOpenRate}%</div>
              <p className="text-xs text-muted-foreground">Average open rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalDelivered > 0
                  ? (
                      (sentNotifications.reduce(
                        (sum, notif) => sum + notif.clicked,
                        0,
                      ) /
                        totalDelivered) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </div>
              <p className="text-xs text-muted-foreground">
                Average click rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Create New Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Create New Notification
            </CardTitle>
            <CardDescription>
              Compose and send notifications to your audience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Notification Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="message">Message *</Label>
                  <textarea
                    id="message"
                    placeholder="Write your notification message..."
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Notification Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="informational">Informational</option>
                    <option value="promotional">Promotional</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Event</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <select
                    id="audience"
                    value={formData.audience}
                    onChange={(e) =>
                      handleInputChange(
                        "audience",
                        e.target.value as AudienceType,
                      )
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all_subscribers">All Subscribers</option>
                    <option value="location_based">Location-Based Users</option>
                    <option value="premium_only">
                      Premium Subscribers Only
                    </option>
                    <option value="new_subscribers">New Subscribers</option>
                  </select>
                </div>

                {formData.audience === "location_based" && (
                  <div>
                    <Label
                      htmlFor="locationRadius"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Location Radius (km)
                    </Label>
                    <Input
                      id="locationRadius"
                      type="number"
                      placeholder="5"
                      value={formData.locationRadius}
                      onChange={(e) =>
                        handleInputChange("locationRadius", e.target.value)
                      }
                      className="mt-1"
                      min="1"
                      max="100"
                    />
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="scheduledTime"
                    className="flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Schedule Time (Optional)
                  </Label>
                  <Input
                    id="scheduledTime"
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      handleInputChange("scheduledTime", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="actionUrl">Action URL (Optional)</Label>
                  <Input
                    id="actionUrl"
                    placeholder="https://yourstore.com/special-offer"
                    value={formData.actionUrl}
                    onChange={(e) =>
                      handleInputChange("actionUrl", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              {/* Preview Section */}
              {showPreview && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Notification Preview
                  </h3>
                  <div className="border rounded-lg p-4 bg-white shadow-sm max-w-sm">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${getNotificationTypeColor(formData.type)} text-white`}
                      >
                        {getNotificationTypeIcon(formData.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {formData.title || "Notification Title"}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.message ||
                            "Your notification message will appear here..."}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Just now</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>

                <div className="flex gap-4">
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    {formData.scheduledTime
                      ? "Schedule Notification"
                      : "Send Now"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sent Notifications History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Notification History
                </CardTitle>
                <CardDescription>
                  View and manage your sent notifications
                </CardDescription>
              </div>

              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>

                <select
                  value={filterType}
                  onChange={(e) =>
                    setFilterType(e.target.value as NotificationType | "all")
                  }
                  className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="promotional">Promotional</option>
                  <option value="informational">Informational</option>
                  <option value="urgent">Urgent</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <div>
                          <h4 className="font-medium text-lg">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>
                          Sent: {new Date(notification.sentAt).toLocaleString()}
                        </span>
                        <Badge variant="outline">
                          {notification.audience.replace("_", " ")}
                        </Badge>
                        <Badge
                          variant={
                            notification.type === "urgent"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {notification.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Delivered:</span>
                          <span className="font-medium ml-1">
                            {notification.delivered.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Opened:</span>
                          <span className="font-medium ml-1">
                            {notification.opened.toLocaleString()}
                          </span>
                          <span className="text-gray-400 ml-1">
                            (
                            {(
                              (notification.opened / notification.delivered) *
                              100
                            ).toFixed(1)}
                            %)
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Clicked:</span>
                          <span className="font-medium ml-1">
                            {notification.clicked.toLocaleString()}
                          </span>
                          <span className="text-gray-400 ml-1">
                            (
                            {(
                              (notification.clicked / notification.delivered) *
                              100
                            ).toFixed(1)}
                            %)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Resend
                      </Button>
                    </div>
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
