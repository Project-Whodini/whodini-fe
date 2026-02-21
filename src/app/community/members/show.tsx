"use client";

import { X, Edit2, Mail, Badge, Calendar } from "lucide-react";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type Member } from "./create";

type ShowMemberProps = {
	member: Member;
	onClose: () => void;
	onEdit: (member: Member) => void;
};

export function ShowMember({ member, onClose, onEdit }: ShowMemberProps) {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "leader":
				return "bg-[#ff5f6d]";
			case "moderator":
				return "bg-amber-500";
			default:
				return "bg-blue-500";
		}
	};

	return (
		<div className="max-w-2xl mx-auto">
			<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg overflow-hidden">
				<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 flex flex-row items-start justify-between pb-4">
					<div>
						<CardTitle className="text-2xl font-bold text-neutral-900">{member.name}</CardTitle>
						<CardDescription className="text-neutral-600">{member.chapterName}</CardDescription>
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
					<div className="flex items-center gap-4">
						<div className={`w-16 h-16 rounded-full ${getRoleColor(member.role)} flex items-center justify-center text-white font-bold text-lg`}>
							{getInitials(member.name)}
						</div>
						<div>
							<BadgeComponent className={member.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
								{member.status}
							</BadgeComponent>
							<BadgeComponent className="ml-2 bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20">
								{member.role}
							</BadgeComponent>
						</div>
					</div>

					<div className="space-y-3">
						<h3 className="font-semibold text-neutral-900">Contact</h3>
						<div className="flex items-center gap-3 text-neutral-700">
							<Mail className="w-5 h-5 text-[#ff5f6d]" />
							<span>{member.email}</span>
						</div>
					</div>

					{member.bio && (
						<div className="space-y-2">
							<h3 className="font-semibold text-neutral-900">About</h3>
							<p className="text-neutral-700">{member.bio}</p>
						</div>
					)}

					{member.interests.length > 0 && (
						<div className="space-y-3">
							<h3 className="font-semibold text-neutral-900">Interests</h3>
							<div className="flex flex-wrap gap-2">
								{member.interests.map((interest) => (
									<BadgeComponent key={interest} className="bg-blue-100 text-blue-800 border-blue-200">
										{interest}
									</BadgeComponent>
								))}
							</div>
						</div>
					)}

					<div className="bg-neutral-50 p-4 rounded-lg">
						<div className="flex items-center gap-2 mb-1">
							<Calendar className="w-4 h-4 text-[#ff5f6d]" />
							<span className="text-xs font-medium text-neutral-600">JOINED</span>
						</div>
						<p className="font-semibold text-neutral-900">{new Date(member.joinDate).toLocaleDateString()}</p>
					</div>

					<div className="flex gap-2 pt-4 border-t border-neutral-200">
						<Button
							onClick={() => onEdit(member)}
							className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
						>
							<Edit2 className="w-4 h-4 mr-2" />
							Edit Member
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
