'use client';

import { useState } from 'react';
import {
  Plus,
  Mail,
  Phone,
  Shield,
  Search,
  AlertCircle,
  CheckCircle2,
  UserX,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';

export type CommunityTeamMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'coordinator';
  title: string;
  responsibilities: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  communityLabel: string;
};

// ── Mock: verified WhodiNi personal accounts ─────────────────────────────────
type WhodiniAccount = {
  whodiniId: string;
  name: string;
  email: string;
  avatarInitials: string;
};

const WHODINI_ACCOUNTS: WhodiniAccount[] = [
  {
    whodiniId: 'WD-U-00001',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    avatarInitials: 'SW',
  },
  {
    whodiniId: 'WD-U-00002',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatarInitials: 'MC',
  },
  {
    whodiniId: 'WD-U-00003',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    avatarInitials: 'EJ',
  },
  {
    whodiniId: 'WD-U-00004',
    name: 'David Park',
    email: 'david.park@example.com',
    avatarInitials: 'DP',
  },
  {
    whodiniId: 'WD-U-00005',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    avatarInitials: 'LA',
  },
  {
    whodiniId: 'WD-U-00006',
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    avatarInitials: 'JR',
  },
  {
    whodiniId: 'WD-U-00007',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    avatarInitials: 'JL',
  },
  {
    whodiniId: 'WD-U-00008',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    avatarInitials: 'AT',
  },
  // Not a community member — has WhodiNi account but not joined
  {
    whodiniId: 'WD-U-00099',
    name: 'Outside User',
    email: 'outside.user@example.com',
    avatarInitials: 'OU',
  },
];

// ── Mock: community members (emails that have joined this community) ──────────
const COMMUNITY_MEMBER_EMAILS = new Set([
  'sarah.williams@example.com',
  'michael.chen@example.com',
  'emma.johnson@example.com',
  'david.park@example.com',
  'lisa.anderson@example.com',
  'james.rodriguez@example.com',
  'jennifer.lee@example.com',
  'alex.thompson@example.com',
]);

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

type ViewState = 'list' | 'create';

const INITIAL_TEAM: CommunityTeamMember[] = [
  {
    id: 'team_1',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    phone: '+1-415-555-0101',
    role: 'admin',
    title: 'Community Director',
    responsibilities: 'Overall community strategy and governance',
    status: 'active',
    joinedDate: '2024-01-15',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'team_2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1-415-555-0102',
    role: 'admin',
    title: 'Operations Manager',
    responsibilities: 'Community operations and member services',
    status: 'active',
    joinedDate: '2024-02-01',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'team_3',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+1-650-555-0103',
    role: 'moderator',
    title: 'Content Moderator',
    responsibilities: 'Content moderation and community guidelines',
    status: 'active',
    joinedDate: '2024-03-10',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'team_4',
    name: 'David Park',
    email: 'david.park@example.com',
    phone: '+1-650-555-0104',
    role: 'moderator',
    title: 'Events Coordinator',
    responsibilities: 'Planning and execution of community events',
    status: 'active',
    joinedDate: '2024-03-20',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'team_5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    phone: '+1-510-555-0105',
    role: 'coordinator',
    title: 'Member Engagement Coordinator',
    responsibilities: 'Member onboarding and engagement',
    status: 'active',
    joinedDate: '2024-04-01',
    communityLabel: 'Digital Innovators',
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-[#ff5f6d] text-white';
    case 'moderator':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

export default function CommunityTeamPage() {
  const [team, setTeam] = useState<CommunityTeamMember[]>(INITIAL_TEAM);
  const [view, setView] = useState<ViewState>('list');

  // ── Lookup state ──────────────────────────────────────────────────────────
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundAccount, setFoundAccount] = useState<WhodiniAccount | null>(null);
  const [lookupError, setLookupError] = useState<
    'not_found' | 'not_member' | null
  >(null);

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [role, setRole] = useState<CommunityTeamMember['role']>('coordinator');
  const [title, setTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [responsibilities, setResponsibilities] = useState('');

  const handleLookup = () => {
    const account = lookupAccount(query);
    if (!account) {
      setFoundAccount(null);
      setLookupError('not_found');
      setSearched(true);
      return;
    }
    if (!COMMUNITY_MEMBER_EMAILS.has(account.email.toLowerCase())) {
      setFoundAccount(null);
      setLookupError('not_member');
      setSearched(true);
      return;
    }
    setFoundAccount(account);
    setLookupError(null);
    setSearched(true);
  };

  const handleReset = () => {
    setQuery('');
    setSearched(false);
    setFoundAccount(null);
    setLookupError(null);
    setRole('coordinator');
    setTitle('');
    setPhone('');
    setResponsibilities('');
  };

  const handleAddToTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundAccount || !title.trim()) return;

    const newMember: CommunityTeamMember = {
      id: `team_${Date.now()}`,
      name: foundAccount.name,
      email: foundAccount.email,
      phone: phone.trim(),
      role,
      title: title.trim(),
      responsibilities: responsibilities.trim(),
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      communityLabel: 'Digital Innovators',
    };

    setTeam((prev) => [newMember, ...prev]);
    handleReset();
    setView('list');
  };

  // ── Create view ───────────────────────────────────────────────────────────
  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
            <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 px-4 py-4 sm:px-6 sm:py-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
                Add Team Member
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Only existing community members with a WhodiNi account can join
                the team.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 space-y-6">
              {/* ── Step 1: Account lookup ─────────────────────────── */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3 leading-relaxed">
                  Step 1 — Look up WhodiNi account
                </p>
                <Label className="text-xs sm:text-sm font-medium text-neutral-700">
                  Email address or WhodiNi ID (e.g. WD-U-00001)
                </Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSearched(false);
                      setFoundAccount(null);
                      setLookupError(null);
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

                {/* No WhodiNi account at all */}
                {searched && lookupError === 'not_found' && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      No WhodiNi account found for <strong>{query}</strong>. The
                      user must sign up on WhodiNi first.
                    </span>
                  </div>
                )}

                {/* Has WhodiNi account but not a community member */}
                {searched && lookupError === 'not_member' && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
                    <UserX className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>
                      <strong>{query}</strong> has a WhodiNi account but is not
                      a member of this community yet. They must join the
                      community before being added to the team.
                    </span>
                  </div>
                )}

                {/* Found + is a community member */}
                {foundAccount && (
                  <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-4 py-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Verified community member
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

              {/* ── Step 2: Role + details (only when verified member found) ── */}
              {foundAccount && (
                <>
                  <Separator />
                  <form onSubmit={handleAddToTeam} className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 leading-relaxed">
                      Step 2 — Assign role &amp; details
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-neutral-700">
                          Title *
                        </Label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., Events Coordinator"
                          className="mt-1 border border-neutral-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-neutral-700">
                          Role *
                        </Label>
                        <select
                          value={role}
                          onChange={(e) =>
                            setRole(
                              e.target.value as CommunityTeamMember['role']
                            )
                          }
                          className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                        >
                          <option value="coordinator">Coordinator</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-neutral-700">
                        Phone
                      </Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1-XXX-XXX-XXXX"
                        className="mt-1 border border-neutral-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-neutral-700">
                        Responsibilities
                      </Label>
                      <textarea
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                        rows={3}
                        placeholder="Team member responsibilities"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button
                        type="submit"
                        disabled={!title.trim()}
                        className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Add to Team
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          handleReset();
                          setView('list');
                        }}
                        variant="outline"
                        className="flex-1 border border-neutral-300 rounded-lg"
                      >
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
                  onClick={() => {
                    handleReset();
                    setView('list');
                  }}
                  variant="outline"
                  className="w-full border border-neutral-300 rounded-lg"
                >
                  Cancel
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Community Team
            </h1>
            <p className="text-neutral-600 mt-1 text-sm sm:text-base">
              Management and moderation team
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Member
          </Button>
        </div>

        <div className="grid gap-4">
          {team.map((member) => (
            <Card
              key={member.id}
              className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff5f6d] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-neutral-600">{member.title}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      getRoleColor(member.role) +
                      ' rounded-full shrink-0 self-start'
                    }
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {member.role}
                  </Badge>
                </div>
                {member.responsibilities && (
                  <p className="text-sm text-neutral-700 mb-3">
                    {member.responsibilities}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-neutral-600 min-w-0">
                    <Mail className="w-4 h-4 text-[#ff5f6d] shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Phone className="w-4 h-4 text-[#ff5f6d] shrink-0" />
                      {member.phone}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
