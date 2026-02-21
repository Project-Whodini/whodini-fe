"use client";

import { useState } from "react";
import { Plus, Calendar, MapPin, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateEventForm, type OrganizerEvent } from "./create";
import { ShowEvent } from "./show";
import { UpdateEventForm } from "./update";

const INITIAL_EVENTS: OrganizerEvent[] = [
	{
		id: "org_evt_1",
		title: "Tech Summit 2024",
		description: "Annual technology conference featuring industry speakers and networking.",
		startsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
		endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
		locationType: "hybrid",
		locationLabel: "Convention Center Downtown",
		paymentType: "paid",
		price: 299,
		capacity: 500,
		organizerLabel: "Demo Organizer",
		category: "Conference",
	},
	{
		id: "org_evt_2",
		title: "Community Wellness Workshop",
		description: "Free wellness workshop covering mental health and physical fitness.",
		startsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
		endsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
		locationType: "in_person",
		locationLabel: "Community Recreation Center",
		paymentType: "free",
		price: 0,
		capacity: 75,
		organizerLabel: "Demo Organizer",
		category: "Workshop",
	},
	{
		id: "org_evt_3",
		title: "Virtual Product Launch",
		description: "Exclusive online launch event for our latest product line.",
		startsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
		endsAt: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
		locationType: "virtual",
		locationLabel: "https://launch.product.com/live",
		paymentType: "free",
		price: 0,
		capacity: 1000,
		organizerLabel: "Demo Organizer",
		category: "Product Launch",
	},
];

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function formatTime(iso: string) {
	return new Date(iso).toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "2-digit",
	});
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(amount);
}

export default function OrganizerEventsPage() {
	const organizerName = "Demo Organizer";
	const [events, setEvents] = useState<OrganizerEvent[]>(INITIAL_EVENTS);
	const [view, setView] = useState<"list" | "create" | "show" | "update">("list");
	const [selectedEvent, setSelectedEvent] = useState<OrganizerEvent | null>(null);

	const handleCreateEvent = (newEvent: OrganizerEvent) => {
		setEvents((prev) => [newEvent, ...prev]);
		setView("list");
	};

	const handleViewEvent = (event: OrganizerEvent) => {
		setSelectedEvent(event);
		setView("show");
	};

	const handleEditEvent = (event: OrganizerEvent) => {
		setSelectedEvent(event);
		setView("update");
	};

	const handleUpdateEvent = (updatedEvent: OrganizerEvent) => {
		setEvents((prev) => prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
		setView("list");
		setSelectedEvent(null);
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateEventForm
						organizerName={organizerName}
						onCreateEvent={handleCreateEvent}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	if (view === "show" && selectedEvent) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
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

	if (view === "update" && selectedEvent) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Organizer Events</h1>
						<p className="text-neutral-600 mt-1">
							Manage professional events for <span className="font-semibold">{organizerName}</span>
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Create Event
					</Button>
				</div>

				{events.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">📅</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Events Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Create your first event to start organizing and managing registrations.
							</CardDescription>
							<Button
								onClick={() => setView("create")}
								className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
							>
								<Plus className="w-5 h-5 mr-2" />
								Create First Event
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{events.map((event) => (
							<Card
								key={event.id}
								onClick={() => handleViewEvent(event)}
								className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
							>
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between gap-2 mb-2">
										<CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-2">
											{event.title}
										</CardTitle>
										<Badge
											variant={event.paymentType === "paid" ? "default" : "secondary"}
											className={
												event.paymentType === "paid"
													? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 shrink-0"
													: "shrink-0"
											}
										>
											{event.paymentType === "paid" ? formatCurrency(event.price) : "Free"}
										</Badge>
									</div>
									<CardDescription className="line-clamp-2 text-neutral-600">
										{event.description || "No description provided"}
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-0 space-y-3">
									<div className="flex items-center gap-2 text-sm text-neutral-700">
										<Calendar className="w-4 h-4 text-neutral-400" />
										<span>
											{formatDate(event.startsAt)} at {formatTime(event.startsAt)}
										</span>
									</div>

									<div className="flex items-center gap-2 text-sm text-neutral-700">
										<MapPin className="w-4 h-4 text-neutral-400" />
										<span className="line-clamp-1">
											{event.locationLabel || event.locationType}
										</span>
									</div>

									<div className="flex items-center gap-2 flex-wrap pt-1">
										<Badge variant="outline" className="text-xs">
											{event.category}
										</Badge>
										<Badge variant="outline" className="text-xs">
											{event.capacity} capacity
										</Badge>
										<Badge variant="outline" className="text-xs capitalize">
											{event.locationType.replace("_", " ")}
										</Badge>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
