"use client";

import { X, Edit2, Mail, Briefcase, DollarSign, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type TeamMember } from "./create";

type ShowTeamMemberProps = {
	member: TeamMember;
	onClose: () => void;
	onEdit: (member: TeamMember) => void;
};

export function ShowTeamMember({ member, onClose, onEdit }: ShowTeamMemberProps) {
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="max-w-2xl mx-auto">
			<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg overflow-hidden">
				<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 flex flex-row items-start justify-between pb-4">
					<div>
						<CardTitle className="text-2xl font-bold text-neutral-900">{member.name}</CardTitle>
						<CardDescription className="text-neutral-600">{member.position}</CardDescription>
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
					{/* Avatar and Status */}
					<div className="flex items-center gap-4">
						<div
							className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-bold text-lg`}
						>
							{getInitials(member.name)}
						</div>
						<div>
							<Badge className={member.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
								{member.status}
							</Badge>
						</div>
					</div>

					{/* Contact Information */}
					<div className="space-y-3">
						<h3 className="font-semibold text-neutral-900">Contact Information</h3>
						<div className="flex items-center gap-3 text-neutral-700">
							<Mail className="w-5 h-5 text-[#ff5f6d]" />
							<span>{member.email}</span>
						</div>
					</div>

					{/* Professional Details */}
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<Briefcase className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">SPECIALIZATION</span>
							</div>
							<p className="font-semibold text-neutral-900">{member.specialization}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<DollarSign className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">HOURLY RATE</span>
							</div>
							<p className="font-semibold text-neutral-900">${member.hourlyRate}/hr</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<Calendar className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">JOINED</span>
							</div>
							<p className="font-semibold text-neutral-900">{new Date(member.joinedAt).toLocaleDateString()}</p>
						</div>
						<div className="bg-neutral-50 p-4 rounded-lg">
							<div className="flex items-center gap-2 mb-1">
								<Tag className="w-4 h-4 text-[#ff5f6d]" />
								<span className="text-xs font-medium text-neutral-600">ASSIGNED CLIENTS</span>
							</div>
							<p className="font-semibold text-neutral-900">{member.assignedClients.length}</p>
						</div>
					</div>

					{/* Skills */}
					{member.skills.length > 0 && (
						<div className="space-y-3">
							<h3 className="font-semibold text-neutral-900">Skills</h3>
							<div className="flex flex-wrap gap-2">
								{member.skills.map((skill) => (
									<Badge
										key={skill}
										className="bg-[#ff5f6d]/10 text-[#ff5f6d] border border-[#ff5f6d]/20"
									>
										{skill}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Actions */}
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
