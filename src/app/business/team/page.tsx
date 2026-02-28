'use client';

import { useState } from 'react';
import { RequireSession } from '@/components/app/RequireSession';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Crown,
  Users,
  UserPlus,
  Mail,
  Clock,
  Shield,
  Settings,
  MoreHorizontal,
  Search,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MobileMetrics } from '@/components/app/MobileMetrics';

// TypeScript interfaces
interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  department: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'invited';
  permissions: Permission[];
}

type TeamRole = 'owner' | 'admin' | 'manager' | 'editor' | 'member' | 'viewer';

type Permission =
  | 'manage_team'
  | 'manage_content'
  | 'manage_subscribers'
  | 'manage_analytics'
  | 'manage_billing'
  | 'view_only';

interface TeamActivity {
  id: string;
  type: 'member_added' | 'role_changed' | 'member_removed' | 'login';
  member: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  pendingInvites: number;
  lastActivity: string;
}

const teamMembers: TeamMember[] = [];

const teamActivities: TeamActivity[] = [];

const getRoleBadgeClass = (role: TeamRole): string => {
  switch (role) {
    case 'owner':
      return 'bg-[#ff5f6d] text-white border-[#ff5f6d]';
    case 'admin':
      return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'manager':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'editor':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

const getStatusBadgeClass = (status: TeamMember['status']): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'inactive':
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    case 'invited':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    default:
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  }
};

export default function BusinessTeamPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<TeamRole | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<
    TeamMember['status'] | 'all'
  >('all');

  const getFilterButtonClass = (isActive: boolean) =>
    isActive
      ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white border-[#ff5f6d] font-medium rounded-xl'
      : 'border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50';

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' || member.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const teamStats: TeamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === 'active').length,
    pendingInvites: teamMembers.filter((m) => m.status === 'invited').length,
    lastActivity:
      teamMembers
        .map((m) => m.lastActive)
        .sort()
        .reverse()[0] || '',
  };

  const mobileMetricItems = [
    {
      label: 'Active Members',
      value: (
        <>
          <Crown className="h-4 w-4 text-amber-500" />
          {teamStats.activeMembers}
        </>
      ),
      valueClassName: 'text-amber-500',
    },
  ];

  return (
    <RequireSession>
      <div className="relative min-h-screen">
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pointer-events-none select-none opacity-60">
          <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                  Team Management
                </h1>
                <p className="text-neutral-600">
                  Manage your team members, roles, and permissions
                </p>
              </div>
              <Button className="flex items-center justify-center gap-2 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-xl w-full sm:w-auto">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            </div>

            {/* Team Stats Overview */}
            <MobileMetrics items={mobileMetricItems} />

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Members
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teamStats.totalMembers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all departments
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Members
                  </CardTitle>
                  <Crown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teamStats.activeMembers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Invites
                  </CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teamStats.pendingInvites}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Last Activity
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold">
                    {teamStats.lastActivity
                      ? new Date(teamStats.lastActivity).toLocaleDateString()
                      : '--'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Most recent login
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 max-w-full overflow-x-auto">
                <Button
                  variant="outline"
                  onClick={() => setFilterRole('all')}
                  size="sm"
                  className={getFilterButtonClass(filterRole === 'all')}
                >
                  All Roles
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterRole('admin')}
                  size="sm"
                  className={getFilterButtonClass(filterRole === 'admin')}
                >
                  Admins
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterRole('manager')}
                  size="sm"
                  className={getFilterButtonClass(filterRole === 'manager')}
                >
                  Managers
                </Button>
              </div>

              <div className="flex gap-2 max-w-full overflow-x-auto">
                <Button
                  variant="outline"
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                  className={getFilterButtonClass(filterStatus === 'all')}
                >
                  All Status
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterStatus('active')}
                  size="sm"
                  className={getFilterButtonClass(filterStatus === 'active')}
                >
                  Active
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setFilterStatus('invited')}
                  size="sm"
                  className={getFilterButtonClass(filterStatus === 'invited')}
                >
                  Invited
                </Button>
              </div>
            </div>

            {/* Team Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  {filteredMembers.length} member
                  {filteredMembers.length !== 1 ? 's' : ''} found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-col gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                              {member.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <h4 className="font-medium text-lg">
                                {member.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={getStatusBadgeClass(member.status)}
                            >
                              {member.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={getRoleBadgeClass(member.role)}
                            >
                              {member.role}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Department</p>
                            <p className="font-medium">{member.department}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Joined</p>
                            <p className="font-medium">
                              {new Date(member.joinedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Last Active</p>
                            <p className="font-medium">
                              {new Date(member.lastActive).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Permissions</p>
                            <p className="font-medium">
                              {member.permissions.length} granted
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        {member.role !== 'owner' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 w-full sm:w-auto"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Team Activity
                </CardTitle>
                <CardDescription>
                  Latest team member activities and changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="shrink-0">
                        {activity.type === 'member_added' && (
                          <UserPlus className="h-5 w-5 text-green-500" />
                        )}
                        {activity.type === 'role_changed' && (
                          <Shield className="h-5 w-5 text-blue-500" />
                        )}
                        {activity.type === 'member_removed' && (
                          <Trash2 className="h-5 w-5 text-red-500" />
                        )}
                        {activity.type === 'login' && (
                          <Clock className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.member}
                        </p>
                        {activity.details && (
                          <p className="text-sm text-gray-600 mt-1">
                            {activity.details}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permission Management Reminder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Permission Management
                </CardTitle>
                <CardDescription>
                  Review and manage team member permissions regularly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">
                        Team Management
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {
                          teamMembers.filter((m) =>
                            m.permissions.includes('manage_team')
                          ).length
                        }{' '}
                        members
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">
                        Content Management
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        {
                          teamMembers.filter((m) =>
                            m.permissions.includes('manage_content')
                          ).length
                        }{' '}
                        members
                      </p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900">
                        Subscriber Management
                      </h4>
                      <p className="text-sm text-purple-700 mt-1">
                        {
                          teamMembers.filter((m) =>
                            m.permissions.includes('manage_subscribers')
                          ).length
                        }{' '}
                        members
                      </p>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900">
                        Analytics Access
                      </h4>
                      <p className="text-sm text-orange-700 mt-1">
                        {
                          teamMembers.filter((m) =>
                            m.permissions.includes('manage_analytics')
                          ).length
                        }{' '}
                        members
                      </p>
                    </div>

                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-900">
                        Billing Access
                      </h4>
                      <p className="text-sm text-red-700 mt-1">
                        {
                          teamMembers.filter((m) =>
                            m.permissions.includes('manage_billing')
                          ).length
                        }{' '}
                        members
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/30 pt-10">
          <div className="rounded-xl mt-28 border border-neutral-200 bg-white px-8 py-6 shadow-sm text-center">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
              Coming Soon
            </h2>
            <p className="text-sm text-neutral-600">
              This page is currently unavailable while we finish updates.
            </p>
          </div>
        </div>
      </div>
    </RequireSession>
  );
}
