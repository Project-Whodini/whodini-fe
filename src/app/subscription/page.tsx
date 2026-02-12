import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Star,
  Calendar,
  Clock,
  Zap,
  Heart,
  Bell,
  Mail,
  TrendingUp,
  Gift,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Static data for subscriptions
const subscriptions = [
  {
    id: "1",
    brand: "TechStartup Inc.",
    digitalId: "@techstartup",
    industry: "Technology",
    tier: "Premium",
    subscribedAt: "2024-01-15",
    status: "active",
    color: "bg-blue-500",
    benefits: [
      "Early access to products",
      "Exclusive webinars",
      "Direct support",
    ],
    nextBilling: "2024-02-15",
    price: "$29.99/month",
  },
  {
    id: "2",
    brand: "Eco Fashion Co.",
    digitalId: "@ecofashion",
    industry: "Fashion",
    tier: "Standard",
    subscribedAt: "2024-02-01",
    status: "active",
    color: "bg-green-500",
    benefits: [
      "10% discount on all items",
      "Monthly newsletter",
      "Sustainability reports",
    ],
    nextBilling: "2024-03-01",
    price: "$14.99/month",
  },
  {
    id: "3",
    brand: "Fitness Hub",
    digitalId: "@fitnesshub",
    industry: "Health & Fitness",
    tier: "Basic",
    subscribedAt: "2024-01-20",
    status: "cancelled",
    color: "bg-red-500",
    benefits: ["Workout plans", "Nutrition guides", "Community access"],
    nextBilling: null,
    price: "$9.99/month",
  },
  {
    id: "4",
    brand: "Creative Studios",
    digitalId: "@creativestudios",
    industry: "Design",
    tier: "Premium",
    subscribedAt: "2024-02-10",
    status: "active",
    color: "bg-purple-500",
    benefits: ["Design templates", "Creative workshops", "Portfolio reviews"],
    nextBilling: "2024-03-10",
    price: "$24.99/month",
  },
];

// Static data for recent activities
const recentActivities = [
  {
    id: "1",
    type: "content",
    brand: "TechStartup Inc.",
    title: "New Product Launch: AI Assistant 2.0",
    timestamp: "2024-02-10T14:30:00Z",
    description: "Exclusive preview of our latest AI assistant features.",
  },
  {
    id: "2",
    type: "event",
    brand: "Creative Studios",
    title: "Virtual Workshop: Advanced Design Patterns",
    timestamp: "2024-02-09T16:00:00Z",
    description: "Learn cutting-edge design techniques from industry experts.",
  },
  {
    id: "3",
    type: "discount",
    brand: "Eco Fashion Co.",
    title: "Flash Sale: 25% Off Sustainable Collection",
    timestamp: "2024-02-08T10:00:00Z",
    description: "Limited time offer on our eco-friendly clothing line.",
  },
];

// Static recommendations
const recommendations = [
  {
    id: "1",
    brand: "Food & Wellness Co.",
    digitalId: "@foodwellness",
    industry: "Health & Wellness",
    tier: "Standard",
    price: "$19.99/month",
    rating: 4.8,
    description: "Personalized meal plans and wellness coaching",
    color: "bg-orange-500",
  },
  {
    id: "2",
    brand: "Music Streaming Plus",
    digitalId: "@musicplus",
    industry: "Entertainment",
    tier: "Premium",
    price: "$12.99/month",
    rating: 4.9,
    description: "High-quality music streaming with exclusive content",
    color: "bg-pink-500",
  },
];

export default function SubscriptionsPage() {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "cancelled"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
    const matchesSearch =
      sub.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = subscriptions.filter((s) => s.status === "active").length;
  const totalSpending = subscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + parseFloat(s.price.replace(/[^0-9.]/g, "")), 0);

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            My Subscriptions
          </h1>
          <p className="text-neutral-600">
            Manage your brand subscriptions and discover new content
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Spending
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalSpending.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Per month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rewards Earned
              </CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Points this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "cancelled" ? "default" : "outline"}
              onClick={() => setFilterStatus("cancelled")}
              size="sm"
            >
              Cancelled
            </Button>
          </div>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="relative overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full h-1 ${subscription.color}`}
              />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {subscription.brand}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {subscription.digitalId} · {subscription.industry}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        subscription.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {subscription.status}
                    </Badge>
                    <Badge variant="outline">{subscription.tier}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium text-lg">{subscription.price}</p>
                  {subscription.nextBilling && (
                    <p className="text-sm text-gray-500">
                      Next billing:{" "}
                      {new Date(subscription.nextBilling).toLocaleDateString()}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    Subscribed:{" "}
                    {new Date(subscription.subscribedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Benefits:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {subscription.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Zap className="h-3 w-3 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  {subscription.status === "active" ? (
                    <>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="flex-1">
                      Reactivate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your subscribed brands
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rainbow-bg rounded-lg"
                >
                  <div className="shrink-0">
                    {activity.type === "content" && (
                      <Mail className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === "event" && (
                      <Calendar className="h-5 w-5 text-green-500" />
                    )}
                    {activity.type === "discount" && (
                      <Gift className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">{activity.brand}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recommended for You
            </CardTitle>
            <CardDescription>
              Discover new brands that match your interests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{rec.brand}</h4>
                      <p className="text-sm text-gray-500">{rec.digitalId}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{rec.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {rec.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{rec.tier}</Badge>
                      <span className="text-sm font-medium">{rec.price}</span>
                    </div>
                    <Button size="sm">Subscribe</Button>
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
