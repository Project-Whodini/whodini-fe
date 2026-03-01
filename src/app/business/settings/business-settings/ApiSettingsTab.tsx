'use client';

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
import { Key, Eye, EyeOff, Save } from 'lucide-react';
import type { ApiSettings } from './types';

interface ApiSettingsTabProps {
  apiSettings: ApiSettings;
  setApiSettings: (value: ApiSettings) => void;
  showApiKey: boolean;
  setShowApiKey: (value: boolean) => void;
  onSaveSettings: (section: string) => void;
}

export function ApiSettingsTab({
  apiSettings,
  setApiSettings,
  showApiKey,
  setShowApiKey,
  onSaveSettings,
}: ApiSettingsTabProps) {
  return (
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
                  onChange={(event) =>
                    setApiSettings({
                      ...apiSettings,
                      apiKey: event.target.value,
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
                onChange={(event) =>
                  setApiSettings({
                    ...apiSettings,
                    webhookUrl: event.target.value,
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
                  onChange={(event) =>
                    setApiSettings({
                      ...apiSettings,
                      rateLimitEnabled: event.target.checked,
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
                  onChange={(event) =>
                    setApiSettings({
                      ...apiSettings,
                      apiLogging: event.target.checked,
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
              onClick={() => onSaveSettings('API')}
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
  );
}
