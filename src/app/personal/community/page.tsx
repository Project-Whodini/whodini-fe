"use client";

import { useState } from "react";
import {
  Users,
  MessageSquare,
  Sparkles,
  Search,
  Heart,
  MapPin,
  Calendar,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockData = {
  messages: [
    {
      id: 1,
      community: "Tech Innovators",
      author: "Sarah Chen",
      message:
        "Excited to share our latest AI breakthrough! Join us for a live demo this Friday.",
      timestamp: "2 hours ago",
      likes: 24,
      image: "💻",
    },
    {
      id: 2,
      community: "Design Squad",
      author: "Mike Rodriguez",
      message:
        "Check out this amazing portfolio piece from one of our members!",
      timestamp: "4 hours ago",
      likes: 18,
      image: "🎨",
    },
    {
      id: 3,
      community: "Fitness Warriors",
      author: "Emma Johnson",
      message:
        "Morning workout session was incredible! Who's joining tomorrow's run?",
      timestamp: "1 day ago",
      likes: 32,
      image: "💪",
    },
  ],
  showcase: [
    {
      id: 1,
      community: "Photography Club",
      title: "Monthly Photo Contest",
      description:
        "Submit your best nature photography for our February contest.",
      image: "📸",
      participants: 156,
      deadline: "5 days left",
    },
    {
      id: 2,
      community: "Cooking Masters",
      title: "Recipe Share Week",
      description: "Share your family's secret recipes with the community.",
      image: "👨‍🍳",
      participants: 89,
      deadline: "2 weeks left",
    },
    {
      id: 3,
      community: "Book Lovers",
      title: "February Book Club",
      description: "Currently reading 'The Midnight Library' by Matt Haig.",
      image: "📚",
      participants: 67,
      deadline: "1 month left",
    },
  ],
  discover: [
    {
      id: 1,
      name: "Startup Founders",
      description: "Connect with fellow entrepreneurs and share your journey.",
      members: 2450,
      category: "Business",
      image: "🚀",
      isNew: true,
    },
    {
      id: 2,
      name: "Local Foodies",
      description:
        "Discover the best restaurants and hidden gems in your city.",
      members: 1890,
      category: "Food & Drink",
      image: "🍕",
      isNew: false,
    },
    {
      id: 3,
      name: "Pet Parents",
      description: "Share tips, photos, and connect with other pet owners.",
      members: 3200,
      category: "Lifestyle",
      image: "🐕",
      isNew: true,
    },
    {
      id: 4,
      name: "Music Producers",
      description: "Collaborate on beats, share techniques, and network.",
      members: 890,
      category: "Creative",
      image: "🎵",
      isNew: false,
    },
  ],
};

type TabType = "messages" | "showcase" | "discover";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("messages");

  const tabs = [
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "showcase", label: "Showcase", icon: Sparkles },
    { id: "discover", label: "Discover", icon: Search },
  ];

  const renderMessages = () => {
    if (mockData.messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
            <Users className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No community messages yet
          </h3>
          <p className="text-neutral-500">
            Join communities to receive updates
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {mockData.messages.map((message) => (
          <Card
            key={message.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{message.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {message.community}
                    </Badge>
                    <span className="text-sm text-neutral-500">•</span>
                    <span className="text-sm text-neutral-600">
                      {message.author}
                    </span>
                    <span className="text-sm text-neutral-500">•</span>
                    <span className="text-sm text-neutral-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Heart className="w-4 h-4" />
                  <span>{message.likes} likes</span>
                </div>
                <Button size="sm" variant="outline" className="text-xs">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderShowcase = () => {
    return (
      <div className="space-y-4">
        {mockData.showcase.map((item) => (
          <Card
            key={item.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{item.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {item.community}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-neutral-900 mb-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{item.participants} participants</span>
                  </div>
                  <span>•</span>
                  <span>{item.deadline}</span>
                </div>
                <Button
                  size="sm"
                  className="text-xs bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                >
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderDiscover = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockData.discover.map((community) => (
          <Card
            key={community.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{community.image}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg font-semibold text-neutral-900">
                        {community.name}
                      </CardTitle>
                      {community.isNew && (
                        <Badge className="text-xs bg-[#ff5f6d] text-white">
                          New
                        </Badge>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {community.category}
                    </Badge>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {community.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Users className="w-4 h-4" />
                  <span>{community.members.toLocaleString()} members</span>
                </div>
                <Button
                  size="sm"
                  className="text-xs bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                >
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "messages":
        return renderMessages();
      case "showcase":
        return renderShowcase();
      case "discover":
        return renderDiscover();
      default:
        return renderMessages();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">Community Hub</h1>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-[#ff5f6d] shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
