"use client";

import { useMemo, useState } from "react";
import { Calendar, MapPin, DollarSign, Globe, Users2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateEventForm, type BusinessEvent } from "./create";
import { ShowEvent } from "./show";
import { UpdateEventForm } from "./update";

const INITIAL_EVENTS: Omit<BusinessEvent, "organizerLabel">[] = [
	{
		id: "evt_static_1",
		title: "Weekend Pop-Up Market",
		description: "Local creators, food booths, and live music.",
		startsAt: "2026-03-12T17:00:00.000Z",
		locationType: "in_person",
		locationLabel: "Downtown Hall",
		paymentType: "free",
		price: 0,
	},
	{
		id: "evt_static_2",
		title: "Growth Workshop for Founders",
		description: "Hands-on session on customer retention and messaging.",
		startsAt: "2026-03-20T09:30:00.000Z",
		locationType: "hybrid",
		locationLabel: "Studio 5 + Live Stream",
		paymentType: "paid",
		price: 49,
	},
	{
		id: "evt_static_3",
		title: "Product Launch Live",
		description: "Live online product launch and Q&A.",
		startsAt: "2026-03-29T14:00:00.000Z",
		locationType: "virtual",
		locationLabel: "Whodini Live Room",
		paymentType: "free",
		price: 0,
	},
];

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



export default function BusinessEventsPage() {
	const brandName = "Demo Business";

	const [events, setEvents] = useState<BusinessEvent[]>([]);
	const [view, setView] = useState<"list" | "create" | "show" | "update">("list");
	const [selectedEvent, setSelectedEvent] = useState<BusinessEvent | null>(null);

	const resolvedEvents = useMemo(() => {
		const seeded = INITIAL_EVENTS.map((item) => ({
			...item,
			organizerLabel: brandName,
		}));

		return [...events, ...seeded].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
	}, [events, brandName]);

	const handleCreateEvent = (event: BusinessEvent) => {
		setEvents((prev) => [event, ...prev]);
		setView("list");
	};

	const handleUpdateEvent = (updatedEvent: BusinessEvent) => {
		setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
		setView("list");
		setSelectedEvent(null);
	};

	const handleShowEvent = (event: BusinessEvent) => {
		setSelectedEvent(event);
		setView("show");
	};

	const handleEditEvent = (event: BusinessEvent) => {
		setSelectedEvent(event);
		setView("update");
	};

	const getLocationIcon = (type: string) => {
		if (type === "virtual") return <Globe className="w-4 h-4 text-neutral-400" />;
		if (type === "hybrid") return <Users2 className="w-4 h-4 text-neutral-400" />;
		return <MapPin className="w-4 h-4 text-neutral-400" />;
	};

	// Show Create Form
	if (view === "create") {
		return (
			<div className="p-6">
				<div className="max-w-4xl mx-auto">
					<CreateEventForm
						brandName={brandName}
						onCreateEvent={handleCreateEvent}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	// Show Event Details
	if (view === "show" && selectedEvent) {
		return (
			<div className="p-6">
				<ShowEvent
					event={selectedEvent}
					onClose={() => {
						setView("list");
						setSelectedEvent(null);
					}}
					onEdit={handleEditEvent}
				/>
			</div>
		);
	}

	// Update Event Form
	if (view === "update" && selectedEvent) {
		return (
			<div className="p-6">
				<div className="max-w-4xl mx-auto">
					<UpdateEventForm
						event={selectedEvent}
						onUpdateEvent={handleUpdateEvent}
						onCancel={() => {
							setView("list");
							setSelectedEvent(null);
						}}
					/>
				</div>
			</div>
		);
	}

	// List View (Default)
	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-bold text-neutral-900">Business Events</h1>
				<Button
					onClick={() => setView("create")}
					variant="outline"
					className="border border-neutral-300 text-neutral-700 font-medium px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors"
				>
					<Plus className="w-4 h-4 mr-2" />
					Create Event
				</Button>
			</div>

			{/* Events Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{resolvedEvents.map((event) => (
					<Card
						key={event.id}
						className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
						onClick={() => handleShowEvent(event)}
					>
						<CardHeader className="pb-4">
							<div className="flex items-start justify-between gap-3">
								<div className="text-3xl">
									{event.locationType === "virtual" ? "💻" : event.locationType === "hybrid" ? "🔄" : "📍"}
								</div>
								<Badge
									variant={event.paymentType === "paid" ? "default" : "secondary"}
									className={
										event.paymentType === "paid"
											? "text-xs bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
											: "text-xs"
									}
								>
									{event.paymentType === "paid" ? formatCurrency(event.price) : "Free"}
								</Badge>
							</div>
							<CardTitle className="text-lg font-semibold text-neutral-900 mt-2">
								{event.title}
							</CardTitle>
							{event.description && (
								<p className="text-sm text-neutral-600 leading-relaxed">{event.description}</p>
							)}
						</CardHeader>
						<CardContent className="pt-0 space-y-4">
							<div className="space-y-2">
								<div className="flex items-center gap-2 text-sm text-neutral-600">
									<Calendar className="w-4 h-4 text-neutral-400" />
									<span>{formatDate(event.startsAt)}</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-neutral-600">
									{getLocationIcon(event.locationType)}
									<span className="capitalize">{event.locationType.replace("_", " ")}</span>
								</div>
								{event.locationLabel && (
									<div className="flex items-center gap-2 text-sm text-neutral-600">
										<MapPin className="w-4 h-4 text-neutral-400" />
										<span>{event.locationLabel}</span>
									</div>
								)}
								{event.paymentType === "paid" && (
									<div className="flex items-center gap-2 text-sm text-neutral-600">
										<DollarSign className="w-4 h-4 text-neutral-400" />
										<span>{formatCurrency(event.price)}</span>
									</div>
								)}
							</div>
							<div className="flex gap-2 pt-2">
								<Button
									variant="outline"
									className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50 rounded-lg"
									onClick={(e) => {
										e.stopPropagation();
										handleEditEvent(event);
									}}
								>
									Edit
								</Button>
								<Button
									className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									onClick={(e) => {
										e.stopPropagation();
										handleShowEvent(event);
									}}
								>
									View Details
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{resolvedEvents.length === 0 && (
				<div className="text-center py-12">
					<Calendar className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-neutral-900 mb-2">No events yet</h3>
					<p className="text-sm text-neutral-600 mb-4">Create your first event to get started.</p>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Plus className="w-4 h-4 mr-2" />
						Create Event
					</Button>
				</div>
			)}
		</div>
	);
}
