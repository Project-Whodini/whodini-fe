"use client";

import { Bell, Heart, Mail, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PersonalPage() {
  const browseBrands = () => {
    console.log("Browse brands");
  };

  const discoverCommunities = () => {
    console.log("Discover communities");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, Weng!
        </h1>
      </div>

      {/* Your Showcase Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-neutral-900">
              Your Showcase
            </h2>
          </div>
          <p className="text-neutral-500 max-w-lg mx-auto">
            Subscribe to brands and join communities to see their latest content
            here!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={browseBrands}
            variant="outline"
            className="border border-neutral-300 text-neutral-700 font-medium px-6 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <Heart className="w-4 h-4 mr-2" />
            Browse Brands
          </Button>

          <Button
            onClick={discoverCommunities}
            variant="outline"
            className="border border-neutral-300 text-neutral-700 font-medium px-6 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <Users className="w-4 h-4 mr-2" />
            Discover Communities
          </Button>
        </div>
      </div>

      {/* Notification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {/* Pending Notifications */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-neutral-900">
                Pending Notifications
              </span>
            </div>
            <div className="text-3xl font-bold text-orange-500">0</div>
            <p className="text-sm text-neutral-500">Review within 48 hours</p>
          </div>
        </Card>

        {/* Saved Promotions */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#ff5f6d]" />
              <span className="text-sm font-medium text-neutral-900">
                Saved Promotions
              </span>
            </div>
            <div className="text-3xl font-bold text-[#ff5f6d]">0</div>
            <p className="text-sm text-neutral-500">Ready to use</p>
          </div>
        </Card>

        {/* Unread Messages */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-neutral-900">
                Unread Messages
              </span>
            </div>
            <div className="text-3xl font-bold text-purple-500">0</div>
            <p className="text-sm text-neutral-500">From your communities</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
