"use client";

import { useState } from "react";
import { Plus, Briefcase, DollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CommunityService = {
	id: string;
	serviceName: string;
	description: string;
	category: string;
	provider: string;
	pricing: string;
	availability: string;
	status: "available" | "coming_soon" | "discontinued";
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_SERVICES: CommunityService[] = [
	{
		id: "svc_1",
		serviceName: "Professional Development Workshops",
		description: "Monthly workshops on leadership, innovation, and business skills",
		category: "Training",
		provider: "Community Team",
		pricing: "Free for members",
		availability: "Monthly",
		status: "available",
		communityLabel: "Digital Innovators",
	},
	{
		id: "svc_2",
		serviceName: "Mentorship Program",
		description: "One-on-one mentorship with experienced community leaders",
		category: "Mentoring",
		provider: "Leadership Excellence Chapter",
		pricing: "Free for members",
		availability: "Year-round",
		status: "available",
		communityLabel: "Digital Innovators",
	},
	{
		id: "svc_3",
		serviceName: "Startup Pitch Events",
		description: "Platform for startups to pitch ideas to investors",
		category: "Business",
		provider: "Tech Startup Chapter",
		pricing: "Free for pitchers",
		availability: "Quarterly",
		status: "available",
		communityLabel: "Digital Innovators",
	},
	{
		id: "svc_4",
		serviceName: "Design Critique Sessions",
		description: "Collaborative feedback on design projects",
		category: "Design",
		provider: "Creative Design Chapter",
		pricing: "Free for members",
		availability: "Bi-weekly",
		status: "available",
		communityLabel: "Digital Innovators",
	},
	{
		id: "svc_5",
		serviceName: "Job Board & Career Services",
		description: "Access to exclusive job listings and career resources",
		category: "Career",
		provider: "Community Team",
		pricing: "Free for members",
		availability: "Ongoing",
		status: "available",
		communityLabel: "Digital Innovators",
	},
];

const getCategoryColor = (category: string) => {
	switch (category) {
		case "Training":
			return "bg-blue-100 text-blue-800";
		case "Mentoring":
			return "bg-green-100 text-green-800";
		case "Business":
			return "bg-amber-100 text-amber-800";
		case "Design":
			return "bg-purple-100 text-purple-800";
		case "Career":
			return "bg-pink-100 text-pink-800";
		default:
			return "bg-neutral-100 text-neutral-800";
	}
};

export default function CommunityServicesPage() {
	const [services, setServices] = useState<CommunityService[]>(INITIAL_SERVICES);
	const [view, setView] = useState<ViewState>("list");
	const [formData, setFormData] = useState({
		serviceName: "",
		description: "",
		category: "Training",
		provider: "",
		pricing: "",
		availability: "",
	});

	const handleCreateService = () => {
		const confirmed = window.confirm(`Add new service: "${formData.serviceName}"?`);
		if (!confirmed) return;

		const newService: CommunityService = {
			id: `svc_${Date.now()}`,
			serviceName: formData.serviceName,
			description: formData.description,
			category: formData.category,
			provider: formData.provider,
			pricing: formData.pricing,
			availability: formData.availability,
			status: "available",
			communityLabel: "Digital Innovators",
		};

		setServices((prev) => [newService, ...prev]);
		setFormData({ serviceName: "", description: "", category: "Training", provider: "", pricing: "", availability: "" });
		setView("list");
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Add New Service</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div>
								<Label className="text-sm font-medium text-neutral-700">Service Name *</Label>
								<Input
									value={formData.serviceName}
									onChange={(e) => setFormData((prev) => ({ ...prev, serviceName: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Service name"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Category *</Label>
									<select
										value={formData.category}
										onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									>
										<option value="Training">Training</option>
										<option value="Mentoring">Mentoring</option>
										<option value="Business">Business</option>
										<option value="Design">Design</option>
										<option value="Career">Career</option>
									</select>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Provider *</Label>
									<Input
										value={formData.provider}
										onChange={(e) => setFormData((prev) => ({ ...prev, provider: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Service provider"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Pricing *</Label>
									<Input
										value={formData.pricing}
										onChange={(e) => setFormData((prev) => ({ ...prev, pricing: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Pricing info"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Availability *</Label>
									<Input
										value={formData.availability}
										onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Availability"
									/>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Description *</Label>
								<textarea
									value={formData.description}
									onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={3}
									placeholder="Service description"
								></textarea>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateService}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Add Service
								</Button>
								<Button
									onClick={() => setView("list")}
									variant="outline"
									className="flex-1 border border-neutral-300 rounded-lg"
								>
									Cancel
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold text-neutral-900">Community Services</h1>
						<p className="text-neutral-600 mt-1">Available services and resources</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Add Service
					</Button>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service) => (
						<Card
							key={service.id}
							className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
						>
							<CardContent className="pt-6">
								<div className="flex items-start gap-3 mb-3">
									<div className="p-2 bg-[#ff5f6d]/10 rounded-lg">
										<Briefcase className="w-5 h-5 text-[#ff5f6d]" />
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-neutral-900">{service.serviceName}</h3>
										<Badge className={getCategoryColor(service.category) + " mt-1"}>
											{service.category}
										</Badge>
									</div>
								</div>
								<p className="text-sm text-neutral-600 mb-4">{service.description}</p>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-neutral-600">Provider:</span>
										<span className="font-medium text-neutral-900">{service.provider}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-neutral-600">Pricing:</span>
										<span className="font-medium text-[#ff5f6d]">{service.pricing}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-neutral-600">Availability:</span>
										<span className="font-medium text-neutral-900">{service.availability}</span>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
