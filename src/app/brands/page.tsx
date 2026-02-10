"use client";

import { useState } from "react";
import {
  Building2,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Target,
  Gift,
  BarChart3,
  Plus,
  Edit,
  Settings,
  Bell,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Activity,
  DollarSign,
  MessageSquare,
  Share2,
  Heart,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const brandMetrics = {
  totalSubscribers: 15420,
  growthRate: 12.5,
  activePromotions: 8,
  totalImpressions: 125680,
  engagementRate: 8.7,
  conversionRate: 3.2,
  revenue: 48650,
  avgOrderValue: 87.5,
};

const recentActivity = [
  {
    id: 1,
    type: "subscription",
    message: "New subscriber: Alex Thompson",
    timestamp: "2 minutes ago",
    icon: "👤",
  },
  {
    id: 2,
    type: "promotion",
    message: "Spring Sale promotion went live",
    timestamp: "1 hour ago",
    icon: "🎯",
  },
  {
    id: 3,
    type: "engagement",
    message: "25 users engaged with latest post",
    timestamp: "3 hours ago",
    icon: "❤️",
  },
  {
    id: 4,
    type: "conversion",
    message: 'Promotion "TECH20" generated $1,250 revenue',
    timestamp: "5 hours ago",
    icon: "💰",
  },
  {
    id: 5,
    type: "milestone",
    message: "Reached 15,000 subscribers milestone!",
    timestamp: "1 day ago",
    icon: "🎉",
  },
];

const activePromotions = [
  {
    id: 1,
    title: "Spring Tech Sale",
    discount: "20% OFF",
    code: "SPRING20",
    expires: "5 days",
    impressions: 12450,
    clicks: 892,
    conversions: 127,
    revenue: 8950,
    status: "active",
  },
  {
    id: 2,
    title: "New Product Launch",
    discount: "15% OFF",
    code: "NEWTECH15",
    expires: "12 days",
    impressions: 8320,
    clicks: 634,
    conversions: 89,
    revenue: 5680,
    status: "active",
  },
  {
    id: 3,
    title: "Student Discount",
    discount: "25% OFF",
    code: "STUDENT25",
    expires: "30 days",
    impressions: 6780,
    clicks: 456,
    conversions: 67,
    revenue: 3240,
    status: "active",
  },
  {
    id: 4,
    title: "Weekend Flash Sale",
    discount: "30% OFF",
    code: "FLASH30",
    expires: "Ended",
    impressions: 15680,
    clicks: 1234,
    conversions: 198,
    revenue: 12450,
    status: "ended",
  },
];

const subscriberInsights = [
  { segment: "Tech Enthusiasts", count: 6520, percentage: 42.3, growth: 8.2 },
  { segment: "Early Adopters", count: 4630, percentage: 30.0, growth: 15.1 },
  { segment: "Budget Shoppers", count: 2890, percentage: 18.7, growth: -2.1 },
  { segment: "Premium Users", count: 1380, percentage: 9.0, growth: 22.5 },
];

const topPerformingContent = [
  {
    id: 1,
    type: "promotion",
    title: "AI Assistant Launch Announcement",
    engagement: 2840,
    reach: 18720,
    clicks: 892,
    conversions: 156,
    date: "3 days ago",
  },
  {
    id: 2,
    type: "content",
    title: "Behind the Scenes: Product Development",
    engagement: 1950,
    reach: 12450,
    clicks: 567,
    conversions: 89,
    date: "1 week ago",
  },
  {
    id: 3,
    type: "event",
    title: "Tech Innovation Workshop Registration",
    engagement: 1760,
    reach: 9840,
    clicks: 423,
    conversions: 234,
    date: "2 weeks ago",
  },
];

export default function BrandDashPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFrame, setTimeFrame] = useState("7d");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "promotions",
      label: "Promotions",
      icon: <Gift className="w-4 h-4" />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-[#ff5f6d]" />
          <h1 className="text-2xl font-semibold">Brand Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-lg">
            <button
              onClick={() => setTimeFrame("7d")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                timeFrame === "7d"
                  ? "bg-white text-[#ff5f6d] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeFrame("30d")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                timeFrame === "30d"
                  ? "bg-white text-[#ff5f6d] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeFrame("90d")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                timeFrame === "90d"
                  ? "bg-white text-[#ff5f6d] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              90 Days
            </button>
          </div>
          <Button className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90">
            <Plus className="w-4 h-4 mr-2" />
            New Promotion
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-xs font-medium">
                +{brandMetrics.growthRate}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {brandMetrics.totalSubscribers.toLocaleString()}
          </div>
          <div className="text-sm text-neutral-600">Total Subscribers</div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-xs font-medium">+18.2%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            ${brandMetrics.revenue.toLocaleString()}
          </div>
          <div className="text-sm text-neutral-600">Revenue ({timeFrame})</div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUp className="w-3 h-3" />
              <span className="text-xs font-medium">
                +{brandMetrics.engagementRate}%
              </span>
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {brandMetrics.totalImpressions.toLocaleString()}
          </div>
          <div className="text-sm text-neutral-600">Total Impressions</div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ArrowDown className="w-3 h-3" />
              <span className="text-xs font-medium">-0.3%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900 mb-1">
            {brandMetrics.conversionRate}%
          </div>
          <div className="text-sm text-neutral-600">Conversion Rate</div>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50"
                >
                  <div className="text-lg">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {activity.message}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performing Content */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Top Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformingContent.map((content) => (
                <div
                  key={content.id}
                  className="p-3 rounded-lg border border-neutral-200"
                >
                  <h4 className="font-medium text-sm text-neutral-900 mb-2">
                    {content.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-neutral-500">Engagement</div>
                      <div className="font-medium">
                        {content.engagement.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Conversions</div>
                      <div className="font-medium">{content.conversions}</div>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 mt-2">
                    {content.date}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "promotions" && (
        <div className="space-y-6">
          {/* Active Promotions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activePromotions.map((promotion) => (
              <Card
                key={promotion.id}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {promotion.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-[#ff5f6d] text-white text-xs">
                          {promotion.discount}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {promotion.code}
                        </Badge>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        promotion.status === "active"
                          ? "border-green-300 text-green-600"
                          : "border-neutral-300 text-neutral-600"
                      }`}
                    >
                      {promotion.status === "active"
                        ? `${promotion.expires} left`
                        : "Ended"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-neutral-500">
                        Impressions
                      </div>
                      <div className="text-lg font-bold text-neutral-900">
                        {promotion.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-neutral-500">Revenue</div>
                      <div className="text-lg font-bold text-green-600">
                        ${promotion.revenue.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-500">
                      {promotion.conversions} conversions (
                      {(
                        (promotion.conversions / promotion.clicks) *
                        100
                      ).toFixed(1)}
                      %)
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "subscribers" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscriber Segments */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Subscriber Segments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriberInsights.map((segment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-neutral-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-neutral-900">
                      {segment.segment}
                    </h4>
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        segment.growth > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {segment.growth > 0 ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      {Math.abs(segment.growth)}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-neutral-900">
                      {segment.count.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-600">
                      {segment.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-[#ff5f6d] h-2 rounded-full"
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Engagement Metrics */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Engagement Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {brandMetrics.engagementRate}%
                </div>
                <div className="text-sm text-neutral-600">
                  Average Engagement Rate
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  <div className="text-xl font-bold text-neutral-900 mb-1">
                    ${brandMetrics.avgOrderValue}
                  </div>
                  <div className="text-xs text-neutral-600">
                    Avg Order Value
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg border border-neutral-200">
                  <div className="text-xl font-bold text-neutral-900 mb-1">
                    {brandMetrics.activePromotions}
                  </div>
                  <div className="text-xs text-neutral-600">
                    Active Promotions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 gap-6">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent className="py-16 text-center">
              <BarChart3 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-500 mb-4">
                Detailed analytics charts and insights will be displayed here
              </p>
              <Button variant="outline" className="text-neutral-600">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
