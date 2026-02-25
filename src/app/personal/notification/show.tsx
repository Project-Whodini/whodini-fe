'use client';

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Building2,
  Calendar,
  Clock,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type NotificationDetail = {
  id: number;
  brand: string;
  sourceType: string;
  relationship: string;
  title: string;
  message: string;
  type: string;
  timestamp?: string;
  expiresAt?: string;
  expiredAt?: string;
  icon: string;
  activeTab?: 'pending' | 'expired';
};

export default function NotificationShowPage() {
  const [notification, setNotification] = useState<NotificationDetail | null>(
    null
  );

  useEffect(() => {
    const raw = sessionStorage.getItem('whodini:selected-notification');
    if (!raw) return;

    try {
      setNotification(JSON.parse(raw) as NotificationDetail);
    } catch {
      setNotification(null);
    }
  }, []);

  const goBack = () => {
    const navigationEvent = new CustomEvent('whodini:navigate', {
      detail: { path: '/notifications' },
      cancelable: true,
    });
    window.dispatchEvent(navigationEvent);
  };

  if (!notification) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardContent className="py-8 sm:py-10 text-center space-y-3">
            <Bell className="w-10 h-10 text-neutral-400 mx-auto" />
            <p className="text-neutral-600">No notification selected.</p>
            <Button onClick={goBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          Notification Detail
        </h1>
        <Button onClick={goBack} variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="text-3xl">{notification.icon}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-600 truncate">
                    {notification.brand}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                  {notification.title}
                </CardTitle>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs capitalize self-start">
              {notification.type}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Clock className="w-4 h-4 text-neutral-400" />
            {notification.activeTab === 'expired'
              ? `Expired ${notification.expiredAt ?? ''}`
              : notification.timestamp}
          </div>

          {notification.activeTab !== 'expired' && notification.expiresAt && (
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span>Expires in {notification.expiresAt}</span>
            </div>
          )}

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-[#ff5f6d]/10 text-[#e04a58] font-medium">
              <Gift className="w-3 h-3" />
              {notification.relationship === 'followed'
                ? 'From followed source'
                : 'From subscribed source'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
