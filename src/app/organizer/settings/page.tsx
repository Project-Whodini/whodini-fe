"use client";

import { useState } from "react";
import { Save, Building2, Globe, Bell, CreditCard, Shield, Code, Upload, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type SettingsTab = "profile" | "events" | "notifications" | "billing" | "security" | "integrations";

export default function OrganizerSettingsPage() {
	const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
	const organizerName = "Demo Organizer";

	// Profile Settings
	const [orgName, setOrgName] = useState("Demo Organizer");
	const [orgEmail, setOrgEmail] = useState("contact@demoorganizer.com");
	const [orgPhone, setOrgPhone] = useState("+1 (555) 123-4567");
	const [orgAddress, setOrgAddress] = useState("123 Event Plaza, Downtown");
	const [orgCity, setOrgCity] = useState("San Francisco");
	const [orgWebsite, setOrgWebsite] = useState("https://demoorganizer.com");
	const [orgDescription, setOrgDescription] = useState("Leading event organizers specializing in community events and conferences.");

	// Event Defaults
	const [defaultTimezone, setDefaultTimezone] = useState("America/Los_Angeles");
	const [defaultCurrency, setDefaultCurrency] = useState("USD");
	const [defaultLanguage, setDefaultLanguage] = useState("en");
	const [ticketPrefix, setTicketPrefix] = useState("EVT");

	// Notifications
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [smsNotifications, setSmsNotifications] = useState(false);
	const [newRegistrations, setNewRegistrations] = useState(true);
	const [eventReminders, setEventReminders] = useState(true);
	const [paymentAlerts, setPaymentAlerts] = useState(true);
	const [weeklyReports, setWeeklyReports] = useState(true);

	// Billing
	const [billingEmail, setBillingEmail] = useState("billing@demoorganizer.com");
	const [billingCompany, setBillingCompany] = useState("Demo Organizer LLC");
	const [taxId, setTaxId] = useState("12-3456789");
	const [paymentMethod, setPaymentMethod] = useState("Visa •••• 4242");

	// Security
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
	const [sessionTimeout, setSessionTimeout] = useState("30");
	const [ipWhitelist, setIpWhitelist] = useState("");

	// Integrations
	const [apiKey, setApiKey] = useState("wdni_live_abc123xyz789");
	const [webhookUrl, setWebhookUrl] = useState("https://api.demoorganizer.com/webhooks");
	const [slackWebhook, setSlackWebhook] = useState("");
	const [googleAnalytics, setGoogleAnalytics] = useState("UA-123456789-1");

	const handleSaveProfile = () => {
		alert("Profile settings saved successfully!");
	};

	const handleSaveEvents = () => {
		alert("Event defaults saved successfully!");
	};

	const handleSaveNotifications = () => {
		alert("Notification preferences saved successfully!");
	};

	const handleSaveBilling = () => {
		alert("Billing settings saved successfully!");
	};

	const handleSaveSecurity = () => {
		alert("Security settings saved successfully!");
	};

	const handleSaveIntegrations = () => {
		alert("Integration settings saved successfully!");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
					<p className="text-neutral-600 mt-1">
						Manage settings and preferences for <span className="font-semibold">{organizerName}</span>
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsTab)}>
					<TabsList className="grid w-full grid-cols-6 mb-6 bg-white border border-neutral-200 rounded-lg p-1">
						<TabsTrigger
							value="profile"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<Building2 className="w-4 h-4 mr-2" />
							Profile
						</TabsTrigger>
						<TabsTrigger
							value="events"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<Globe className="w-4 h-4 mr-2" />
							Events
						</TabsTrigger>
						<TabsTrigger
							value="notifications"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<Bell className="w-4 h-4 mr-2" />
							Notifications
						</TabsTrigger>
						<TabsTrigger
							value="billing"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<CreditCard className="w-4 h-4 mr-2" />
							Billing
						</TabsTrigger>
						<TabsTrigger
							value="security"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<Shield className="w-4 h-4 mr-2" />
							Security
						</TabsTrigger>
						<TabsTrigger
							value="integrations"
							className="data-[state=active]:bg-[#ff5f6d] data-[state=active]:text-white rounded-md"
						>
							<Code className="w-4 h-4 mr-2" />
							Integrations
						</TabsTrigger>
					</TabsList>

					{/* Profile Tab */}
					<TabsContent value="profile">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<Building2 className="w-5 h-5 text-[#ff5f6d]" />
									Organization Profile
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Manage your organization's public profile and contact information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
									<div className="w-20 h-20 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white text-2xl font-bold">
										{orgName.slice(0, 2).toUpperCase()}
									</div>
									<div className="flex-1">
										<h3 className="font-semibold text-neutral-900">Organization Logo</h3>
										<p className="text-sm text-neutral-600 mb-2">Upload a logo for your organization</p>
										<Button
											variant="outline"
											size="sm"
											className="border-neutral-300 hover:bg-neutral-50 rounded-lg"
										>
											<Upload className="w-4 h-4 mr-2" />
											Upload Logo
										</Button>
									</div>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="org-name" className="text-sm font-medium text-neutral-700">
											Organization Name *
										</Label>
										<Input
											id="org-name"
											value={orgName}
											onChange={(e) => setOrgName(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="org-email" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
											<Mail className="w-4 h-4" />
											Email Address *
										</Label>
										<Input
											id="org-email"
											type="email"
											value={orgEmail}
											onChange={(e) => setOrgEmail(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="org-phone" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
											<Phone className="w-4 h-4" />
											Phone Number
										</Label>
										<Input
											id="org-phone"
											value={orgPhone}
											onChange={(e) => setOrgPhone(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="org-website" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
											<Globe className="w-4 h-4" />
											Website
										</Label>
										<Input
											id="org-website"
											value={orgWebsite}
											onChange={(e) => setOrgWebsite(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="org-address" className="text-sm font-medium text-neutral-700 flex items-center gap-2">
											<MapPin className="w-4 h-4" />
											Address
										</Label>
										<Input
											id="org-address"
											value={orgAddress}
											onChange={(e) => setOrgAddress(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="org-city" className="text-sm font-medium text-neutral-700">
											City
										</Label>
										<Input
											id="org-city"
											value={orgCity}
											onChange={(e) => setOrgCity(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="org-description" className="text-sm font-medium text-neutral-700">
										Description
									</Label>
									<textarea
										id="org-description"
										value={orgDescription}
										onChange={(e) => setOrgDescription(e.target.value)}
										rows={4}
										className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
										placeholder="Describe your organization..."
									/>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveProfile}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Event Defaults Tab */}
					<TabsContent value="events">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<Globe className="w-5 h-5 text-[#ff5f6d]" />
									Event Defaults
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Set default preferences for all new events
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="timezone" className="text-sm font-medium text-neutral-700">
											Default Timezone
										</Label>
										<select
											id="timezone"
											value={defaultTimezone}
											onChange={(e) => setDefaultTimezone(e.target.value)}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
										>
											<option value="America/Los_Angeles">Pacific Time (PT)</option>
											<option value="America/Denver">Mountain Time (MT)</option>
											<option value="America/Chicago">Central Time (CT)</option>
											<option value="America/New_York">Eastern Time (ET)</option>
											<option value="Europe/London">London (GMT)</option>
											<option value="Europe/Paris">Central European Time (CET)</option>
											<option value="Asia/Tokyo">Tokyo (JST)</option>
										</select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="currency" className="text-sm font-medium text-neutral-700">
											Default Currency
										</Label>
										<select
											id="currency"
											value={defaultCurrency}
											onChange={(e) => setDefaultCurrency(e.target.value)}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
										>
											<option value="USD">USD - US Dollar ($)</option>
											<option value="EUR">EUR - Euro (€)</option>
											<option value="GBP">GBP - British Pound (£)</option>
											<option value="JPY">JPY - Japanese Yen (¥)</option>
											<option value="CAD">CAD - Canadian Dollar ($)</option>
											<option value="AUD">AUD - Australian Dollar ($)</option>
										</select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="language" className="text-sm font-medium text-neutral-700">
											Default Language
										</Label>
										<select
											id="language"
											value={defaultLanguage}
											onChange={(e) => setDefaultLanguage(e.target.value)}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
										>
											<option value="en">English</option>
											<option value="es">Spanish</option>
											<option value="fr">French</option>
											<option value="de">German</option>
											<option value="ja">Japanese</option>
											<option value="zh">Chinese</option>
										</select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="ticket-prefix" className="text-sm font-medium text-neutral-700">
											Ticket ID Prefix
										</Label>
										<Input
											id="ticket-prefix"
											value={ticketPrefix}
											onChange={(e) => setTicketPrefix(e.target.value)}
											placeholder="EVT"
											className="rounded-lg border-neutral-300"
										/>
										<p className="text-xs text-neutral-500">Format: {ticketPrefix}-XXXXXX</p>
									</div>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveEvents}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Notifications Tab */}
					<TabsContent value="notifications">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<Bell className="w-5 h-5 text-[#ff5f6d]" />
									Notification Preferences
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Choose how and when you want to be notified
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-4">
									<h3 className="font-semibold text-neutral-900">Notification Channels</h3>
									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={emailNotifications}
											onChange={(e) => setEmailNotifications(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900 flex items-center gap-2">
												<Mail className="w-4 h-4" />
												Email Notifications
											</div>
											<div className="text-sm text-neutral-600">Receive notifications via email</div>
										</div>
										<Badge className="bg-green-100 text-green-800">Active</Badge>
									</label>

									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={smsNotifications}
											onChange={(e) => setSmsNotifications(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900 flex items-center gap-2">
												<Phone className="w-4 h-4" />
												SMS Notifications
											</div>
											<div className="text-sm text-neutral-600">Receive urgent alerts via SMS</div>
										</div>
									</label>
								</div>

								<div className="space-y-4 pt-4 border-t border-neutral-200">
									<h3 className="font-semibold text-neutral-900">Event Notifications</h3>
									
									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={newRegistrations}
											onChange={(e) => setNewRegistrations(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900">New Registrations</div>
											<div className="text-sm text-neutral-600">Get notified when someone registers for your event</div>
										</div>
									</label>

									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={eventReminders}
											onChange={(e) => setEventReminders(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900">Event Reminders</div>
											<div className="text-sm text-neutral-600">Reminders before your events start</div>
										</div>
									</label>

									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={paymentAlerts}
											onChange={(e) => setPaymentAlerts(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900">Payment Alerts</div>
											<div className="text-sm text-neutral-600">Notifications for successful payments and refunds</div>
										</div>
									</label>

									<label className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors">
										<input
											type="checkbox"
											checked={weeklyReports}
											onChange={(e) => setWeeklyReports(e.target.checked)}
											className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#ff5f6d] focus:ring-[#ff5f6d] cursor-pointer"
										/>
										<div className="flex-1">
											<div className="font-medium text-neutral-900">Weekly Reports</div>
											<div className="text-sm text-neutral-600">Receive weekly performance summaries</div>
										</div>
									</label>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveNotifications}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Billing Tab */}
					<TabsContent value="billing">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<CreditCard className="w-5 h-5 text-[#ff5f6d]" />
									Billing & Payment
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Manage billing information and payment methods
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="p-4 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm opacity-90">Current Plan</span>
										<Badge className="bg-white/20 text-white border-white/30">Pro</Badge>
									</div>
									<h3 className="text-2xl font-bold mb-1">$99.00 / month</h3>
									<p className="text-sm opacity-90">Next billing date: March 21, 2026</p>
								</div>

								<div className="grid gap-6 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="billing-email" className="text-sm font-medium text-neutral-700">
											Billing Email
										</Label>
										<Input
											id="billing-email"
											type="email"
											value={billingEmail}
											onChange={(e) => setBillingEmail(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="billing-company" className="text-sm font-medium text-neutral-700">
											Company Name
										</Label>
										<Input
											id="billing-company"
											value={billingCompany}
											onChange={(e) => setBillingCompany(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="tax-id" className="text-sm font-medium text-neutral-700">
											Tax ID / VAT Number
										</Label>
										<Input
											id="tax-id"
											value={taxId}
											onChange={(e) => setTaxId(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="payment-method" className="text-sm font-medium text-neutral-700">
											Payment Method
										</Label>
										<div className="flex gap-2">
											<Input
												id="payment-method"
												value={paymentMethod}
												disabled
												className="rounded-lg border-neutral-300 bg-neutral-50"
											/>
											<Button
												variant="outline"
												className="border-neutral-300 hover:bg-neutral-50 rounded-lg whitespace-nowrap"
											>
												Update
											</Button>
										</div>
									</div>
								</div>

								<div className="pt-4 border-t border-neutral-200">
									<h3 className="font-semibold text-neutral-900 mb-3">Billing History</h3>
									<div className="space-y-2">
										{[
											{ date: "Feb 21, 2026", amount: "$99.00", status: "Paid" },
											{ date: "Jan 21, 2026", amount: "$99.00", status: "Paid" },
											{ date: "Dec 21, 2025", amount: "$99.00", status: "Paid" },
										].map((invoice, idx) => (
											<div
												key={idx}
												className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50"
											>
												<div className="flex items-center gap-3">
													<CreditCard className="w-4 h-4 text-neutral-400" />
													<div>
														<div className="font-medium text-neutral-900">{invoice.date}</div>
														<div className="text-sm text-neutral-600">Monthly subscription</div>
													</div>
												</div>
												<div className="flex items-center gap-3">
													<span className="font-semibold text-neutral-900">{invoice.amount}</span>
													<Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
													<Button
														variant="ghost"
														size="sm"
														className="text-[#ff5f6d] hover:bg-[#ff5f6d]/10"
													>
														Download
													</Button>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveBilling}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Security Tab */}
					<TabsContent value="security">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<Shield className="w-5 h-5 text-[#ff5f6d]" />
									Security & Privacy
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Manage account security and privacy settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-4">
									<h3 className="font-semibold text-neutral-900">Authentication</h3>
									
									<div className="p-4 rounded-lg border border-neutral-200">
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<div className="font-medium text-neutral-900 mb-1">Two-Factor Authentication</div>
												<div className="text-sm text-neutral-600">
													Add an extra layer of security to your account
												</div>
											</div>
											<Badge className={twoFactorEnabled ? "bg-green-100 text-green-800" : "bg-neutral-100 text-neutral-800"}>
												{twoFactorEnabled ? "Enabled" : "Disabled"}
											</Badge>
										</div>
										<Button
											onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
											variant="outline"
											size="sm"
											className="border-neutral-300 hover:bg-neutral-50 rounded-lg"
										>
											{twoFactorEnabled ? "Disable" : "Enable"} 2FA
										</Button>
									</div>

									<div className="space-y-2">
										<Label htmlFor="session-timeout" className="text-sm font-medium text-neutral-700">
											Session Timeout (minutes)
										</Label>
										<Input
											id="session-timeout"
											type="number"
											value={sessionTimeout}
											onChange={(e) => setSessionTimeout(e.target.value)}
											className="rounded-lg border-neutral-300"
										/>
										<p className="text-xs text-neutral-500">
											Automatically log out after this period of inactivity
										</p>
									</div>
								</div>

								<div className="space-y-4 pt-4 border-t border-neutral-200">
									<h3 className="font-semibold text-neutral-900">Advanced Security</h3>
									
									<div className="space-y-2">
										<Label htmlFor="ip-whitelist" className="text-sm font-medium text-neutral-700">
											IP Whitelist (Optional)
										</Label>
										<textarea
											id="ip-whitelist"
											value={ipWhitelist}
											onChange={(e) => setIpWhitelist(e.target.value)}
											rows={3}
											className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
											placeholder="Enter IP addresses, one per line&#10;Example: 192.168.1.1"
										/>
										<p className="text-xs text-neutral-500">
											Restrict login access to specific IP addresses
										</p>
									</div>

									<div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
										<div className="flex items-start gap-3">
											<Shield className="w-5 h-5 text-amber-600 mt-0.5" />
											<div>
												<h4 className="font-medium text-amber-900 mb-1">Password Change</h4>
												<p className="text-sm text-amber-800 mb-3">
													Last changed: 45 days ago
												</p>
												<Button
													variant="outline"
													size="sm"
													className="border-amber-300 bg-white hover:bg-amber-50 rounded-lg"
												>
													Change Password
												</Button>
											</div>
										</div>
									</div>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveSecurity}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
									</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Integrations Tab */}
					<TabsContent value="integrations">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
									<Code className="w-5 h-5 text-[#ff5f6d]" />
									API & Integrations
								</CardTitle>
								<CardDescription className="text-neutral-600">
									Connect external services and manage API access
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-4">
									<h3 className="font-semibold text-neutral-900">API Configuration</h3>
									
									<div className="space-y-2">
										<Label htmlFor="api-key" className="text-sm font-medium text-neutral-700">
											API Key
										</Label>
										<div className="flex gap-2">
											<Input
												id="api-key"
												type="password"
												value={apiKey}
												disabled
												className="rounded-lg border-neutral-300 bg-neutral-50 font-mono text-sm"
											/>
											<Button
												variant="outline"
												className="border-neutral-300 hover:bg-neutral-50 rounded-lg whitespace-nowrap"
											>
												Regenerate
											</Button>
										</div>
										<p className="text-xs text-neutral-500">
											Keep your API key secure and never share it publicly
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="webhook-url" className="text-sm font-medium text-neutral-700">
											Webhook URL
										</Label>
										<Input
											id="webhook-url"
											value={webhookUrl}
											onChange={(e) => setWebhookUrl(e.target.value)}
											placeholder="https://your-domain.com/webhooks"
											className="rounded-lg border-neutral-300"
										/>
										<p className="text-xs text-neutral-500">
											Receive real-time event notifications at this URL
										</p>
									</div>
								</div>

								<div className="space-y-4 pt-4 border-t border-neutral-200">
									<h3 className="font-semibold text-neutral-900">Third-Party Integrations</h3>
									
									<div className="space-y-2">
										<Label htmlFor="slack-webhook" className="text-sm font-medium text-neutral-700">
											Slack Webhook URL
										</Label>
										<Input
											id="slack-webhook"
											value={slackWebhook}
											onChange={(e) => setSlackWebhook(e.target.value)}
											placeholder="https://hooks.slack.com/services/..."
											className="rounded-lg border-neutral-300"
										/>
										<p className="text-xs text-neutral-500">
											Send event notifications to your Slack workspace
										</p>
									</div>

									<div className="space-y-2">
										<Label htmlFor="google-analytics" className="text-sm font-medium text-neutral-700">
											Google Analytics ID
										</Label>
										<Input
											id="google-analytics"
											value={googleAnalytics}
											onChange={(e) => setGoogleAnalytics(e.target.value)}
											placeholder="UA-XXXXXXXXX-X"
											className="rounded-lg border-neutral-300"
										/>
										<p className="text-xs text-neutral-500">
											Track event page views and registrations
										</p>
									</div>
								</div>

								<div className="pt-4 border-t border-neutral-200">
									<h3 className="font-semibold text-neutral-900 mb-3">Available Integrations</h3>
									<div className="grid gap-3 md:grid-cols-2">
										{[
											{ name: "Stripe", status: "Connected", icon: "💳" },
											{ name: "Mailchimp", status: "Not Connected", icon: "📧" },
											{ name: "Zoom", status: "Connected", icon: "📹" },
											{ name: "Google Calendar", status: "Not Connected", icon: "📅" },
										].map((integration, idx) => (
											<div
												key={idx}
												className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50"
											>
												<div className="flex items-center gap-3">
													<span className="text-2xl">{integration.icon}</span>
													<div>
														<div className="font-medium text-neutral-900">{integration.name}</div>
														<div className="text-sm text-neutral-600">{integration.status}</div>
													</div>
												</div>
												<Button
													variant="outline"
													size="sm"
													className="border-neutral-300 hover:bg-neutral-50 rounded-lg"
												>
													{integration.status === "Connected" ? "Configure" : "Connect"}
												</Button>
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-end pt-4 border-t border-neutral-200">
									<Button
										onClick={handleSaveIntegrations}
										className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
									>
										<Save className="w-4 h-4 mr-2" />
										Save Changes
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
