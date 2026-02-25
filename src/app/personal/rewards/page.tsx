"use client";

import { useState } from "react";
import {
  Gift,
  Crown,
  Ticket,
  Percent,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
        voucherCode: "VDISC-5OFF-24A",
        description: "Valid for 30 days",
        expires: "30 days",
        popular: false,
      },
      {
        id: 2,
        name: "10% Off Any Purchase",
        voucherCode: "VDISC-10OFF-92K",
        description: "Valid for 30 days",
        expires: "30 days",
        popular: true,
      },
      {
        id: 3,
        name: "15% Off Premium Items",
        voucherCode: "VDISC-15PREM-7QZ",
        description: "Exclusive items only",
        expires: "30 days",
        popular: false,
      },
      {
        id: 4,
        name: "25% Off Everything",
        voucherCode: "VDISC-25ALL-5MN",
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
        voucherCode: "VSHIP-FREE-3ORD",
        description: "Next 3 orders",
        expires: "60 days",
        popular: true,
      },
      {
        id: 6,
        name: "Free Coffee Voucher",
        voucherCode: "VCOFFEE-FREE-1CP",
        description: "CoffeeHouse partner",
        expires: "90 days",
        popular: false,
      },
      {
        id: 7,
        name: "Free Brand Merchandise",
        voucherCode: "VMERCH-BRAND-88X",
        description: "Exclusive branded items",
        expires: "30 days",
        popular: false,
      },
      {
        id: 8,
        name: "Free Premium Trial",
        voucherCode: "VPREMIUM-TRIAL-3M",
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
        voucherCode: "VVIP-EVENT-001",
        description: "Exclusive brand events",
        expires: "Limited",
        popular: true,
      },
      {
        id: 10,
        name: "Meet & Greet",
        voucherCode: "VMEET-GREET-22A",
        description: "With brand ambassadors",
        expires: "Limited",
        popular: false,
      },
      {
        id: 11,
        name: "Workshop Access",
        voucherCode: "VWORKSHOP-ACCESS-4K",
        description: "Skill development sessions",
        expires: "30 days",
        popular: false,
      },
      {
        id: 12,
        name: "Private Consultation",
        voucherCode: "VCONSULT-PRIVATE-7P",
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
        voucherCode: "VEARLY-PRODUCT-1ST",
        description: "Be first to buy new releases",
        expires: "90 days",
        popular: true,
      },
      {
        id: 14,
        name: "Exclusive Content",
        voucherCode: "VCONTENT-EXCL-55B",
        description: "Behind-the-scenes access",
        expires: "60 days",
        popular: false,
      },
      {
        id: 15,
        name: "Priority Support",
        voucherCode: "VSUPPORT-PRIORITY-9T",
        description: "Skip the queue",
        expires: "180 days",
        popular: false,
      },
      {
        id: 16,
        name: "Beta Features",
        voucherCode: "VBETA-FEATURES-0R",
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
    name: "10% Off Any Purchase",
    brand: "TechCorp",
    voucherCode: "VDISC-10OFF-92K",
    date: "2 days ago",
    status: "used",
  },
  {
    id: 2,
    name: "Free Coffee Voucher",
    brand: "CoffeeHouse",
    voucherCode: "VCOFFEE-FREE-1CP",
    date: "3 days ago",
    status: "active",
  },
  {
    id: 3,
    name: "Free Shipping",
    brand: "FashionForward",
    voucherCode: "VSHIP-FREE-3ORD",
    date: "5 days ago",
    status: "active",
  },
  {
    id: 4,
    name: "Early Product Access",
    brand: "Tech Innovators",
    voucherCode: "VEARLY-PRODUCT-1ST",
    date: "1 week ago",
    status: "active",
  },
  {
    id: 5,
    name: "VIP Event Access",
    brand: "Tech Conference",
    voucherCode: "VVIP-EVENT-001",
    date: "2 weeks ago",
    status: "used",
  },
  {
    id: 6,
    name: "Exclusive Content",
    brand: "Creators Hub",
    voucherCode: "VCONTENT-EXCL-55B",
    date: "2 weeks ago",
    status: "active",
  },
  {
    id: 7,
    name: "Priority Support",
    brand: "ServicePro",
    voucherCode: "VSUPPORT-PRIORITY-9T",
    date: "3 weeks ago",
    status: "active",
  },
  {
    id: 8,
    name: "5% Off Any Purchase",
    brand: "CoffeeHouse",
    voucherCode: "VDISC-5OFF-24A",
    date: "1 month ago",
    status: "used",
  },
];

type CategoryType = "discounts" | "freebies" | "experiences" | "exclusive";

export default function RewardsPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("discounts");
  const [showHistory, setShowHistory] = useState(false);

  const currentCategory = rewardCategories.find(
    (cat) => cat.id === activeCategory,
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Gift className="w-6 h-6 text-[#ff5f6d]" />
        <h1 className="text-xl sm:text-2xl font-semibold">Rewards & Points</h1>
      </div>

      <Card className="p-4 sm:p-6 border border-neutral-200 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50">
        <h3 className="font-semibold text-neutral-900 mb-1">Voucher Wallet</h3>
        <p className="text-sm text-neutral-600">
          Redeem and manage vouchers here. Points and tier tracking are not
          available yet.
        </p>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-6">
        <div className="flex w-full sm:w-fit gap-1 p-1 bg-neutral-100 rounded-lg">
          <button
            onClick={() => setShowHistory(false)}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
              !showHistory
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Browse Rewards
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
              showHistory
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Voucher History
          </button>
        </div>
      </div>

      {!showHistory ? (
        <div>
          {/* Category Tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit mb-6 overflow-x-auto">
            {rewardCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryType)}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {currentCategory?.rewards.map((reward) => (
              <Card
                key={reward.id}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 sm:p-6">
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="text-xs sm:text-sm font-semibold text-[#ff5f6d] break-all">
                      {reward.voucherCode}
                    </div>
                    <Button size="sm">Get Voucher</Button>
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
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
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
                  <div className="text-xs sm:text-sm font-semibold text-[#ff5f6d] break-all sm:text-right">
                    {item.voucherCode}
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
