"use client";

import { Mail, Phone, Tag, DollarSign, Calendar, X, Edit, CheckCircle2, Clock, XCircle, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "./create";

function formatDate(iso: string) {
	return new Date(iso).toLocaleString(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	});
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(amount);
}

interface ShowServiceProps {
	service: Service;
	onClose: () => void;
	onEdit: (service: Service) => void;
}

export function ShowService({ service, onClose, onEdit }: ShowServiceProps) {
	const getStatusIcon = () => {
		if (service.status === "available") return <CheckCircle2 className="w-5 h-5 text-green-600" />;
		if (service.status === "booked") return <Clock className="w-5 h-5 text-blue-600" />;
		return <XCircle className="w-5 h-5 text-red-600" />;
	};

	const getStatusColor = () => {
		if (service.status === "available") return "bg-green-100 text-green-800 border-green-200";
		if (service.status === "booked") return "bg-blue-100 text-blue-800 border-blue-200";
		return "bg-red-100 text-red-800 border-red-200";
	};

	const getServiceEmoji = () => {
		const cat = service.category.toLowerCase();
		if (cat.includes("audio") || cat.includes("visual") || cat.includes("av")) return "🎧";
		if (cat.includes("food") || cat.includes("catering")) return "🍽️";
		if (cat.includes("security")) return "🛡️";
		if (cat.includes("clean")) return "🧹";
		if (cat.includes("photo") || cat.includes("video")) return "📸";
		if (cat.includes("stage") || cat.includes("setup")) return "🎪";
		if (cat.includes("parking")) return "🅿️";
		if (cat.includes("transport")) return "🚐";
		return "🔧";
	};

	const getPricingLabel = () => {
		if (service.pricingType === "hourly") return "per hour";
		if (service.pricingType === "daily") return "per day";
		return "flat fee";
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<div className="text-5xl">{getServiceEmoji()}</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">
									{service.serviceName}
								</CardTitle>
								<Badge className={`capitalize ${getStatusColor()}`}>
									{service.status}
								</Badge>
							</div>
							{service.description && (
								<p className="text-base text-neutral-600">{service.description}</p>
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
						<Building2 className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Provider</div>
							<div className="text-base text-neutral-900">{service.provider}</div>
						</div>
					</div>

					{service.contactPerson && (
						<div className="flex items-start gap-3">
							<CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Contact Person</div>
								<div className="text-base text-neutral-900">{service.contactPerson}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Mail className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Email</div>
							<div className="text-base text-neutral-900">{service.email}</div>
						</div>
					</div>

					{service.phone && (
						<div className="flex items-start gap-3">
							<Phone className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Phone</div>
								<div className="text-base text-neutral-900">{service.phone}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Category</div>
							<div className="text-base text-neutral-900">{service.category}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Pricing</div>
							<div className="text-base text-neutral-900">
								{formatCurrency(service.pricing)} {getPricingLabel()}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						{getStatusIcon()}
						<div>
							<div className="text-sm font-medium text-neutral-700">Status</div>
							<div className="text-base text-neutral-900 capitalize">{service.status}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Registered</div>
							<div className="text-base text-neutral-900">{formatDate(service.createdAt)}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Assigned Events</div>
							<div className="text-base text-neutral-900">
								{service.eventIds.length > 0 ? `${service.eventIds.length} events` : "None"}
							</div>
						</div>
					</div>
				</div>

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Managed by {service.organizerLabel}</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(service)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Service
					</Button>
					<Button className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
						Assign to Events
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
