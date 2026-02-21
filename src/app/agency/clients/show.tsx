"use client";

import { Mail, Phone, Globe, Briefcase, DollarSign, Calendar, X, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Client } from "./create";

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

interface ShowClientProps {
	client: Client;
	onClose: () => void;
	onEdit: (client: Client) => void;
}

export function ShowClient({ client, onClose, onEdit }: ShowClientProps) {
	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<Avatar className="w-16 h-16 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white text-xl font-semibold">
							<AvatarFallback className="bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white">
								{getInitials(client.name)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">
									{client.name}
								</CardTitle>
								<Badge className={client.status === "active" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
									{client.status}
								</Badge>
							</div>
							<p className="text-base text-neutral-600">{client.industry}</p>
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
							<div className="text-base text-neutral-900">{client.email}</div>
						</div>
					</div>

					{client.phone && (
						<div className="flex items-start gap-3">
							<Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Phone</div>
								<div className="text-base text-neutral-900">{client.phone}</div>
							</div>
						</div>
					)}

					{client.website && (
						<div className="flex items-start gap-3">
							<Globe className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Website</div>
								<a
									href={client.website}
									target="_blank"
									rel="noopener noreferrer"
									className="text-base text-[#ff5f6d] hover:underline"
								>
									{client.website}
								</a>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Briefcase className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Industry</div>
							<div className="text-base text-neutral-900">{client.industry}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Monthly Retainer</div>
							<div className="text-base text-neutral-900">${client.monthlyRetainer.toLocaleString()}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Joined</div>
							<div className="text-base text-neutral-900">{formatDate(client.joinedAt)}</div>
						</div>
					</div>
				</div>

				{client.notes && (
					<div className="pt-2 border-t border-neutral-200">
						<div className="text-sm font-medium text-neutral-700 mb-2">Notes</div>
						<p className="text-base text-neutral-900">{client.notes}</p>
					</div>
				)}

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Part of {client.agencyLabel}</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(client)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Client
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
