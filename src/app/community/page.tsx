"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, BookOpen, Calendar, MessageSquare, Settings, TrendingUp, ArrowRight, Users2, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommunityDashboardPage() {
	const communityName = "Digital Innovators Community";
	const totalMembers = 2847;
	const activeMembers = 1250;
	const totalChapters = 8;
	const upcomingEvents = 12;
	const monthlyRevenue = 15420;

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-neutral-900">Community Dashboard</h1>
					<p className="text-neutral-600 mt-1">
						Welcome to <span className="font-semibold">{communityName}</span>
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-4 mb-8">
					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-sm font-medium text-neutral-600">Total Members</CardTitle>
								<Users className="w-4 h-4 text-neutral-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-neutral-900">{totalMembers.toLocaleString()}</div>
							<p className="text-xs text-green-600 mt-1 flex items-center gap-1">
								<TrendingUp className="w-3 h-3" />
								{activeMembers} active
							</p>
						</CardContent>
					</Card>

					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-sm font-medium text-neutral-600">Chapters</CardTitle>
								<BookOpen className="w-4 h-4 text-neutral-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-neutral-900">{totalChapters}</div>
							<p className="text-xs text-neutral-500 mt-1">Active regions</p>
						</CardContent>
					</Card>

					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-sm font-medium text-neutral-600">Upcoming Events</CardTitle>
								<Calendar className="w-4 h-4 text-neutral-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-neutral-900">{upcomingEvents}</div>
							<p className="text-xs text-neutral-500 mt-1">Next 3 months</p>
						</CardContent>
					</Card>

					<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-sm font-medium text-neutral-600">Monthly Engagement</CardTitle>
								<Zap className="w-4 h-4 text-neutral-400" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-neutral-900">${monthlyRevenue.toLocaleString()}</div>
							<p className="text-xs text-neutral-500 mt-1">Community value</p>
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
								<Link href="/community/members">
									<span>Manage Members</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
								<Link href="/community/events">
									<span>Upcoming Events</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
								<Link href="/community/chapters">
									<span>Manage Chapters</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
								<Link href="/community/messageBoard">
									<span>Message Board</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
							<Button asChild variant="outline" className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between">
								<Link href="/community/settings">
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
									<p className="text-neutral-900 font-medium">New member joined</p>
									<p className="text-neutral-600">Sarah Chen registered in Tech Chapter</p>
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
								<div>
									<p className="text-neutral-900 font-medium">Event announced</p>
									<p className="text-neutral-600">Q2 Leadership Summit scheduled for April 15</p>
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
								<div>
									<p className="text-neutral-900 font-medium">Discussion started</p>
									<p className="text-neutral-600">45 new posts on AI in Business</p>
								</div>
							</div>
							<div className="flex items-start gap-3 text-sm">
								<div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
								<div>
									<p className="text-neutral-900 font-medium">Chapter milestone</p>
									<p className="text-neutral-600">West Coast Chapter reached 500 members</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
