'use client';

import { useState } from 'react';
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
import {
  Bell,
  Send,
  Clock,
  Eye,
  AlertCircle,
  Info,
  Megaphone,
  Calendar,
  Search,
  Users,
} from 'lucide-react';

type NotificationType = 'announcement' | 'event' | 'urgent' | 'general';
type AudienceType = 'all_members' | 'chapter_members';

interface NotificationForm {
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  scheduledTime?: string;
  actionUrl?: string;
}

interface SentNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  audience: AudienceType;
  sentAt: string;
  opened: number;
  clicked: number;
  status: 'sent' | 'scheduled' | 'draft';
}

const sentNotifications: SentNotification[] = [
  {
    id: '1',
    title: 'Welcome to Our Annual Community Gathering!',
    message:
      'We are excited to announce our annual gathering this coming Saturday. Food, activities, and great company await. RSVP by Friday!',
    type: 'event',
    audience: 'all_members',
    sentAt: '2024-02-11T10:00:00Z',
    opened: 198,
    clicked: 74,
    status: 'sent',
  },
  {
    id: '2',
    title: 'New Chapter Opening in Northside District',
    message:
      'We are proud to announce the opening of our new Northside chapter. Members in that area are encouraged to transfer or sign up for local events.',
    type: 'announcement',
    audience: 'all_members',
    sentAt: '2024-02-09T09:30:00Z',
    opened: 221,
    clicked: 88,
    status: 'sent',
  },
  {
    id: '3',
    title: 'Urgent: Venue Change for This Weekend',
    message:
      "Due to unforeseen circumstances, this weekend's meetup location has changed to the Riverside Community Hall. Same time applies.",
    type: 'urgent',
    audience: 'chapter_members',
    sentAt: '2024-02-08T14:15:00Z',
    opened: 80,
    clicked: 12,
    status: 'sent',
  },
  {
    id: '4',
    title: 'Leadership Meeting � Agenda & Notes',
    message:
      "Please review the attached agenda for this month's leadership sync. We will be discussing the Q2 community roadmap and membership drive.",
    type: 'general',
    audience: 'all_members',
    sentAt: '2024-02-07T08:00:00Z',
    opened: 13,
    clicked: 6,
    status: 'sent',
  },
  {
    id: '5',
    title: 'Welcome New Members � February Cohort',
    message:
      'Please join us in welcoming 24 new members who joined in February! Reach out and make them feel at home in our community.',
    type: 'announcement',
    audience: 'all_members',
    sentAt: '2024-02-05T11:00:00Z',
    opened: 167,
    clicked: 45,
    status: 'sent',
  },
];

const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'announcement':
      return <Megaphone className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    case 'urgent':
      return <AlertCircle className="h-4 w-4" />;
    case 'general':
      return <Info className="h-4 w-4" />;
  }
};

const getTypeBadgeClass = (type: NotificationType): string => {
  switch (type) {
    case 'announcement':
      return 'bg-[#ff5f6d]/10 text-[#ff5f6d] border-[#ff5f6d]/20';
    case 'event':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'urgent':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'general':
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

const getAudienceBadgeClass = (audience: AudienceType): string => {
  switch (audience) {
    case 'all_members':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    case 'chapter_members':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200';
  }
};

const COMMUNITY_CHAPTERS = [
  { id: 'northside', name: 'Northside Chapter' },
  { id: 'southgate', name: 'Southgate Chapter' },
  { id: 'eastwood', name: 'Eastwood Chapter' },
  { id: 'westview', name: 'Westview Chapter' },
  { id: 'central', name: 'Central Chapter' },
  { id: 'downtown', name: 'Downtown Chapter' },
] as const;

const formatLabel = (value: string) =>
  value
    .replaceAll('_', ' ')
    .split(' ')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');

export default function NotificationsSettings() {
  const [selectedChapter, setSelectedChapter] = useState<string>('all');

  const [formData, setFormData] = useState<NotificationForm>({
    title: '',
    message: '',
    type: 'announcement',
    audience: 'all_members',
    scheduledTime: '',
    actionUrl: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all');
  const [blastType, setBlastType] = useState<'update' | 'event' | null>(null);

  const handleInputChange = (field: keyof NotificationForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyBlast = (type: 'update' | 'event') => {
    setBlastType(type);
    if (type === 'update') {
      setFormData((prev) => ({
        ...prev,
        title: prev.title || 'Community Update',
        message:
          prev.message ||
          'Here is the latest from your community. Stay connected and check in for new announcements.',
        type: 'announcement',
        audience: 'all_members',
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        title: prev.title || 'Upcoming Community Event',
        message:
          prev.message ||
          'We have an exciting event coming up! Mark your calendar and join us for a great time.',
        type: 'event',
        audience: 'all_members',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Notification sent to members! (Demo)');
    setFormData({
      title: '',
      message: '',
      type: 'announcement',
      audience: 'all_members',
      scheduledTime: '',
      actionUrl: '',
    });
    setBlastType(null);
    setSelectedChapter('all');
  };

  const filteredNotifications = sentNotifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || n.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Compose Notification */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Send Community Notification
          </CardTitle>
          <CardDescription>
            Blast an announcement or update to your community members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Blast */}
              <div className="md:col-span-2">
                <Label>Quick Blast</Label>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleApplyBlast('update')}
                    className={
                      blastType === 'update'
                        ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white border-[#ff5f6d] rounded-xl'
                        : 'border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50'
                    }
                  >
                    Community Update
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleApplyBlast('event')}
                    className={
                      blastType === 'event'
                        ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white border-[#ff5f6d] rounded-xl'
                        : 'border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50'
                    }
                  >
                    Event Blast
                  </Button>
                  {blastType && (
                    <Badge
                      variant="outline"
                      className="bg-neutral-100 text-neutral-700 border-neutral-200"
                    >
                      {blastType === 'update'
                        ? 'Community Update Active'
                        : 'Event Blast Active'}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <Label htmlFor="message">Message *</Label>
                <textarea
                  id="message"
                  placeholder="Write your message to members..."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Type */}
              <div>
                <Label htmlFor="type">Notification Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
                >
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="urgent">Urgent</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Audience */}
              <div>
                <Label htmlFor="audience" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Audience
                </Label>
                <select
                  id="audience"
                  value={formData.audience}
                  onChange={(e) => {
                    handleInputChange(
                      'audience',
                      e.target.value as AudienceType
                    );
                    if (e.target.value !== 'chapter_members')
                      setSelectedChapter('all');
                  }}
                  className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
                >
                  <option value="all_members">All Members</option>
                  <option value="chapter_members">Chapter Members</option>
                </select>
              </div>

              {/* Chapter selector — shown only when Chapter Members is selected */}
              {formData.audience === 'chapter_members' && (
                <div className="md:col-span-2">
                  <Label htmlFor="chapter" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Select Chapter
                  </Label>
                  <select
                    id="chapter"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-[#ff5f6d]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent bg-[#ff5f6d]/5"
                  >
                    <option value="all">All Chapters</option>
                    {COMMUNITY_CHAPTERS.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.name}
                      </option>
                    ))}
                  </select>
                  {selectedChapter !== 'all' && (
                    <p className="mt-1.5 text-xs text-neutral-500">
                      Sending to:{' '}
                      <span className="font-medium text-[#ff5f6d]">
                        {
                          COMMUNITY_CHAPTERS.find(
                            (c) => c.id === selectedChapter
                          )?.name
                        }
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* Schedule */}
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

              {/* Action URL */}
              <div>
                <Label htmlFor="actionUrl">Action URL (Optional)</Label>
                <Input
                  id="actionUrl"
                  placeholder="https://..."
                  value={formData.actionUrl}
                  onChange={(e) =>
                    handleInputChange('actionUrl', e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <Separator />

            {/* Preview */}
            {showPreview && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-700">
                  Preview
                </h3>
                <div className="border border-neutral-200 rounded-xl p-4 bg-neutral-50 max-w-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#ff5f6d] text-white">
                      {getTypeIcon(formData.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {formData.title || 'Notification Title'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {formData.message || 'Your message will appear here...'}
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
                  {formData.scheduledTime ? 'Schedule' : 'Send Now'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Notification History
              </CardTitle>
              <CardDescription>
                Past announcements sent to community members
              </CardDescription>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                <option value="announcement">Announcement</option>
                <option value="event">Event</option>
                <option value="urgent">Urgent</option>
                <option value="general">General</option>
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
                      <div className="mt-0.5 p-1.5 rounded-lg bg-[#ff5f6d]/10 text-[#ff5f6d]">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div>
                        <h4 className="font-medium text-base">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 pl-9">
                      <span>
                        {new Date(notification.sentAt).toLocaleString()}
                      </span>
                      <Badge
                        variant="outline"
                        className={getAudienceBadgeClass(notification.audience)}
                      >
                        {formatLabel(notification.audience)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getTypeBadgeClass(notification.type)}
                      >
                        {formatLabel(notification.type)}
                      </Badge>
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

            {filteredNotifications.length === 0 && (
              <div className="text-center py-10 text-neutral-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No notifications found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
