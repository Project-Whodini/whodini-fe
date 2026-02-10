"use client";

import { useState } from "react";
import {
  Heart,
  Building2,
  Calendar,
  Bell,
  Tag,
  Star,
  Clock,
  Gift,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockSubscriptions = [
  {
    id: 1,
    brandName: "TechCorp",
    description: "Leading technology company with cutting-edge AI solutions",
    subscribedSince: "January 2025",
    subscriberCount: 125000,
    tier: "Premium",
    category: "Technology",
    image: "🚀",
    lastPromotion: "3 days ago",
    newPromotions: 2,
  },
  {
    id: 2,
    brandName: "FashionForward",
    description: "Modern fashion brand with sustainable clothing collections",
    subscribedSince: "February 2025",
    subscriberCount: 89000,
    tier: "Basic",
    category: "Fashion",
    image: "👗",
    lastPromotion: "1 week ago",
    newPromotions: 0,
  },
  {
    id: 3,
    brandName: "FitLife Gym",
    description: "Premium fitness chain with personalized workout programs",
    subscribedSince: "March 2025",
    subscriberCount: 67000,
    tier: "Premium",
    category: "Health & Fitness",
    image: "💪",
    lastPromotion: "1 day ago",
    newPromotions: 1,
  },
  {
    id: 4,
    brandName: "CoffeeHouse",
    description: "Artisan coffee roasters with locally sourced beans",
    subscribedSince: "December 2024",
    subscriberCount: 45000,
    tier: "Basic",
    category: "Food & Beverage",
    image: "☕",
    lastPromotion: "5 days ago",
    newPromotions: 0,
  },
];

export default function SubscriptionsPage() {
  const [showEmpty] = useState(false); // Set to true to show empty state

  const discoverBrands = () => {
    console.log("Discover brands");
  };

  const viewBrand = (brandId: number | string) => {
    console.log("View brand:", brandId);
  };

  const viewPromotions = (brandId: number | string) => {
    console.log("View promotions for brand:", brandId);
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
        <Heart className="w-8 h-8 text-neutral-400" />
      </div>

      <h2 className="text-xl font-semibold text-neutral-900 mb-2">
        No subscriptions yet
      </h2>

      <p className="text-neutral-500 mb-6 max-w-md">
        Subscribe to brands to receive their promotions
      </p>

      <Button
        onClick={discoverBrands}
        className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white font-medium px-6 py-2 rounded-xl shadow-sm border-0 transition-colors"
      >
        Discover Brands
      </Button>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockSubscriptions.map((subscription) => (
        <Card
          key={subscription.id}
          className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{subscription.image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg font-semibold text-neutral-900">
                      {subscription.brandName}
                    </CardTitle>
                    {subscription.tier === "Premium" && (
                      <Badge className="text-xs bg-[#ff5f6d] text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {subscription.category}
                  </Badge>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {subscription.description}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Since {subscription.subscribedSince}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>
                  {subscription.subscriberCount.toLocaleString()} subscribers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last offer {subscription.lastPromotion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span>
                  {subscription.newPromotions > 0
                    ? `${subscription.newPromotions} new offers`
                    : "No new offers"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => viewBrand(subscription.id)}
                variant="outline"
                className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50"
              >
                View Brand
              </Button>
              <Button
                onClick={() => viewPromotions(subscription.id)}
                className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
              >
                {subscription.newPromotions > 0 ? "View Offers" : "Browse"}
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
        <h1 className="text-2xl font-bold text-neutral-900">
          My Subscriptions
        </h1>
        <Button
          onClick={discoverBrands}
          variant="outline"
          className="border border-neutral-300 text-neutral-700 font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Discover Brands
        </Button>
      </div>

      {/* Content */}
      {showEmpty ? renderEmptyState() : renderSubscriptions()}
    </div>
  );
}
