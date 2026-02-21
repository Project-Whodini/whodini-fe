"use client";

import { useState } from "react";
import { Plus, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateServiceForm, type Service } from "./create";
import { ShowService } from "./show";
import { UpdateServiceForm } from "./update";

const INITIAL_SERVICES: Service[] = [
	{
		id: "service_1",
		serviceName: "Logo & Branding Design",
		description: "Complete branding package including logo design, brand guidelines, and visual identity system.",
		category: "Branding",
		basePrice: 3500,
		deliveryTime: "3 weeks",
		status: "available",
		agencyLabel: "Demo Agency",
	},
	{
		id: "service_2",
		serviceName: "Website Design & Development",
		description: "Custom website design and full-stack development with responsive design and SEO optimization.",
		category: "Web Development",
		basePrice: 12000,
		deliveryTime: "8 weeks",
		status: "available",
		agencyLabel: "Demo Agency",
	},
	{
		id: "service_3",
		serviceName: "Digital Marketing Campaign",
		description: "Social media marketing, content creation, and paid advertising strategy and management.",
		category: "Digital Marketing",
		basePrice: 5000,
		deliveryTime: "Ongoing",
		status: "available",
		agencyLabel: "Demo Agency",
	},
	{
		id: "service_4",
		serviceName: "Content Writing & Strategy",
		description: "Blog posts, website copy, social media content, and content marketing strategy.",
		category: "Content",
		basePrice: 2500,
		deliveryTime: "2 weeks",
		status: "available",
		agencyLabel: "Demo Agency",
	},
	{
		id: "service_5",
		serviceName: "UX/UI Design",
		description: "User experience research, wireframing, prototyping, and interface design for web and mobile.",
		category: "Web Design",
		basePrice: 8000,
		deliveryTime: "6 weeks",
		status: "available",
		agencyLabel: "Demo Agency",
	},
	{
		id: "service_6",
		serviceName: "Business Consulting",
		description: "Strategic business consulting, market analysis, and growth planning for startups and enterprises.",
		category: "Consulting",
		basePrice: 6000,
		deliveryTime: "Ongoing",
		status: "available",
		agencyLabel: "Demo Agency",
	},
];

type ViewState = "list" | "create" | "show" | "update";

export default function AgencyServicesPage() {
	const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
	const [view, setView] = useState<ViewState>("list");
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const agencyName = "Demo Agency";

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

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-4xl mx-auto">
					<CreateServiceForm
						agencyName={agencyName}
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

	const categoryEmojis: Record<string, string> = {
		"Web Design": "🎨",
		"Web Development": "💻",
		"Branding": "🏷️",
		"Digital Marketing": "📱",
		"Content": "✍️",
		"Consulting": "💡",
		"Other": "📦",
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Services</h1>
						<p className="text-neutral-600 mt-1">
							Manage service offerings for <span className="font-semibold">{agencyName}</span>
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

				{services.length === 0 ? (
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardContent className="pt-12 pb-12 text-center">
							<div className="text-6xl mb-4">📦</div>
							<CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
								No Services Yet
							</CardTitle>
							<CardDescription className="text-neutral-600 mb-6">
								Add your first service offering to start accepting client projects.
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
					<div className="grid gap-4 md:grid-cols-2">
						{services.map((service) => (
							<Card
								key={service.id}
								onClick={() => handleViewService(service)}
								className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
							>
								<CardContent className="pt-6">
									<div className="flex items-start justify-between mb-3">
										<div className="flex items-start gap-3 flex-1">
											<div className="text-3xl">{categoryEmojis[service.category] || "📦"}</div>
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-neutral-900">{service.serviceName}</h3>
												<p className="text-sm text-neutral-600">{service.category}</p>
											</div>
										</div>
										<Badge className={service.status === "available" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
											{service.status}
										</Badge>
									</div>

									<p className="text-sm text-neutral-600 mb-4 line-clamp-2">{service.description}</p>

									<div className="flex items-center justify-between pt-4 border-t border-neutral-200">
										<div className="flex items-center gap-4 text-sm">
											<span className="flex items-center gap-1 font-semibold text-neutral-900">
												<DollarSign className="w-4 h-4 text-[#ff5f6d]" />
												${service.basePrice.toLocaleString()}
											</span>
											<span className="flex items-center gap-1 text-neutral-600">
												<Clock className="w-4 h-4" />
												{service.deliveryTime}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
