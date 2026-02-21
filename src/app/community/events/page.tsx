"use client";

import { useState } from "react";
import { Plus, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CommunityEvent = {
	id: string;
	eventName: string;
	date: string;
	time: string;
	location: string;
	description: string;
	capacity: number;
	attendeeCount: number;
	status: "upcoming" | "ongoing" | "completed";
	chapterName: string;
	communityLabel: string;
};

type ViewState = "list" | "create" | "show" | "update";

const INITIAL_EVENTS: CommunityEvent[] = [
	{
		id: "event_1",
		eventName: "Q1 Tech Innovation Summit",
		date: "2026-03-15",
		time: "09:00 AM",
		location: "San Francisco Convention Center",
		description: "Annual gathering of tech innovators and entrepreneurs",
		capacity: 500,
		attendeeCount: 387,
		status: "upcoming",
		chapterName: "Tech Innovation Chapter",
		communityLabel: "Digital Innovators",
	},
	{
		id: "event_2",
		eventName: "Leadership Round Table",
		date: "2026-03-08",
		time: "06:00 PM",
		location: "Boston Executive Club",
		description: "Intimate discussion on modern leadership challenges",
		capacity: 50,
		attendeeCount: 45,
		status: "upcoming",
		chapterName: "Leadership Excellence Chapter",
		communityLabel: "Digital Innovators",
	},
	{
		id: "event_3",
		eventName: "Marketing Strategy Workshop",
		date: "2026-02-28",
		time: "02:00 PM",
		location: "New York Marketing Hub",
		description: "Hands-on workshop on digital marketing trends",
		capacity: 100,
		attendeeCount: 78,
		status: "upcoming",
		chapterName: "Marketing Masters Chapter",
		communityLabel: "Digital Innovators",
	},
	{
		id: "event_4",
		eventName: "Startup Pitch Competition",
		date: "2026-03-22",
		time: "10:00 AM",
		location: "Silicon Valley Tech Park",
		description: "Showcase your startup ideas to investors",
		capacity: 200,
		attendeeCount: 156,
		status: "upcoming",
		chapterName: "Tech Startup Chapter",
		communityLabel: "Digital Innovators",
	},
	{
		id: "event_5",
		eventName: "Design & Innovation Expo",
		date: "2026-03-05",
		time: "11:00 AM",
		location: "New York Creative Space",
		description: "Showcase of latest design and innovation projects",
		capacity: 300,
		attendeeCount: 245,
		status: "upcoming",
		chapterName: "Creative Design Chapter",
		communityLabel: "Digital Innovators",
	},
	{
		id: "event_6",
		eventName: "Monthly Networking Breakfast",
		date: "2026-02-25",
		time: "08:00 AM",
		location: "Chicago Business Club",
		description: "Casual networking event for all members",
		capacity: 75,
		attendeeCount: 62,
		status: "upcoming",
		chapterName: "Business Growth Chapter",
		communityLabel: "Digital Innovators",
	},
];

export default function CommunityEventsPage() {
	const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
	const [view, setView] = useState<ViewState>("list");
	const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
	const [formData, setFormData] = useState({
		eventName: "",
		date: "",
		time: "",
		location: "",
		description: "",
		capacity: 100,
		chapterName: "",
	});

	const handleCreateEvent = () => {
		const confirmed = window.confirm(`Create event: ${formData.eventName}?`);
		if (!confirmed) return;

		const newEvent: CommunityEvent = {
			id: `event_${Date.now()}`,
			eventName: formData.eventName,
			date: formData.date,
			time: formData.time,
			location: formData.location,
			description: formData.description,
			capacity: formData.capacity,
			attendeeCount: 0,
			status: "upcoming",
			chapterName: formData.chapterName,
			communityLabel: "Digital Innovators",
		};

		setEvents((prev) => [newEvent, ...prev]);
		setFormData({ eventName: "", date: "", time: "", location: "", description: "", capacity: 100, chapterName: "" });
		setView("list");
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Create Event</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Event Name *</Label>
									<Input
										value={formData.eventName}
										onChange={(e) => setFormData((prev) => ({ ...prev, eventName: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Event name"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Chapter *</Label>
									<Input
										value={formData.chapterName}
										onChange={(e) => setFormData((prev) => ({ ...prev, chapterName: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Chapter name"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Date *</Label>
									<Input
										type="date"
										value={formData.date}
										onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Time *</Label>
									<Input
										type="time"
										value={formData.time}
										onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
									/>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Location *</Label>
								<Input
									value={formData.location}
									onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Event location"
								/>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Description</Label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={3}
									placeholder="Event description"
								></textarea>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Capacity</Label>
								<Input
									type="number"
									value={formData.capacity}
									onChange={(e) => setFormData((prev) => ({ ...prev, capacity: parseInt(e.target.value) }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									min="1"
								/>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateEvent}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Create Event
								</Button>
								<Button
									onClick={() => setView("list")}
									variant="outline"
									className="flex-1 border border-neutral-300 rounded-lg"
								>
									Cancel
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Community Events</h1>
						<p className="text-neutral-600 mt-1">Upcoming and past events</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Create Event
					</Button>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					{events.map((event) => (
						<Card
							key={event.id}
							className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
						>
							<CardContent className="pt-6">
								<div className="flex items-start justify-between mb-3">
									<h3 className="text-lg font-semibold text-neutral-900">{event.eventName}</h3>
									<Badge className={event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-800"}>
										{event.status}
									</Badge>
								</div>
								<p className="text-sm text-neutral-600 mb-4">{event.description}</p>
								<div className="space-y-2 text-sm"/>
								<div className="flex items-center gap-2 text-neutral-700">
									<Calendar className="w-4 h-4 text-[#ff5f6d]" />
									{new Date(event.date).toLocaleDateString()} at {event.time}
								</div>
								<div className="flex items-center gap-2 text-neutral-700">
									<MapPin className="w-4 h-4 text-[#ff5f6d]" />
									{event.location}
								</div>
								<div className="flex items-center gap-2 pt-2 border-t border-neutral-200 text-neutral-700">
									<Users className="w-4 h-4 text-[#ff5f6d]" />
									{event.attendeeCount}/{event.capacity} registered
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
