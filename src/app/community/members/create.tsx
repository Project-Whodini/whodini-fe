'use client';

import { useState } from 'react';
import {
  Search,
  UserCheck,
  Save,
  X,
  AlertCircle,
  CheckCircle2,
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export type Member = {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'moderator' | 'leader';
  bio: string;
  interests: string[];
  status: 'active' | 'inactive';
  joinDate: string;
  chapterName: string;
  communityLabel: string;
};

// ── Mock WhodiNi personal account registry ───────────────────────────────────
// In production this would be an API call to look up verified accounts.
type WhodiniAccount = {
  whodiniId: string;
  name: string;
  email: string;
  bio: string;
  interests: string[];
  avatarInitials: string;
};

const WHODINI_ACCOUNTS: WhodiniAccount[] = [
  {
    whodiniId: 'WD-U-00123',
    name: 'Jordan Rivera',
    email: 'jordan.rivera@example.com',
    bio: 'Product designer with a passion for accessible design',
    interests: ['UX Design', 'Accessibility', 'Figma'],
    avatarInitials: 'JR',
  },
  {
    whodiniId: 'WD-U-00456',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    bio: 'Full-stack engineer and open-source contributor',
    interests: ['React', 'Node.js', 'Open Source'],
    avatarInitials: 'PN',
  },
  {
    whodiniId: 'WD-U-00789',
    name: 'Carlos Mendez',
    email: 'carlos.mendez@example.com',
    bio: 'Serial entrepreneur and business strategist',
    interests: ['Entrepreneurship', 'Strategy', 'Finance'],
    avatarInitials: 'CM',
  },
  {
    whodiniId: 'WD-U-01011',
    name: 'Aisha Okonkwo',
    email: 'aisha.okonkwo@example.com',
    bio: 'Marketing leader focused on community-led growth',
    interests: ['Marketing', 'Community Building', 'Branding'],
    avatarInitials: 'AO',
  },
  {
    whodiniId: 'WD-U-01314',
    name: 'Nathan Brooks',
    email: 'nathan.brooks@example.com',
    bio: 'Data scientist and AI enthusiast',
    interests: ['AI', 'Data Science', 'Machine Learning'],
    avatarInitials: 'NB',
  },
  {
    whodiniId: 'WD-U-01617',
    name: 'Sofia Larsson',
    email: 'sofia.larsson@example.com',
    bio: 'Startup advisor and angel investor',
    interests: ['Investing', 'Startups', 'Mentoring'],
    avatarInitials: 'SL',
  },
  {
    whodiniId: 'WD-U-01920',
    name: 'Kwame Asante',
    email: 'kwame.asante@example.com',
    bio: 'Leadership coach and organizational consultant',
    interests: ['Leadership', 'Coaching', 'HR'],
    avatarInitials: 'KA',
  },
  {
    whodiniId: 'WD-U-02223',
    name: 'Mei Lin',
    email: 'mei.lin@example.com',
    bio: 'Creative director specializing in brand storytelling',
    interests: ['Branding', 'Design', 'Visual Arts'],
    avatarInitials: 'ML',
  },
];

function lookupAccount(query: string): WhodiniAccount | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return (
    WHODINI_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === q || a.whodiniId.toLowerCase() === q
    ) ?? null
  );
}
// ─────────────────────────────────────────────────────────────────────────────

type CreateMemberFormProps = {
  communityName: string;
  chapters: string[];
  onCreateMember: (member: Member) => void;
  onCancel: () => void;
};

export function CreateMemberForm({
  communityName,
  chapters,
  onCreateMember,
  onCancel,
}: CreateMemberFormProps) {
  // Step 1: lookup
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundAccount, setFoundAccount] = useState<WhodiniAccount | null>(null);

  // Step 2: assign role / chapter
  const [role, setRole] = useState<Member['role']>('member');
  const [chapterName, setChapterName] = useState('Main');

  const handleLookup = () => {
    const result = lookupAccount(query);
    setFoundAccount(result);
    setSearched(true);
  };

  const handleReset = () => {
    setQuery('');
    setSearched(false);
    setFoundAccount(null);
    setRole('member');
    setChapterName('Main');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundAccount || !chapterName.trim()) return;

    const newMember: Member = {
      id: `member_${Date.now()}`,
      name: foundAccount.name,
      email: foundAccount.email,
      role,
      bio: foundAccount.bio,
      interests: foundAccount.interests,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      chapterName: chapterName.trim(),
      communityLabel: communityName,
    };

    onCreateMember(newMember);
    handleReset();
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
      <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
        <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
          Add Community Member
        </CardTitle>
        <CardDescription>
          Only users with a WhodiNi personal account can be added to{' '}
          {communityName}.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* ── Step 1: Account lookup ─────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Step 1 — Look up WhodiNi account
          </p>
          <Label className="text-sm font-medium text-neutral-700">
            Email address or WhodiNi ID (e.g. WD-U-00123)
          </Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
                setFoundAccount(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
              placeholder="user@example.com or WD-U-XXXXX"
              className="flex-1 border border-neutral-300 rounded-lg"
            />
            <Button
              type="button"
              onClick={handleLookup}
              disabled={!query.trim()}
              className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg px-4 shrink-0"
            >
              <Search className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>

          {/* Result feedback */}
          {searched && !foundAccount && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                No WhodiNi personal account found for <strong>{query}</strong>.
                The user must sign up on WhodiNi first.
              </span>
            </div>
          )}

          {foundAccount && (
            <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                WhodiNi account found
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ff5f6d] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {foundAccount.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 truncate">
                    {foundAccount.name}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {foundAccount.email}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {foundAccount.whodiniId}
                  </p>
                </div>
              </div>
              {foundAccount.bio && (
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {foundAccount.bio}
                </p>
              )}
              {foundAccount.interests.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {foundAccount.interests.map((i) => (
                    <Badge
                      key={i}
                      className="bg-neutral-100 text-neutral-700 text-xs border border-neutral-200"
                    >
                      {i}
                    </Badge>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-neutral-600 underline"
              >
                Search again
              </button>
            </div>
          )}
        </div>

        {/* ── Step 2: Role + Chapter (only when account found) ──── */}
        {foundAccount && (
          <>
            <Separator />
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Step 2 — Assign chapter &amp; role
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="chapterName"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Chapter *
                  </Label>
                  <select
                    id="chapterName"
                    value={chapterName}
                    onChange={(e) => setChapterName(e.target.value)}
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                  >
                    {chapters.map((ch) => (
                      <option key={ch} value={ch}>
                        {ch}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label
                    htmlFor="role"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Role *
                  </Label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value as Member['role'])}
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                  >
                    <option value="member">Member</option>
                    <option value="moderator">Moderator</option>
                    <option value="leader">Leader</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={!chapterName.trim()}
                  className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add to Community
                </Button>
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-100"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}

        {/* Cancel when still on step 1 */}
        {!foundAccount && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="w-full border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
