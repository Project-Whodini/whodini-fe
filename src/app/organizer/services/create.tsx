"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PricingType = "hourly" | "daily" | "flat";
type ServiceStatus = "available" | "booked" | "unavailable";

export type Service = {
	id: string;
	serviceName: string;
	provider: string;
	contactPerson: string;
	email: string;
	phone: string;
	category: string;
	description: string;
	pricing: number;
	pricingType: PricingType;
	status: ServiceStatus;
	eventIds: string[];
	organizerLabel: string;
	createdAt: string;
};

interface CreateServiceFormProps {
	organizerName: string;
	onCreateService: (service: Service) => void;
	onCancel: () => void;
}

export function CreateServiceForm({ organizerName, onCreateService, onCancel }: CreateServiceFormProps) {
	const [serviceName, setServiceName] = useState("");
	const [provider, setProvider] = useState("");
	const [contactPerson, setContactPerson] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [category, setCategory] = useState("Audio/Visual");
	const [description, setDescription] = useState("");
	const [pricingInput, setPricingInput] = useState("0");
	const [pricingType, setPricingType] = useState<PricingType>("hourly");
	const [status, setStatus] = useState<ServiceStatus>("available");

	const handleSubmit = () => {
		const cleanServiceName = serviceName.trim();
		if (!cleanServiceName || !provider.trim() || !email.trim()) return;

		const normalizedPricing = Math.max(0, Number(pricingInput || "0"));

		const newService: Service = {
			id: `service_${Date.now()}`,
			serviceName: cleanServiceName,
			provider: provider.trim(),
			contactPerson: contactPerson.trim(),
			email: email.trim(),
			phone: phone.trim(),
			category: category.trim(),
			description: description.trim(),
			pricing: Number.isFinite(normalizedPricing) ? normalizedPricing : 0,
			pricingType,
			status,
			eventIds: [],
			organizerLabel: organizerName,
			createdAt: new Date().toISOString(),
		};

		onCreateService(newService);

		// Reset form
		setServiceName("");
		setProvider("");
		setContactPerson("");
		setEmail("");
		setPhone("");
		setCategory("Audio/Visual");
		setDescription("");
		setPricingInput("0");
		setPricingType("hourly");
		setStatus("available");
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Add New Service</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Register a service provider for your events and manage bookings.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="service-name" className="text-sm font-medium text-neutral-700">
							Service Name *
						</Label>
						<Input
							id="service-name"
							value={serviceName}
							onChange={(e) => setServiceName(e.target.value)}
							placeholder="e.g., Professional Sound System"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="provider" className="text-sm font-medium text-neutral-700">
							Provider/Company *
						</Label>
						<Input
							id="provider"
							value={provider}
							onChange={(e) => setProvider(e.target.value)}
							placeholder="Service provider name"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="contact-person" className="text-sm font-medium text-neutral-700">
							Contact Person
						</Label>
						<Input
							id="contact-person"
							value={contactPerson}
							onChange={(e) => setContactPerson(e.target.value)}
							placeholder="Primary contact name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<Input
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="e.g., Audio/Visual, Catering"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium text-neutral-700">
							Email Address *
						</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="provider@example.com"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
							Phone Number
						</Label>
						<Input
							id="phone"
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+1 (555) 000-0000"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description" className="text-sm font-medium text-neutral-700">
						Description
					</Label>
					<Input
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Brief description of the service"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="pricing" className="text-sm font-medium text-neutral-700">
							Pricing (USD)
						</Label>
						<Input
							id="pricing"
							type="number"
							min="0"
							step="0.01"
							value={pricingInput}
							onChange={(e) => setPricingInput(e.target.value)}
							placeholder="0.00"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-medium text-neutral-700">Pricing Type</Label>
						<div className="flex flex-wrap gap-2">
							{(["hourly", "daily", "flat"] as const).map((type) => (
								<Button
									key={type}
									type="button"
									size="sm"
									variant={pricingType === type ? "default" : "outline"}
									onClick={() => setPricingType(type)}
									className={
										pricingType === type
											? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
											: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
									}
								>
									{type}
								</Button>
							))}
						</div>
					</div>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Status</Label>
					<div className="flex flex-wrap gap-2">
						{(["available", "booked", "unavailable"] as const).map((s) => (
							<Button
								key={s}
								type="button"
								size="sm"
								variant={status === s ? "default" : "outline"}
								onClick={() => setStatus(s)}
								className={
									status === s
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
								}
							>
								{s}
							</Button>
						))}
					</div>
				</div>

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
						disabled={!serviceName.trim() || !provider.trim() || !email.trim()}
						className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Plus className="w-4 h-4 mr-2" />
						Add Service
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
