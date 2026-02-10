"use client";

import { Users, Bell, TrendingUp, Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PersonalPage() {
  const copySubscriptionLink = () => {
    // Copy subscription link to clipboard
    const link = "https://whodini.app/subscribe/WD-P-x8m9n2k5";
    navigator.clipboard.writeText(link);
    // You could add a toast notification here
  };

  const createNotification = () => {
    // Navigate to create notification page or open modal
    console.log("Create notification");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Subscribers */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-[#ff5f6d]" />
                <span className="text-sm font-medium text-neutral-600">
                  Total Subscribers
                </span>
              </div>
              <div className="text-3xl font-bold text-[#ff5f6d]">0</div>
            </div>
          </div>
        </Card>

        {/* Notifications Sent */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-neutral-600">
                  Notifications Sent
                </span>
              </div>
              <div className="text-3xl font-bold text-orange-500">0</div>
            </div>
          </div>
        </Card>

        {/* This Month */}
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[#ff5f6d]" />
                <span className="text-sm font-medium text-neutral-600">
                  This Month
                </span>
              </div>
              <div className="text-3xl font-bold text-[#ff5f6d]">0</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={createNotification}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white font-medium px-4 py-2 rounded-xl shadow-sm border-0 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Notification
          </Button>

          <Button
            onClick={copySubscriptionLink}
            variant="outline"
            className="border border-neutral-300 text-neutral-700 font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Subscription Link
          </Button>
        </div>
      </div>
    </div>
  );
}
