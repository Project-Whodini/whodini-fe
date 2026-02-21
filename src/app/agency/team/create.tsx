"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type TeamMember = {
	id: string;
	name: string;
	email: string;
	position: string;
	specialization: string;
	hourlyRate: number;
	status: "active" | "inactive";
	joinedAt: string;
	assignedClients: string[];
	skills: string[];
	agencyLabel: string;
};

type CreateTeamMemberFormProps = {
	agencyName: string;
	onCreateMember: (member: TeamMember) => void;
	onCancel: () => void;
};

export function CreateTeamMemberForm({ agencyName, onCreateMember, onCancel }: CreateTeamMemberFormProps) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		position: "",
		specialization: "",
		hourlyRate: 50,
		status: "active" as const,
		skills: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "hourlyRate" ? parseFloat(value) || 0 : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const confirmed = window.confirm(`Are you sure you want to add ${formData.name} as a team member?`);
		if (!confirmed) return;

		const newMember: TeamMember = {
			id: `team_${Date.now()}`,
			name: formData.name,
			email: formData.email,
			position: formData.position,
			specialization: formData.specialization,
			hourlyRate: formData.hourlyRate,
			status: formData.status,
			joinedAt: new Date().toISOString().split("T")[0],
			assignedClients: [],
			skills: formData.skills
				.split(",")
				.map((s) => s.trim())
				.filter((s) => s),
			agencyLabel: agencyName,
		};

		onCreateMember(newMember);
		setFormData({
			name: "",
			email: "",
			position: "",
			specialization: "",
			hourlyRate: 50,
			status: "active",
			skills: "",
		});
	};

	const isFormValid = formData.name && formData.email && formData.position && formData.specialization;

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
			<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
				<CardTitle className="text-2xl font-bold text-neutral-900">Add Team Member</CardTitle>
				<CardDescription>Add a new team member to {agencyName}</CardDescription>
			</CardHeader>
			<CardContent className="pt-6">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name" className="text-sm font-medium text-neutral-700">
								Full Name *
							</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="John Doe"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
						<div>
							<Label htmlFor="email" className="text-sm font-medium text-neutral-700">
								Email Address *
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="john@example.com"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="position" className="text-sm font-medium text-neutral-700">
								Position *
							</Label>
							<select
								id="position"
								name="position"
								value={formData.position}
								onChange={handleChange}
								className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
								required
							>
								<option value="">Select position</option>
								<option value="Designer">Designer</option>
								<option value="Developer">Developer</option>
								<option value="Project Manager">Project Manager</option>
								<option value="Marketing Specialist">Marketing Specialist</option>
								<option value="Account Manager">Account Manager</option>
								<option value="Business Analyst">Business Analyst</option>
							</select>
						</div>
						<div>
							<Label htmlFor="specialization" className="text-sm font-medium text-neutral-700">
								Specialization *
							</Label>
							<select
								id="specialization"
								name="specialization"
								value={formData.specialization}
								onChange={handleChange}
								className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
								required
							>
								<option value="">Select specialization</option>
								<option value="UI/UX Design">UI/UX Design</option>
								<option value="Web Development">Web Development</option>
								<option value="Mobile Development">Mobile Development</option>
								<option value="Frontend">Frontend</option>
								<option value="Backend">Backend</option>
								<option value="Full-stack">Full-stack</option>
								<option value="Digital Marketing">Digital Marketing</option>
								<option value="Content Writing">Content Writing</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="hourlyRate" className="text-sm font-medium text-neutral-700">
								Hourly Rate ($) *
							</Label>
							<Input
								id="hourlyRate"
								name="hourlyRate"
								type="number"
								value={formData.hourlyRate}
								onChange={handleChange}
								placeholder="50"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								min="0"
								step="5"
								required
							/>
						</div>
						<div>
							<Label htmlFor="status" className="text-sm font-medium text-neutral-700">
								Status *
							</Label>
							<select
								id="status"
								name="status"
								value={formData.status}
								onChange={handleChange}
								className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
								required
							>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
					</div>

					<div>
						<Label htmlFor="skills" className="text-sm font-medium text-neutral-700">
							Skills (comma-separated)
						</Label>
						<Input
							id="skills"
							name="skills"
							value={formData.skills}
							onChange={handleChange}
							placeholder="React, TypeScript, UI Design"
							className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
						/>
						<p className="text-xs text-neutral-500 mt-1">Enter skills separated by commas</p>
					</div>

					<div className="flex gap-2 pt-6">
						<Button
							type="submit"
							disabled={!isFormValid}
							className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
						>
							<Save className="w-4 h-4 mr-2" />
							Add Member
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
			</CardContent>
		</Card>
	);
}
