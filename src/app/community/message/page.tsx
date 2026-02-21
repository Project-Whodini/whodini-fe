"use client";

import { useState } from "react";
import { Plus, MessageCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type CommunityMessage = {
	id: string;
	sender: string;
	senderEmail: string;
	recipientName: string;
	subject: string;
	content: string;
	status: "sent" | "read" | "archived";
	sentDate: string;
	communityLabel: string;
};

type ViewState = "list" | "create";

const INITIAL_MESSAGES: CommunityMessage[] = [
	{
		id: "msg_1",
		sender: "Sarah Williams",
		senderEmail: "sarah@digitaldiversity.com",
		recipientName: "All Members",
		subject: "Welcome to our Community!",
		content: "We are excited to have you as part of the Digital Innovators Community. This is your space to connect, learn, and grow together.",
		status: "read",
		sentDate: "2024-03-15",
		communityLabel: "Digital Innovators",
	},
	{
		id: "msg_2",
		sender: "Michael Chen",
		senderEmail: "michael@digitaldiversity.com",
		recipientName: "Chapter Leaders",
		subject: "Q2 Planning Meeting Scheduled",
		content: "Please join us for our quarterly planning meeting. We'll discuss upcoming events and initiatives for the next three months.",
		status: "read",
		sentDate: "2024-03-14",
		communityLabel: "Digital Innovators",
	},
	{
		id: "msg_3",
		sender: "Emma Johnson",
		senderEmail: "emma@digitaldiversity.com",
		recipientName: "Tech Chapter Members",
		subject: "New Course Alert: AI & Machine Learning",
		content: "We've added a new comprehensive course on AI and Machine Learning. Register now to secure your spot!",
		status: "sent",
		sentDate: "2024-03-13",
		communityLabel: "Digital Innovators",
	},
	{
		id: "msg_4",
		sender: "David Park",
		senderEmail: "david@digitaldiversity.com",
		recipientName: "Business Growth Members",
		subject: "Mentorship Matches Available",
		content: "Great news! We have new mentors available. If you're interested in finding a mentor, please fill out the form on our website.",
		status: "read",
		sentDate: "2024-03-12",
		communityLabel: "Digital Innovators",
	},
];

const getStatusColor = (status: string) => {
	switch (status) {
		case "sent":
			return "bg-blue-100 text-blue-800";
		case "read":
			return "bg-green-100 text-green-800";
		case "archived":
			return "bg-neutral-100 text-neutral-800";
		default:
			return "bg-neutral-100 text-neutral-800";
	}
};

export default function MessagePage() {
	const [messages, setMessages] = useState<CommunityMessage[]>(INITIAL_MESSAGES);
	const [view, setView] = useState<ViewState>("list");
	const [formData, setFormData] = useState({
		sender: "",
		senderEmail: "",
		recipientName: "",
		subject: "",
		content: "",
	});

	const handleCreateMessage = () => {
		const confirmed = window.confirm(`Send message: "${formData.subject}"?`);
		if (!confirmed) return;

		const newMessage: CommunityMessage = {
			id: `msg_${Date.now()}`,
			sender: formData.sender,
			senderEmail: formData.senderEmail,
			recipientName: formData.recipientName,
			subject: formData.subject,
			content: formData.content,
			status: "sent",
			sentDate: new Date().toISOString().split("T")[0],
			communityLabel: "Digital Innovators",
		};

		setMessages((prev) => [newMessage, ...prev]);
		setFormData({ sender: "", senderEmail: "", recipientName: "", subject: "", content: "" });
		setView("list");
	};

	if (view === "create") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
				<div className="max-w-2xl mx-auto">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
						<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
							<CardTitle className="text-2xl font-bold text-neutral-900">Send Message</CardTitle>
						</CardHeader>
						<CardContent className="pt-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Your Name *</Label>
									<Input
										value={formData.sender}
										onChange={(e) => setFormData((prev) => ({ ...prev, sender: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Your name"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Your Email *</Label>
									<Input
										type="email"
										value={formData.senderEmail}
										onChange={(e) => setFormData((prev) => ({ ...prev, senderEmail: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
										placeholder="Your email"
									/>
								</div>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Recipient *</Label>
								<Input
									value={formData.recipientName}
									onChange={(e) => setFormData((prev) => ({ ...prev, recipientName: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="All Members, Chapter Leaders, etc."
								/>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Subject *</Label>
								<Input
									value={formData.subject}
									onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
									className="mt-1 border border-neutral-300 rounded-lg"
									placeholder="Message subject"
								/>
							</div>
							<div>
								<Label className="text-sm font-medium text-neutral-700">Message Content *</Label>
								<textarea
									value={formData.content}
									onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
									className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
									rows={4}
									placeholder="Your message"
								></textarea>
							</div>
							<div className="flex gap-2 pt-4">
								<Button
									onClick={handleCreateMessage}
									className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
								>
									Send Message
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
						<h1 className="text-3xl font-bold text-neutral-900">Messages</h1>
						<p className="text-neutral-600 mt-1">Community communications and announcements</p>
					</div>
					<Button
						onClick={() => setView("create")}
						className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md"
					>
						<Plus className="w-5 h-5 mr-2" />
						Send Message
					</Button>
				</div>

				<div className="space-y-3">
					{messages.map((message) => (
						<Card
							key={message.id}
							className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
						>
							<CardContent className="pt-6">
								<div className="flex items-start justify-between mb-3">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="text-lg font-semibold text-neutral-900">{message.subject}</h3>
											<Badge className={getStatusColor(message.status)}>
												{message.status}
											</Badge>
										</div>
										<p className="text-sm text-neutral-600 mb-2">
											From: <span className="font-medium">{message.sender}</span> - To:{" "}
											<span className="font-medium">{message.recipientName}</span>
										</p>
										<p className="text-sm text-neutral-700 mb-3 leading-relaxed">{message.content}</p>
										<div className="flex items-center gap-2 text-xs text-neutral-500">
											<Clock className="w-3 h-3" />
											{new Date(message.sentDate).toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric",
											})}
										</div>
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
