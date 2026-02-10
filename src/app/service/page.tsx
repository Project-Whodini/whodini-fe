"use client";

import { useState } from "react";
import {
  Settings,
  Users,
  Zap,
  Bell,
  Shield,
  Headphones,
  BarChart3,
  Globe,
  Database,
  Cloud,
  Code,
  Monitor,
  Smartphone,
  Mail,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Star,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const serviceCategories = [
  {
    id: "digital_marketing",
    name: "Digital Marketing",
    icon: <Target className="w-5 h-5" />,
    services: [
      {
        id: 1,
        title: "Social Media Management",
        description: "Complete social media strategy and management",
        price: 899,
        duration: "Monthly",
        clients: 45,
        rating: 4.8,
        status: "active",
        features: [
          "Content Creation",
          "Community Management",
          "Analytics",
          "24/7 Support",
        ],
      },
      {
        id: 2,
        title: "SEO Optimization",
        description: "Boost your search engine rankings",
        price: 1299,
        duration: "Monthly",
        clients: 32,
        rating: 4.9,
        status: "active",
        features: [
          "Keyword Research",
          "On-page SEO",
          "Link Building",
          "Monthly Reports",
        ],
      },
      {
        id: 3,
        title: "PPC Advertising",
        description: "Targeted pay-per-click campaigns",
        price: 750,
        duration: "Monthly",
        clients: 28,
        rating: 4.7,
        status: "active",
        features: [
          "Campaign Setup",
          "Bid Management",
          "A/B Testing",
          "ROI Tracking",
        ],
      },
    ],
  },
  {
    id: "web_development",
    name: "Web Development",
    icon: <Code className="w-5 h-5" />,
    services: [
      {
        id: 4,
        title: "Custom Website Development",
        description: "Responsive websites tailored to your brand",
        price: 2499,
        duration: "One-time",
        clients: 18,
        rating: 4.9,
        status: "active",
        features: [
          "Custom Design",
          "Mobile Responsive",
          "CMS Integration",
          "3 Months Support",
        ],
      },
      {
        id: 5,
        title: "E-commerce Solutions",
        description: "Complete online store development",
        price: 3999,
        duration: "One-time",
        clients: 12,
        rating: 5.0,
        status: "featured",
        features: [
          "Payment Integration",
          "Inventory Management",
          "User Accounts",
          "Order Tracking",
        ],
      },
      {
        id: 6,
        title: "Web App Development",
        description: "Progressive web applications",
        price: 5999,
        duration: "Project-based",
        clients: 8,
        rating: 4.8,
        status: "active",
        features: [
          "Custom Functionality",
          "API Integration",
          "Database Design",
          "Cloud Hosting",
        ],
      },
    ],
  },
  {
    id: "consulting",
    name: "Consulting",
    icon: <Headphones className="w-5 h-5" />,
    services: [
      {
        id: 7,
        title: "Business Strategy Consulting",
        description: "Strategic planning and growth advice",
        price: 199,
        duration: "Hourly",
        clients: 67,
        rating: 4.9,
        status: "active",
        features: [
          "Market Analysis",
          "Growth Planning",
          "Competitive Research",
          "Action Plans",
        ],
      },
      {
        id: 8,
        title: "Technology Advisory",
        description: "Tech stack and infrastructure guidance",
        price: 249,
        duration: "Hourly",
        clients: 34,
        rating: 4.8,
        status: "active",
        features: [
          "Tech Assessment",
          "Architecture Planning",
          "Tool Selection",
          "Implementation Guide",
        ],
      },
      {
        id: 9,
        title: "Brand Development",
        description: "Complete brand identity and positioning",
        price: 1999,
        duration: "Project-based",
        clients: 23,
        rating: 4.9,
        status: "premium",
        features: [
          "Brand Strategy",
          "Visual Identity",
          "Messaging",
          "Guidelines",
        ],
      },
    ],
  },
  {
    id: "support",
    name: "Support Services",
    icon: <Shield className="w-5 h-5" />,
    services: [
      {
        id: 10,
        title: "24/7 Technical Support",
        description: "Round-the-clock technical assistance",
        price: 399,
        duration: "Monthly",
        clients: 156,
        rating: 4.7,
        status: "active",
        features: [
          "24/7 Availability",
          "Multiple Channels",
          "Priority Queue",
          "SLA Guarantee",
        ],
      },
      {
        id: 11,
        title: "Website Maintenance",
        description: "Keep your website updated and secure",
        price: 299,
        duration: "Monthly",
        clients: 89,
        rating: 4.8,
        status: "active",
        features: [
          "Security Updates",
          "Content Updates",
          "Performance Monitoring",
          "Backup Services",
        ],
      },
      {
        id: 12,
        title: "Cloud Infrastructure",
        description: "Managed cloud hosting and scaling",
        price: 599,
        duration: "Monthly",
        clients: 41,
        rating: 4.9,
        status: "active",
        features: [
          "Auto Scaling",
          "Load Balancing",
          "Monitoring",
          "Disaster Recovery",
        ],
      },
    ],
  },
];

const serviceMetrics = {
  totalServices: 12,
  activeClients: 456,
  monthlyRevenue: 148650,
  averageRating: 4.8,
  completionRate: 98.5,
  clientRetention: 92.3,
};

const recentOrders = [
  {
    id: 1,
    service: "SEO Optimization",
    client: "TechStart Inc.",
    status: "in_progress",
    value: 1299,
    startDate: "2 days ago",
    deadline: "Ongoing",
  },
  {
    id: 2,
    service: "E-commerce Solutions",
    client: "Fashion Boutique",
    status: "completed",
    value: 3999,
    startDate: "1 week ago",
    deadline: "Delivered",
  },
  {
    id: 3,
    service: "Brand Development",
    client: "Green Energy Co.",
    status: "pending",
    value: 1999,
    startDate: "Today",
    deadline: "4 weeks",
  },
  {
    id: 4,
    service: "Website Maintenance",
    client: "Local Restaurant",
    status: "active",
    value: 299,
    startDate: "3 days ago",
    deadline: "Monthly",
  },
  {
    id: 5,
    service: "Business Strategy",
    client: "Startup Hub",
    status: "in_progress",
    value: 1990,
    startDate: "5 days ago",
    deadline: "2 weeks",
  },
];

const clientFeedback = [
  {
    id: 1,
    client: "Sarah Johnson",
    company: "TechStart Inc.",
    service: "SEO Optimization",
    rating: 5,
    comment:
      "Outstanding results! Our organic traffic increased by 340% in just 3 months.",
    date: "2 days ago",
  },
  {
    id: 2,
    client: "Mike Chen",
    company: "Fashion Boutique",
    service: "E-commerce Solutions",
    rating: 5,
    comment:
      "The new store exceeded our expectations. Sales increased by 250% since launch.",
    date: "1 week ago",
  },
  {
    id: 3,
    client: "Emma Rodriguez",
    company: "Green Energy Co.",
    service: "Brand Development",
    rating: 4,
    comment:
      "Great work on our brand identity. Really captured our vision perfectly.",
    date: "2 weeks ago",
  },
];

type CategoryType =
  | "digital_marketing"
  | "web_development"
  | "consulting"
  | "support";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("digital_marketing");
  const [activeTab, setActiveTab] = useState("services");
  const [searchQuery, setSearchQuery] = useState("");

  const currentCategory = serviceCategories.find(
    (cat) => cat.id === activeCategory,
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "featured":
        return (
          <Badge className="bg-[#ff5f6d] text-white text-xs">Featured</Badge>
        );
      case "premium":
        return (
          <Badge className="bg-purple-500 text-white text-xs">Premium</Badge>
        );
      case "active":
        return (
          <Badge className="bg-green-500 text-white text-xs">Active</Badge>
        );
      default:
        return null;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500 text-white text-xs">Completed</Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-500 text-white text-xs">In Progress</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 text-white text-xs">Pending</Badge>
        );
      case "active":
        return (
          <Badge className="bg-purple-500 text-white text-xs">Active</Badge>
        );
      default:
        return null;
    }
  };

  const tabs = [
    {
      id: "services",
      label: "Services",
      icon: <Settings className="w-4 h-4" />,
    },
    { id: "orders", label: "Orders", icon: <BarChart3 className="w-4 h-4" /> },
    {
      id: "feedback",
      label: "Feedback",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-[#ff5f6d]" />
          <h1 className="text-2xl font-semibold">Service Management</h1>
        </div>
        <Button className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ff5f6d] mb-1">
              {serviceMetrics.totalServices}
            </div>
            <div className="text-xs text-neutral-600">Total Services</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {serviceMetrics.activeClients}
            </div>
            <div className="text-xs text-neutral-600">Active Clients</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              ${(serviceMetrics.monthlyRevenue / 1000).toFixed(0)}k
            </div>
            <div className="text-xs text-neutral-600">Monthly Revenue</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-2xl font-bold text-yellow-500">
                {serviceMetrics.averageRating}
              </span>
            </div>
            <div className="text-xs text-neutral-600">Avg Rating</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500 mb-1">
              {serviceMetrics.completionRate}%
            </div>
            <div className="text-xs text-neutral-600">Completion Rate</div>
          </div>
        </Card>

        <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {serviceMetrics.clientRetention}%
            </div>
            <div className="text-xs text-neutral-600">Client Retention</div>
          </div>
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
      {activeTab === "services" && (
        <div>
          {/* Search and Filter */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Service Category Tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-fit mb-6">
            {serviceCategories.map((category) => (
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory?.services.map((service) => (
              <Card
                key={service.id}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(service.status)}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-neutral-600">
                            {service.rating}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-neutral-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-3">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-neutral-500 mb-2">
                      Features:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {service.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{service.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-bold text-[#ff5f6d]">
                        ${service.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {service.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-neutral-900">
                        {service.clients} clients
                      </div>
                      <div className="text-xs text-neutral-500">active</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        {order.service}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-2">
                        {order.client}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span>Started {order.startDate}</span>
                        <span>•</span>
                        <span>Deadline: {order.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-lg font-bold text-neutral-900">
                        ${order.value.toLocaleString()}
                      </div>
                      {getOrderStatusBadge(order.status)}
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-6">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Client Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {clientFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-6 rounded-lg border border-neutral-200 bg-neutral-50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-1">
                        {feedback.client}
                      </h4>
                      <p className="text-sm text-neutral-600 mb-2">
                        {feedback.company} • {feedback.service}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating
                              ? "text-yellow-500 fill-current"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-700 mb-3">{feedback.comment}</p>
                  <div className="text-xs text-neutral-500">
                    {feedback.date}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
