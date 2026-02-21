"use client";

import { Calendar, MapPin, DollarSign, Globe, Users2, X, Edit, Users, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrganizerEvent } from "./create";

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

interface ShowEventProps {
	event: OrganizerEvent;
	onClose: () => void;
	onEdit: (event: OrganizerEvent) => void;
}

export function ShowEvent({ event, onClose, onEdit }: ShowEventProps) {
	const getLocationIcon = () => {
		if (event.locationType === "virtual") return <Globe className="w-5 h-5 text-neutral-400" />;
		if (event.locationType === "hybrid") return <Users2 className="w-5 h-5 text-neutral-400" />;
		return <MapPin className="w-5 h-5 text-neutral-400" />;
	};

	const getEventEmoji = () => {
		if (event.locationType === "virtual") return "💻";
		if (event.locationType === "hybrid") return "🔄";
		return "🎪";
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<div className="text-5xl">{getEventEmoji()}</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">{event.title}</CardTitle>
								<Badge
									variant={event.paymentType === "paid" ? "default" : "secondary"}
									className={
										event.paymentType === "paid"
											? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
											: ""
									}
								>
									{event.paymentType === "paid" ? formatCurrency(event.price) : "Free"}
								</Badge>
								<Badge variant="outline" className="text-xs">
									{event.category}
								</Badge>
							</div>
							{event.description && (
								<p className="text-base text-neutral-600">{event.description}</p>
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
						<Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Start Date</div>
							<div className="text-base text-neutral-900">{formatDate(event.startsAt)}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">End Date</div>
							<div className="text-base text-neutral-900">{formatDate(event.endsAt)}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						{getLocationIcon()}
						<div>
							<div className="text-sm font-medium text-neutral-700">Location Type</div>
							<div className="text-base text-neutral-900 capitalize">
								{event.locationType.replace("_", " ")}
							</div>
						</div>
					</div>

					{event.locationLabel && (
						<div className="flex items-start gap-3">
							<MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Venue</div>
								<div className="text-base text-neutral-900">{event.locationLabel}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Users className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Capacity</div>
							<div className="text-base text-neutral-900">{event.capacity} attendees</div>
						</div>
					</div>

					{event.paymentType === "paid" && (
						<div className="flex items-start gap-3">
							<DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
							<div>
								<div className="text-sm font-medium text-neutral-700">Ticket Price</div>
								<div className="text-base text-neutral-900">{formatCurrency(event.price)}</div>
							</div>
						</div>
					)}

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Category</div>
							<div className="text-base text-neutral-900">{event.category}</div>
						</div>
					</div>
				</div>

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Organized by {event.organizerLabel}</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(event)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Event
					</Button>
					<Button className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
						Manage Registrations
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
