"use client";

import { Mail, Phone, Tag, Grid3x3, Calendar, X, Edit, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vendor } from "./create";

function formatDate(iso: string) {
	return new Date(iso).toLocaleString(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	});
}

interface ShowVendorProps {
	vendor: Vendor;
	onClose: () => void;
	onEdit: (vendor: Vendor) => void;
}

export function ShowVendor({ vendor, onClose, onEdit }: ShowVendorProps) {
	const getStatusIcon = () => {
		if (vendor.status === "confirmed") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
		if (vendor.status === "cancelled") return <XCircle className="w-5 h-5 text-red-600" />;
		return <Clock className="w-5 h-5 text-amber-600" />;
	};

	const getStatusColor = () => {
		if (vendor.status === "confirmed") return "bg-green-100 text-green-800 border-green-200";
		if (vendor.status === "cancelled") return "bg-red-100 text-red-800 border-red-200";
		return "bg-amber-100 text-amber-800 border-amber-200";
	};

	const getVendorEmoji = () => {
		const cat = vendor.category.toLowerCase();
		if (cat.includes("food") || cat.includes("beverage")) return "🍔";
		if (cat.includes("merchandise") || cat.includes("retail")) return "🛍️";
		if (cat.includes("service")) return "🛠️";
		if (cat.includes("art") || cat.includes("craft")) return "🎨";
		if (cat.includes("tech")) return "💻";
		return "🏪";
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<div className="text-5xl">{getVendorEmoji()}</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">
									{vendor.businessName}
								</CardTitle>
								<Badge className={`capitalize ${getStatusColor()}`}>
									{vendor.status}
								</Badge>
							</div>
							{vendor.description && (
								<p className="text-base text-neutral-600">{vendor.description}</p>
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
					{vendor.contactPerson && (
						<div className="flex items-start gap-3">
							<CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Contact Person</div>
								<div className="text-base text-neutral-900">{vendor.contactPerson}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Email</div>
							<div className="text-base text-neutral-900">{vendor.email}</div>
						</div>
					</div>

					{vendor.phone && (
						<div className="flex items-start gap-3">
							<Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Phone</div>
								<div className="text-base text-neutral-900">{vendor.phone}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Category</div>
							<div className="text-base text-neutral-900">{vendor.category}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Grid3x3 className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Booth Size</div>
							<div className="text-base text-neutral-900">{vendor.boothSize}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						{getStatusIcon()}
						<div>
							<div className="text-sm font-medium text-neutral-700">Status</div>
							<div className="text-base text-neutral-900 capitalize">{vendor.status}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Registered</div>
							<div className="text-base text-neutral-900">{formatDate(vendor.createdAt)}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Assigned Events</div>
							<div className="text-base text-neutral-900">
								{vendor.eventIds.length > 0 ? `${vendor.eventIds.length} events` : "None"}
							</div>
						</div>
					</div>
				</div>

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Managed by {vendor.organizerLabel}</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(vendor)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Vendor
					</Button>
					<Button className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
						Assign to Events
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
