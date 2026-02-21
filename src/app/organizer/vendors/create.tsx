"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type Vendor = {
	id: string;
	businessName: string;
	contactPerson: string;
	email: string;
	phone: string;
	category: string;
	description: string;
	boothSize: string;
	status: "pending" | "confirmed" | "cancelled";
	eventIds: string[];
	organizerLabel: string;
	createdAt: string;
};

interface CreateVendorFormProps {
	organizerName: string;
	onCreateVendor: (vendor: Vendor) => void;
	onCancel: () => void;
}

export function CreateVendorForm({ organizerName, onCreateVendor, onCancel }: CreateVendorFormProps) {
	const [businessName, setBusinessName] = useState("");
	const [contactPerson, setContactPerson] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [category, setCategory] = useState("Food & Beverage");
	const [description, setDescription] = useState("");
	const [boothSize, setBoothSize] = useState("10x10");
	const [status, setStatus] = useState<"pending" | "confirmed" | "cancelled">("pending");

	const handleSubmit = () => {
		const cleanBusinessName = businessName.trim();
		if (!cleanBusinessName || !email.trim()) return;

		const newVendor: Vendor = {
			id: `vendor_${Date.now()}`,
			businessName: cleanBusinessName,
			contactPerson: contactPerson.trim(),
			email: email.trim(),
			phone: phone.trim(),
			category: category.trim(),
			description: description.trim(),
			boothSize: boothSize.trim(),
			status,
			eventIds: [],
			organizerLabel: organizerName,
			createdAt: new Date().toISOString(),
		};

		onCreateVendor(newVendor);

		// Reset form
		setBusinessName("");
		setContactPerson("");
		setEmail("");
		setPhone("");
		setCategory("Food & Beverage");
		setDescription("");
		setBoothSize("10x10");
		setStatus("pending");
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Add New Vendor</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Register a vendor for your events and manage booth assignments.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="business-name" className="text-sm font-medium text-neutral-700">
							Business Name *
						</Label>
						<Input
							id="business-name"
							value={businessName}
							onChange={(e) => setBusinessName(e.target.value)}
							placeholder="Enter business name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

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
							placeholder="vendor@example.com"
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

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<Input
							id="category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="e.g., Food & Beverage, Merchandise"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="booth-size" className="text-sm font-medium text-neutral-700">
							Booth Size
						</Label>
						<Input
							id="booth-size"
							value={boothSize}
							onChange={(e) => setBoothSize(e.target.value)}
							placeholder="e.g., 10x10, 10x20"
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
						placeholder="Brief description of products/services"
						className="rounded-lg border-neutral-300"
					/>
				</div>

				<div className="space-y-2">
					<Label className="text-sm font-medium text-neutral-700">Status</Label>
					<div className="flex flex-wrap gap-2">
						{(["pending", "confirmed", "cancelled"] as const).map((s) => (
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
						disabled={!businessName.trim() || !email.trim()}
						className="flex-1 text-sm bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
					>
						<Plus className="w-4 h-4 mr-2" />
						Add Vendor
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
