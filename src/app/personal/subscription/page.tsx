'use client';

import { useState } from 'react';
import { RequireSession } from '@/components/app/RequireSession';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Crown,
  Calendar,
  Clock,
  Zap,
  Bell,
  Mail,
  Gift,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Static data for subscriptions
const subscriptions = [
  {
    id: '1',
    brand: 'TechStartup Inc.',
    digitalId: '@techstartup',
    industry: 'Technology',
    tier: 'Free',
    subscribedAt: '2024-01-15',
    status: 'active',
    color: 'bg-blue-500',
    notificationsEnabled: true,
    benefits: [
      'Early access to products',
      'Exclusive webinars',
      'Direct support',
    ],
    nextBilling: null,
    monthlyPrice: 0,
    priceLabel: 'Free',
  },
  {
    id: '2',
    brand: 'Eco Fashion Co.',
    digitalId: '@ecofashion',
    industry: 'Fashion',
    tier: 'Free',
    subscribedAt: '2024-02-01',
    status: 'active',
    color: 'bg-green-500',
    notificationsEnabled: false,
    benefits: [
      '10% discount on all items',
      'Monthly newsletter',
      'Sustainability reports',
    ],
    nextBilling: null,
    monthlyPrice: 0,
    priceLabel: 'Free',
  },
  {
    id: '3',
    brand: 'Fitness Hub',
    digitalId: '@fitnesshub',
    industry: 'Health & Fitness',
    tier: 'Free',
    subscribedAt: '2024-01-20',
    status: 'active',
    color: 'bg-red-500',
    notificationsEnabled: true,
    benefits: ['Workout plans', 'Nutrition guides', 'Community access'],
    nextBilling: null,
    monthlyPrice: 0,
    priceLabel: 'Free',
  },
  {
    id: '4',
    brand: 'Creative Studios',
    digitalId: '@creativestudios',
    industry: 'Design',
    tier: 'Free',
    subscribedAt: '2024-02-10',
    status: 'active',
    color: 'bg-purple-500',
    notificationsEnabled: true,
    benefits: ['Design templates', 'Creative workshops', 'Portfolio reviews'],
    nextBilling: null,
    monthlyPrice: 0,
    priceLabel: 'Free',
  },
];

// Static data for recent activities
const recentActivities = [
  {
    id: '1',
    type: 'content',
    brand: 'TechStartup Inc.',
    title: 'New Product Launch: AI Assistant 2.0',
    timestamp: '2024-02-10T14:30:00Z',
    description: 'Exclusive preview of our latest AI assistant features.',
  },
  {
    id: '2',
    type: 'event',
    brand: 'Creative Studios',
    title: 'Virtual Workshop: Advanced Design Patterns',
    timestamp: '2024-02-09T16:00:00Z',
    description: 'Learn cutting-edge design techniques from industry experts.',
  },
  {
    id: '3',
    type: 'discount',
    brand: 'Eco Fashion Co.',
    title: 'Flash Sale: 25% Off Sustainable Collection',
    timestamp: '2024-02-08T10:00:00Z',
    description: 'Limited time offer on our eco-friendly clothing line.',
  },
];

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationSettings, setNotificationSettings] = useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      subscriptions
        .filter((subscription) => subscription.status === 'active')
        .map((subscription) => [
          subscription.id,
          subscription.notificationsEnabled,
        ])
    )
  );

  const filteredSubscriptions = subscriptions
    .filter((sub) => sub.status === 'active')
    .filter((sub) => {
      const matchesSearch =
        sub.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.industry.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

  const activeCount = filteredSubscriptions.length;
  const notificationsEnabledCount = filteredSubscriptions.filter(
    (subscription) => notificationSettings[subscription.id]
  ).length;

  const handleToggleNotifications = (subscriptionId: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [subscriptionId]: !prev[subscriptionId],
    }));
  };

  return (
    <RequireSession>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            My Subscriptions
          </h1>
          <p className="text-sm sm:text-base text-neutral-600">
            List of your active subscriptions with notification controls
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscriptions
              </CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notifications Enabled
              </CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {notificationsEnabledCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Out of {activeCount} active subscriptions
              </p>
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
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search active subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredSubscriptions.map((subscription) => {
            const notificationsEnabled = notificationSettings[subscription.id];

            return (
              <Card key={subscription.id} className="relative overflow-hidden">
                <div
                  className={`absolute top-0 left-0 w-full h-1 ${subscription.color}`}
                />
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <CardTitle className="text-lg break-words">
                        {subscription.brand}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 break-words">
                        {subscription.digitalId} · {subscription.industry}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge>{subscription.status}</Badge>
                      <Badge variant="outline">{subscription.tier}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium text-lg">
                      {subscription.priceLabel}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subscribed:{' '}
                      {new Date(subscription.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Benefits:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {subscription.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-green-500 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button
                      size="sm"
                      variant={notificationsEnabled ? 'default' : 'outline'}
                      className="w-full sm:flex-1"
                      onClick={() => handleToggleNotifications(subscription.id)}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      {notificationsEnabled
                        ? 'Disable Notifications'
                        : 'Enable Notifications'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
                    {activity.type === 'content' && (
                      <Mail className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === 'event' && (
                      <Calendar className="h-5 w-5 text-green-500" />
                    )}
                    {activity.type === 'discount' && (
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
      </div>
    </RequireSession>
  );
}
