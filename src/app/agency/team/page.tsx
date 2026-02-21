"use client";

import { useState } from "react";
import { Plus, Briefcase, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateTeamMemberForm, type TeamMember } from "./create";
import { ShowTeamMember } from "./show";
import { UpdateTeamMemberForm } from "./update";

const INITIAL_TEAM: TeamMember[] = [
	{
		id: "team_1",
		name: "Sarah Johnson",
		email: "sarah.johnson@demo.com",
		position: "Designer",
		specialization: "UI/UX Design",
		hourlyRate: 85,
		status: "active",
		joinedAt: "2024-01-15",
		assignedClients: ["Tech Startup Inc"],
		skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping"],
		agencyLabel: "Demo Agency",
	},
	{
		id: "team_2",
		name: "Michael Chen",
		email: "michael.chen@demo.com",
		position: "Developer",
		specialization: "Full-stack",
		hourlyRate: 95,
		status: "active",
		joinedAt: "2023-11-20",
		assignedClients: ["Tech Startup Inc", "E-Commerce Plus"],
		skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
		agencyLabel: "Demo Agency",
	},
	{
		id: "team_3",
		name: "Emily Rodriguez",
		email: "emily.rodriguez@demo.com",
		position: "Project Manager",
		specialization: "Web Development",
		hourlyRate: 70,
		status: "active",
		joinedAt: "2024-02-01",
		assignedClients: ["E-Commerce Plus", "Health Solutions"],
		skills: ["Project Management", "Agile", "Client Relations", "Scoping"],
		agencyLabel: "Demo Agency",
	},
	{
		id: "team_4",
		name: "David Thompson",
		email: "david.thompson@demo.com",
		position: "Marketing Specialist",
		specialization: "Digital Marketing",
		hourlyRate: 65,
		status: "active",
		joinedAt: "2024-03-10",
		assignedClients: ["Tech Startup Inc"],
		skills: ["Social Media Marketing", "SEO", "Content Strategy", "Analytics"],
		agencyLabel: "Demo Agency",
	},
	{
		id: "team_5",
		name: "Jessica Williams",
		email: "jessica.williams@demo.com",
		position: "Developer",
		specialization: "Frontend",
		hourlyRate: 80,
		status: "active",
		joinedAt: "2024-01-08",
		assignedClients: ["Health Solutions"],
		skills: ["React", "Vue.js", "CSS/SCSS", "JavaScript", "Accessibility"],
		agencyLabel: "Demo Agency",
	},
	{
		id: "team_6",
		name: "Alex Martinez",
		email: "alex.martinez@demo.com",
		position: "Account Manager",
		specialization: "Web Development",
		hourlyRate: 75,
		status: "inactive",
		joinedAt: "2023-09-05",
		assignedClients: [],
		skills: ["Client Management", "Sales", "Contract Negotiation", "Support"],
		agencyLabel: "Demo Agency",
	},
];

type ViewState = "list" | "create" | "show" | "update";

export default function AgencyTeamPage() {
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);
	const [view, setView] = useState<ViewState>("list");
	const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
	const agencyName = "Demo Agency";

	const handleCreateMember = (newMember: TeamMember) => {
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

	const handleUpdateMember = (updatedMember: TeamMember) => {
		setTeamMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
		setView("list");
		setSelectedMember(null);
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateTeamMemberForm
						agencyName={agencyName}
						onCreateMember={handleCreateMember}
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
						onUpdateMember={handleUpdateMember}
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
						<h1 className="text-3xl font-bold text-neutral-900">Team Members</h1>
						<p className="text-neutral-600 mt-1">
							Manage team for <span className="font-semibold">{agencyName}</span>
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Member
					</Button>
				</div>

				{teamMembers.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">👥</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Team Members Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Build your team by adding talented members to handle projects.
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
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{teamMembers.map((member) => (
							<Card
								key={member.id}
								onClick={() => handleViewMember(member)}
								className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
							>
								<CardContent className="pt-6">
									{/* Avatar and Status */}
									<div className="flex items-center justify-between mb-4">
										<div
											className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-bold text-sm`}
										>
											{member.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.toUpperCase()}
										</div>
										<Badge
											className={
												member.status === "active"
													? "bg-green-100 text-green-800 border-green-200"
													: "bg-neutral-100 text-neutral-800 border-neutral-200"
											}
										>
											{member.status}
										</Badge>
									</div>

									{/* Name and Position */}
									<h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
									<p className="text-sm text-neutral-600">{member.position}</p>

									{/* Specialization */}
									<div className="flex items-center gap-1 text-sm text-neutral-700 mt-3 mb-3">
										<Briefcase className="w-4 h-4 text-[#ff5f6d]" />
										{member.specialization}
									</div>

									{/* Hourly Rate */}
									<div className="flex items-center justify-between pt-3 border-t border-neutral-200">
										<span className="flex items-center gap-1 font-semibold text-neutral-900">
											<DollarSign className="w-4 h-4 text-[#ff5f6d]" />
											${member.hourlyRate}/hr
										</span>
										<span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
											{member.assignedClients.length} clients
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
