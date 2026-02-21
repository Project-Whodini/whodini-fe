"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TeamStatus = "active" | "inactive" | "on_leave";
type AccessLevel = "admin" | "manager" | "staff" | "volunteer";

export type TeamPermissions = {
	manageEvents: boolean;
	manageVendors: boolean;
	manageServices: boolean;
	manageTeam: boolean;
	viewReports: boolean;
	manageBilling: boolean;
	sendNotifications: boolean;
	exportData: boolean;
};

export type TeamMember = {
	id: string;
	fullName: string;
	role: string;
	email: string;
	phone: string;
	department: string;
	accessLevel: AccessLevel;
	status: TeamStatus;
	joinedAt: string;
	organizerLabel: string;
	permissions: TeamPermissions;
};

interface CreateTeamMemberFormProps {
	organizerName: string;
	onCreateTeamMember: (member: TeamMember) => void;
	onCancel: () => void;
}

function getDefaultPermissions(accessLevel: AccessLevel): TeamPermissions {
	if (accessLevel === "admin") {
		return {
			manageEvents: true,
			manageVendors: true,
			manageServices: true,
			manageTeam: true,
			viewReports: true,
			manageBilling: true,
			sendNotifications: true,
			exportData: true,
		};
	}
	if (accessLevel === "manager") {
		return {
			manageEvents: true,
			manageVendors: true,
			manageServices: true,
			manageTeam: false,
			viewReports: true,
			manageBilling: false,
			sendNotifications: true,
			exportData: true,
		};
	}
	if (accessLevel === "staff") {
		return {
			manageEvents: true,
			manageVendors: false,
			manageServices: false,
			manageTeam: false,
			viewReports: false,
			manageBilling: false,
			sendNotifications: false,
			exportData: false,
		};
	}
	// volunteer
	return {
		manageEvents: false,
		manageVendors: false,
		manageServices: false,
		manageTeam: false,
		viewReports: false,
		manageBilling: false,
		sendNotifications: false,
		exportData: false,
	};
}

export function CreateTeamMemberForm({ organizerName, onCreateTeamMember, onCancel }: CreateTeamMemberFormProps) {
	const [fullName, setFullName] = useState("");
	const [role, setRole] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [department, setDepartment] = useState("Operations");
	const [accessLevel, setAccessLevel] = useState<AccessLevel>("staff");
	const [status, setStatus] = useState<TeamStatus>("active");

	const handleSubmit = () => {
		const cleanFullName = fullName.trim();
		if (!cleanFullName || !email.trim()) return;

		const newMember: TeamMember = {
			id: `team_${Date.now()}`,
			fullName: cleanFullName,
			role: role.trim(),
			email: email.trim(),
			phone: phone.trim(),
			department: department.trim(),
			accessLevel,
			status,
			joinedAt: new Date().toISOString(),
			organizerLabel: organizerName,
			permissions: getDefaultPermissions(accessLevel),
		};

		onCreateTeamMember(newMember);

		// Reset form
		setFullName("");
		setRole("");
		setEmail("");
		setPhone("");
		setDepartment("Operations");
		setAccessLevel("staff");
		setStatus("active");
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Add New Team Member</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Add a team member to your event organization staff.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="full-name" className="text-sm font-medium text-neutral-700">
							Full Name *
						</Label>
						<Input
							id="full-name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							placeholder="Enter full name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="role" className="text-sm font-medium text-neutral-700">
							Role/Position
						</Label>
						<Input
							id="role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							placeholder="e.g., Event Coordinator"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium text-neutral-700">
							Email Address *
						</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="member@example.com"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
							Phone Number
						</Label>
						<Input
							id="phone"
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+1 (555) 000-0000"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="department" className="text-sm font-medium text-neutral-700">
						Department
					</Label>
					<Input
						id="department"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						placeholder="e.g., Operations, Marketing"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Access Level</Label>
					<div className="flex flex-wrap gap-2">
						{(["admin", "manager", "staff", "volunteer"] as const).map((level) => (
							<Button
								key={level}
								type="button"
								size="sm"
								variant={accessLevel === level ? "default" : "outline"}
								onClick={() => setAccessLevel(level)}
								className={
									accessLevel === level
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
								}
							>
								{level}
							</Button>
						))}
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Status</Label>
					<div className="flex flex-wrap gap-2">
						{(["active", "inactive", "on_leave"] as const).map((s) => (
							<Button
								key={s}
								type="button"
								size="sm"
								variant={status === s ? "default" : "outline"}
								onClick={() => setStatus(s)}
								className={
									status === s
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
								}
							>
								{s.replace("_", " ")}
							</Button>
						))}
					</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={onCancel}
						variant="outline"
						className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!fullName.trim() || !email.trim()}
						className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Plus className="w-4 h-4 mr-2" />
						Add Team Member
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
