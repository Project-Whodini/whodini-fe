'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    communityName: 'Digital Innovators Community',
    email: 'contact@digitaldiversity.com',
    phone: '+1-415-555-0100',
    website: 'www.digitaldiversity.com',
    description: 'A thriving community of digital innovators and entrepreneurs',
  });

  const handleSave = () => {
    const confirmed = window.confirm('Save general settings?');
    if (confirmed) {
      alert('General settings saved successfully!');
    }
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-neutral-900">
          General Information
        </CardTitle>
        <CardDescription className="text-neutral-600 text-sm">
          Basic community details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6 space-y-4">
        <div>
          <Label className="text-sm font-medium text-neutral-700">
            Community Name
          </Label>
          <Input
            value={settings.communityName}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                communityName: e.target.value,
              }))
            }
            className="mt-1 border border-neutral-300 rounded-lg"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-neutral-700">
            Description
          </Label>
          <textarea
            value={settings.description}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent resize-none"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-neutral-700">
              Email
            </Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, email: e.target.value }))
              }
              className="mt-1 border border-neutral-300 rounded-lg"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-neutral-700">
              Phone
            </Label>
            <Input
              value={settings.phone}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="mt-1 border border-neutral-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-neutral-700">
            Website
          </Label>
          <Input
            value={settings.website}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, website: e.target.value }))
            }
            className="mt-1 border border-neutral-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            Save General Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
