"use client";

import { useState } from "react";
import { Plus, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateChapterForm, type Chapter } from "./create";
import { ShowChapter } from "./show";
import { UpdateChapterForm } from "./update";

const INITIAL_CHAPTERS: Chapter[] = [
	{
		id: "chapter_1",
		name: "Tech Innovation Chapter",
		region: "West Coast",
		description: "Focused on emerging technologies and digital transformation",
		category: "Technology",
		memberCount: 342,
		status: "active",
		foundedAt: "2023-03-15",
		leaderName: "Alex Chen",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_2",
		name: "Business Growth Chapter",
		region: "Texas",
		description: "Entrepreneurs and business leaders driving local economic growth",
		category: "Business",
		memberCount: 256,
		status: "active",
		foundedAt: "2023-05-20",
		leaderName: "Maria Rodriguez",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_3",
		name: "Creative Design Chapter",
		region: "New York",
		description: "Designers and creative professionals sharing innovative ideas",
		category: "Creative",
		memberCount: 198,
		status: "active",
		foundedAt: "2023-07-10",
		leaderName: "Jordan Smith",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_4",
		name: "Marketing Masters Chapter",
		region: "California",
		description: "Marketing professionals exploring new strategies and trends",
		category: "Marketing",
		memberCount: 287,
		status: "active",
		foundedAt: "2023-04-08",
		leaderName: "Emma Johnson",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_5",
		name: "Finance & Investment Chapter",
		region: "New York",
		description: "Financial experts and investment professionals",
		category: "Finance",
		memberCount: 165,
		status: "active",
		foundedAt: "2023-06-12",
		leaderName: "David Lee",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_6",
		name: "Leadership Excellence Chapter",
		region: "Boston",
		description: "Executive leaders and organizational development experts",
		category: "Leadership",
		memberCount: 214,
		status: "active",
		foundedAt: "2023-02-28",
		leaderName: "Sarah Williams",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_7",
		name: "Tech Startup Chapter",
		region: "Silicon Valley",
		description: "Startup founders and early-stage tech entrepreneurs",
		category: "Technology",
		memberCount: 301,
		status: "active",
		foundedAt: "2023-08-05",
		leaderName: "Michael Park",
		communityLabel: "Digital Innovators",
	},
	{
		id: "chapter_8",
		name: "Emerging Leaders Chapter",
		region: "Chicago",
		description: "Young professionals and rising leaders in their industries",
		category: "Leadership",
		memberCount: 143,
		status: "active",
		foundedAt: "2023-09-01",
		leaderName: "Lisa Anderson",
		communityLabel: "Digital Innovators",
	},
];

type ViewState = "list" | "create" | "show" | "update";

export default function CommunityChaptersPage() {
	const [chapters, setChapters] = useState<Chapter[]>(INITIAL_CHAPTERS);
	const [view, setView] = useState<ViewState>("list");
	const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
	const communityName = "Digital Innovators Community";

	const handleCreateChapter = (newChapter: Chapter) => {
		setChapters((prev) => [newChapter, ...prev]);
		setView("list");
	};

	const handleViewChapter = (chapter: Chapter) => {
		setSelectedChapter(chapter);
		setView("show");
	};

	const handleEditChapter = (chapter: Chapter) => {
		setSelectedChapter(chapter);
		setView("update");
	};

	const handleUpdateChapter = (updatedChapter: Chapter) => {
		setChapters((prev) => prev.map((c) => (c.id === updatedChapter.id ? updatedChapter : c)));
		setView("list");
		setSelectedChapter(null);
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateChapterForm
						communityName={communityName}
						onCreateChapter={handleCreateChapter}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	if (view === "show" && selectedChapter) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<ShowChapter
					chapter={selectedChapter}
					onClose={() => {
						setView("list");
						setSelectedChapter(null);
					}}
					onEdit={handleEditChapter}
				/>
			</div>
		);
	}

	if (view === "update" && selectedChapter) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<UpdateChapterForm
						chapter={selectedChapter}
						onUpdateChapter={handleUpdateChapter}
						onCancel={() => {
							setView("list");
							setSelectedChapter(null);
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
						<h1 className="text-3xl font-bold text-neutral-900">Chapters</h1>
						<p className="text-neutral-600 mt-1">
							Manage chapters in <span className="font-semibold">{communityName}</span>
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Create Chapter
					</Button>
				</div>

				{chapters.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">📍</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Chapters Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Create chapters to organize your community by region or interest.
							</CardDescription>
							<Button
								onClick={() => setView("create")}
								className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
							>
								<Plus className="w-5 h-5 mr-2" />
								Create First Chapter
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4 md:grid-cols-2">
						{chapters.map((chapter) => (
							<Card
								key={chapter.id}
								onClick={() => handleViewChapter(chapter)}
								className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
							>
								<CardContent className="pt-6">
									<div className="flex items-start justify-between mb-3">
										<div className="flex items-start gap-3 flex-1">
											<div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-bold text-sm">
												{chapter.name.charAt(0)}
											</div>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-neutral-900">{chapter.name}</h3>
												<p className="text-sm text-neutral-600">{chapter.category}</p>
											</div>
										</div>
										<Badge className={chapter.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
											{chapter.status}
										</Badge>
									</div>

									<p className="text-sm text-neutral-600 mb-4 line-clamp-2">{chapter.description}</p>

									<div className="flex items-center justify-between pt-4 border-t border-neutral-200">
										<span className="flex items-center gap-1 text-sm text-neutral-700">
											<Users className="w-4 h-4 text-[#ff5f6d]" />
											{chapter.memberCount} members
										</span>
										<span className="flex items-center gap-1 text-sm text-neutral-700">
											<MapPin className="w-4 h-4 text-[#ff5f6d]" />
											{chapter.region}
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
