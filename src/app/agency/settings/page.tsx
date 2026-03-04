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

export default function AgencySettingsPage() {
  const [agencySettings, setAgencySettings] = useState({
    organizationName: 'Demo Agency',
    email: 'contact@demoagency.com',
    phone: '+1 (555) 123-4567',
    website: 'www.demoagency.com',
    address: '123 Creative Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States',
    description:
      'A full-service digital agency specializing in web design and development.',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    language: 'English',
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSaveSettings = (section: string) => {
    const message = `Save changes to ${section} settings?`;
    if (window.confirm(message)) {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Agency Settings
          </h1>
          <p className="text-neutral-600 mt-1">
            Manage your agency configuration and preferences
          </p>
        </div>

        {showSuccessAlert && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-green-800 font-medium">
              Changes saved successfully!
            </p>
          </div>
        )}

        <div className="space-y-6">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic agency details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="organizationName"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Organization Name
                  </Label>
                  <Input
                    id="organizationName"
                    value={agencySettings.organizationName}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        organizationName: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={agencySettings.email}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={agencySettings.phone}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="website"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={agencySettings.website}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-neutral-700"
                >
                  Agency Description
                </Label>
                <textarea
                  id="description"
                  value={agencySettings.description}
                  onChange={(e) =>
                    setAgencySettings((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:ring-[#ff5f6d]"
                  rows={3}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={agencySettings.address}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="text-sm font-medium text-neutral-700"
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={agencySettings.city}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="state"
                    className="text-sm font-medium text-neutral-700"
                  >
                    State/Province
                  </Label>
                  <Input
                    id="state"
                    value={agencySettings.state}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="zipCode"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    value={agencySettings.zipCode}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="country"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={agencySettings.country}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="timezone"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Timezone
                  </Label>
                  <select
                    id="timezone"
                    value={agencySettings.timezone}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        timezone: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
                  >
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/New_York">Eastern Time</option>
                  </select>
                </div>
                <div>
                  <Label
                    htmlFor="currency"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Currency
                  </Label>
                  <select
                    id="currency"
                    value={agencySettings.currency}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div>
                  <Label
                    htmlFor="language"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Language
                  </Label>
                  <select
                    id="language"
                    value={agencySettings.language}
                    onChange={(e) =>
                      setAgencySettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => handleSaveSettings('general')}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
