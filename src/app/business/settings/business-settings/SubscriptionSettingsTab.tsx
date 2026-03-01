'use client';

import { Button } from '@/components/ui/button';
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
import { CreditCard, Save, CheckCircle } from 'lucide-react';
import type { SubscriptionSettings } from './types';

interface SubscriptionSettingsTabProps {
  subscriptionSettings: SubscriptionSettings;
  setSubscriptionSettings: (value: SubscriptionSettings) => void;
  onSaveSettings: (section: string) => void;
}

export function SubscriptionSettingsTab({
  subscriptionSettings,
  setSubscriptionSettings,
  onSaveSettings,
}: SubscriptionSettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Subscription & Billing
        </CardTitle>
        <CardDescription>
          Manage your subscription plan and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">
                {subscriptionSettings.planName}
              </h3>
              <p className="text-blue-700">
                Billed {subscriptionSettings.planType} • Next billing:{' '}
                {new Date(
                  subscriptionSettings.nextBilling
                ).toLocaleDateString()}
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 border-blue-300"
            >
              Active
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="planType">Billing Cycle</Label>
            <select
              id="planType"
              value={subscriptionSettings.planType}
              onChange={(event) =>
                setSubscriptionSettings({
                  ...subscriptionSettings,
                  planType: event.target.value as 'monthly' | 'annual',
                })
              }
              className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="monthly">Monthly ($99/month)</option>
              <option value="annual">Annual ($990/year - Save 17%)</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Renewal</Label>
              <p className="text-sm text-gray-500">
                Automatically renew subscription
              </p>
            </div>
            <input
              type="checkbox"
              checked={subscriptionSettings.autoRenew}
              onChange={(event) =>
                setSubscriptionSettings({
                  ...subscriptionSettings,
                  autoRenew: event.target.checked,
                })
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="font-medium">Plan Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Up to 10,000 subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Unlimited notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Advanced analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Team collaboration (10 members)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">API access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            View Billing History
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => onSaveSettings('Subscription')}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
