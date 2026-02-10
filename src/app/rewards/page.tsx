"use client";

import { useState } from "react";
import {
  Gift,
  Star,
  Crown,
  Coffee,
  Ticket,
  ShoppingBag,
  Percent,
  Calendar,
  Trophy,
  TrendingUp,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const rewardCategories = [
  {
    id: "discounts",
    name: "Discounts",
    icon: <Percent className="w-5 h-5" />,
    rewards: [
      {
        id: 1,
        name: "5% Off Any Purchase",
        cost: 250,
        description: "Valid for 30 days",
        expires: "30 days",
        popular: false,
      },
      {
        id: 2,
        name: "10% Off Any Purchase",
        cost: 500,
        description: "Valid for 30 days",
        expires: "30 days",
        popular: true,
      },
      {
        id: 3,
        name: "15% Off Premium Items",
        cost: 750,
        description: "Exclusive items only",
        expires: "30 days",
        popular: false,
      },
      {
        id: 4,
        name: "25% Off Everything",
        cost: 1500,
        description: "Limited time offer",
        expires: "7 days",
        popular: false,
      },
    ],
  },
  {
    id: "freebies",
    name: "Free Items",
    icon: <Gift className="w-5 h-5" />,
    rewards: [
      {
        id: 5,
        name: "Free Shipping",
        cost: 300,
        description: "Next 3 orders",
        expires: "60 days",
        popular: true,
      },
      {
        id: 6,
        name: "Free Coffee Voucher",
        cost: 400,
        description: "CoffeeHouse partner",
        expires: "90 days",
        popular: false,
      },
      {
        id: 7,
        name: "Free Brand Merchandise",
        cost: 800,
        description: "Exclusive branded items",
        expires: "30 days",
        popular: false,
      },
      {
        id: 8,
        name: "Free Premium Trial",
        cost: 1200,
        description: "3 months premium access",
        expires: "7 days",
        popular: false,
      },
    ],
  },
  {
    id: "experiences",
    name: "Experiences",
    icon: <Ticket className="w-5 h-5" />,
    rewards: [
      {
        id: 9,
        name: "VIP Event Access",
        cost: 2000,
        description: "Exclusive brand events",
        expires: "Limited",
        popular: true,
      },
      {
        id: 10,
        name: "Meet & Greet",
        cost: 2500,
        description: "With brand ambassadors",
        expires: "Limited",
        popular: false,
      },
      {
        id: 11,
        name: "Workshop Access",
        cost: 1800,
        description: "Skill development sessions",
        expires: "30 days",
        popular: false,
      },
      {
        id: 12,
        name: "Private Consultation",
        cost: 3000,
        description: "1-on-1 expert advice",
        expires: "60 days",
        popular: false,
      },
    ],
  },
  {
    id: "exclusive",
    name: "Exclusive Access",
    icon: <Crown className="w-5 h-5" />,
    rewards: [
      {
        id: 13,
        name: "Early Product Access",
        cost: 1000,
        description: "Be first to buy new releases",
        expires: "90 days",
        popular: true,
      },
      {
        id: 14,
        name: "Exclusive Content",
        cost: 600,
        description: "Behind-the-scenes access",
        expires: "60 days",
        popular: false,
      },
      {
        id: 15,
        name: "Priority Support",
        cost: 1500,
        description: "Skip the queue",
        expires: "180 days",
        popular: false,
      },
      {
        id: 16,
        name: "Beta Features",
        cost: 2200,
        description: "Test new features first",
        expires: "120 days",
        popular: false,
      },
    ],
  },
];

const rewardHistory = [
  {
    id: 1,
    type: "redemption",
    name: "10% Off Purchase Used",
    brand: "TechCorp",
    cost: -500,
    date: "2 days ago",
    status: "used",
  },
  {
    id: 2,
    type: "earned",
    name: "Event Attendance Bonus",
    brand: "Design Workshop",
    cost: 250,
    date: "3 days ago",
    status: "earned",
  },
  {
    id: 3,
    type: "redemption",
    name: "Free Shipping Redeemed",
    brand: "FashionForward",
    cost: -300,
    date: "5 days ago",
    status: "active",
  },
  {
    id: 4,
    type: "earned",
    name: "Daily Login Streak (7 days)",
    brand: "Whodini",
    cost: 150,
    date: "1 week ago",
    status: "earned",
  },
  {
    id: 5,
    type: "redemption",
    name: "VIP Event Access",
    brand: "Tech Conference",
    cost: -2000,
    date: "2 weeks ago",
    status: "used",
  },
  {
    id: 6,
    type: "earned",
    name: "Community Contribution",
    brand: "Tech Innovators",
    cost: 100,
    date: "2 weeks ago",
    status: "earned",
  },
  {
    id: 7,
    type: "earned",
    name: "Brand Subscription Bonus",
    brand: "Multiple Brands",
    cost: 300,
    date: "3 weeks ago",
    status: "earned",
  },
  {
    id: 8,
    type: "redemption",
    name: "5% Discount Used",
    brand: "CoffeeHouse",
    cost: -250,
    date: "1 month ago",
    status: "used",
  },
];

const userStats = {
  currentPoints: 2450,
  totalEarned: 5200,
  totalSpent: 2750,
  membershipTier: "Gold",
  nextTierProgress: 75,
  nextTierRequired: 3000,
};

type CategoryType = "discounts" | "freebies" | "experiences" | "exclusive";

export default function RewardsPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("discounts");
  const [showHistory, setShowHistory] = useState(false);

  const currentCategory = rewardCategories.find(
    (cat) => cat.id === activeCategory,
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Gift className="w-6 h-6 text-[#ff5f6d]" />
        <h1 className="text-2xl font-semibold">Rewards & Points</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#ff5f6d] mb-2">
              {userStats.currentPoints.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Available Points</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {userStats.totalEarned.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Earned</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {userStats.totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-neutral-600">Total Redeemed</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-yellow-500">
                {userStats.membershipTier}
              </span>
            </div>
            <div className="text-sm text-neutral-600">Member Tier</div>
          </div>
        </Card>
      </div>

      {/* Tier Progress */}
      <Card className="p-6 border border-neutral-200 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-neutral-900">
              Progress to Platinum
            </h3>
            <p className="text-sm text-neutral-600">
              Earn{" "}
              {(
                userStats.nextTierRequired - userStats.currentPoints
              ).toLocaleString()}{" "}
              more points to unlock exclusive benefits
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-500">
              {userStats.nextTierProgress}%
            </div>
          </div>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${userStats.nextTierProgress}%` }}
          />
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-6">
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg">
          <button
            onClick={() => setShowHistory(false)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              !showHistory
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Browse Rewards
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              showHistory
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Reward History
          </button>
        </div>
      </div>

      {!showHistory ? (
        <div>
          {/* Category Tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit mb-6">
            {rewardCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryType)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-white text-[#ff5f6d] shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory?.rewards.map((reward) => (
              <Card
                key={reward.id}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {reward.popular && (
                          <Badge className="bg-[#ff5f6d] text-white text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        {reward.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-3">
                        {reward.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-neutral-500 mb-4">
                        <Clock className="w-3 h-3" />
                        Expires in {reward.expires}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-[#ff5f6d]">
                      {reward.cost.toLocaleString()} pts
                    </div>
                    <Button
                      size="sm"
                      disabled={userStats.currentPoints < reward.cost}
                      className={
                        userStats.currentPoints >= reward.cost
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                      }
                    >
                      {userStats.currentPoints >= reward.cost
                        ? "Redeem"
                        : "Need More Points"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* History View */
        <div className="space-y-4">
          {rewardHistory.map((item) => (
            <Card
              key={item.id}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        item.type === "earned"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.type === "earned" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <Gift className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-2">
                        {item.brand}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">
                          {item.date}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.status === "used"
                              ? "border-neutral-300 text-neutral-600"
                              : item.status === "active"
                                ? "border-green-300 text-green-600"
                                : "border-blue-300 text-blue-600"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      item.cost > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.cost > 0 ? "+" : ""}
                    {item.cost.toLocaleString()} pts
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
