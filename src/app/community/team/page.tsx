"use client";

import { useState } from "react";
import { Plus, Mail, Phone, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CommunityTeamMember = {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: "admin" | "moderator" | "coordinator";
	title: string;
	responsibilities: string;
	status: "active" | "inactive";
	joinedDate: string;
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_TEAM: CommunityTeamMember[] = [
	{
		id: "team_1",
		name: "Sarah Williams",
		email: "sarah.williams@digitaldiversity.com",
		phone: "+1-415-555-0101",
		role: "admin",
		title: "Community Director",
		responsibilities: "Overall community strategy and governance",
		status: "active",
		joinedDate: "2024-01-15",
		communityLabel: "Digital Innovators",
	},
	{
		id: "team_2",
		name: "Michael Chen",
		email: "michael.chen@digitaldiversity.com",
		phone: "+1-415-555-0102",
		role: "admin",
		title: "Operations Manager",
		responsibilities: "Community operations and member services",
		status: "active",
		joinedDate: "2024-02-01",
		communityLabel: "Digital Innovators",
	},
	{
		id: "team_3",
		name: "Emma Johnson",
		email: "emma.johnson@digitaldiversity.com",
		phone: "+1-650-555-0103",
		role: "moderator",
		title: "Content Moderator",
		responsibilities: "Content moderation and community guidelines",
		status: "active",
		joinedDate: "2024-03-10",
		communityLabel: "Digital Innovators",
	},
	{
		id: "team_4",
		name: "David Park",
		email: "david.park@digitaldiversity.com",
		phone: "+1-650-555-0104",
		role: "moderator",
		title: "Events Coordinator",
		responsibilities: "Planning and execution of community events",
		status: "active",
		joinedDate: "2024-03-20",
		communityLabel: "Digital Innovators",
	},
	{
		id: "team_5",
		name: "Lisa Anderson",
		email: "lisa.anderson@digitaldiversity.com",
		phone: "+1-510-555-0105",
		role: "coordinator",
		title: "Member Engagement Coordinator",
		responsibilities: "Member onboarding and engagement",
		status: "active",
		joinedDate: "2024-04-01",
		communityLabel: "Digital Innovators",
	},
];

const getRoleColor = (role: string) => {
	switch (role) {
		case "admin":
			return "bg-[#ff5f6d] text-white";
		case "moderator":
			return "bg-amber-100 text-amber-800";
		default:
			return "bg-blue-100 text-blue-800";
	}
};

export default function CommunityTeamPage() {
	const [team, setTeam] = useState<CommunityTeamMember[]>(INITIAL_TEAM);
	const [view, setView] = useState<ViewState>("list");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		role: "coordinator" as const,
		title: "",
		responsibilities: "",
	});

	const handleCreateMember = () => {
		const confirmed = window.confirm(`Add ${formData.name} to community team?`);
		if (!confirmed) return;

		const newMember: CommunityTeamMember = {
			id: `team_${Date.now()}`,
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			role: formData.role,
			title: formData.title,
			responsibilities: formData.responsibilities,
			status: "active",
			joinedDate: new Date().toISOString().split("T")[0],
			communityLabel: "Digital Innovators",
		};

		setTeam((prev) => [newMember, ...prev]);
		setFormData({ name: "", email: "", phone: "", role: "coordinator", title: "", responsibilities: "" });
		setView("list");
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Add Team Member</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Full Name *</Label>
									<Input
										value={formData.name}
										onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Full name"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Title *</Label>
									<Input
										value={formData.title}
										onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Job title"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Email *</Label>
									<Input
										type="email"
										value={formData.email}
										onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Email address"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Phone *</Label>
									<Input
										value={formData.phone}
										onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Phone number"
									/>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Role *</Label>
								<select
									value={formData.role}
									onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value as any }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
								>
									<option value="coordinator">Coordinator</option>
									<option value="moderator">Moderator</option>
									<option value="admin">Admin</option>
								</select>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Responsibilities</Label>
								<textarea
									value={formData.responsibilities}
									onChange={(e) => setFormData((prev) => ({ ...prev, responsibilities: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={3}
									placeholder="Team member responsibilities"
								></textarea>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateMember}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Add Member
								</Button>
								<Button
									onClick={() => setView("list")}
									variant="outline"
									className="flex-1 border border-neutral-300 rounded-lg"
								>
									Cancel
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Community Team</h1>
						<p className="text-neutral-600 mt-1">Management and moderation team</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Member
					</Button>
				</div>

				<div className="grid gap-4">
					{team.map((member) => (
						<Card key={member.id} className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
							<CardContent className="pt-6">
								<div className="flex items-start justify-between mb-4">
									<div>
										<h3 className="text-lg font-semibold text-neutral-900">{member.name}</h3>
										<p className="text-sm text-neutral-600">{member.title}</p>
									</div>
									<Badge className={getRoleColor(member.role) + " rounded-full"}>
										<Shield className="w-3 h-3 mr-1" />
										{member.role}
									</Badge>
								</div>
								<p className="text-sm text-neutral-700 mb-3">{member.responsibilities}</p>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div className="flex items-center gap-2 text-neutral-600">
										<Mail className="w-4 h-4 text-[#ff5f6d]" />
										{member.email}
									</div>
									<div className="flex items-center gap-2 text-neutral-600">
										<Phone className="w-4 h-4 text-[#ff5f6d]" />
										{member.phone}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
