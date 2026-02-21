"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Service } from "./create";

type PricingType = "hourly" | "daily" | "flat";
type ServiceStatus = "available" | "booked" | "unavailable";

interface UpdateServiceFormProps {
	service: Service;
	onUpdateService: (service: Service) => void;
	onCancel: () => void;
}

export function UpdateServiceForm({ service, onUpdateService, onCancel }: UpdateServiceFormProps) {
	const [serviceName, setServiceName] = useState(service.serviceName);
	const [provider, setProvider] = useState(service.provider);
	const [contactPerson, setContactPerson] = useState(service.contactPerson);
	const [email, setEmail] = useState(service.email);
	const [phone, setPhone] = useState(service.phone);
	const [category, setCategory] = useState(service.category);
	const [description, setDescription] = useState(service.description);
	const [pricingInput, setPricingInput] = useState(service.pricing.toString());
	const [pricingType, setPricingType] = useState<PricingType>(service.pricingType);
	const [status, setStatus] = useState<ServiceStatus>(service.status);

	useEffect(() => {
		setServiceName(service.serviceName);
		setProvider(service.provider);
		setContactPerson(service.contactPerson);
		setEmail(service.email);
		setPhone(service.phone);
		setCategory(service.category);
		setDescription(service.description);
		setPricingInput(service.pricing.toString());
		setPricingType(service.pricingType);
		setStatus(service.status);
	}, [service]);

	const handleSubmit = () => {
		const cleanServiceName = serviceName.trim();
		if (!cleanServiceName || !provider.trim() || !email.trim()) return;

		const normalizedPricing = Math.max(0, Number(pricingInput || "0"));

		const updatedService: Service = {
			...service,
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
		};

		onUpdateService(updatedService);
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Update Service</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Edit service information and save changes.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-service-name" className="text-sm font-medium text-neutral-700">
							Service Name *
						</Label>
						<Input
							id="update-service-name"
							value={serviceName}
							onChange={(e) => setServiceName(e.target.value)}
							placeholder="e.g., Professional Sound System"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-provider" className="text-sm font-medium text-neutral-700">
							Provider/Company *
						</Label>
						<Input
							id="update-provider"
							value={provider}
							onChange={(e) => setProvider(e.target.value)}
							placeholder="Service provider name"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-contact-person" className="text-sm font-medium text-neutral-700">
							Contact Person
						</Label>
						<Input
							id="update-contact-person"
							value={contactPerson}
							onChange={(e) => setContactPerson(e.target.value)}
							placeholder="Primary contact name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<Input
							id="update-category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="e.g., Audio/Visual, Catering"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-email" className="text-sm font-medium text-neutral-700">
							Email Address *
						</Label>
						<Input
							id="update-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="provider@example.com"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-phone" className="text-sm font-medium text-neutral-700">
							Phone Number
						</Label>
						<Input
							id="update-phone"
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+1 (555) 000-0000"
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="update-description" className="text-sm font-medium text-neutral-700">
						Description
					</Label>
					<Input
						id="update-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Brief description of the service"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-pricing" className="text-sm font-medium text-neutral-700">
							Pricing (USD)
						</Label>
						<Input
							id="update-pricing"
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
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
