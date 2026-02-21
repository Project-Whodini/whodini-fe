"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Vendor } from "./create";

interface UpdateVendorFormProps {
	vendor: Vendor;
	onUpdateVendor: (vendor: Vendor) => void;
	onCancel: () => void;
}

export function UpdateVendorForm({ vendor, onUpdateVendor, onCancel }: UpdateVendorFormProps) {
	const [businessName, setBusinessName] = useState(vendor.businessName);
	const [contactPerson, setContactPerson] = useState(vendor.contactPerson);
	const [email, setEmail] = useState(vendor.email);
	const [phone, setPhone] = useState(vendor.phone);
	const [category, setCategory] = useState(vendor.category);
	const [description, setDescription] = useState(vendor.description);
	const [boothSize, setBoothSize] = useState(vendor.boothSize);
	const [status, setStatus] = useState<"pending" | "confirmed" | "cancelled">(vendor.status);

	useEffect(() => {
		setBusinessName(vendor.businessName);
		setContactPerson(vendor.contactPerson);
		setEmail(vendor.email);
		setPhone(vendor.phone);
		setCategory(vendor.category);
		setDescription(vendor.description);
		setBoothSize(vendor.boothSize);
		setStatus(vendor.status);
	}, [vendor]);

	const handleSubmit = () => {
		const cleanBusinessName = businessName.trim();
		if (!cleanBusinessName || !email.trim()) return;

		const updatedVendor: Vendor = {
			...vendor,
			businessName: cleanBusinessName,
			contactPerson: contactPerson.trim(),
			email: email.trim(),
			phone: phone.trim(),
			category: category.trim(),
			description: description.trim(),
			boothSize: boothSize.trim(),
			status,
		};

		onUpdateVendor(updatedVendor);
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Update Vendor</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Edit vendor information and save changes.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-business-name" className="text-sm font-medium text-neutral-700">
							Business Name *
						</Label>
						<Input
							id="update-business-name"
							value={businessName}
							onChange={(e) => setBusinessName(e.target.value)}
							placeholder="Enter business name"
							className="rounded-lg border-neutral-300"
						/>
					</div>

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
							placeholder="vendor@example.com"
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

				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-category" className="text-sm font-medium text-neutral-700">
							Category
						</Label>
						<Input
							id="update-category"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							placeholder="e.g., Food & Beverage, Merchandise"
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-booth-size" className="text-sm font-medium text-neutral-700">
							Booth Size
						</Label>
						<Input
							id="update-booth-size"
							value={boothSize}
							onChange={(e) => setBoothSize(e.target.value)}
							placeholder="e.g., 10x10, 10x20"
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
						<Save className="w-4 h-4 mr-2" />
						Save Changes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
