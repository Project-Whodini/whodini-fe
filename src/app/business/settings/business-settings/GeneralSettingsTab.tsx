'use client';

import type { ChangeEvent, FormEvent } from 'react';
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
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  Building2,
  MapPin,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Music2,
  Phone,
  Save,
} from 'lucide-react';
import Image from 'next/image';
import type { SetupFormData } from './types';

interface GeneralSettingsTabProps {
  setupFormData: SetupFormData;
  logoPreview: string | null;
  logoMeta: {
    fileName: string;
    fileSizeMb: number;
    width: number;
    height: number;
  } | null;
  onSetupInputChange: (field: string, value: string) => void;
  onLogoUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

export function GeneralSettingsTab({
  setupFormData,
  logoPreview,
  logoMeta,
  onSetupInputChange,
  onLogoUpload,
  onSubmit,
}: GeneralSettingsTabProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Business Logo
          </CardTitle>
          <CardDescription>
            Upload your business logo (best size: 512×512px, square)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative">
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Business Logo"
                  width={100}
                  height={100}
                  className="rounded-xl border border-neutral-200 object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-neutral-100 rounded-xl border border-dashed border-neutral-300 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-neutral-400" />
                </div>
              )}
            </div>
            <div className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer sm:w-auto"
                onClick={() => {
                  const fileInput = document.getElementById(
                    'logo-upload'
                  ) as HTMLInputElement | null;
                  fileInput?.click();
                }}
                aria-controls="logo-upload"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Logo
              </Button>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={onLogoUpload}
                className="hidden"
              />
              <p className="text-xs text-neutral-500 mt-1">
                PNG, JPG up to 5MB • Recommended 512×512px
              </p>
              {logoPreview && logoMeta && (
                <div className="mt-2 space-y-1 text-xs text-neutral-600">
                  <p>
                    Previewing: {logoMeta.fileName} ({logoMeta.fileSizeMb}MB)
                  </p>
                  {logoMeta.width > 0 && logoMeta.height > 0 && (
                    <p>
                      Dimensions: {logoMeta.width}×{logoMeta.height}px
                    </p>
                  )}
                  {(logoMeta.width !== logoMeta.height ||
                    logoMeta.width < 512 ||
                    logoMeta.height < 512) &&
                    logoMeta.width > 0 &&
                    logoMeta.height > 0 && (
                      <p className="text-neutral-700">
                        For best quality, use a square logo at 512×512px or
                        larger.
                      </p>
                    )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Tell us about your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="setup-businessName">Business Name *</Label>
              <Input
                id="setup-businessName"
                placeholder="Enter your business name"
                value={setupFormData.businessName}
                onChange={(event) =>
                  onSetupInputChange('businessName', event.target.value)
                }
                className="mt-1"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="setup-description">Business Description</Label>
              <textarea
                id="setup-description"
                placeholder="Briefly describe your business..."
                value={setupFormData.description}
                onChange={(event) =>
                  onSetupInputChange('description', event.target.value)
                }
                className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="setup-category">Business Category</Label>
              <Input
                id="setup-category"
                placeholder="e.g., Technology, Retail, etc."
                value={setupFormData.category}
                onChange={(event) =>
                  onSetupInputChange('category', event.target.value)
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Contact Information
          </CardTitle>
          <CardDescription>Where can customers reach you?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="setup-address">Street Address</Label>
              <Input
                id="setup-address"
                placeholder="Enter your business address"
                value={setupFormData.address}
                onChange={(event) =>
                  onSetupInputChange('address', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-city">City</Label>
              <Input
                id="setup-city"
                placeholder="City"
                value={setupFormData.city}
                onChange={(event) =>
                  onSetupInputChange('city', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-state">State/Province</Label>
              <Input
                id="setup-state"
                placeholder="State"
                value={setupFormData.state}
                onChange={(event) =>
                  onSetupInputChange('state', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-zipCode">ZIP/Postal Code</Label>
              <Input
                id="setup-zipCode"
                placeholder="ZIP Code"
                value={setupFormData.zipCode}
                onChange={(event) =>
                  onSetupInputChange('zipCode', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-country">Country</Label>
              <Input
                id="setup-country"
                placeholder="Country"
                value={setupFormData.country}
                onChange={(event) =>
                  onSetupInputChange('country', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="setup-phone"
                placeholder="+1 (555) 123-4567"
                value={setupFormData.phone}
                onChange={(event) =>
                  onSetupInputChange('phone', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="setup-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Business Email
              </Label>
              <Input
                id="setup-email"
                type="email"
                placeholder="business@example.com"
                value={setupFormData.email}
                onChange={(event) =>
                  onSetupInputChange('email', event.target.value)
                }
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Online Presence
          </CardTitle>
          <CardDescription>
            Connect your social media and website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="setup-website"
                className="flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="setup-website"
                placeholder="https://www.yourbusiness.com"
                value={setupFormData.website}
                onChange={(event) =>
                  onSetupInputChange('website', event.target.value)
                }
                className="mt-1"
              />
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="setup-facebook"
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="setup-facebook"
                  placeholder="https://facebook.com/yourbusiness"
                  value={setupFormData.facebook}
                  onChange={(event) =>
                    onSetupInputChange('facebook', event.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="setup-instagram"
                  className="flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="setup-instagram"
                  placeholder="https://instagram.com/yourbusiness"
                  value={setupFormData.instagram}
                  onChange={(event) =>
                    onSetupInputChange('instagram', event.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="setup-youtube"
                  className="flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube
                </Label>
                <Input
                  id="setup-youtube"
                  placeholder="https://youtube.com/@yourbusiness"
                  value={setupFormData.youtube}
                  onChange={(event) =>
                    onSetupInputChange('youtube', event.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="setup-linkedin"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  LinkedIn
                </Label>
                <Input
                  id="setup-linkedin"
                  placeholder="https://linkedin.com/company/yourbusiness"
                  value={setupFormData.linkedin}
                  onChange={(event) =>
                    onSetupInputChange('linkedin', event.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="setup-tiktok"
                  className="flex items-center gap-2"
                >
                  <Music2 className="w-4 h-4 text-neutral-900" />
                  TikTok
                </Label>
                <Input
                  id="setup-tiktok"
                  placeholder="https://www.tiktok.com/@yourbusiness"
                  value={setupFormData.tiktok}
                  onChange={(event) =>
                    onSetupInputChange('tiktok', event.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Business Profile
        </Button>
      </div>
    </form>
  );
}
