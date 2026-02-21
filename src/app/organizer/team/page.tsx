"use client";

import { useState } from "react";
import { Plus, Mail, Phone, Briefcase, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreateTeamMemberForm, type TeamMember, type TeamPermissions } from "./create";
import { ShowTeamMember } from "./show";
import { UpdateTeamMemberForm } from "./update";

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
	{
		id: "team_1",
		fullName: "Sarah Johnson",
		role: "Event Director",
		email: "sarah.johnson@demoorganizer.com",
		phone: "+1 (555) 100-1001",
		department: "Operations",
		accessLevel: "admin",
		status: "active",
		joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: true, manageServices: true, manageTeam: true, viewReports: true, manageBilling: true, sendNotifications: true, exportData: true },	},
	{
		id: "team_2",
		fullName: "Michael Chen",
		role: "Marketing Manager",
		email: "michael.chen@demoorganizer.com",
		phone: "+1 (555) 200-2002",
		department: "Marketing",
		accessLevel: "manager",
		status: "active",
		joinedAt: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: true, manageServices: true, manageTeam: false, viewReports: true, manageBilling: false, sendNotifications: true, exportData: true },	},
	{
		id: "team_3",
		fullName: "Emily Rodriguez",
		role: "Event Coordinator",
		email: "emily.rodriguez@demoorganizer.com",
		phone: "+1 (555) 300-3003",
		department: "Operations",
		accessLevel: "staff",
		status: "active",
		joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: false, manageServices: false, manageTeam: false, viewReports: false, manageBilling: false, sendNotifications: false, exportData: false },	},
	{
		id: "team_4",
		fullName: "David Kim",
		role: "Technical Lead",
		email: "david.kim@demoorganizer.com",
		phone: "+1 (555) 400-4004",
		department: "Technology",
		accessLevel: "manager",
		status: "active",
		joinedAt: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: true, manageServices: true, manageTeam: false, viewReports: true, manageBilling: false, sendNotifications: true, exportData: true },	},
	{
		id: "team_5",
		fullName: "Jessica Thompson",
		role: "Logistics Coordinator",
		email: "jessica.thompson@demoorganizer.com",
		phone: "+1 (555) 500-5005",
		department: "Logistics",
		accessLevel: "staff",
		status: "on_leave",
		joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: false, manageServices: false, manageTeam: false, viewReports: false, manageBilling: false, sendNotifications: false, exportData: false },	},
	{
		id: "team_6",
		fullName: "Robert Martinez",
		role: "Volunteer Coordinator",
		email: "robert.martinez@demoorganizer.com",
		phone: "+1 (555) 600-6006",
		department: "Community",
		accessLevel: "volunteer",
		status: "active",
		joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: false, manageVendors: false, manageServices: false, manageTeam: false, viewReports: false, manageBilling: false, sendNotifications: false, exportData: false },	},
	{
		id: "team_7",
		fullName: "Amanda Foster",
		role: "Finance Manager",
		email: "amanda.foster@demoorganizer.com",
		phone: "+1 (555) 700-7007",
		department: "Finance",
		accessLevel: "manager",
		status: "active",
		joinedAt: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: true, manageServices: true, manageTeam: false, viewReports: true, manageBilling: true, sendNotifications: true, exportData: true },	},
	{
		id: "team_8",
		fullName: "Chris Anderson",
		role: "Content Creator",
		email: "chris.anderson@demoorganizer.com",
		phone: "+1 (555) 800-8008",
		department: "Marketing",
		accessLevel: "staff",
		status: "inactive",
		joinedAt: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000).toISOString(),
		organizerLabel: "Demo Organizer",	permissions: { manageEvents: true, manageVendors: false, manageServices: false, manageTeam: false, viewReports: false, manageBilling: false, sendNotifications: false, exportData: false },	},
];

function getInitials(name: string): string {
	const parts = name.trim().split(" ");
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

export default function OrganizerTeamPage() {
	const organizerName = "Demo Organizer";
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
	const [view, setView] = useState<"list" | "create" | "show" | "update">("list");
	const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
	const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "on_leave">("all");

	const handleCreateTeamMember = (newMember: TeamMember) => {
		setTeamMembers((prev) => [newMember, ...prev]);
		setView("list");
	};

	const handleViewMember = (member: TeamMember) => {
		setSelectedMember(member);
		setView("show");
	};

	const handleEditMember = (member: TeamMember) => {
		setSelectedMember(member);
		setView("update");
	};

	const handleUpdateTeamMember = (updatedMember: TeamMember) => {
		setTeamMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
		setView("list");
		setSelectedMember(null);
	};

	const handleUpdatePermissions = (memberId: string, permissions: TeamPermissions) => {
		setTeamMembers((prev) =>
			prev.map((m) => (m.id === memberId ? { ...m, permissions } : m))
		);
		// Update selectedMember if it's the one being edited
		if (selectedMember && selectedMember.id === memberId) {
			setSelectedMember({ ...selectedMember, permissions });
		}
	};

	const filteredMembers = teamMembers.filter((m) => filterStatus === "all" || m.status === filterStatus);

	const statusCounts = {
		all: teamMembers.length,
		active: teamMembers.filter((m) => m.status === "active").length,
		inactive: teamMembers.filter((m) => m.status === "inactive").length,
		on_leave: teamMembers.filter((m) => m.status === "on_leave").length,
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateTeamMemberForm
						organizerName={organizerName}
						onCreateTeamMember={handleCreateTeamMember}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	if (view === "show" && selectedMember) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<ShowTeamMember
					member={selectedMember}
					onClose={() => {
						setView("list");
						setSelectedMember(null);
					}}
					onEdit={handleEditMember}
					onUpdatePermissions={handleUpdatePermissions}
				/>
			</div>
		);
	}

	if (view === "update" && selectedMember) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<UpdateTeamMemberForm
						member={selectedMember}
						onUpdateTeamMember={handleUpdateTeamMember}
						onCancel={() => {
							setView("list");
							setSelectedMember(null);
						}}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Team Management</h1>
						<p className="text-neutral-600 mt-1">
							Manage team members for <span className="font-semibold">{organizerName}</span>
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Team Member
					</Button>
				</div>

				<div className="mb-6">
					<div className="flex flex-wrap gap-2">
						{(["all", "active", "inactive", "on_leave"] as const).map((status) => (
							<Button
								key={status}
								type="button"
								size="sm"
								variant={filterStatus === status ? "default" : "outline"}
								onClick={() => setFilterStatus(status)}
								className={
									filterStatus === status
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
								}
							>
								{status.replace("_", " ")} ({statusCounts[status]})
							</Button>
						))}
					</div>
				</div>

				{filteredMembers.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">👥</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Team Members Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Add your first team member to start building your event organization staff.
							</CardDescription>
							<Button
								onClick={() => setView("create")}
								className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
							>
								<Plus className="w-5 h-5 mr-2" />
								Add First Member
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredMembers.map((member) => {
							const getStatusColor = () => {
								if (member.status === "active") return "bg-green-100 text-green-800";
								if (member.status === "on_leave") return "bg-amber-100 text-amber-800";
								return "bg-red-100 text-red-800";
							};

							const getAccessLevelColor = () => {
								if (member.accessLevel === "admin") return "bg-purple-100 text-purple-800";
								if (member.accessLevel === "manager") return "bg-blue-100 text-blue-800";
								if (member.accessLevel === "staff") return "bg-neutral-100 text-neutral-800";
								return "bg-neutral-50 text-neutral-600";
							};

							return (
								<Card
									key={member.id}
									onClick={() => handleViewMember(member)}
									className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
								>
									<CardHeader className="pb-3">
										<div className="flex items-start gap-3 mb-3">
											<Avatar className="w-12 h-12 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white font-semibold">
												<AvatarFallback className="bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white">
													{getInitials(member.fullName)}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1 min-w-0">
												<CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-1">
													{member.fullName}
												</CardTitle>
												{member.role && (
													<CardDescription className="text-sm text-neutral-600 line-clamp-1">
														{member.role}
													</CardDescription>
												)}
											</div>
										</div>
										<div className="flex items-center gap-2 flex-wrap">
											<Badge className={`capitalize text-xs ${getStatusColor()}`}>
												{member.status.replace("_", " ")}
											</Badge>
											<Badge className={`capitalize text-xs ${getAccessLevelColor()}`}>
												{member.accessLevel}
											</Badge>
										</div>
									</CardHeader>
									<CardContent className="pt-0 space-y-2">
										<div className="flex items-center gap-2 text-sm text-neutral-700">
											<Mail className="w-4 h-4 text-neutral-400" />
											<span className="line-clamp-1">{member.email}</span>
										</div>

										{member.phone && (
											<div className="flex items-center gap-2 text-sm text-neutral-700">
												<Phone className="w-4 h-4 text-neutral-400" />
												<span className="line-clamp-1">{member.phone}</span>
											</div>
										)}

										<div className="flex items-center gap-2 text-sm text-neutral-700">
											<Briefcase className="w-4 h-4 text-neutral-400" />
											<span className="line-clamp-1">{member.department}</span>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
