'use client';

import { useState } from 'react';
import { Building2, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileSettings from './profile';
import NotificationsSettings from './blast';

type SettingsTab = 'profile' | 'notifications';

export default function OrganizerSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const organizerName = 'Demo Organizer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">
            Manage settings and preferences for{' '}
            <span className="font-semibold">{organizerName}</span>
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as SettingsTab)}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-neutral-200 rounded-lg p-1">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
            >
              <Send className="w-4 h-4 mr-2" />
              Blast Mail
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
