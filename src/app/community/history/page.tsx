"use client";

import { useState } from "react";
import { Plus, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CommunityMilestone = {
	id: string;
	title: string;
	description: string;
	date: string;
	category: string;
	impact: string;
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_MILESTONES: CommunityMilestone[] = [
	{
		id: "hist_1",
		title: "Community Founded",
		description: "Digital Innovators Community officially launched",
		date: "2023-01-15",
		category: "Foundation",
		impact: "Beginning of community journey",
		communityLabel: "Digital Innovators",
	},
	{
		id: "hist_2",
		title: "First 500 Members",
		description: "Community reached 500 active members milestone",
		date: "2023-06-20",
		category: "Growth",
		impact: "Community expansion success",
		communityLabel: "Digital Innovators",
	},
	{
		id: "hist_3",
		title: "Tech Innovation Summit 2023",
		description: "First annual tech summit with 300+ attendees",
		date: "2023-09-10",
		category: "Events",
		impact: "Established signature event",
		communityLabel: "Digital Innovators",
	},
	{
		id: "hist_4",
		title: "Strategic Partnerships Signed",
		description: "Signed partnerships with 5 major tech companies",
		date: "2023-11-05",
		category: "Partnerships",
		impact: "Enhanced member benefits and opportunities",
		communityLabel: "Digital Innovators",
	},
	{
		id: "hist_5",
		title: "Chapters Launched",
		description: "Established 8 regional chapters across major cities",
		date: "2024-01-20",
		category: "Expansion",
		impact: "Local community growth",
		communityLabel: "Digital Innovators",
	},
	{
		id: "hist_6",
		title: "Member Benefits Program",
		description: "Launched comprehensive benefits and rewards program",
		date: "2024-03-01",
		category: "Programs",
		impact: "Increased member engagement",
		communityLabel: "Digital Innovators",
	},
];

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Foundation":
			return "bg-[#ff5f6d] text-white";
		case "Growth":
			return "bg-green-100 text-green-800";
		case "Events":
			return "bg-blue-100 text-blue-800";
		case "Partnerships":
			return "bg-purple-100 text-purple-800";
		case "Expansion":
			return "bg-orange-100 text-orange-800";
		case "Programs":
			return "bg-indigo-100 text-indigo-800";
		default:
			return "bg-neutral-100 text-neutral-800";
	}
};

export default function CommunityHistoryPage() {
	const [milestones, setMilestones] = useState<CommunityMilestone[]>(INITIAL_MILESTONES);
	const [view, setView] = useState<ViewState>("list");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		date: "",
		category: "Growth",
		impact: "",
	});

	const handleCreateMilestone = () => {
		const confirmed = window.confirm(`Add milestone: "${formData.title}"?`);
		if (!confirmed) return;

		const newMilestone: CommunityMilestone = {
			id: `hist_${Date.now()}`,
			title: formData.title,
			description: formData.description,
			date: formData.date,
			category: formData.category,
			impact: formData.impact,
			communityLabel: "Digital Innovators",
		};

		setMilestones((prev) => [...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
		setMilestones((prev) => [newMilestone, ...prev]);
		setFormData({ title: "", description: "", date: "", category: "Growth", impact: "" });
		setView("list");
	};

	const sortedMilestones = [...milestones].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Add Milestone</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div>
								<Label className="text-sm font-medium text-neutral-700">Milestone Title *</Label>
								<Input
									value={formData.title}
									onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Milestone title"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Date *</Label>
									<Input
										type="date"
										value={formData.date}
										onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Category *</Label>
									<select
										value={formData.category}
										onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									>
										<option value="Foundation">Foundation</option>
										<option value="Growth">Growth</option>
										<option value="Events">Events</option>
										<option value="Partnerships">Partnerships</option>
										<option value="Expansion">Expansion</option>
										<option value="Programs">Programs</option>
									</select>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Description</Label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={3}
									placeholder="Milestone description"
								></textarea>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Impact</Label>
								<Input
									value={formData.impact}
									onChange={(e) => setFormData((prev) => ({ ...prev, impact: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Impact of this milestone"
								/>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateMilestone}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Add Milestone
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
						<h1 className="text-3xl font-bold text-neutral-900">Community History</h1>
						<p className="text-neutral-600 mt-1">Milestones and timeline</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Milestone
					</Button>
				</div>

				<div className="relative">
					{/* Timeline line */}
					<div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff5f6d] to-[#ffc371]"></div>

					<div className="space-y-4 pl-20">
						{sortedMilestones.map((milestone, index) => (
							<Card key={milestone.id} className="relative border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
								{/* Timeline dot */}
								<div className="absolute -left-[54px] top-6 w-5 h-5 rounded-full bg-[#ff5f6d] border-4 border-neutral-50"></div>

								<CardContent className="pt-6">
									<div className="flex items-start justify-between mb-3">
										<div>
											<h3 className="text-lg font-semibold text-neutral-900">{milestone.title}</h3>
											<p className="text-sm text-neutral-600 flex items-center gap-2 mt-1">
												<Calendar className="w-4 h-4" />
												{new Date(milestone.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</p>
										</div>
										<Badge className={getCategoryColor(milestone.category)}>
											{milestone.category}
										</Badge>
									</div>
									<p className="text-sm text-neutral-700 mb-2">{milestone.description}</p>
									<div className="flex items-center gap-2 text-sm text-neutral-600 pt-2 border-t border-neutral-200">
										<TrendingUp className="w-4 h-4 text-[#ff5f6d]" />
										<span className="font-medium">{milestone.impact}</span>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
