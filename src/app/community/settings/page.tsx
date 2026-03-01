'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './general';
import CommunityNotificationPage from './notifications';

export default function CommunitySettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900">
            Community Settings
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1">
            Manage community configuration and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-neutral-100">
            <TabsTrigger
              value="general"
              className="rounded-lg data-[state=active]:bg-white"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-lg data-[state=active]:bg-white"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>

          <TabsContent value="notifications">
            <CommunityNotificationPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
