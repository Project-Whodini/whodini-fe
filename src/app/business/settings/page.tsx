"use client";

import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Shield,
  CreditCard,
  Users,
  Key,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  CheckCircle,
  Building2,
  Clock,
  Zap,
} from "lucide-react";

// TypeScript interfaces
interface BusinessSettings {
  businessName: string;
  email: string;
  phone: string;
  timezone: string;
  currency: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  subscriberUpdates: boolean;
  teamActivity: boolean;
  salesAlerts: boolean;
  systemMaintenance: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "subscribers_only";
  showAnalytics: boolean;
  allowDataExport: boolean;
  twoFactorEnabled: boolean;
}

interface SubscriptionSettings {
  planName: string;
  planType: "monthly" | "annual";
  nextBilling: string;
  autoRenew: boolean;
  billingHistory: boolean;
}

interface TeamSettings {
  maxTeamMembers: number;
  allowInvitations: boolean;
  requireApproval: boolean;
  defaultRole: "viewer" | "editor" | "manager";
}

interface ApiSettings {
  apiKey: string;
  webhookUrl: string;
  rateLimitEnabled: boolean;
  apiLogging: boolean;
}

export default function BusinessSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);

  // Settings state
  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    businessName: "TechStart Solutions",
    email: "contact@techstart.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    currency: "USD",
    language: "English",
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      subscriberUpdates: true,
      teamActivity: true,
      salesAlerts: true,
      systemMaintenance: true,
    });

  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisibility: "public",
    showAnalytics: false,
    allowDataExport: true,
    twoFactorEnabled: false,
  });

  const [subscriptionSettings, setSubscriptionSettings] =
    useState<SubscriptionSettings>({
      planName: "Professional Plan",
      planType: "monthly",
      nextBilling: "2024-03-15",
      autoRenew: true,
      billingHistory: true,
    });

  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    maxTeamMembers: 10,
    allowInvitations: true,
    requireApproval: true,
    defaultRole: "viewer",
  });

  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    apiKey: "sk_live_4f1e2d3c4b5a6789",
    webhookUrl: "https://api.techstart.com/webhooks",
    rateLimitEnabled: true,
    apiLogging: true,
  });

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings`);
    alert(`${section} settings saved successfully! (Demo)`);
  };

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "subscription",
      label: "Subscription",
      icon: <CreditCard className="h-4 w-4" />,
    },
    { id: "team", label: "Team", icon: <Users className="h-4 w-4" /> },
    {
      id: "api",
      label: "API & Integrations",
      icon: <Key className="h-4 w-4" />,
    },
  ];

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900">
            Business Settings
          </h1>
          <p className="text-neutral-600">
            Configure your business preferences and account settings
          </p>
        </div>

        {/* Settings Navigation */}
        <Card>
          <CardContent className="p-0">
            <div className="flex overflow-x-auto bg-gray-50 rounded-t-lg">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-white"
                      : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100"
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
        {activeTab === "general" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Manage your basic business information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessSettings.businessName}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        businessName: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessSettings.email}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        email: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={businessSettings.phone}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={businessSettings.timezone}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        timezone: e.target.value,
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">
                      Pacific Time (PT)
                    </option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    value={businessSettings.currency}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        currency: e.target.value,
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                    <option value="AUD">AUD ($)</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={businessSettings.language}
                    onChange={(e) =>
                      setBusinessSettings({
                        ...businessSettings,
                        language: e.target.value,
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Español</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                    <option value="Japanese">日本語</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("General")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications via email
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      SMS Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive critical alerts via SMS
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">
                      Browser and mobile push notifications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Types</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Subscriber Updates</Label>
                      <p className="text-sm text-gray-500">
                        New subscriptions, cancellations, upgrades
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.subscriberUpdates}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          subscriberUpdates: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Team Activity</Label>
                      <p className="text-sm text-gray-500">
                        Team member login, role changes
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.teamActivity}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          teamActivity: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sales Alerts</Label>
                      <p className="text-sm text-gray-500">
                        New sales, refunds, payment failures
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.salesAlerts}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          salesAlerts: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-gray-500">
                        Platform updates, scheduled downtime
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemMaintenance}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          systemMaintenance: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notification")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy & Security Settings */}
        {activeTab === "privacy" && (
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
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <select
                    id="profileVisibility"
                    value={privacySettings.profileVisibility}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        profileVisibility: e.target.value as
                          | "public"
                          | "private"
                          | "subscribers_only",
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="public">Public - Visible to everyone</option>
                    <option value="subscribers_only">
                      Subscribers Only - Visible to subscribers
                    </option>
                    <option value="private">
                      Private - Not visible publicly
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Analytics</Label>
                    <p className="text-sm text-gray-500">
                      Display business analytics publicly
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.showAnalytics}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        showAnalytics: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Data Export</Label>
                    <p className="text-sm text-gray-500">
                      Let subscribers export their data
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacySettings.allowDataExport}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        allowDataExport: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>

                  <div className="flex items-center justify-between">
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
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => handleSaveSettings("Privacy & Security")}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Settings */}
        {activeTab === "subscription" && (
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">
                      {subscriptionSettings.planName}
                    </h3>
                    <p className="text-blue-700">
                      Billed {subscriptionSettings.planType} • Next billing:{" "}
                      {new Date(
                        subscriptionSettings.nextBilling,
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
                        planType: e.target.value as "monthly" | "annual",
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

                <div className="flex items-center justify-between">
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

              <div className="flex justify-between">
                <Button variant="outline">View Billing History</Button>
                <Button onClick={() => handleSaveSettings("Subscription")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Settings */}
        {activeTab === "team" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Settings
              </CardTitle>
              <CardDescription>
                Configure team member access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="maxTeamMembers">Maximum Team Members</Label>
                  <Input
                    id="maxTeamMembers"
                    type="number"
                    value={teamSettings.maxTeamMembers}
                    onChange={(e) =>
                      setTeamSettings({
                        ...teamSettings,
                        maxTeamMembers: parseInt(e.target.value) || 0,
                      })
                    }
                    className="mt-1"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="defaultRole">
                    Default Role for New Members
                  </Label>
                  <select
                    id="defaultRole"
                    value={teamSettings.defaultRole}
                    onChange={(e) =>
                      setTeamSettings({
                        ...teamSettings,
                        defaultRole: e.target.value as
                          | "viewer"
                          | "editor"
                          | "manager",
                      })
                    }
                    className="mt-1 w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Team Invitations</Label>
                    <p className="text-sm text-gray-500">
                      Let team members invite others
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={teamSettings.allowInvitations}
                    onChange={(e) =>
                      setTeamSettings({
                        ...teamSettings,
                        allowInvitations: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Approval for Invitations</Label>
                    <p className="text-sm text-gray-500">
                      Owner must approve all new team members
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={teamSettings.requireApproval}
                    onChange={(e) =>
                      setTeamSettings({
                        ...teamSettings,
                        requireApproval: e.target.checked,
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Current Team Usage</h4>
                <div className="text-sm text-gray-600">
                  <p>6 of {teamSettings.maxTeamMembers} team members used</p>
                  <p>3 active members, 2 pending invitations, 1 inactive</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Team")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Settings */}
        {activeTab === "api" && (
          <Card>
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
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
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
                  <div className="flex items-center justify-between">
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

                  <div className="flex items-center justify-between">
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

              <div className="space-y-4">
                <h4 className="font-medium">API Usage Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Requests Today
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      1,247
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">
                        Success Rate
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-600 mt-1">
                      99.8%
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-900">
                        Avg Response
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-orange-600 mt-1">
                      152ms
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">View API Documentation</Button>
                <Button onClick={() => handleSaveSettings("API")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </RequireSession>
  );
}
