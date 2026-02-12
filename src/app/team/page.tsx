"use client";

import { useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";

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
  status: "active" | "inactive" | "invited";
  permissions: Permission[];
}

type TeamRole = "owner" | "admin" | "manager" | "editor" | "member" | "viewer";

type Permission =
  | "manage_team"
  | "manage_content"
  | "manage_subscribers"
  | "manage_analytics"
  | "manage_billing"
  | "view_only";

interface TeamActivity {
  id: string;
  type: "member_added" | "role_changed" | "member_removed" | "login";
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

// Static data for team members
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "owner",
    department: "Leadership",
    joinedAt: "2023-01-15T00:00:00Z",
    lastActive: "2024-02-11T09:30:00Z",
    status: "active",
    permissions: [
      "manage_team",
      "manage_content",
      "manage_subscribers",
      "manage_analytics",
      "manage_billing",
    ],
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "admin",
    department: "Marketing",
    joinedAt: "2023-03-10T00:00:00Z",
    lastActive: "2024-02-11T08:45:00Z",
    status: "active",
    permissions: ["manage_content", "manage_subscribers", "manage_analytics"],
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@company.com",
    role: "manager",
    department: "Sales",
    joinedAt: "2023-06-20T00:00:00Z",
    lastActive: "2024-02-10T16:20:00Z",
    status: "active",
    permissions: ["manage_subscribers", "view_only"],
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "editor",
    department: "Content",
    joinedAt: "2023-09-05T00:00:00Z",
    lastActive: "2024-02-09T14:10:00Z",
    status: "active",
    permissions: ["manage_content"],
  },
  {
    id: "5",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "member",
    department: "Support",
    joinedAt: "2024-01-12T00:00:00Z",
    lastActive: "2024-02-08T11:30:00Z",
    status: "inactive",
    permissions: ["view_only"],
  },
  {
    id: "6",
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    role: "viewer",
    department: "Analytics",
    joinedAt: "2024-02-01T00:00:00Z",
    lastActive: "2024-02-07T13:45:00Z",
    status: "invited",
    permissions: ["view_only"],
  },
];

// Static data for team activities
const teamActivities: TeamActivity[] = [
  {
    id: "1",
    type: "member_added",
    member: "Lisa Wang",
    action: "New team member invited",
    timestamp: "2024-02-01T10:00:00Z",
    details: "Added with Viewer role in Analytics department",
  },
  {
    id: "2",
    type: "role_changed",
    member: "Emily Davis",
    action: "Role updated to Editor",
    timestamp: "2024-01-28T14:30:00Z",
    details: "Promoted from Member to Editor role",
  },
  {
    id: "3",
    type: "login",
    member: "Sarah Chen",
    action: "Team member logged in",
    timestamp: "2024-02-11T08:45:00Z",
  },
  {
    id: "4",
    type: "member_removed",
    member: "John Smith",
    action: "Team member removed",
    timestamp: "2024-01-20T16:15:00Z",
    details: "Left the organization",
  },
];

const getRoleBadgeVariant = (
  role: TeamRole,
): "default" | "secondary" | "outline" => {
  switch (role) {
    case "owner":
      return "default";
    case "admin":
      return "default";
    case "manager":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (
  status: TeamMember["status"],
): "default" | "secondary" | "outline" => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "invited":
      return "outline";
    default:
      return "outline";
  }
};

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<TeamRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<
    TeamMember["status"] | "all"
  >("all");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || member.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || member.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const teamStats: TeamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    pendingInvites: teamMembers.filter((m) => m.status === "invited").length,
    lastActivity:
      teamMembers
        .map((m) => m.lastActive)
        .sort()
        .reverse()[0] || "",
  };

  return (
    <RequireSession>
      <div className="p-6 space-y-8 min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900">
              Team Management
            </h1>
            <p className="text-neutral-600">
              Manage your team members, roles, and permissions
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        {/* Team Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Members
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
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
              <p className="text-xs text-muted-foreground">Currently active</p>
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
              <p className="text-xs text-muted-foreground">Awaiting response</p>
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
                {new Date(teamStats.lastActivity).toLocaleDateString()}
              </div>
              <p className="text-xs text-muted-foreground">Most recent login</p>
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

          <div className="flex gap-2">
            <Button
              variant={filterRole === "all" ? "default" : "outline"}
              onClick={() => setFilterRole("all")}
              size="sm"
            >
              All Roles
            </Button>
            <Button
              variant={filterRole === "admin" ? "default" : "outline"}
              onClick={() => setFilterRole("admin")}
              size="sm"
            >
              Admins
            </Button>
            <Button
              variant={filterRole === "manager" ? "default" : "outline"}
              onClick={() => setFilterRole("manager")}
              size="sm"
            >
              Managers
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All Status
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "invited" ? "default" : "outline"}
              onClick={() => setFilterStatus("invited")}
              size="sm"
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
              {filteredMembers.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{member.name}</h4>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(member.status)}>
                          {member.status}
                        </Badge>
                        <Badge variant={getRoleBadgeVariant(member.role)}>
                          {member.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                    {member.role !== "owner" && (
                      <Button size="sm" variant="outline">
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
                    {activity.type === "member_added" && (
                      <UserPlus className="h-5 w-5 text-green-500" />
                    )}
                    {activity.type === "role_changed" && (
                      <Shield className="h-5 w-5 text-blue-500" />
                    )}
                    {activity.type === "member_removed" && (
                      <Trash2 className="h-5 w-5 text-red-500" />
                    )}
                    {activity.type === "login" && (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.member}</p>
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
                  <h4 className="font-medium text-blue-900">Team Management</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    {
                      teamMembers.filter((m) =>
                        m.permissions.includes("manage_team"),
                      ).length
                    }{" "}
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
                        m.permissions.includes("manage_content"),
                      ).length
                    }{" "}
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
                        m.permissions.includes("manage_subscribers"),
                      ).length
                    }{" "}
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
                        m.permissions.includes("manage_analytics"),
                      ).length
                    }{" "}
                    members
                  </p>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900">Billing Access</h4>
                  <p className="text-sm text-red-700 mt-1">
                    {
                      teamMembers.filter((m) =>
                        m.permissions.includes("manage_billing"),
                      ).length
                    }{" "}
                    members
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RequireSession>
  );
}
