'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
import { RequireSession } from '@/components/app/RequireSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GeneralSettingsTab } from './business-settings/GeneralSettingsTab';
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
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Building2,
  Clock,
  Zap,
} from 'lucide-react';

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

interface LogoMeta {
  fileName: string;
  fileSizeMb: number;
  width: number;
  height: number;
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
    youtube: '',
    twitter: '',
    tiktok: '',
    linkedin: '',
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoMeta, setLogoMeta] = useState<LogoMeta | null>(null);

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
      setLogoPreview(null);
      setLogoMeta(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      setLogoMeta({
        fileName: file.name,
        fileSizeMb: Number((file.size / (1024 * 1024)).toFixed(2)),
        width: image.width,
        height: image.height,
      });
      URL.revokeObjectURL(imageUrl);
    };
    image.onerror = () => {
      setLogoMeta({
        fileName: file.name,
        fileSizeMb: Number((file.size / (1024 * 1024)).toFixed(2)),
        width: 0,
        height: 0,
      });
      URL.revokeObjectURL(imageUrl);
    };
    image.src = imageUrl;

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
            <GeneralSettingsTab
              setupFormData={setupFormData}
              logoPreview={logoPreview}
              logoMeta={logoMeta}
              onSetupInputChange={handleSetupInputChange}
              onLogoUpload={handleLogoUpload}
              onSubmit={handleSetupSubmit}
            />
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
