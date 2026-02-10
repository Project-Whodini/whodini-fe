"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  MessageSquare,
  Crown,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockMemberships = [
  {
    id: 1,
    name: "Tech Innovators",
    description: "A community for technology enthusiasts and innovators",
    memberSince: "January 2025",
    memberCount: 2450,
    status: "Premium",
    category: "Technology",
    image: "💻",
    lastActivity: "2 hours ago",
    unreadMessages: 5,
  },
  {
    id: 2,
    name: "Design Squad",
    description: "Creative professionals sharing design inspiration and tips",
    memberSince: "March 2025",
    memberCount: 1890,
    status: "Basic",
    category: "Creative",
    image: "🎨",
    lastActivity: "1 day ago",
    unreadMessages: 0,
  },
  {
    id: 3,
    name: "Fitness Warriors",
    description: "Motivated individuals on their fitness journey together",
    memberSince: "February 2025",
    memberCount: 3200,
    status: "Premium",
    category: "Health & Fitness",
    image: "💪",
    lastActivity: "5 hours ago",
    unreadMessages: 2,
  },
  {
    id: 4,
    name: "Local Foodies",
    description:
      "Discover the best restaurants and food experiences in your area",
    memberSince: "December 2024",
    memberCount: 1567,
    status: "Basic",
    category: "Food & Drink",
    image: "🍕",
    lastActivity: "3 days ago",
    unreadMessages: 0,
  },
];

export default function MembershipsPage() {
  const [showEmpty] = useState(false); // Set to true to show empty state

  const joinCommunities = () => {
    console.log("Join communities");
  };

  const viewCommunity = (communityId: number | string) => {
    console.log("View community:", communityId);
  };

  const sendMessage = (communityId: number | string) => {
    console.log("Send message to community:", communityId);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
        <Users className="w-8 h-8 text-neutral-400" />
      </div>

      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
        No community memberships yet
      </h2>

      <p className="text-neutral-500 mb-6 max-w-md">
        Join communities to connect and receive updates
      </p>

      <Button
        onClick={joinCommunities}
        className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white font-medium px-6 py-2 rounded-xl shadow-sm border-0 transition-colors"
      >
        Join a Community
      </Button>
    </div>
  );

  const renderMemberships = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockMemberships.map((membership) => (
        <Card
          key={membership.id}
          className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{membership.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-semibold text-neutral-900">
                      {membership.name}
                    </CardTitle>
                    {membership.status === "Premium" && (
                      <Badge className="text-xs bg-[#ff5f6d] text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {membership.category}
                  </Badge>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {membership.description}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Since {membership.memberSince}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{membership.memberCount.toLocaleString()} members</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Active {membership.lastActivity}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>
                  {membership.unreadMessages > 0
                    ? `${membership.unreadMessages} unread`
                    : "No new messages"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => viewCommunity(membership.id)}
                variant="outline"
                className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50"
              >
                View Community
              </Button>
              <Button
                onClick={() => sendMessage(membership.id)}
                className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
              >
                {membership.unreadMessages > 0 ? "Reply" : "Message"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">My Memberships</h1>
        <Button
          onClick={joinCommunities}
          variant="outline"
          className="border border-neutral-300 text-neutral-700 font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
        >
          <Users className="w-4 h-4 mr-2" />
          Join Communities
        </Button>
      </div>

      {/* Content */}
      {showEmpty ? renderEmptyState() : renderMemberships()}
    </div>
  );
}
