"use client";

import { useState } from "react";
import { Save, Copy, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AgencySettingsPage() {
	const [activeTab, setActiveTab] = useState("general");
	const [agencySettings, setAgencySettings] = useState({
		organizationName: "Demo Agency",
		email: "contact@demoagency.com",
		phone: "+1 (555) 123-4567",
		website: "www.demoagency.com",
		address: "123 Creative Street",
		city: "San Francisco",
		state: "CA",
		zipCode: "94105",
		country: "United States",
		description: "A full-service digital agency specializing in web design and development.",
		timezone: "America/Los_Angeles",
		currency: "USD",
		language: "English",
	});

	const [teamSeats, setTeamSeats] = useState({
		current: 6,
		limit: 10,
		price: 499,
	});

	const [apiSettings, setApiSettings] = useState({
		apiKey: "sk_live_51M2j3H47d8q2k0lxK9v2w3e4r5t6y7u8i9o0p1a2s3d4f5g6",
		webhookUrl: "https://demoagency.com/webhooks/stripe",
		rateLimit: 1000,
		monthlyApiCalls: 45230,
	});

	const [showApiKey, setShowApiKey] = useState(false);
	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		projectAlerts: true,
		paymentAlerts: true,
		weeklyReports: false,
		marketingEmails: false,
	});

	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	const handleCopyApiKey = () => {
		navigator.clipboard.writeText(apiSettings.apiKey);
		setShowSuccessAlert(true);
		setTimeout(() => setShowSuccessAlert(false), 2000);
	};

	const handleSaveSettings = (section: string) => {
		const message = `Save changes to ${section} settings?`;
		if (window.confirm(message)) {
			setShowSuccessAlert(true);
			setTimeout(() => setShowSuccessAlert(false), 2000);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-neutral-900">Agency Settings</h1>
					<p className="text-neutral-600 mt-1">Manage your agency configuration and preferences</p>
				</div>

				{showSuccessAlert && (
					<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						<p className="text-sm text-green-800 font-medium">Changes saved successfully!</p>
					</div>
				)}

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-4 bg-white border border-neutral-200 rounded-lg p-1 mb-6">
						<TabsTrigger value="general" className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md">
							General
						</TabsTrigger>
						<TabsTrigger value="team" className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md">
							Team Seats
						</TabsTrigger>
						<TabsTrigger value="api" className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md">
							API & Webhooks
						</TabsTrigger>
						<TabsTrigger value="notifications" className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md">
							Notifications
						</TabsTrigger>
					</TabsList>

					{/* General Settings Tab */}
					<TabsContent value="general" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle>General Information</CardTitle>
								<CardDescription>Basic agency details and contact information</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="organizationName" className="text-sm font-medium text-neutral-700">
											Organization Name
										</Label>
										<Input
											id="organizationName"
											value={agencySettings.organizationName}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													organizationName: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
									<div>
										<Label htmlFor="email" className="text-sm font-medium text-neutral-700">
											Email Address
										</Label>
										<Input
											id="email"
											type="email"
											value={agencySettings.email}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													email: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
											Phone Number
										</Label>
										<Input
											id="phone"
											value={agencySettings.phone}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													phone: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
									<div>
										<Label htmlFor="website" className="text-sm font-medium text-neutral-700">
											Website
										</Label>
										<Input
											id="website"
											value={agencySettings.website}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													website: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="description" className="text-sm font-medium text-neutral-700">
										Agency Description
									</Label>
									<textarea
										id="description"
										value={agencySettings.description}
										onChange={(e) =>
											setAgencySettings((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-neutral-900 focus:ring-[#ff5f6d]"
										rows={3}
									></textarea>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="address" className="text-sm font-medium text-neutral-700">
											Street Address
										</Label>
										<Input
											id="address"
											value={agencySettings.address}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													address: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
									<div>
										<Label htmlFor="city" className="text-sm font-medium text-neutral-700">
											City
										</Label>
										<Input
											id="city"
											value={agencySettings.city}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													city: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div>
										<Label htmlFor="state" className="text-sm font-medium text-neutral-700">
											State/Province
										</Label>
										<Input
											id="state"
											value={agencySettings.state}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													state: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
									<div>
										<Label htmlFor="zipCode" className="text-sm font-medium text-neutral-700">
											Zip Code
										</Label>
										<Input
											id="zipCode"
											value={agencySettings.zipCode}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													zipCode: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
									<div>
										<Label htmlFor="country" className="text-sm font-medium text-neutral-700">
											Country
										</Label>
										<Input
											id="country"
											value={agencySettings.country}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													country: e.target.value,
												}))
											}
											className="mt-1 border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										/>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4">
									<div>
										<Label htmlFor="timezone" className="text-sm font-medium text-neutral-700">
											Timezone
										</Label>
										<select
											id="timezone"
											value={agencySettings.timezone}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													timezone: e.target.value,
												}))
											}
											className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
										>
											<option value="America/Los_Angeles">Pacific Time</option>
											<option value="America/Denver">Mountain Time</option>
											<option value="America/Chicago">Central Time</option>
											<option value="America/New_York">Eastern Time</option>
										</select>
									</div>
									<div>
										<Label htmlFor="currency" className="text-sm font-medium text-neutral-700">
											Currency
										</Label>
										<select
											id="currency"
											value={agencySettings.currency}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													currency: e.target.value,
												}))
											}
											className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
										>
											<option value="USD">USD ($)</option>
											<option value="EUR">EUR (€)</option>
											<option value="GBP">GBP (£)</option>
										</select>
									</div>
									<div>
										<Label htmlFor="language" className="text-sm font-medium text-neutral-700">
											Language
										</Label>
										<select
											id="language"
											value={agencySettings.language}
											onChange={(e) =>
												setAgencySettings((prev) => ({
													...prev,
													language: e.target.value,
												}))
											}
											className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 focus:ring-[#ff5f6d]"
										>
											<option value="English">English</option>
											<option value="Spanish">Spanish</option>
											<option value="French">French</option>
										</select>
									</div>
								</div>

								<div className="pt-4">
									<Button 
										onClick={() => handleSaveSettings("general")}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Team Seats Tab */}
					<TabsContent value="team" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle>Team Seats</CardTitle>
								<CardDescription>Manage your team member seats and upgrade plan</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-6">
								<div className="bg-gradient-to-r from-[#ff5f6d]/10 to-[#ffc371]/10 p-6 rounded-lg border border-[#ff5f6d]/20">
									<div className="flex items-start justify-between mb-4">
										<div>
											<h3 className="text-lg font-semibold text-neutral-900">Current Plan</h3>
											<p className="text-sm text-neutral-600 mt-1">Professional Plan</p>
										</div>
										<Badge className="bg-[#ff5f6d] text-white border-0">Active</Badge>
									</div>
									<div className="grid grid-cols-3 gap-4">
										<div>
											<p className="text-sm text-neutral-600">Seats Used</p>
											<p className="text-2xl font-bold text-neutral-900">{teamSeats.current}</p>
										</div>
										<div>
											<p className="text-sm text-neutral-600">Total Seats</p>
											<p className="text-2xl font-bold text-neutral-900">{teamSeats.limit}</p>
										</div>
										<div>
											<p className="text-sm text-neutral-600">Monthly Price</p>
											<p className="text-2xl font-bold text-neutral-900">${teamSeats.price}</p>
										</div>
									</div>
								</div>

								<div className="space-y-3">
									<h3 className="font-semibold text-neutral-900">Upgrade to More Seats</h3>
									<div className="grid grid-cols-3 gap-4">
										<Card className="border border-neutral-200 rounded-lg bg-white p-4 cursor-pointer hover:border-[#ff5f6d] transition-all">
											<p className="text-sm font-medium text-neutral-900">15 Seats</p>
											<p className="text-2xl font-bold text-neutral-900 mt-2">$699</p>
											<p className="text-xs text-neutral-600 mt-1">/month</p>
										</Card>
										<Card className="border border-neutral-200 rounded-lg bg-white p-4 cursor-pointer hover:border-[#ff5f6d] transition-all">
											<p className="text-sm font-medium text-neutral-900">25 Seats</p>
											<p className="text-2xl font-bold text-neutral-900 mt-2">$999</p>
											<p className="text-xs text-neutral-600 mt-1">/month</p>
										</Card>
										<Card className="border border-neutral-200 rounded-lg bg-white p-4 cursor-pointer hover:border-[#ff5f6d] transition-all">
											<p className="text-sm font-medium text-neutral-900">50 Seats</p>
											<p className="text-2xl font-bold text-neutral-900 mt-2">$1,499</p>
											<p className="text-xs text-neutral-600 mt-1">/month</p>
										</Card>
									</div>
								</div>

								<div className="pt-4">
									<Button 
										onClick={() => handleSaveSettings("team")}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Update Plan
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* API & Webhooks Tab */}
					<TabsContent value="api" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle>API Configuration</CardTitle>
								<CardDescription>Manage API keys and webhook settings</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-6">
								<div>
									<h3 className="font-semibold text-neutral-900 mb-3">API Key</h3>
									<div className="flex gap-2">
										<div className="flex-1 relative">
											<Input
												type={showApiKey ? "text" : "password"}
												value={apiSettings.apiKey}
												readOnly
												className="border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-[#ff5f6d]"
											/>
										</div>
										<Button
											onClick={() => setShowApiKey(!showApiKey)}
											variant="outline"
											className="border border-neutral-300 text-neutral-900 rounded-lg hover:bg-neutral-100"
										>
											{showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
										</Button>
										<Button
											onClick={handleCopyApiKey}
											className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
										>
											<Copy className="w-4 h-4" />
										</Button>
									</div>
									<p className="text-xs text-neutral-500 mt-2">Keep this key secure. Do not share it publicly.</p>
								</div>

								<div>
									<h3 className="font-semibold text-neutral-900 mb-3">Webhook URL</h3>
									<Input
										value={apiSettings.webhookUrl}
										onChange={(e) =>
											setApiSettings((prev) => ({
												...prev,
												webhookUrl: e.target.value,
											}))
										}
										className="border border-neutral-300 rounded-lg focus:ring-[#ff5f6d]"
										placeholder="https://yoursite.com/webhooks"
									/>
									<p className="text-xs text-neutral-500 mt-2">Receive real-time updates for your agency events</p>
								</div>

								<div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-lg">
									<div>
										<p className="text-xs font-medium text-neutral-600">RATE LIMIT</p>
										<p className="text-2xl font-bold text-neutral-900 mt-1">{apiSettings.rateLimit.toLocaleString()}</p>
										<p className="text-xs text-neutral-600 mt-1">requests/hour</p>
									</div>
									<div>
										<p className="text-xs font-medium text-neutral-600">THIS MONTH</p>
										<p className="text-2xl font-bold text-neutral-900 mt-1">{apiSettings.monthlyApiCalls.toLocaleString()}</p>
										<p className="text-xs text-neutral-600 mt-1">API calls used</p>
									</div>
								</div>

								<div className="pt-4">
									<Button 
										onClick={() => handleSaveSettings("api")}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save API Settings
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Notifications Tab */}
					<TabsContent value="notifications" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle>Notification Preferences</CardTitle>
								<CardDescription>Control how and when you receive notifications</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-4">
								<div className="space-y-4">
									{[
										{
											key: "emailNotifications",
											label: "Email Notifications",
											description: "Receive important updates via email",
										},
										{
											key: "projectAlerts",
											label: "Project Alerts",
											description: "Get notified about project milestones and deadlines",
										},
										{
											key: "paymentAlerts",
											label: "Payment Alerts",
											description: "Receive notifications for payment confirmations",
										},
										{
											key: "weeklyReports",
											label: "Weekly Reports",
											description: "Get a summary of your agency's weekly performance",
										},
										{
											key: "marketingEmails",
											label: "Marketing Emails",
											description: "Receive updates about new features and promotions",
										},
									].map((notification) => (
										<div key={notification.key} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
											<div>
												<p className="font-medium text-neutral-900">{notification.label}</p>
												<p className="text-sm text-neutral-600">{notification.description}</p>
											</div>
											<input
												type="checkbox"
												checked={notificationSettings[notification.key as keyof typeof notificationSettings]}
												onChange={(e) =>
													setNotificationSettings((prev) => ({
														...prev,
														[notification.key]: e.target.checked,
													}))
												}
												className="w-5 h-5 accent-[#ff5f6d] rounded"
											/>
										</div>
									))}
								</div>

								<div className="pt-4">
									<Button 
										onClick={() => handleSaveSettings("notifications")}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Preferences
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
