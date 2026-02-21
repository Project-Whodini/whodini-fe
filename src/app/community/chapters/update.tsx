"use client";

import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Chapter } from "./create";

type UpdateChapterFormProps = {
	chapter: Chapter;
	onUpdateChapter: (chapter: Chapter) => void;
	onCancel: () => void;
};

export function UpdateChapterForm({ chapter, onUpdateChapter, onCancel }: UpdateChapterFormProps) {
	const [formData, setFormData] = useState<Chapter>(chapter);

	useEffect(() => {
		setFormData(chapter);
	}, [chapter]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const confirmed = window.confirm(`Are you sure you want to save changes to ${formData.name}?`);
		if (!confirmed) return;

		onUpdateChapter(formData);
	};

	const isFormValid = formData.name && formData.region && formData.category && formData.leaderName;

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
			<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
				<CardTitle className="text-2xl font-bold text-neutral-900">Edit Chapter</CardTitle>
				<CardDescription>Update chapter information</CardDescription>
			</CardHeader>
			<CardContent className="pt-6 space-y-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="name" className="text-sm font-medium text-neutral-700">
								Chapter Name *
							</Label>
							<Input
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="e.g., Tech Chapter"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
						<div>
							<Label htmlFor="region" className="text-sm font-medium text-neutral-700">
								Region *
							</Label>
							<Input
								id="region"
								name="region"
								value={formData.region}
								onChange={handleChange}
								placeholder="e.g., West Coast"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="category" className="text-sm font-medium text-neutral-700">
								Category *
							</Label>
							<select
								id="category"
								name="category"
								value={formData.category}
								onChange={handleChange}
								className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
								required
							>
								<option value="">Select category</option>
								<option value="Technology">Technology</option>
								<option value="Business">Business</option>
								<option value="Creative">Creative</option>
								<option value="Marketing">Marketing</option>
								<option value="Finance">Finance</option>
								<option value="Leadership">Leadership</option>
							</select>
						</div>
						<div>
							<Label htmlFor="leaderName" className="text-sm font-medium text-neutral-700">
								Chapter Leader *
							</Label>
							<Input
								id="leaderName"
								name="leaderName"
								value={formData.leaderName}
								onChange={handleChange}
								placeholder="e.g., John Smith"
								className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
								required
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="description" className="text-sm font-medium text-neutral-700">
							Chapter Description
						</Label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Describe the chapter's mission and focus"
							className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:ring-[#ff5f6d]"
							rows={3}
						></textarea>
					</div>

					<div>
						<Label htmlFor="status" className="text-sm font-medium text-neutral-700">
							Status
						</Label>
						<select
							id="status"
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
						>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
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
