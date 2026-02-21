"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Briefcase, DollarSign, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Client = {
	id: string;
	name: string;
	industry: string;
	status: "active" | "inactive";
	monthlyRetainer: number;
	projectsCount: number;
};

type Project = {
	id: string;
	clientName: string;
	projectName: string;
	status: "in_progress" | "completed" | "on_hold";
	budget: number;
	deadline: string;
};

const SAMPLE_CLIENTS: Client[] = [
	{ id: "1", name: "Tech Startup Inc", industry: "Technology", status: "active", monthlyRetainer: 5000, projectsCount: 3 },
	{ id: "2", name: "E-Commerce Plus", industry: "Retail", status: "active", monthlyRetainer: 8000, projectsCount: 5 },
	{ id: "3", name: "Health Solutions", industry: "Healthcare", status: "active", monthlyRetainer: 6500, projectsCount: 2 },
];

const SAMPLE_PROJECTS: Project[] = [
	{ id: "1", clientName: "Tech Startup Inc", projectName: "Brand Identity Redesign", status: "in_progress", budget: 15000, deadline: "2026-03-15" },
	{ id: "2", clientName: "E-Commerce Plus", projectName: "Holiday Campaign", status: "in_progress", budget: 25000, deadline: "2026-03-01" },
	{ id: "3", clientName: "Health Solutions", projectName: "Patient Portal UI/UX", status: "completed", budget: 18000, deadline: "2026-02-15" },
];

export default function AgencyDashboardPage() {
	const [activeTab, setActiveTab] = useState<"overview" | "clients" | "projects">("overview");
	const agencyName = "Demo Agency";

	const totalClients = SAMPLE_CLIENTS.length;
	const activeClients = SAMPLE_CLIENTS.filter(c => c.status === "active").length;
	const totalRevenue = SAMPLE_CLIENTS.reduce((sum, c) => sum + c.monthlyRetainer, 0);
	const activeProjects = SAMPLE_PROJECTS.filter(p => p.status === "in_progress").length;

	const getStatusColor = (status: string) => {
		if (status === "active" || status === "in_progress") return "bg-green-100 text-green-800 border-green-200";
		if (status === "completed") return "bg-blue-100 text-blue-800 border-blue-200";
		if (status === "on_hold") return "bg-amber-100 text-amber-800 border-amber-200";
		return "bg-neutral-100 text-neutral-800 border-neutral-200";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-neutral-900">Agency Dashboard</h1>
					<p className="text-neutral-600 mt-1">
						Welcome to <span className="font-semibold">{agencyName}</span>
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
					<TabsList className="grid w-full grid-cols-3 mb-6 bg-white border border-neutral-200 rounded-lg p-1">
						<TabsTrigger
							value="overview"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							Overview
						</TabsTrigger>
						<TabsTrigger
							value="clients"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							Clients
						</TabsTrigger>
						<TabsTrigger
							value="projects"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							Projects
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview">
						<div className="grid gap-6 md:grid-cols-4 mb-8">
							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-medium text-neutral-600">Total Clients</CardTitle>
										<Users className="w-4 h-4 text-neutral-400" />
									</div>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-neutral-900">{totalClients}</div>
									<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
										<TrendingUp className="w-3 h-3" />
										{activeClients} active
									</p>
								</CardContent>
							</Card>

							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-medium text-neutral-600">Active Projects</CardTitle>
										<Briefcase className="w-4 h-4 text-neutral-400" />
									</div>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-neutral-900">{activeProjects}</div>
									<p className="text-xs text-neutral-500 mt-1">In progress</p>
								</CardContent>
							</Card>

							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-medium text-neutral-600">Monthly Revenue</CardTitle>
										<DollarSign className="w-4 h-4 text-neutral-400" />
									</div>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-neutral-900">${totalRevenue.toLocaleString()}</div>
									<p className="text-xs text-neutral-500 mt-1">Recurring</p>
								</CardContent>
							</Card>

							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="text-sm font-medium text-neutral-600">Avg Project Value</CardTitle>
										<TrendingUp className="w-4 h-4 text-neutral-400" />
									</div>
								</CardHeader>
								<CardContent>
									<div className="text-3xl font-bold text-neutral-900">
										${Math.round(SAMPLE_PROJECTS.reduce((sum, p) => sum + p.budget, 0) / SAMPLE_PROJECTS.length).toLocaleString()}
									</div>
									<p className="text-xs text-neutral-500 mt-1">Per project</p>
								</CardContent>
							</Card>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader>
									<div className="flex items-center justify-between">
										<CardTitle className="text-lg font-semibold text-neutral-900">Quick Actions</CardTitle>
									</div>
								</CardHeader>
								<CardContent className="space-y-3">
									<Button asChild className="w-full bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg justify-between">
										<Link href="/agency/clients">
											<span>Manage Clients</span>
											<ArrowRight className="w-4 h-4" />
										</Link>
									</Button>
									<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
										<Link href="/agency/services">
											<span>View Services</span>
											<ArrowRight className="w-4 h-4" />
										</Link>
									</Button>
									<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
										<Link href="/agency/team">
											<span>Team Management</span>
											<ArrowRight className="w-4 h-4" />
										</Link>
									</Button>
									<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
										<Link href="/agency/settings">
											<span>Settings</span>
											<ArrowRight className="w-4 h-4" />
										</Link>
									</Button>
								</CardContent>
							</Card>

							<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
								<CardHeader>
									<CardTitle className="text-lg font-semibold text-neutral-900">Recent Activity</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-start gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-[#ff5f6d] mt-2"></div>
										<div>
											<p className="text-neutral-900 font-medium">New client onboarded</p>
											<p className="text-neutral-600">E-Commerce Plus joined 2 days ago</p>
										</div>
									</div>
									<div className="flex items-start gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
										<div>
											<p className="text-neutral-900 font-medium">Project completed</p>
											<p className="text-neutral-600">Patient Portal UI/UX delivered</p>
										</div>
									</div>
									<div className="flex items-start gap-3 text-sm">
										<div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
										<div>
											<p className="text-neutral-900 font-medium">Invoice sent</p>
											<p className="text-neutral-600">Tech Startup Inc - $5,000</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="clients">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl font-bold text-neutral-900">Client Overview</CardTitle>
										<CardDescription className="text-neutral-600 mt-1">
											Manage your client relationships
										</CardDescription>
									</div>
									<Button asChild className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg">
										<Link href="/agency/clients">View All Clients</Link>
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{SAMPLE_CLIENTS.map((client) => (
										<div
											key={client.id}
											className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
										>
											<div className="flex items-center gap-4">
												<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-semibold">
													{client.name.slice(0, 2).toUpperCase()}
												</div>
												<div>
													<div className="font-semibold text-neutral-900">{client.name}</div>
													<div className="text-sm text-neutral-600">{client.industry} • {client.projectsCount} projects</div>
												</div>
											</div>
											<div className="flex items-center gap-4">
												<div className="text-right">
													<div className="font-semibold text-neutral-900">${client.monthlyRetainer.toLocaleString()}/mo</div>
													<Badge className={getStatusColor(client.status)}>{client.status}</Badge>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="projects">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl font-bold text-neutral-900">Active Projects</CardTitle>
										<CardDescription className="text-neutral-600 mt-1">
											Track project progress and deadlines
										</CardDescription>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{SAMPLE_PROJECTS.map((project) => (
										<div
											key={project.id}
											className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
										>
											<div className="flex items-start justify-between mb-2">
												<div>
													<div className="font-semibold text-neutral-900">{project.projectName}</div>
													<div className="text-sm text-neutral-600">{project.clientName}</div>
												</div>
												<Badge className={getStatusColor(project.status)}>
													{project.status.replace("_", " ")}
												</Badge>
											</div>
											<div className="flex items-center gap-4 text-sm text-neutral-600">
												<span className="flex items-center gap-1">
													<DollarSign className="w-4 h-4" />
													${project.budget.toLocaleString()}
												</span>
												<span className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													Due: {new Date(project.deadline).toLocaleDateString()}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
