"use client";

import { useState, useEffect } from "react";
import { X, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { TeamPermissions, TeamMember } from "./create";

interface PermissionsModalProps {
	member: TeamMember;
	isOpen: boolean;
	onClose: () => void;
	onSave: (memberId: string, permissions: TeamPermissions) => void;
}

type PermissionItem = {
	key: keyof TeamPermissions;
	label: string;
	description: string;
};

const PERMISSION_ITEMS: PermissionItem[] = [
	{
		key: "manageEvents",
		label: "Manage Events",
		description: "Create, edit, and delete events",
	},
	{
		key: "manageVendors",
		label: "Manage Vendors",
		description: "Add and manage vendor relationships",
	},
	{
		key: "manageServices",
		label: "Manage Services",
		description: "Configure and manage service providers",
	},
	{
		key: "manageTeam",
		label: "Manage Team",
		description: "Add, edit, and remove team members",
	},
	{
		key: "viewReports",
		label: "View Reports",
		description: "Access analytics and reporting features",
	},
	{
		key: "manageBilling",
		label: "Manage Billing",
		description: "Handle payments and billing settings",
	},
	{
		key: "sendNotifications",
		label: "Send Notifications",
		description: "Send messages and notifications to users",
	},
	{
		key: "exportData",
		label: "Export Data",
		description: "Export event and attendee data",
	},
];

export function PermissionsModal({ member, isOpen, onClose, onSave }: PermissionsModalProps) {
	const [permissions, setPermissions] = useState<TeamPermissions>(member.permissions);

	useEffect(() => {
		setPermissions(member.permissions);
	}, [member]);

	if (!isOpen) return null;

	const handleToggle = (key: keyof TeamPermissions) => {
		setPermissions((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleSave = () => {
		onSave(member.id, permissions);
		onClose();
	};

	const handleSelectAll = () => {
		const allTrue: TeamPermissions = {
			manageEvents: true,
			manageVendors: true,
			manageServices: true,
			manageTeam: true,
			viewReports: true,
			manageBilling: true,
			sendNotifications: true,
			exportData: true,
		};
		setPermissions(allTrue);
	};

	const handleClearAll = () => {
		const allFalse: TeamPermissions = {
			manageEvents: false,
			manageVendors: false,
			manageServices: false,
			manageTeam: false,
			viewReports: false,
			manageBilling: false,
			sendNotifications: false,
			exportData: false,
		};
		setPermissions(allFalse);
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<Card className="w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
				<CardHeader className="border-b border-neutral-200">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-3">
							<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center">
								<Shield className="w-5 h-5 text-white" />
							</div>
							<div>
								<CardTitle className="text-xl font-bold text-neutral-900">
									Manage Permissions
								</CardTitle>
								<CardDescription className="text-neutral-600 mt-1">
									Configure access permissions for {member.fullName}
								</CardDescription>
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

				<CardContent className="flex-1 overflow-y-auto pt-6">
					<div className="flex gap-2 mb-4">
						<Button
							onClick={handleSelectAll}
							variant="outline"
							size="sm"
							className="text-xs border-neutral-300 hover:bg-neutral-50 rounded-lg"
						>
							Select All
						</Button>
						<Button
							onClick={handleClearAll}
							variant="outline"
							size="sm"
							className="text-xs border-neutral-300 hover:bg-neutral-50 rounded-lg"
						>
							Clear All
						</Button>
					</div>

					<div className="space-y-4">
						{PERMISSION_ITEMS.map((item) => (
							<label
								key={item.key}
								className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors"
							>
								<input
									type="checkbox"
									checked={permissions[item.key]}
									onChange={() => handleToggle(item.key)}
									className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
								/>
								<div className="flex-1">
									<div className="font-medium text-neutral-900">{item.label}</div>
									<div className="text-sm text-neutral-600">{item.description}</div>
								</div>
							</label>
						))}
					</div>
				</CardContent>

				<div className="border-t border-neutral-200 p-6 flex gap-3">
					<Button
						onClick={onClose}
						variant="outline"
						className="flex-1 border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSave}
						className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Save className="w-4 h-4 mr-2" />
						Save Permissions
					</Button>
				</div>
			</Card>
		</div>
	);
}
