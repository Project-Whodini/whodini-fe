'use client';

import { useState, useMemo } from 'react';
import { Plus, Mail, Search } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateMemberForm, type Member } from './create';
import { ShowMember } from './show';
import { UpdateMemberForm } from './update';

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'member_1',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'leader',
    bio: 'Tech innovator and community builder with 12 years of experience',
    interests: ['AI', 'Blockchain', 'Startup Growth'],
    status: 'active',
    joinDate: '2023-01-15',
    chapterName: 'Tech Innovation Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'moderator',
    bio: 'Product manager passionate about digital transformation',
    interests: ['Product Management', 'UX Design', 'Entrepreneurship'],
    status: 'active',
    joinDate: '2023-03-20',
    chapterName: 'Business Growth Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_3',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    role: 'member',
    bio: 'Marketing strategist and content creator',
    interests: ['Digital Marketing', 'Branding', 'Social Media'],
    status: 'active',
    joinDate: '2023-05-10',
    chapterName: 'Marketing Masters Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_4',
    name: 'David Park',
    email: 'david.park@example.com',
    role: 'leader',
    bio: 'Financial advisor and investment specialist',
    interests: ['Finance', 'Investing', 'Risk Management'],
    status: 'active',
    joinDate: '2023-02-28',
    chapterName: 'Finance & Investment Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_5',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    role: 'moderator',
    bio: 'Creative director and design entrepreneur',
    interests: ['Design', 'Branding', 'Visual Arts'],
    status: 'active',
    joinDate: '2023-04-05',
    chapterName: 'Creative Design Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_6',
    name: 'James Rodriguez',
    email: 'james.rodriguez@example.com',
    role: 'member',
    bio: 'Startup founder with 5 successful exits',
    interests: ['Entrepreneurship', 'Technology', 'Mentoring'],
    status: 'active',
    joinDate: '2023-06-12',
    chapterName: 'Tech Startup Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_7',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    role: 'member',
    bio: 'Executive coach and leadership development expert',
    interests: ['Leadership', 'Team Development', 'Coaching'],
    status: 'active',
    joinDate: '2023-07-01',
    chapterName: 'Leadership Excellence Chapter',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'member_8',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    role: 'member',
    bio: 'Young entrepreneur building innovative solutions',
    interests: ['Technology', 'Startups', 'Innovation'],
    status: 'active',
    joinDate: '2023-08-15',
    chapterName: 'Emerging Leaders Chapter',
    communityLabel: 'Digital Innovators',
  },
];

type ViewState = 'list' | 'create' | 'show' | 'update';

const COMMUNITY_CHAPTERS = [
  'Main',
  'Tech Innovation Chapter',
  'Business Growth Chapter',
  'Marketing Masters Chapter',
  'Finance & Investment Chapter',
  'Creative Design Chapter',
  'Tech Startup Chapter',
  'Leadership Excellence Chapter',
  'Emerging Leaders Chapter',
];

export default function CommunityMembersPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [view, setView] = useState<ViewState>('list');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [search, setSearch] = useState('');
  const [chapterFilter, setChapterFilter] = useState('all');
  const communityName = 'Digital Innovators Community';

  const chapterOptions = useMemo(
    () => Array.from(new Set(members.map((m) => m.chapterName))).sort(),
    [members]
  );

  const filteredMembers = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m) => {
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q);
      const matchesChapter =
        chapterFilter === 'all' || m.chapterName === chapterFilter;
      return matchesSearch && matchesChapter;
    });
  }, [members, search, chapterFilter]);

  const handleCreateMember = (newMember: Member) => {
    setMembers((prev) => [newMember, ...prev]);
    setView('list');
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setView('show');
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setView('update');
  };

  const handleUpdateMember = (updatedMember: Member) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
    setView('list');
    setSelectedMember(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'leader':
        return 'bg-[#ff5f6d]';
      case 'moderator':
        return 'bg-amber-500';
      default:
        return 'bg-blue-500';
    }
  };

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <CreateMemberForm
            communityName={communityName}
            chapters={COMMUNITY_CHAPTERS}
            onCreateMember={handleCreateMember}
            onCancel={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  if (view === 'show' && selectedMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <ShowMember
          member={selectedMember}
          onClose={() => {
            setView('list');
            setSelectedMember(null);
          }}
          onEdit={handleEditMember}
        />
      </div>
    );
  }

  if (view === 'update' && selectedMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <UpdateMemberForm
            member={selectedMember}
            onUpdateMember={handleUpdateMember}
            onCancel={() => {
              setView('list');
              setSelectedMember(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Community Members
            </h1>
            <p className="text-neutral-600 mt-1 text-sm sm:text-base">
              Manage members in{' '}
              <span className="font-semibold">{communityName}</span>
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

        {/* Search + Chapter filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, role…"
              className="pl-9 border border-neutral-300 rounded-lg bg-white"
            />
          </div>
          <Select value={chapterFilter} onValueChange={setChapterFilter}>
            <SelectTrigger className="w-full sm:w-56 border border-neutral-300 rounded-lg bg-white">
              <SelectValue placeholder="All Chapters" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chapters</SelectItem>
              {chapterOptions.map((ch) => (
                <SelectItem key={ch} value={ch}>
                  {ch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredMembers.length === 0 ? (
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">
                {search || chapterFilter !== 'all' ? '🔍' : '👥'}
              </div>
              <CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
                {search || chapterFilter !== 'all'
                  ? 'No members found'
                  : 'No Members Yet'}
              </CardTitle>
              <CardDescription className="text-neutral-600 mb-6">
                {search || chapterFilter !== 'all'
                  ? 'Try adjusting your search or chapter filter.'
                  : 'Add members to grow your community.'}
              </CardDescription>
              {!search && chapterFilter === 'all' && (
                <Button
                  onClick={() => setView('create')}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Member
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                onClick={() => handleViewMember(member)}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-full ${getRoleColor(member.role)} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {member.name.split(' ')[0][0]}
                      {member.name.split(' ')[1]?.[0] || ''}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-neutral-900 truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs text-neutral-600 truncate">
                        {member.chapterName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800 border-green-200'
                          : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                      }
                      style={{ fontSize: '0.75rem' }}
                    >
                      {member.status}
                    </Badge>
                    <Badge
                      className="bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20"
                      style={{ fontSize: '0.75rem' }}
                    >
                      {member.role}
                    </Badge>
                  </div>

                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-2 pt-3 border-t border-neutral-200">
                    <Mail className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs text-neutral-600 truncate">
                      {member.email}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
