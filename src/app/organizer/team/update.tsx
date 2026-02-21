"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TeamMember } from "./create";

type TeamStatus = "active" | "inactive" | "on_leave";
type AccessLevel = "admin" | "manager" | "staff" | "volunteer";

interface UpdateTeamMemberFormProps {
	member: TeamMember;
	onUpdateTeamMember: (member: TeamMember) => void;
	onCancel: () => void;
}

export function UpdateTeamMemberForm({ member, onUpdateTeamMember, onCancel }: UpdateTeamMemberFormProps) {
	const [fullName, setFullName] = useState(member.fullName);
	const [role, setRole] = useState(member.role);
	const [email, setEmail] = useState(member.email);
	const [phone, setPhone] = useState(member.phone);
	const [department, setDepartment] = useState(member.department);
	const [accessLevel, setAccessLevel] = useState<AccessLevel>(member.accessLevel);
	const [status, setStatus] = useState<TeamStatus>(member.status);

	useEffect(() => {
		setFullName(member.fullName);
		setRole(member.role);
		setEmail(member.email);
		setPhone(member.phone);
		setDepartment(member.department);
		setAccessLevel(member.accessLevel);
		setStatus(member.status);
	}, [member]);

	const handleSubmit = () => {
		const cleanFullName = fullName.trim();
		if (!cleanFullName || !email.trim()) return;

		const updatedMember: TeamMember = {
			...member,
			fullName: cleanFullName,
			role: role.trim(),
			email: email.trim(),
			phone: phone.trim(),
			department: department.trim(),
			accessLevel,
			status,
		};

		onUpdateTeamMember(updatedMember);
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Update Team Member</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Edit team member information and save changes.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-full-name" className="text-sm font-medium text-neutral-700">
							Full Name *
						</Label>
						<Input
							id="update-full-name"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							placeholder="Enter full name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-role" className="text-sm font-medium text-neutral-700">
							Role/Position
						</Label>
						<Input
							id="update-role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							placeholder="e.g., Event Coordinator"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-email" className="text-sm font-medium text-neutral-700">
							Email Address *
						</Label>
						<Input
							id="update-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="member@example.com"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-phone" className="text-sm font-medium text-neutral-700">
							Phone Number
						</Label>
						<Input
							id="update-phone"
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+1 (555) 000-0000"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="update-department" className="text-sm font-medium text-neutral-700">
						Department
					</Label>
					<Input
						id="update-department"
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
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
