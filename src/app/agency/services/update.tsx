"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Service } from "./create";

interface UpdateServiceFormProps {
	service: Service;
	onUpdateService: (service: Service) => void;
	onCancel: () => void;
}

export function UpdateServiceForm({ service, onUpdateService, onCancel }: UpdateServiceFormProps) {
	const [serviceName, setServiceName] = useState(service.serviceName);
	const [description, setDescription] = useState(service.description);
	const [category, setCategory] = useState(service.category);
	const [basePrice, setBasePrice] = useState(service.basePrice);
	const [deliveryTime, setDeliveryTime] = useState(service.deliveryTime);
	const [status, setStatus] = useState<"available" | "unavailable">(service.status);

	useEffect(() => {
		setServiceName(service.serviceName);
		setDescription(service.description);
		setCategory(service.category);
		setBasePrice(service.basePrice);
		setDeliveryTime(service.deliveryTime);
		setStatus(service.status);
	}, [service]);

	const handleSubmit = () => {
		const cleanName = serviceName.trim();
		if (!cleanName || !basePrice || !description.trim()) return;

		const updatedService: Service = {
			...service,
			serviceName: cleanName,
			description: description.trim(),
			category,
			basePrice,
			deliveryTime,
			status,
		};

		onUpdateService(updatedService);
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Update Service</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Edit service information and save changes.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="update-name" className="text-sm font-medium text-neutral-700">
						Service Name *
					</Label>
					<Input
						id="update-name"
						value={serviceName}
						onChange={(e) => setServiceName(e.target.value)}
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="update-description" className="text-sm font-medium text-neutral-700">
						Description *
					</Label>
					<textarea
						id="update-description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={3}
						className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
					/>
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<select
							id="update-category"
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
						<Label htmlFor="update-price" className="text-sm font-medium text-neutral-700">
							Base Price *
						</Label>
						<Input
							id="update-price"
							type="number"
							value={basePrice}
							onChange={(e) => setBasePrice(Number(e.target.value))}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-delivery" className="text-sm font-medium text-neutral-700">
							Delivery Time
						</Label>
						<Input
							id="update-delivery"
							value={deliveryTime}
							onChange={(e) => setDeliveryTime(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-status" className="text-sm font-medium text-neutral-700">
							Status
						</Label>
						<select
							id="update-status"
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
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
