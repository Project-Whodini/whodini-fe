"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentType = "free" | "paid";

export type BusinessEvent = {
	id: string;
	title: string;
	description: string;
	startsAt: string;
	locationType: "in_person" | "virtual" | "hybrid";
	locationLabel: string;
	paymentType: PaymentType;
	price: number;
	organizerLabel: string;
};

interface CreateEventFormProps {
	brandName: string;
	onCreateEvent: (event: BusinessEvent) => void;
	onCancel: () => void;
}

export function CreateEventForm({ brandName, onCreateEvent, onCancel }: CreateEventFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [startsAt, setStartsAt] = useState(() => {
		const d = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
		d.setMinutes(0, 0, 0);
		return d.toISOString().slice(0, 16);
	});
	const [locationType, setLocationType] = useState<"in_person" | "virtual" | "hybrid">("in_person");
	const [locationLabel, setLocationLabel] = useState("");
	const [paymentType, setPaymentType] = useState<PaymentType>("free");
	const [priceInput, setPriceInput] = useState("0");

	const handleSubmit = () => {
		const cleanTitle = title.trim();
		if (!cleanTitle) return;

		const normalizedPrice = paymentType === "free" ? 0 : Math.max(0, Number(priceInput || "0"));

		const newEvent: BusinessEvent = {
			id: `evt_local_${Date.now()}`,
			title: cleanTitle,
			description: description.trim(),
			startsAt: new Date(startsAt).toISOString(),
			locationType,
			locationLabel: locationLabel.trim(),
			paymentType,
			price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
			organizerLabel: brandName,
		};

		onCreateEvent(newEvent);

		// Reset form
		setTitle("");
		setDescription("");
		setLocationLabel("");
		setPaymentType("free");
		setPriceInput("0");
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Create New Event</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Add a free or paid event for your brand.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="event-title" className="text-sm font-medium text-neutral-700">
							Title
						</Label>
						<Input
							id="event-title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter event title"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="event-when" className="text-sm font-medium text-neutral-700">
							When
						</Label>
						<Input
							id="event-when"
							type="datetime-local"
							value={startsAt}
							onChange={(e) => setStartsAt(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="event-description" className="text-sm font-medium text-neutral-700">
						Description
					</Label>
					<Input
						id="event-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Short description"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Location Type</Label>
					<div className="flex flex-wrap gap-2">
						{(["in_person", "virtual", "hybrid"] as const).map((type) => (
							<Button
								key={type}
								type="button"
								size="sm"
								variant={locationType === type ? "default" : "outline"}
								onClick={() => setLocationType(type)}
								className={
									locationType === type
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg"
								}
							>
								{type === "in_person" ? "In Person" : type === "virtual" ? "Virtual" : "Hybrid"}
							</Button>
						))}
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="event-location" className="text-sm font-medium text-neutral-700">
						Location Label (optional)
					</Label>
					<Input
						id="event-location"
						value={locationLabel}
						onChange={(e) => setLocationLabel(e.target.value)}
						placeholder="Venue, URL, or room"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Event Type</Label>
					<div className="flex flex-wrap gap-2">
						<Button
							type="button"
							size="sm"
							variant={paymentType === "free" ? "default" : "outline"}
							onClick={() => {
								setPaymentType("free");
								setPriceInput("0");
							}}
							className={
								paymentType === "free"
									? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg"
							}
						>
							Free
						</Button>
						<Button
							type="button"
							size="sm"
							variant={paymentType === "paid" ? "default" : "outline"}
							onClick={() => {
								setPaymentType("paid");
								if (priceInput === "0") setPriceInput("10");
							}}
							className={
								paymentType === "paid"
									? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg"
							}
						>
							Paid
						</Button>
					</div>
				</div>

				{paymentType === "paid" && (
					<div className="space-y-2">
						<Label htmlFor="event-price" className="text-sm font-medium text-neutral-700">
							Price (USD)
						</Label>
						<Input
							id="event-price"
							type="number"
							min="0"
							step="0.01"
							value={priceInput}
							onChange={(e) => setPriceInput(e.target.value)}
							placeholder="0.00"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				)}

				<div className="flex gap-2 pt-2">
					<Button
						onClick={onCancel}
						variant="outline"
						className="flex-1 text-sm border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={!title.trim()}
						className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Plus className="w-4 h-4 mr-2" />
						Create Event
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
