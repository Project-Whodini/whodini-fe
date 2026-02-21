"use client";

import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Member } from "./create";

type UpdateMemberFormProps = {
	member: Member;
	onUpdateMember: (member: Member) => void;
	onCancel: () => void;
};

export function UpdateMemberForm({ member, onUpdateMember, onCancel }: UpdateMemberFormProps) {
	const [formData, setFormData] = useState<Member>(member);

	useEffect(() => {
		setFormData(member);
	}, [member]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "interests" ? value : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const confirmed = window.confirm(`Are you sure you want to save changes to ${formData.name}?`);
		if (!confirmed) return;

		const updatedMember: Member = {
			...formData,
			interests: typeof formData.interests === "string" ? (formData.interests as string).split(",").map((i) => i.trim()).filter((i) => i) : formData.interests,
		};
		onUpdateMember(updatedMember);
	};

	const isFormValid = formData.name && formData.email && formData.chapterName;

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
			<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
				<CardTitle className="text-2xl font-bold text-neutral-900">Edit Member</CardTitle>
				<CardDescription>Update member information</CardDescription>
			</CardHeader>
			<CardContent className="pt-6 space-y-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name" className="text-sm font-medium text-neutral-700">
								Name *
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
								Email *
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
							<Label htmlFor="chapterName" className="text-sm font-medium text-neutral-700">
								Chapter *
							</Label>
							<Input
								id="chapterName"
								name="chapterName"
								value={formData.chapterName}
								onChange={handleChange}
								placeholder="e.g., Tech Innovation"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
						<div>
							<Label htmlFor="role" className="text-sm font-medium text-neutral-700">
								Role *
							</Label>
							<select
								id="role"
								name="role"
								value={formData.role}
								onChange={handleChange}
								className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
								required
							>
								<option value="member">Member</option>
								<option value="moderator">Moderator</option>
								<option value="leader">Leader</option>
							</select>
						</div>
					</div>

					<div>
						<Label htmlFor="bio" className="text-sm font-medium text-neutral-700">
							Bio
						</Label>
						<textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							placeholder="Tell us about yourself"
							className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:ring-[#ff5f6d]"
							rows={3}
						></textarea>
					</div>

					<div>
						<Label htmlFor="interests" className="text-sm font-medium text-neutral-700">
							Interests (comma-separated)
						</Label>
						<Input
							id="interests"
							name="interests"
							value={Array.isArray(formData.interests) ? formData.interests.join(", ") : formData.interests}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									interests: e.target.value.split(",").map((i) => i.trim()).filter((i) => i),
								}))
							}
							placeholder="Technology, Innovation, Leadership"
							className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
						/>
					</div>

					<div className="flex gap-2 pt-6">
						<Button
							type="submit"
							disabled={!isFormValid}
							className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
						>
							<Save className="w-4 h-4 mr-2" />
							Save Changes
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
