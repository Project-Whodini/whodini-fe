"use client";

import { useState } from "react";
import { Plus, Mail, Phone, Tag, DollarSign, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateServiceForm, type Service } from "./create";
import { ShowService } from "./show";
import { UpdateServiceForm } from "./update";

const INITIAL_SERVICES: Service[] = [
	{
		id: "service_1",
		serviceName: "Professional AV System",
		provider: "SoundWave Productions",
		contactPerson: "James Mitchell",
		email: "james@soundwave.pro",
		phone: "+1 (555) 111-2222",
		category: "Audio/Visual",
		description: "Complete sound system with lighting and projection equipment",
		pricing: 250,
		pricingType: "hourly",
		status: "available",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "service_2",
		serviceName: "Premium Catering Service",
		provider: "Elite Catering Co.",
		contactPerson: "Patricia Rodriguez",
		email: "patricia@elitecatering.com",
		phone: "+1 (555) 333-4444",
		category: "Catering",
		description: "Full-service catering with customizable menus",
		pricing: 45,
		pricingType: "hourly",
		status: "booked",
		eventIds: ["org_evt_1"],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "service_3",
		serviceName: "Event Security Team",
		provider: "Guardian Security Services",
		contactPerson: "Robert Johnson",
		email: "robert@guardiansec.com",
		phone: "+1 (555) 555-6666",
		category: "Security",
		description: "Professional security personnel and crowd management",
		pricing: 1500,
		pricingType: "daily",
		status: "available",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "service_4",
		serviceName: "Professional Photography",
		provider: "Lens & Light Studios",
		contactPerson: "Amanda Foster",
		email: "amanda@lenslight.studio",
		phone: "+1 (555) 777-8888",
		category: "Photography",
		description: "Event photography and videography services",
		pricing: 2500,
		pricingType: "flat",
		status: "booked",
		eventIds: ["org_evt_1", "org_evt_3"],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "service_5",
		serviceName: "Stage Setup & Design",
		provider: "StageWorks Pro",
		contactPerson: "Daniel Kim",
		email: "daniel@stageworks.pro",
		phone: "+1 (555) 999-0000",
		category: "Stage Setup",
		description: "Custom stage design, setup, and breakdown services",
		pricing: 3500,
		pricingType: "flat",
		status: "available",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
	},
	{
		id: "service_6",
		serviceName: "Valet Parking Management",
		provider: "ParkEase Services",
		contactPerson: "Monica Zhang",
		email: "monica@parkease.com",
		phone: "+1 (555) 222-3333",
		category: "Parking",
		description: "Professional valet parking and traffic coordination",
		pricing: 35,
		pricingType: "hourly",
		status: "unavailable",
		eventIds: [],
		organizerLabel: "Demo Organizer",
		createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
	},
];

function formatCurrency(amount: number) {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(amount);
}

export default function OrganizerServicesPage() {
	const organizerName = "Demo Organizer";
	const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
	const [view, setView] = useState<"list" | "create" | "show" | "update">("list");
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [filterStatus, setFilterStatus] = useState<"all" | "available" | "booked" | "unavailable">("all");

	const handleCreateService = (newService: Service) => {
		setServices((prev) => [newService, ...prev]);
		setView("list");
	};

	const handleViewService = (service: Service) => {
		setSelectedService(service);
		setView("show");
	};

	const handleEditService = (service: Service) => {
		setSelectedService(service);
		setView("update");
	};

	const handleUpdateService = (updatedService: Service) => {
		setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
		setView("list");
		setSelectedService(null);
	};

	const filteredServices = services.filter((s) => filterStatus === "all" || s.status === filterStatus);

	const statusCounts = {
		all: services.length,
		available: services.filter((s) => s.status === "available").length,
		booked: services.filter((s) => s.status === "booked").length,
		unavailable: services.filter((s) => s.status === "unavailable").length,
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateServiceForm
						organizerName={organizerName}
						onCreateService={handleCreateService}
						onCancel={() => setView("list")}
					/>
				</div>
			</div>
		);
	}

	if (view === "show" && selectedService) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<ShowService
					service={selectedService}
					onClose={() => {
						setView("list");
						setSelectedService(null);
					}}
					onEdit={handleEditService}
				/>
			</div>
		);
	}

	if (view === "update" && selectedService) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<UpdateServiceForm
						service={selectedService}
						onUpdateService={handleUpdateService}
						onCancel={() => {
							setView("list");
							setSelectedService(null);
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
						<h1 className="text-3xl font-bold text-neutral-900">Service Management</h1>
						<p className="text-neutral-600 mt-1">
							Manage service providers for <span className="font-semibold">{organizerName}</span> events
						</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Service
					</Button>
				</div>

				<div className="mb-6">
					<div className="flex flex-wrap gap-2">
						{(["all", "available", "booked", "unavailable"] as const).map((status) => (
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

				{filteredServices.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">🔧</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Services Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Add your first service provider to manage event logistics and bookings.
							</CardDescription>
							<Button
								onClick={() => setView("create")}
								className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
							>
								<Plus className="w-5 h-5 mr-2" />
								Add First Service
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{filteredServices.map((service) => {
							const getStatusColor = () => {
								if (service.status === "available") return "bg-green-100 text-green-800";
								if (service.status === "booked") return "bg-blue-100 text-blue-800";
								return "bg-red-100 text-red-800";
							};

							const getPricingLabel = () => {
								if (service.pricingType === "hourly") return "/hr";
								if (service.pricingType === "daily") return "/day";
								return "";
							};

							return (
								<Card
									key={service.id}
									onClick={() => handleViewService(service)}
									className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
								>
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between gap-2 mb-2">
											<CardTitle className="text-lg font-semibold text-neutral-900 line-clamp-1">
												{service.serviceName}
											</CardTitle>
											<Badge className={`capitalize shrink-0 ${getStatusColor()}`}>
												{service.status}
											</Badge>
										</div>
										<CardDescription className="line-clamp-2 text-neutral-600">
											{service.description || "No description provided"}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-0 space-y-3">
										<div className="flex items-center gap-2 text-sm text-neutral-700">
											<Building2 className="w-4 h-4 text-neutral-400" />
											<span className="line-clamp-1">{service.provider}</span>
										</div>

										<div className="flex items-center gap-2 text-sm text-neutral-700">
											<Mail className="w-4 h-4 text-neutral-400" />
											<span className="line-clamp-1">{service.email}</span>
										</div>

										{service.phone && (
											<div className="flex items-center gap-2 text-sm text-neutral-700">
												<Phone className="w-4 h-4 text-neutral-400" />
												<span className="line-clamp-1">{service.phone}</span>
											</div>
										)}

										<div className="flex items-center justify-between pt-2 border-t border-neutral-200">
											<div className="flex items-center gap-1 text-[#ff5f6d] font-semibold">
												<DollarSign className="w-4 h-4" />
												<span>
													{formatCurrency(service.pricing)}
													{getPricingLabel()}
												</span>
											</div>
											<Badge variant="outline" className="text-xs">
												{service.category}
											</Badge>
										</div>

										{service.eventIds.length > 0 && (
											<div className="flex items-center gap-2">
												<Badge variant="outline" className="text-xs">
													{service.eventIds.length} event{service.eventIds.length > 1 ? "s" : ""}
												</Badge>
											</div>
										)}
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
