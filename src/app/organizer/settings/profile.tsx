'use client';

import { useState } from 'react';
import {
  Save,
  Building2,
  Globe,
  Upload,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
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

export default function ProfileSettings() {
  const [orgName, setOrgName] = useState('Demo Organizer');
  const [orgEmail, setOrgEmail] = useState('contact@demoorganizer.com');
  const [orgPhone, setOrgPhone] = useState('+1 (555) 123-4567');
  const [orgAddress, setOrgAddress] = useState('123 Event Plaza, Downtown');
  const [orgCity, setOrgCity] = useState('San Francisco');
  const [orgWebsite, setOrgWebsite] = useState('https://demoorganizer.com');
  const [orgDescription, setOrgDescription] = useState(
    'Leading event organizers specializing in community events and conferences.'
  );

  const handleSaveProfile = () => {
    alert('Profile settings saved successfully!');
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#ff5f6d]" />
          Organization Profile
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Manage your organization&apos;s public profile and contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white text-2xl font-bold">
            {orgName.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-neutral-900">
              Organization Logo
            </h3>
            <p className="text-sm text-neutral-600 mb-2">
              Upload a logo for your organization
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-neutral-300 hover:bg-neutral-50 rounded-lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Logo
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="org-name"
              className="text-sm font-medium text-neutral-700"
            >
              Organization Name *
            </Label>
            <Input
              id="org-name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="org-email"
              className="text-sm font-medium text-neutral-700 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email Address *
            </Label>
            <Input
              id="org-email"
              type="email"
              value={orgEmail}
              onChange={(e) => setOrgEmail(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="org-phone"
              className="text-sm font-medium text-neutral-700 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <Input
              id="org-phone"
              value={orgPhone}
              onChange={(e) => setOrgPhone(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="org-website"
              className="text-sm font-medium text-neutral-700 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Website
            </Label>
            <Input
              id="org-website"
              value={orgWebsite}
              onChange={(e) => setOrgWebsite(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="org-address"
              className="text-sm font-medium text-neutral-700 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Address
            </Label>
            <Input
              id="org-address"
              value={orgAddress}
              onChange={(e) => setOrgAddress(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="org-city"
              className="text-sm font-medium text-neutral-700"
            >
              City
            </Label>
            <Input
              id="org-city"
              value={orgCity}
              onChange={(e) => setOrgCity(e.target.value)}
              className="rounded-lg border-neutral-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="org-description"
            className="text-sm font-medium text-neutral-700"
          >
            Description
          </Label>
          <textarea
            id="org-description"
            value={orgDescription}
            onChange={(e) => setOrgDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
            placeholder="Describe your organization..."
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-200">
          <Button
            onClick={handleSaveProfile}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
