"use client";

import { DollarSign, Clock, Briefcase, Tag, X, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "./create";

interface ShowServiceProps {
	service: Service;
	onClose: () => void;
	onEdit: (service: Service) => void;
}

export function ShowService({ service, onClose, onEdit }: ShowServiceProps) {
	return (
		<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
			<CardHeader className="border-b border-neutral-200">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4 flex-1">
						<div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white text-2xl">
							📦
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2 flex-wrap">
								<CardTitle className="text-2xl font-bold text-neutral-900">
									{service.serviceName}
								</CardTitle>
								<Badge className={service.status === "available" ? "bg-green-100 text-green-800 border-green-200" : "bg-neutral-100 text-neutral-800 border-neutral-200"}>
									{service.status}
								</Badge>
							</div>
							<p className="text-base text-neutral-600">{service.category}</p>
						</div>
					</div>
					<Button
						onClick={onClose}
						variant="ghost"
						size="sm"
						className="text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg"
					>
						<X className="w-5 h-5" />
					</Button>
				</div>
			</CardHeader>
			<CardContent className="pt-6 space-y-6">
				<div className="grid gap-4 md:grid-cols-3">
					<div className="flex items-start gap-3">
						<DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Base Price</div>
							<div className="text-base font-semibold text-neutral-900">${service.basePrice.toLocaleString()}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Delivery Time</div>
							<div className="text-base text-neutral-900">{service.deliveryTime}</div>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
						<div>
							<div className="text-sm font-medium text-neutral-700">Category</div>
							<div className="text-base text-neutral-900">{service.category}</div>
						</div>
					</div>
				</div>

				<div className="pt-4 border-t border-neutral-200">
					<h4 className="text-sm font-medium text-neutral-700 mb-2">Description</h4>
					<p className="text-base text-neutral-900 leading-relaxed">{service.description}</p>
				</div>

				<div className="pt-2 border-t border-neutral-200">
					<div className="text-xs text-neutral-500">Part of {service.agencyLabel}</div>
				</div>

				<div className="flex gap-2 pt-2">
					<Button
						onClick={() => onEdit(service)}
						variant="outline"
						className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Service
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
