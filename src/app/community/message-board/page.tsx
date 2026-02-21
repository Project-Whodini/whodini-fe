"use client";

import { useState } from "react";
import { Plus, MessageSquare, Eye, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type MessageThread = {
	id: string;
	title: string;
	description: string;
	category: string;
	author: string;
	postCount: number;
	viewCount: number;
	lastActivity: string;
	status: "active" | "archived";
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_THREADS: MessageThread[] = [
	{
		id: "thread_1",
		title: "Best Practices for Digital Transformation",
		description: "Share and discuss strategies for digital transformation in your organization",
		category: "Technology",
		author: "Sarah Williams",
		postCount: 24,
		viewCount: 456,
		lastActivity: "2 hours ago",
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "thread_2",
		title: "Networking Tips for Remote Professionals",
		description: "Connect and share experiences about virtual networking",
		category: "Networking",
		author: "Michael Chen",
		postCount: 18,
		viewCount: 302,
		lastActivity: "5 hours ago",
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "thread_3",
		title: "Upcoming Chapter Events Calendar",
		description: "View and discuss upcoming events across all chapters",
		category: "Events",
		author: "Emma Johnson",
		postCount: 31,
		viewCount: 567,
		lastActivity: "1 hour ago",
		status: "active",
		communityLabel: "Digital Innovators",
	},
	{
		id: "thread_4",
		title: "Startup Funding Opportunities",
		description: "Discuss funding sources and investment opportunities",
		category: "Business",
		author: "David Park",
		postCount: 22,
		viewCount: 389,
		lastActivity: "3 hours ago",
		status: "active",
		communityLabel: "Digital Innovators",
	},
];

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Technology":
			return "bg-blue-100 text-blue-800";
		case "Networking":
			return "bg-purple-100 text-purple-800";
		case "Events":
			return "bg-green-100 text-green-800";
		case "Business":
			return "bg-amber-100 text-amber-800";
		default:
			return "bg-neutral-100 text-neutral-800";
	}
};

export default function MessageBoardPage() {
	const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
	const [view, setView] = useState<ViewState>("list");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Technology",
		author: "",
	});

	const handleCreateThread = () => {
		const confirmed = window.confirm(`Create discussion: "${formData.title}"?`);
		if (!confirmed) return;

		const newThread: MessageThread = {
			id: `thread_${Date.now()}`,
			title: formData.title,
			description: formData.description,
			category: formData.category,
			author: formData.author,
			postCount: 0,
			viewCount: 0,
			lastActivity: "just now",
			status: "active",
			communityLabel: "Digital Innovators",
		};

		setThreads((prev) => [newThread, ...prev]);
		setFormData({ title: "", description: "", category: "Technology", author: "" });
		setView("list");
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Start New Discussion</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div>
								<Label className="text-sm font-medium text-neutral-700">Discussion Title *</Label>
								<Input
									value={formData.title}
									onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Create an engaging title"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Your Name *</Label>
									<Input
										value={formData.author}
										onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Your name"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Category *</Label>
									<select
										value={formData.category}
										onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									>
										<option value="Technology">Technology</option>
										<option value="Networking">Networking</option>
										<option value="Events">Events</option>
										<option value="Business">Business</option>
									</select>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Description *</Label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={4}
									placeholder="Describe your discussion topic"
								></textarea>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateThread}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Create Discussion
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
						<h1 className="text-3xl font-bold text-neutral-900">Message Board</h1>
						<p className="text-neutral-600 mt-1">Community discussions and forums</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Start Discussion
					</Button>
				</div>

				<div className="space-y-3">
					{threads.map((thread) => (
						<Card
							key={thread.id}
							className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
						>
							<CardContent className="pt-6">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<h3 className="text-lg font-semibold text-neutral-900">{thread.title}</h3>
											<Badge className={getCategoryColor(thread.category)}>
												{thread.category}
											</Badge>
										</div>
										<p className="text-sm text-neutral-600 mb-3">{thread.description}</p>
										<div className="flex items-center gap-4 text-sm text-neutral-500">
											<div className="flex items-center gap-1">
												<User className="w-4 h-4" />
												{thread.author}
											</div>
											<div className="flex items-center gap-1">
												<MessageSquare className="w-4 h-4" />
												{thread.postCount} posts
											</div>
											<div className="flex items-center gap-1">
												<Eye className="w-4 h-4" />
												{thread.viewCount} views
											</div>
											<span>Last: {thread.lastActivity}</span>
										</div>
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
