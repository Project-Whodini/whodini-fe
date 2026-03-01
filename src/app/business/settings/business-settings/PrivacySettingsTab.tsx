'use client';

import type { ChangeEvent } from 'react';
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
import { Shield, AlertCircle, CheckCircle, Save } from 'lucide-react';
import type { PrivacySettings } from './types';

interface PrivacySettingsTabProps {
  privacySettings: PrivacySettings;
  setPrivacySettings: (value: PrivacySettings) => void;
  privacyPolicyFileName: string;
  privacyPolicyFileUrl: string;
  privacyPolicyFileType: string;
  onPrivacyPolicyUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onSaveSettings: (section: string) => void;
}

export function PrivacySettingsTab({
  privacySettings,
  setPrivacySettings,
  privacyPolicyFileName,
  privacyPolicyFileUrl,
  privacyPolicyFileType,
  onPrivacyPolicyUpload,
  onSaveSettings,
}: PrivacySettingsTabProps) {
  return (
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
                  onChange={(event) =>
                    setPrivacySettings({
                      ...privacySettings,
                      twoFactorEnabled: event.target.checked,
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
                    Enable two-factor authentication to secure your account.
                    This adds an extra verification step during login.
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
                Upload your business privacy policy document for record keeping.
              </p>
              <Input
                id="privacy-policy-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={onPrivacyPolicyUpload}
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
            onClick={() => onSaveSettings('Privacy & Security')}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
