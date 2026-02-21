"use client";

import { useState } from "react";
import { Mail, Phone, Briefcase, Shield, Calendar, X, Edit, CheckCircle2, Clock, XCircle, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { TeamMember, TeamPermissions } from "./create";
import { PermissionsModal } from "./permissions-modal";

function formatDate(iso: string) {
	return new Date(iso).toLocaleString(undefined, {
		dateStyle: "medium",
	});
}

function getInitials(name: string): string {
	const parts = name.trim().split(" ");
	if (parts.length >= 2) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return name.slice(0, 2).toUpperCase();
}

interface ShowTeamMemberProps {
	member: TeamMember;
	onClose: () => void;
	onEdit: (member: TeamMember) => void;
	onUpdatePermissions: (memberId: string, permissions: TeamPermissions) => void;
}

export function ShowTeamMember({ member, onClose, onEdit, onUpdatePermissions }: ShowTeamMemberProps) {
	const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);

	const getStatusIcon = () => {
		if (member.status === "active") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
		if (member.status === "on_leave") return <Clock className="w-5 h-5 text-amber-600" />;
		return <XCircle className="w-5 h-5 text-red-600" />;
	};

	const getStatusColor = () => {
		if (member.status === "active") return "bg-green-100 text-green-800 border-green-200";
		if (member.status === "on_leave") return "bg-amber-100 text-amber-800 border-amber-200";
		return "bg-red-100 text-red-800 border-red-200";
	};

	const getAccessLevelColor = () => {
		if (member.accessLevel === "admin") return "bg-purple-100 text-purple-800";
		if (member.accessLevel === "manager") return "bg-blue-100 text-blue-800";
		if (member.accessLevel === "staff") return "bg-neutral-100 text-neutral-800";
		return "bg-neutral-50 text-neutral-600";
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<Avatar className="w-16 h-16 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white text-xl font-semibold">
							<AvatarFallback className="bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white">
								{getInitials(member.fullName)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">
									{member.fullName}
								</CardTitle>
								<Badge className={`capitalize ${getStatusColor()}`}>
									{member.status.replace("_", " ")}
								</Badge>
								<Badge className={`capitalize ${getAccessLevelColor()}`}>
									{member.accessLevel}
								</Badge>
							</div>
							{member.role && (
								<p className="text-base text-neutral-600">{member.role}</p>
							)}
						</div>
					</div>
					<Button
						onClick={onClose}
						variant="ghost"
						size="sm"
						className="text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg"
					>
						<X className="w-5 h-5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="pt-6 space-y-6">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="flex items-start gap-3">
						<Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Email</div>
							<div className="text-base text-neutral-900">{member.email}</div>
						</div>
					</div>

					{member.phone && (
						<div className="flex items-start gap-3">
							<Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Phone</div>
								<div className="text-base text-neutral-900">{member.phone}</div>
							</div>
						</div>
					)}

					{member.role && (
						<div className="flex items-start gap-3">
							<Briefcase className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Role</div>
								<div className="text-base text-neutral-900">{member.role}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Building2 className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Department</div>
							<div className="text-base text-neutral-900">{member.department}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Shield className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Access Level</div>
							<div className="text-base text-neutral-900 capitalize">{member.accessLevel}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						{getStatusIcon()}
						<div>
							<div className="text-sm font-medium text-neutral-700">Status</div>
							<div className="text-base text-neutral-900 capitalize">
								{member.status.replace("_", " ")}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Joined</div>
							<div className="text-base text-neutral-900">{formatDate(member.joinedAt)}</div>
						</div>
					</div>
				</div>

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Part of {member.organizerLabel} team</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(member)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Member
					</Button>
					<Button 
						onClick={() => setIsPermissionsModalOpen(true)}
						className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Shield className="w-4 h-4 mr-2" />
						Assign Permissions
					</Button>
				</div>
			</CardContent>

			<PermissionsModal
				member={member}
				isOpen={isPermissionsModalOpen}
				onClose={() => setIsPermissionsModalOpen(false)}
				onSave={onUpdatePermissions}
			/>
		</Card>
	);
}
