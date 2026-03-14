'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  LinkIcon,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

// ─── Static Profile Data ──────────────────────────────────────────────────────
const STATIC_PROFILE = {
  displayName: 'Weng Santos',
  username: '@wengsantos',
  bio: 'Digital enthusiast, community builder, and avid event-goer. Passionate about connecting with brands and people that matter.',
  email: 'weng.santos@example.com',
  phone: '+63 912 345 6789',
  location: 'Manila, Philippines',
  birthdate: '1995-07-22',
  website: 'https://wengsantos.com',
  instagram: '@wengsantos',
  twitter: '@wengsantos',
  facebook: 'wengsantos',
  interests: ['Technology', 'Fashion', 'Events', 'Food', 'Fitness'],
  whodiniId: 'WD-P-x8m9n2k5',
  memberSince: 'January 2025',
  avatarInitials: 'WS',
};

type ProfileData = typeof STATIC_PROFILE;
type EditableSection = 'basic' | 'contact' | 'social' | 'interests' | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(STATIC_PROFILE);
  const [editing, setEditing] = useState<EditableSection>(null);
  const [draft, setDraft] = useState<ProfileData>(STATIC_PROFILE);
  const [newInterest, setNewInterest] = useState('');

  const startEdit = (section: EditableSection) => {
    setDraft({ ...profile });
    setEditing(section);
  };

  const cancelEdit = () => {
    setDraft({ ...profile });
    setEditing(null);
  };

  const saveEdit = () => {
    setProfile({ ...draft });
    setEditing(null);
  };

  const updateDraft = (key: keyof ProfileData, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (!trimmed || draft.interests.includes(trimmed)) return;
    setDraft((prev) => ({ ...prev, interests: [...prev.interests, trimmed] }));
    setNewInterest('');
  };

  const removeInterest = (interest: string) => {
    setDraft((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          My Profile
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Manage your personal account information.
        </p>
      </div>

      {/* Identity Card */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Identity */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-neutral-900">
                {profile.displayName}
              </h2>
              <p className="text-sm text-neutral-500">{profile.username}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="text-xs text-[#ff5f6d] border-[#ff5f6d]/30"
                >
                  {profile.whodiniId}
                </Badge>
                <Badge variant="outline" className="text-xs text-neutral-500">
                  Member since {profile.memberSince}
                </Badge>
              </div>
              {profile.bio && (
                <p className="text-sm text-neutral-600 mt-3 leading-relaxed max-w-lg">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#ff5f6d]" />
              Basic Information
            </CardTitle>
            {editing === 'basic' ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEdit}
                  className="border border-neutral-300 hover:bg-neutral-50"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                >
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit('basic')}
                className="border border-neutral-300 hover:bg-neutral-50"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing === 'basic' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Display Name
                </Label>
                <Input
                  value={draft.displayName}
                  onChange={(e) => updateDraft('displayName', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Username
                </Label>
                <Input
                  value={draft.username}
                  onChange={(e) => updateDraft('username', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Birthdate
                </Label>
                <Input
                  type="date"
                  value={draft.birthdate}
                  onChange={(e) => updateDraft('birthdate', e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-sm font-medium text-neutral-700">
                  Bio
                </Label>
                <textarea
                  value={draft.bio}
                  onChange={(e) => updateDraft('bio', e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 focus:border-[#ff5f6d]"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="Display Name"
                value={profile.displayName}
              />
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="Username"
                value={profile.username}
              />
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="Birthdate"
                value={new Date(profile.birthdate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              />
              <div className="sm:col-span-2">
                <InfoRow
                  icon={<User className="w-4 h-4" />}
                  label="Bio"
                  value={profile.bio}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#ff5f6d]" />
              Contact Information
            </CardTitle>
            {editing === 'contact' ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEdit}
                  className="border border-neutral-300 hover:bg-neutral-50"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                >
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit('contact')}
                className="border border-neutral-300 hover:bg-neutral-50"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing === 'contact' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Email
                </Label>
                <Input
                  type="email"
                  value={draft.email}
                  onChange={(e) => updateDraft('email', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Phone
                </Label>
                <Input
                  value={draft.phone}
                  onChange={(e) => updateDraft('phone', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Location
                </Label>
                <Input
                  value={draft.location}
                  onChange={(e) => updateDraft('location', e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700">
                  Website
                </Label>
                <Input
                  value={draft.website}
                  onChange={(e) => updateDraft('website', e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={profile.email}
              />
              <InfoRow
                icon={<Phone className="w-4 h-4" />}
                label="Phone"
                value={profile.phone}
              />
              <InfoRow
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                value={profile.location}
              />
              <InfoRow
                icon={<LinkIcon className="w-4 h-4" />}
                label="Website"
                value={profile.website}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-neutral-900 flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#ff5f6d]" />
              Social Links
            </CardTitle>
            {editing === 'social' ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEdit}
                  className="border border-neutral-300 hover:bg-neutral-50"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                >
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit('social')}
                className="border border-neutral-300 hover:bg-neutral-50"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing === 'social' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <Instagram className="w-4 h-4" /> Instagram
                </Label>
                <Input
                  value={draft.instagram}
                  onChange={(e) => updateDraft('instagram', e.target.value)}
                  placeholder="@handle"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <Twitter className="w-4 h-4" /> Twitter / X
                </Label>
                <Input
                  value={draft.twitter}
                  onChange={(e) => updateDraft('twitter', e.target.value)}
                  placeholder="@handle"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-neutral-700 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4" /> Facebook
                </Label>
                <Input
                  value={draft.facebook}
                  onChange={(e) => updateDraft('facebook', e.target.value)}
                  placeholder="profile name"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow
                icon={<Instagram className="w-4 h-4" />}
                label="Instagram"
                value={profile.instagram}
              />
              <InfoRow
                icon={<Twitter className="w-4 h-4" />}
                label="Twitter / X"
                value={profile.twitter}
              />
              <InfoRow
                icon={<Facebook className="w-4 h-4" />}
                label="Facebook"
                value={profile.facebook}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-neutral-900">
              Interests
            </CardTitle>
            {editing === 'interests' ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEdit}
                  className="border border-neutral-300 hover:bg-neutral-50"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={saveEdit}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                >
                  <Save className="w-3.5 h-3.5 mr-1" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit('interests')}
                className="border border-neutral-300 hover:bg-neutral-50"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {editing === 'interests' ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {draft.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border text-[#ff5f6d] border-[#ff5f6d]/30 bg-[#ff5f6d]/5"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="hover:text-red-500 transition-colors"
                      aria-label={`Remove ${interest}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {draft.interests.length === 0 && (
                  <p className="text-sm text-neutral-400">
                    No interests added yet.
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                  placeholder="Add an interest…"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addInterest}
                  disabled={!newInterest.trim()}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white"
                >
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  className="text-[#ff5f6d] border-[#ff5f6d]/30 hover:bg-[#ff5f6d]/5 px-3 py-1"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-neutral-400 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-neutral-500 mb-0.5">{label}</p>
        <p className="text-sm text-neutral-800 break-words">{value}</p>
      </div>
    </div>
  );
}
