"use client";

import { useState } from "react";
import { Plus, Search, FileText, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type DirectoryEntry = {
	id: string;
	title: string;
	description: string;
	category: string;
	resourceType: string;
	url: string;
	tags: string[];
	status: "active" | "inactive";
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_ENTRIES: DirectoryEntry[] = [
	{
		id: "dir_1",
		title: "Community Code of Conduct",
		description: "Guidelines and expectations for all community members",
		category: "Guidelines",
		resourceType: "Document",
		url: "https://community.digitaldiversity.com/code-of-conduct",
		tags: ["policies", "governance"],
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "dir_2",
		title: "Innovation Framework Guide",
		description: "Step-by-step guide for implementing innovation frameworks",
		category: "Resources",
		resourceType: "Guide",
		url: "https://resources.digitaldiversity.com/innovation-guide",
		tags: ["innovation", "tutorial"],
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "dir_3",
		title: "Member Directory with Photos",
		description: "Complete searchable directory of all community members",
		category: "Directory",
		resourceType: "Database",
		url: "https://directory.digitaldiversity.com",
		tags: ["members", "networking"],
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "dir_4",
		title: "Chapter Resources Hub",
		description: "Centralized resource library for chapter leaders",
		category: "Resources",
		resourceType: "Hub",
		url: "https://chapters.digitaldiversity.com/resources",
		tags: ["chapters", "leadership"],
		status: "active",
		communityLabel: "Digital Innovators",
	},
];

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Guidelines":
			return "bg-red-100 text-red-800";
		case "Resources":
			return "bg-blue-100 text-blue-800";
		case "Directory":
			return "bg-purple-100 text-purple-800";
		default:
			return "bg-neutral-100 text-neutral-800";
	}
};

export default function CommunityDirectoryPage() {
	const [entries, setEntries] = useState<DirectoryEntry[]>(INITIAL_ENTRIES);
	const [view, setView] = useState<ViewState>("list");
	const [searchTerm, setSearchTerm] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Resources",
		resourceType: "",
		url: "",
		tags: "",
	});

	const handleCreateEntry = () => {
		const confirmed = window.confirm(`Add directory entry: "${formData.title}"?`);
		if (!confirmed) return;

		const newEntry: DirectoryEntry = {
			id: `dir_${Date.now()}`,
			title: formData.title,
			description: formData.description,
			category: formData.category,
			resourceType: formData.resourceType,
			url: formData.url,
			tags: formData.tags.split(",").map((t) => t.trim()),
			status: "active",
			communityLabel: "Digital Innovators",
		};

		setEntries((prev) => [newEntry, ...prev]);
		setFormData({ title: "", description: "", category: "Resources", resourceType: "", url: "", tags: "" });
		setView("list");
	};

	const filteredEntries = entries.filter(
		(entry) =>
			entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Add Directory Entry</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div>
								<Label className="text-sm font-medium text-neutral-700">Title *</Label>
								<Input
									value={formData.title}
									onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Entry title"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Category *</Label>
									<select
										value={formData.category}
										onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									>
										<option value="Guidelines">Guidelines</option>
										<option value="Resources">Resources</option>
										<option value="Directory">Directory</option>
									</select>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Resource Type *</Label>
									<Input
										value={formData.resourceType}
										onChange={(e) => setFormData((prev) => ({ ...prev, resourceType: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Document, Guide, etc."
									/>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">URL *</Label>
								<Input
									value={formData.url}
									onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="https://..."
								/>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Description</Label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={3}
									placeholder="Entry description"
								></textarea>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Tags (comma-separated)</Label>
								<Input
									value={formData.tags}
									onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="tag1, tag2, tag3"
								/>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateEntry}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Add Entry
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
						<h1 className="text-3xl font-bold text-neutral-900">Community Directory</h1>
						<p className="text-neutral-600 mt-1">Resources, guides, and information</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Entry
					</Button>
				</div>

				<div className="mb-6 relative">
					<Search className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
					<Input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search directory..."
						className="pl-10 border border-neutral-300 rounded-lg"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					{filteredEntries.map((entry) => (
						<Card
							key={entry.id}
							className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
						>
							<CardContent className="pt-6">
								<div className="flex items-start gap-3 mb-3">
									<FileText className="w-5 h-5 text-[#ff5f6d] flex-shrink-0" />
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-neutral-900">{entry.title}</h3>
										<Badge className={getCategoryColor(entry.category) + " mt-1 text-xs"}>
											{entry.category}
										</Badge>
									</div>
								</div>
								<p className="text-sm text-neutral-600 mb-3">{entry.description}</p>
								<div className="flex items-center gap-2 mb-3 text-sm text-neutral-600">
									<span className="px-2 py-1 bg-neutral-100 rounded">{entry.resourceType}</span>
								</div>
								<div className="flex flex-wrap gap-1 mb-3">
									{entry.tags.map((tag) => (
										<Badge key={tag} className="bg-neutral-100 text-neutral-700 text-xs">
											{tag}
										</Badge>
									))}
								</div>
								<a
									href={entry.url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-[#ff5f6d] hover:text-[#ff5f6d]/80 text-sm font-medium"
								>
									<LinkIcon className="w-4 h-4" />
									Visit Resource
								</a>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
