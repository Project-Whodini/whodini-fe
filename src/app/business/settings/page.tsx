'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
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
import {
  Shield,
  CreditCard,
  Key,
  Upload,
  MapPin,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Music2,
  Phone,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Building2,
  Clock,
  Zap,
} from 'lucide-react';
import Image from 'next/image';

interface PrivacySettings {
  twoFactorEnabled: boolean;
}

interface SubscriptionSettings {
  planName: string;
  planType: 'monthly' | 'annual';
  nextBilling: string;
  autoRenew: boolean;
  billingHistory: boolean;
}

interface ApiSettings {
  apiKey: string;
  webhookUrl: string;
  rateLimitEnabled: boolean;
  apiLogging: boolean;
}

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);
  const [privacyPolicyFileName, setPrivacyPolicyFileName] = useState('');
  const [privacyPolicyFileUrl, setPrivacyPolicyFileUrl] = useState('');
  const [privacyPolicyFileType, setPrivacyPolicyFileType] = useState('');
  const [setupFormData, setSetupFormData] = useState({
    businessName: '',
    description: '',
    category: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
    linkedin: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    twoFactorEnabled: false,
  });

  const [subscriptionSettings, setSubscriptionSettings] =
    useState<SubscriptionSettings>({
      planName: 'Professional Plan',
      planType: 'monthly',
      nextBilling: '2024-03-15',
      autoRenew: true,
      billingHistory: true,
    });

  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    apiKey: 'sk_live_4f1e2d3c4b5a6789',
    webhookUrl: 'https://api.techstart.com/webhooks',
    rateLimitEnabled: true,
    apiLogging: true,
  });

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    alert(`${section} settings saved successfully! (Demo)`);
  };

  const handlePrivacyPolicyUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPrivacyPolicyFileName('');
      setPrivacyPolicyFileType('');
      setPrivacyPolicyFileUrl('');
      return;
    }

    setPrivacyPolicyFileName(file.name);
    setPrivacyPolicyFileType(file.type);
    setPrivacyPolicyFileUrl(URL.createObjectURL(file));
  };

  const handleSetupInputChange = (field: string, value: string) => {
    setSetupFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setLogoPreview((loadEvent.target?.result as string) ?? null);
    };
    reader.readAsDataURL(file);
  };

  const handleSetupSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Business setup data:', setupFormData);
    alert('Business setup completed! (Demo)');
  };

  useEffect(() => {
    return () => {
      if (privacyPolicyFileUrl) {
        URL.revokeObjectURL(privacyPolicyFileUrl);
      }
    };
  }, [privacyPolicyFileUrl]);

  const tabs = [
    {
      id: 'general',
      label: 'General',
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      id: 'privacy',
      label: 'Privacy & Security',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 'api',
      label: 'API & Integrations',
      icon: <Key className="h-4 w-4" />,
    },
  ];

  return (
    <RequireSession>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Business Settings
            </h1>
            <p className="text-neutral-600">
              Configure your business preferences and account settings
            </p>
          </div>

          {/* Settings Navigation */}
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-2 gap-1 bg-gray-50 rounded-t-lg lg:flex lg:overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-4 font-medium text-xs sm:text-sm border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* General Settings */}
          {activeTab === 'general' && (
            <form onSubmit={handleSetupSubmit} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Business Logo
                  </CardTitle>
                  <CardDescription>
                    Upload your business logo (recommended: 200x200px)
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
                      <Label
                        htmlFor="logo-upload"
                        className="inline-block w-full sm:w-auto"
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full cursor-pointer sm:w-auto"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                      </Label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
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
                      <Label htmlFor="setup-businessName">
                        Business Name *
                      </Label>
                      <Input
                        id="setup-businessName"
                        placeholder="Enter your business name"
                        value={setupFormData.businessName}
                        onChange={(event) =>
                          handleSetupInputChange(
                            'businessName',
                            event.target.value
                          )
                        }
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="setup-description">
                        Business Description
                      </Label>
                      <textarea
                        id="setup-description"
                        placeholder="Briefly describe your business..."
                        value={setupFormData.description}
                        onChange={(event) =>
                          handleSetupInputChange(
                            'description',
                            event.target.value
                          )
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
                          handleSetupInputChange('category', event.target.value)
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
                  <CardDescription>
                    Where can customers reach you?
                  </CardDescription>
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
                          handleSetupInputChange('address', event.target.value)
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
                          handleSetupInputChange('city', event.target.value)
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
                          handleSetupInputChange('state', event.target.value)
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
                          handleSetupInputChange('zipCode', event.target.value)
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
                          handleSetupInputChange('country', event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="setup-phone"
                        className="flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="setup-phone"
                        placeholder="+1 (555) 123-4567"
                        value={setupFormData.phone}
                        onChange={(event) =>
                          handleSetupInputChange('phone', event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="setup-email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Business Email
                      </Label>
                      <Input
                        id="setup-email"
                        type="email"
                        placeholder="business@example.com"
                        value={setupFormData.email}
                        onChange={(event) =>
                          handleSetupInputChange('email', event.target.value)
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
                          handleSetupInputChange('website', event.target.value)
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
                            handleSetupInputChange(
                              'facebook',
                              event.target.value
                            )
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
                            handleSetupInputChange(
                              'instagram',
                              event.target.value
                            )
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="setup-twitter"
                          className="flex items-center gap-2"
                        >
                          <Twitter className="w-4 h-4 text-blue-400" />
                          Twitter
                        </Label>
                        <Input
                          id="setup-twitter"
                          placeholder="https://twitter.com/yourbusiness"
                          value={setupFormData.twitter}
                          onChange={(event) =>
                            handleSetupInputChange(
                              'twitter',
                              event.target.value
                            )
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
                            handleSetupInputChange(
                              'linkedin',
                              event.target.value
                            )
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
                            handleSetupInputChange('tiktok', event.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Business Profile
                </Button>
              </div>
            </form>
          )}

          {/* Privacy & Security Settings */}
          {activeTab === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Control your privacy settings and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Security Settings</h4>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {privacySettings.twoFactorEnabled && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <input
                          type="checkbox"
                          checked={privacySettings.twoFactorEnabled}
                          onChange={(e) =>
                            setPrivacySettings({
                              ...privacySettings,
                              twoFactorEnabled: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-yellow-800">
                            Security Recommendation
                          </p>
                          <p className="text-yellow-700 mt-1">
                            Enable two-factor authentication to secure your
                            account. This adds an extra verification step during
                            login.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border border-neutral-200 rounded-lg p-4 bg-white">
                      <Label
                        htmlFor="privacy-policy-upload"
                        className="text-sm font-medium"
                      >
                        Privacy Policy Document
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload your business privacy policy document for record
                        keeping.
                      </p>
                      <Input
                        id="privacy-policy-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handlePrivacyPolicyUpload}
                        className="mt-3"
                      />
                      {privacyPolicyFileName && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-neutral-600">
                            Selected file: {privacyPolicyFileName}
                          </p>

                          {privacyPolicyFileType === 'application/pdf' ? (
                            <iframe
                              src={privacyPolicyFileUrl}
                              title="Privacy policy preview"
                              className="w-full h-[600px] rounded-lg border border-neutral-200"
                            />
                          ) : (
                            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                              <p className="text-sm font-medium text-neutral-900">
                                File preview ready
                              </p>
                              <p className="text-xs text-neutral-600 mt-1">
                                {privacyPolicyFileName}
                              </p>
                              <a
                                href={privacyPolicyFileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-[#ff5f6d] mt-2 inline-block"
                              >
                                Open document preview
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => handleSaveSettings('Privacy & Security')}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription Settings */}
          {activeTab === 'subscription' && (
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
                      onChange={(e) =>
                        setSubscriptionSettings({
                          ...subscriptionSettings,
                          planType: e.target.value as 'monthly' | 'annual',
                        })
                      }
                      className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="monthly">Monthly ($99/month)</option>
                      <option value="annual">
                        Annual ($990/year - Save 17%)
                      </option>
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
                      onChange={(e) =>
                        setSubscriptionSettings({
                          ...subscriptionSettings,
                          autoRenew: e.target.checked,
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
                      <span className="text-sm">
                        Team collaboration (10 members)
                      </span>
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
                    onClick={() => handleSaveSettings('Subscription')}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Settings */}
          {activeTab === 'api' && (
            <div className="relative">
              <Card className="opacity-40 pointer-events-none select-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API & Integrations
                  </CardTitle>
                  <CardDescription>
                    Manage API access keys and webhook configurations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                        <Input
                          id="apiKey"
                          type={showApiKey ? 'text' : 'password'}
                          value={apiSettings.apiKey}
                          onChange={(e) =>
                            setApiSettings({
                              ...apiSettings,
                              apiKey: e.target.value,
                            })
                          }
                          className="font-mono text-sm"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Keep your API key secure. Don&apos;t share it in public
                        repositories.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input
                        id="webhookUrl"
                        type="url"
                        value={apiSettings.webhookUrl}
                        onChange={(e) =>
                          setApiSettings({
                            ...apiSettings,
                            webhookUrl: e.target.value,
                          })
                        }
                        className="mt-1"
                        placeholder="https://your-server.com/webhook"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-0.5">
                          <Label>Rate Limiting</Label>
                          <p className="text-sm text-gray-500">
                            Limit API requests per minute
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={apiSettings.rateLimitEnabled}
                          onChange={(e) =>
                            setApiSettings({
                              ...apiSettings,
                              rateLimitEnabled: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-0.5">
                          <Label>API Logging</Label>
                          <p className="text-sm text-gray-500">
                            Log API requests for debugging
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={apiSettings.apiLogging}
                          onChange={(e) =>
                            setApiSettings({
                              ...apiSettings,
                              apiLogging: e.target.checked,
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:gap-4">
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => handleSaveSettings('API')}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute inset-0 z-10 flex items-start justify-center p-4 sm:p-6">
                <div className="rounded-full border border-neutral-200 bg-white/95 px-5 py-2 text-sm font-semibold text-neutral-900 shadow-sm">
                  Coming Soon
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RequireSession>
  );
}
