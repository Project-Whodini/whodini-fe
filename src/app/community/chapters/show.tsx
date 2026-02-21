"use client";

import { X, Edit2, Users, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Chapter } from "./create";

type ShowChapterProps = {
	chapter: Chapter;
	onClose: () => void;
	onEdit: (chapter: Chapter) => void;
};

export function ShowChapter({ chapter, onClose, onEdit }: ShowChapterProps) {
	return (
		<div className="max-w-2xl mx-auto">
			<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg overflow-hidden">
				<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 flex flex-row items-start justify-between pb-4">
					<div>
						<CardTitle className="text-2xl font-bold text-neutral-900">{chapter.name}</CardTitle>
						<CardDescription className="text-neutral-600">{chapter.category}</CardDescription>
					</div>
					<Button
						onClick={onClose}
						variant="ghost"
						size="icon"
						className="text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
					>
						<X className="w-5 h-5" />
					</Button>
				</CardHeader>

				<CardContent className="pt-6 space-y-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-bold">
								{chapter.name.charAt(0)}
							</div>
							<div>
								<p className="font-medium text-neutral-900">Leader: {chapter.leaderName}</p>
								<p className="text-sm text-neutral-600">{chapter.region}</p>
							</div>
						</div>
						<Badge className={chapter.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
							{chapter.status}
						</Badge>
					</div>

					<div>
						<h3 className="font-semibold text-neutral-900 mb-2">About</h3>
						<p className="text-neutral-700">{chapter.description || "No description provided"}</p>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<Users className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">MEMBERS</span>
							</div>
							<p className="font-semibold text-neutral-900">{chapter.memberCount}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<MapPin className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">REGION</span>
							</div>
							<p className="font-semibold text-neutral-900">{chapter.region}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<Calendar className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">FOUNDED</span>
							</div>
							<p className="font-semibold text-neutral-900">{new Date(chapter.foundedAt).toLocaleDateString()}</p>
						</div>
					</div>

					<div className="flex gap-2 pt-4 border-t border-neutral-200">
						<Button
							onClick={() => onEdit(chapter)}
							className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
						>
							<Edit2 className="w-4 h-4 mr-2" />
							Edit Chapter
						</Button>
						<Button
							onClick={onClose}
							variant="outline"
							className="flex-1 border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-100"
						>
							Close
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
