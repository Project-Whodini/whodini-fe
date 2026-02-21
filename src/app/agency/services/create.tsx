"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Service = {
	id: string;
	serviceName: string;
	description: string;
	category: string;
	basePrice: number;
	deliveryTime: string;
	status: "available" | "unavailable";
	agencyLabel: string;
};

interface CreateServiceFormProps {
	agencyName: string;
	onCreateService: (service: Service) => void;
	onCancel: () => void;
}

export function CreateServiceForm({ agencyName, onCreateService, onCancel }: CreateServiceFormProps) {
	const [serviceName, setServiceName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("Web Design");
	const [basePrice, setBasePrice] = useState<number | string>("");
	const [deliveryTime, setDeliveryTime] = useState("2 weeks");
	const [status, setStatus] = useState<"available" | "unavailable">("available");

	const handleSubmit = () => {
		const cleanName = serviceName.trim();
		if (!cleanName || !basePrice || !description.trim()) return;

		const newService: Service = {
			id: `service_${Date.now()}`,
			serviceName: cleanName,
			description: description.trim(),
			category,
			basePrice: Number(basePrice),
			deliveryTime,
			status,
			agencyLabel: agencyName,
		};

		onCreateService(newService);

		// Reset form
		setServiceName("");
		setDescription("");
		setCategory("Web Design");
		setBasePrice("");
		setDeliveryTime("2 weeks");
		setStatus("available");
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Add New Service</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Create a new service offering for your agency.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="service-name" className="text-sm font-medium text-neutral-700">
						Service Name *
					</Label>
					<Input
						id="service-name"
						value={serviceName}
						onChange={(e) => setServiceName(e.target.value)}
						placeholder="e.g., Logo Design, Web Development"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="service-description" className="text-sm font-medium text-neutral-700">
						Description *
					</Label>
					<textarea
						id="service-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
						placeholder="Describe the service..."
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<select
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
						>
							<option value="Web Design">Web Design</option>
							<option value="Web Development">Web Development</option>
							<option value="Branding">Branding</option>
							<option value="Digital Marketing">Digital Marketing</option>
							<option value="Content">Content</option>
							<option value="Consulting">Consulting</option>
							<option value="Other">Other</option>
						</select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="base-price" className="text-sm font-medium text-neutral-700">
							Base Price *
						</Label>
						<Input
							id="base-price"
							type="number"
							value={basePrice}
							onChange={(e) => setBasePrice(e.target.value)}
							placeholder="$5,000"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="delivery-time" className="text-sm font-medium text-neutral-700">
							Delivery Time
						</Label>
						<Input
							id="delivery-time"
							value={deliveryTime}
							onChange={(e) => setDeliveryTime(e.target.value)}
							placeholder="e.g., 2 weeks"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="status" className="text-sm font-medium text-neutral-700">
							Status
						</Label>
						<select
							id="status"
							value={status}
							onChange={(e) => setStatus(e.target.value as "available" | "unavailable")}
							className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
						>
							<option value="available">Available</option>
							<option value="unavailable">Unavailable</option>
						</select>
					</div>
				</div>

				<div className="flex gap-3 pt-4 border-t border-neutral-200">
					<Button onClick={onCancel} variant="outline" className="flex-1 border-neutral-300 hover:bg-neutral-50 rounded-lg">
						Cancel
					</Button>
					<Button onClick={handleSubmit} className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
						<Plus className="w-4 h-4 mr-2" />
						Add Service
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
