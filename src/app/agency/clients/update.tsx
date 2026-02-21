"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Client } from "./create";

interface UpdateClientFormProps {
	client: Client;
	onUpdateClient: (client: Client) => void;
	onCancel: () => void;
}

export function UpdateClientForm({ client, onUpdateClient, onCancel }: UpdateClientFormProps) {
	const [name, setName] = useState(client.name);
	const [email, setEmail] = useState(client.email);
	const [phone, setPhone] = useState(client.phone);
	const [industry, setIndustry] = useState(client.industry);
	const [website, setWebsite] = useState(client.website || "");
	const [monthlyRetainer, setMonthlyRetainer] = useState(client.monthlyRetainer);
	const [status, setStatus] = useState<"active" | "inactive">(client.status);
	const [notes, setNotes] = useState(client.notes || "");

	useEffect(() => {
		setName(client.name);
		setEmail(client.email);
		setPhone(client.phone);
		setIndustry(client.industry);
		setWebsite(client.website || "");
		setMonthlyRetainer(client.monthlyRetainer);
		setStatus(client.status);
		setNotes(client.notes || "");
	}, [client]);

	const handleSubmit = () => {
		const cleanName = name.trim();
		if (!cleanName || !email.trim() || !monthlyRetainer) return;

		const updatedClient: Client = {
			...client,
			name: cleanName,
			email: email.trim(),
			phone: phone.trim(),
			industry: industry.trim(),
			website: website.trim() || undefined,
			monthlyRetainer,
			status,
			notes: notes.trim() || undefined,
		};

		onUpdateClient(updatedClient);
	};

	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-neutral-900">Update Client</CardTitle>
				<CardDescription className="text-sm text-neutral-600">
					Edit client information and save changes.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label htmlFor="update-name" className="text-sm font-medium text-neutral-700">
							Client Name *
						</Label>
						<Input
							id="update-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-email" className="text-sm font-medium text-neutral-700">
							Email Address *
						</Label>
						<Input
							id="update-email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-phone" className="text-sm font-medium text-neutral-700">
							Phone Number
						</Label>
						<Input
							id="update-phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-industry" className="text-sm font-medium text-neutral-700">
							Industry
						</Label>
						<select
							id="update-industry"
							value={industry}
							onChange={(e) => setIndustry(e.target.value)}
							className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
						>
							<option value="Technology">Technology</option>
							<option value="Retail">Retail</option>
							<option value="Healthcare">Healthcare</option>
							<option value="Finance">Finance</option>
							<option value="Education">Education</option>
							<option value="Hospitality">Hospitality</option>
							<option value="Manufacturing">Manufacturing</option>
							<option value="Other">Other</option>
						</select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-website" className="text-sm font-medium text-neutral-700">
							Website
						</Label>
						<Input
							id="update-website"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
							className="rounded-lg border-neutral-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="update-retainer" className="text-sm font-medium text-neutral-700">
							Monthly Retainer *
						</Label>
						<Input
							id="update-retainer"
							type="number"
							value={monthlyRetainer}
							onChange={(e) => setMonthlyRetainer(Number(e.target.value))}
							className="rounded-lg border-neutral-300"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="update-status" className="text-sm font-medium text-neutral-700">
						Status
					</Label>
					<select
						id="update-status"
						value={status}
						onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
						className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
					>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="update-notes" className="text-sm font-medium text-neutral-700">
						Notes
					</Label>
					<textarea
						id="update-notes"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						rows={3}
						className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
					/>
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
