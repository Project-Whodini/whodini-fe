'use client';

import { useState } from 'react';
import { RequireSession } from '@/components/app/RequireSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MobileMetrics } from '@/components/app/MobileMetrics';
import {
  Bell,
  Send,
  MapPin,
  Clock,
  Target,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Megaphone,
  Calendar,
  Search,
} from 'lucide-react';

// TypeScript interfaces
interface NotificationForm {
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  locationRadius: string;
  scheduledTime?: string;
  actionUrl?: string;
  imageUrl?: string;
}

type NotificationType = 'promotional' | 'informational' | 'urgent' | 'event';
type AudienceType =
  | 'all_subscribers'
  | 'location_based'
  | 'premium_only'
  | 'new_subscribers';

interface SentNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  sentAt: string;
  delivered: number;
  opened: number;
  clicked: number;
  status: 'sent' | 'scheduled' | 'draft' | 'failed';
}

// Static data for sent notifications
const sentNotifications: SentNotification[] = [
  {
    id: '1',
    title: 'Flash Sale: 50% Off Everything!',
    message:
      "Don't miss our biggest sale of the year! Use code SAVE50 for 50% off all items. Valid until midnight!",
    type: 'promotional',
    audience: 'all_subscribers',
    sentAt: '2024-02-11T14:30:00Z',
    delivered: 1247,
    opened: 423,
    clicked: 89,
    status: 'sent',
  },
  {
    id: '2',
    title: 'New Product Launch: Smart Fitness Tracker',
    message:
      'Introducing our latest innovation! The SmartFit Pro is now available with exclusive early access for our premium members.',
    type: 'informational',
    audience: 'premium_only',
    sentAt: '2024-02-10T09:15:00Z',
    delivered: 356,
    opened: 234,
    clicked: 67,
    status: 'sent',
  },
  {
    id: '3',
    title: 'Store Opening - Grand Celebration!',
    message:
      'Join us for the grand opening of our new downtown location! Free samples, live music, and exclusive opening day discounts.',
    type: 'event',
    audience: 'location_based',
    sentAt: '2024-02-09T12:00:00Z',
    delivered: 892,
    opened: 445,
    clicked: 178,
    status: 'sent',
  },
  {
    id: '4',
    title: 'Important: Service Maintenance Notice',
    message:
      'Our services will be temporarily unavailable tonight from 11 PM to 3 AM for scheduled maintenance. We apologize for any inconvenience.',
    type: 'urgent',
    audience: 'all_subscribers',
    sentAt: '2024-02-08T16:45:00Z',
    delivered: 2134,
    opened: 1567,
    clicked: 234,
    status: 'sent',
  },
  {
    id: '5',
    title: 'Welcome to Our Community!',
    message:
      "Thank you for subscribing! Here's a special 20% discount code just for you: WELCOME20",
    type: 'promotional',
    audience: 'new_subscribers',
    sentAt: '2024-02-07T10:30:00Z',
    delivered: 156,
    opened: 134,
    clicked: 67,
    status: 'sent',
  },
];

const getNotificationTypeColor = (type: NotificationType): string => {
  switch (type) {
    case 'promotional':
      return 'bg-green-500';
    case 'informational':
      return 'bg-blue-500';
    case 'urgent':
      return 'bg-red-500';
    case 'event':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getNotificationTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'promotional':
      return <Megaphone className="h-4 w-4" />;
    case 'informational':
      return <Info className="h-4 w-4" />;
    case 'urgent':
      return <AlertCircle className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getNotificationTypeBadgeClass = (type: NotificationType): string => {
  switch (type) {
    case 'promotional':
      return 'bg-[#ff5f6d] text-white border-[#ff5f6d]';
    case 'informational':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'urgent':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'event':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const getAudienceBadgeClass = (audience: AudienceType): string => {
  switch (audience) {
    case 'premium_only':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'location_based':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'new_subscribers':
      return 'bg-green-100 text-green-700 border-green-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const formatLabel = (value: string) =>
  value
    .replaceAll('_', ' ')
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export default function BusinessNotificationPage() {
  const [formData, setFormData] = useState<NotificationForm>({
    title: '',
    message: '',
    type: 'informational',
    audience: 'all_subscribers',
    locationRadius: '5',
    scheduledTime: '',
    actionUrl: '',
    imageUrl: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all');
  const [blastType, setBlastType] = useState<'marketing' | 'promo' | null>(
    null
  );

  const handleInputChange = (field: keyof NotificationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyBlast = (type: 'marketing' | 'promo') => {
    setBlastType(type);

    if (type === 'marketing') {
      setFormData((prev) => ({
        ...prev,
        title: prev.title || 'Marketing Update',
        message:
          prev.message ||
          'Stay tuned for our latest updates, featured insights, and new community highlights.',
        type: 'informational',
        audience: 'all_subscribers',
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      title: prev.title || 'Limited-Time Promo',
      message:
        prev.message ||
        'Special promo now live. Tap to unlock your exclusive offer before it expires.',
      type: 'promotional',
      audience: 'all_subscribers',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo purpose - simulate sending notification
    console.log('Sending notification:', formData);
    alert('Notification sent successfully! (Demo)');

    // Reset form
    setFormData({
      title: '',
      message: '',
      type: 'informational',
      audience: 'all_subscribers',
      locationRadius: '5',
      scheduledTime: '',
      actionUrl: '',
      imageUrl: '',
    });
    setBlastType(null);
  };

  const filteredNotifications = sentNotifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'all' || notification.type === filterType;

    return matchesSearch && matchesType;
  });

  const totalDelivered = sentNotifications.reduce(
    (sum, notif) => sum + notif.delivered,
    0
  );
  const totalOpened = sentNotifications.reduce(
    (sum, notif) => sum + notif.opened,
    0
  );
  const avgOpenRate =
    totalDelivered > 0
      ? ((totalOpened / totalDelivered) * 100).toFixed(1)
      : '0';
  const avgClickRate =
    totalDelivered > 0
      ? (
          (sentNotifications.reduce((sum, notif) => sum + notif.clicked, 0) /
            totalDelivered) *
          100
        ).toFixed(1)
      : '0';

  const mobileMetricItems = [
    {
      label: 'Total Sent',
      value: (
        <>
          <Send className="h-4 w-4 text-[#ff5f6d]" />
          {sentNotifications.length}
        </>
      ),
      valueClassName: 'text-[#ff5f6d]',
    },
    {
      label: 'Delivered',
      value: (
        <>
          <CheckCircle className="h-4 w-4 text-green-500" />
          {totalDelivered.toLocaleString()}
        </>
      ),
      valueClassName: 'text-green-500',
    },
    {
      label: 'Open Rate',
      value: (
        <>
          <Eye className="h-4 w-4 text-blue-500" />
          {avgOpenRate}%
        </>
      ),
      valueClassName: 'text-blue-500',
    },
    {
      label: 'Click Rate',
      value: (
        <>
          <Target className="h-4 w-4 text-purple-500" />
          {avgClickRate}%
        </>
      ),
      valueClassName: 'text-purple-500',
    },
  ];

  return (
    <RequireSession>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          {/* Header Section */}
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-[#ff5f6d]" />
            <h1 className="text-2xl font-semibold text-neutral-900">
              Notification Center
            </h1>
          </div>
          <div>
            <p className="text-neutral-600">
              Create and send notifications to your subscribers and nearby
              users.
            </p>
          </div>

          {/* Notification Stats */}
          <MobileMetrics items={mobileMetricItems} />

          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sent
                </CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sentNotifications.length}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalDelivered.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total recipients
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgOpenRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Average open rate
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border border-neutral-200 rounded-xl bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Click Rate
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgClickRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Average click rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Create New Notification */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Create New Notification
              </CardTitle>
              <CardDescription>
                Compose and send notifications to your audience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label>Mail Blast</Label>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleApplyBlast('marketing')}
                        className={
                          blastType === 'marketing'
                            ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white border-[#ff5f6d] rounded-xl'
                            : 'border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50'
                        }
                      >
                        Marketing Blast
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleApplyBlast('promo')}
                        className={
                          blastType === 'promo'
                            ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white border-[#ff5f6d] rounded-xl'
                            : 'border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50'
                        }
                      >
                        Promo Blast
                      </Button>
                      {blastType && (
                        <Badge
                          variant="outline"
                          className="bg-neutral-100 text-neutral-700 border-neutral-200"
                        >
                          {blastType === 'marketing'
                            ? 'Marketing Blast Active'
                            : 'Promo Blast Active'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="title">Notification Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter notification title..."
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange('title', e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="message">Message *</Label>
                    <textarea
                      id="message"
                      placeholder="Write your notification message..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Notification Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        handleInputChange('type', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="informational">Informational</option>
                      <option value="promotional">Promotional</option>
                      <option value="urgent">Urgent</option>
                      <option value="event">Event</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="audience">Target Audience</Label>
                    <select
                      id="audience"
                      value={formData.audience}
                      onChange={(e) =>
                        handleInputChange(
                          'audience',
                          e.target.value as AudienceType
                        )
                      }
                      className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all_subscribers">All Subscribers</option>
                      <option value="new_subscribers">New Subscribers</option>
                    </select>
                  </div>

                  {formData.audience === 'location_based' && (
                    <div>
                      <Label
                        htmlFor="locationRadius"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4" />
                        Location Radius (km)
                      </Label>
                      <Input
                        id="locationRadius"
                        type="number"
                        placeholder="5"
                        value={formData.locationRadius}
                        onChange={(e) =>
                          handleInputChange('locationRadius', e.target.value)
                        }
                        className="mt-1"
                        min="1"
                        max="100"
                      />
                    </div>
                  )}

                  <div>
                    <Label
                      htmlFor="scheduledTime"
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Schedule Time (Optional)
                    </Label>
                    <Input
                      id="scheduledTime"
                      type="datetime-local"
                      value={formData.scheduledTime}
                      onChange={(e) =>
                        handleInputChange('scheduledTime', e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="actionUrl">Action URL (Optional)</Label>
                    <Input
                      id="actionUrl"
                      placeholder="https://yourstore.com/special-offer"
                      value={formData.actionUrl}
                      onChange={(e) =>
                        handleInputChange('actionUrl', e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <Separator />

                {/* Preview Section */}
                {showPreview && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Notification Preview
                    </h3>
                    <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-sm max-w-sm">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getNotificationTypeColor(formData.type)} text-white`}
                        >
                          {getNotificationTypeIcon(formData.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">
                            {formData.title || 'Notification Title'}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {formData.message ||
                              'Your notification message will appear here...'}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">Just now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center justify-center gap-2 border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                  >
                    <Eye className="h-4 w-4" />
                    {showPreview ? 'Hide Preview' : 'Show Preview'}
                  </Button>

                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                    >
                      Save as Draft
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-xl w-full sm:w-auto"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {formData.scheduledTime
                        ? 'Schedule Notification'
                        : 'Send Now'}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sent Notifications History */}
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Notification History
                  </CardTitle>
                  <CardDescription>
                    View and manage your sent notifications
                  </CardDescription>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(e.target.value as NotificationType | 'all')
                    }
                    className="px-3 py-2 border border-neutral-300 rounded-xl bg-white text-sm text-neutral-700"
                  >
                    <option value="all">All Types</option>
                    <option value="promotional">Promotional</option>
                    <option value="informational">Informational</option>
                    <option value="urgent">Urgent</option>
                    <option value="event">Event</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border border-neutral-200 rounded-xl bg-white shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-3">
                          <div>
                            <h4 className="font-medium text-lg">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                          <span>
                            Sent:{' '}
                            {new Date(notification.sentAt).toLocaleString()}
                          </span>
                          <Badge
                            variant="outline"
                            className={getAudienceBadgeClass(
                              notification.audience
                            )}
                          >
                            {formatLabel(notification.audience)}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={getNotificationTypeBadgeClass(
                              notification.type
                            )}
                          >
                            {formatLabel(notification.type)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3 sm:gap-4">
                          <div>
                            <span className="text-gray-500">Delivered:</span>
                            <span className="font-medium ml-1">
                              {notification.delivered.toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Opened:</span>
                            <span className="font-medium ml-1">
                              {notification.opened.toLocaleString()}
                            </span>
                            <span className="text-gray-400 ml-1">
                              (
                              {(
                                (notification.opened / notification.delivered) *
                                100
                              ).toFixed(1)}
                              %)
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Clicked:</span>
                            <span className="font-medium ml-1">
                              {notification.clicked.toLocaleString()}
                            </span>
                            <span className="text-gray-400 ml-1">
                              (
                              {(
                                (notification.clicked /
                                  notification.delivered) *
                                100
                              ).toFixed(1)}
                              %)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                        >
                          Resend
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RequireSession>
  );
}
