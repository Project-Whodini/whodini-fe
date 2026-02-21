"use client";

import { useState } from "react";
import { Plus, Mail, Phone, Tag, Grid3x3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateVendorForm, type Vendor } from "./create";
import { ShowVendor } from "./show";
import { UpdateVendorForm } from "./update";

const INITIAL_VENDORS: Vendor[] = [
	{
		id: "vendor_1",
		businessName: "Gourmet Food Truck Co.",
		contactPerson: "Sarah Martinez",
		email: "sarah@gourmetfoodtruck.com",
		phone: "+1 (555) 234-5678",
		category: "Food & Beverage",
		description: "Premium street food with international flavors",
		boothSize: "10x20",
		status: "confirmed",
		eventIds: ["org_evt_1"],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "vendor_2",
		businessName: "TechGear Solutions",
		contactPerson: "Michael Chen",
		email: "michael@techgear.io",
		phone: "+1 (555) 876-5432",
		category: "Technology & Electronics",
		description: "Latest tech gadgets and accessories for professionals",
		boothSize: "10x10",
		status: "confirmed",
		eventIds: ["org_evt_1", "org_evt_3"],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "vendor_3",
		businessName: "Artisan Crafts Collective",
		contactPerson: "Emma Williams",
		email: "emma@artisancrafts.com",
		phone: "+1 (555) 345-6789",
		category: "Arts & Crafts",
		description: "Handmade jewelry, pottery, and textile arts",
		boothSize: "10x10",
		status: "pending",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "vendor_4",
		businessName: "Wellness & Yoga Studio",
		contactPerson: "David Thompson",
		email: "david@wellnessyoga.com",
		phone: "+1 (555) 987-6543",
		category: "Health & Wellness",
		description: "Yoga classes, meditation workshops, and wellness products",
		boothSize: "15x15",
		status: "confirmed",
		eventIds: ["org_evt_2"],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "vendor_5",
		businessName: "Urban Coffee Roasters",
		contactPerson: "Lisa Anderson",
		email: "lisa@urbancoffee.com",
		phone: "+1 (555) 456-7890",
		category: "Food & Beverage",
		description: "Small batch coffee roasting and specialty drinks",
		boothSize: "10x10",
		status: "cancelled",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
	},
];

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export default function OrganizerVendorsPage() {
	const organizerName = "Demo Organizer";
	const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
	const [view, setView] = useState<"list" | "create" | "show" | "update">("list");
	const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
	const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

	const handleCreateVendor = (newVendor: Vendor) => {
		setVendors((prev) => [newVendor, ...prev]);
		setView("list");
	};

	const handleViewVendor = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setView("show");
	};

	const handleEditVendor = (vendor: Vendor) => {
		setSelectedVendor(vendor);
		setView("update");
	};

	const handleUpdateVendor = (updatedVendor: Vendor) => {
		setVendors((prev) => prev.map((v) => (v.id === updatedVendor.id ? updatedVendor : v)));
		setView("list");
		setSelectedVendor(null);
	};

	const filteredVendors = vendors.filter((v) => filterStatus === "all" || v.status === filterStatus);

	const statusCounts = {
		all: vendors.length,
		confirmed: vendors.filter((v) => v.status === "confirmed").length,
		pending: vendors.filter((v) => v.status === "pending").length,
		cancelled: vendors.filter((v) => v.status === "cancelled").length,
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateVendorForm
						organizerName={organizerName}
						onCreateVendor={handleCreateVendor}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	if (view === "show" && selectedVendor) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<ShowVendor
					vendor={selectedVendor}
					onClose={() => {
						setView("list");
						setSelectedVendor(null);
					}}
					onEdit={handleEditVendor}
				/>
			</div>
		);
	}

	if (view === "update" && selectedVendor) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<UpdateVendorForm
						vendor={selectedVendor}
						onUpdateVendor={handleUpdateVendor}
						onCancel={() => {
							setView("list");
							setSelectedVendor(null);
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
						<h1 className="text-3xl font-bold text-neutral-900">Vendor Management</h1>
						<p className="text-neutral-600 mt-1">
							Manage vendors for <span className="font-semibold">{organizerName}</span> events
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Vendor
					</Button>
				</div>

				<div className="mb-6">
					<div className="flex flex-wrap gap-2">
						{(["all", "confirmed", "pending", "cancelled"] as const).map((status) => (
							<Button
								key={status}
								type="button"
								size="sm"
								variant={filterStatus === status ? "default" : "outline"}
								onClick={() => setFilterStatus(status)}
								className={
									filterStatus === status
										? "bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg capitalize"
										: "border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg capitalize"
								}
							>
								{status} ({statusCounts[status]})
							</Button>
						))}
					</div>
				</div>

				{filteredVendors.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">🏪</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Vendors Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Add your first vendor to start managing booth assignments and contracts.
							</CardDescription>
							<Button
								onClick={() => setView("create")}
								className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
							>
								<Plus className="w-5 h-5 mr-2" />
								Add First Vendor
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredVendors.map((vendor) => {
							const getStatusColor = () => {
								if (vendor.status === "confirmed") return "bg-green-100 text-green-800";
								if (vendor.status === "cancelled") return "bg-red-100 text-red-800";
								return "bg-amber-100 text-amber-800";
							};

							return (
								<Card
									key={vendor.id}
									onClick={() => handleViewVendor(vendor)}
									className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
								>
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between gap-2 mb-2">
											<CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-1">
												{vendor.businessName}
											</CardTitle>
											<Badge className={`capitalize shrink-0 ${getStatusColor()}`}>
												{vendor.status}
											</Badge>
										</div>
										<CardDescription className="line-clamp-2 text-neutral-600">
											{vendor.description || "No description provided"}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-0 space-y-3">
										{vendor.contactPerson && (
											<div className="flex items-center gap-2 text-sm text-neutral-700">
												<Tag className="w-4 h-4 text-neutral-400" />
												<span className="line-clamp-1">{vendor.contactPerson}</span>
											</div>
										)}

										<div className="flex items-center gap-2 text-sm text-neutral-700">
											<Mail className="w-4 h-4 text-neutral-400" />
											<span className="line-clamp-1">{vendor.email}</span>
										</div>

										{vendor.phone && (
											<div className="flex items-center gap-2 text-sm text-neutral-700">
												<Phone className="w-4 h-4 text-neutral-400" />
												<span className="line-clamp-1">{vendor.phone}</span>
											</div>
										)}

										<div className="flex items-center gap-2 flex-wrap pt-1">
											<Badge variant="outline" className="text-xs">
												{vendor.category}
											</Badge>
											<Badge variant="outline" className="text-xs">
												<Grid3x3 className="w-3 h-3 mr-1" />
												{vendor.boothSize}
											</Badge>
											{vendor.eventIds.length > 0 && (
												<Badge variant="outline" className="text-xs">
													{vendor.eventIds.length} events
												</Badge>
											)}
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
