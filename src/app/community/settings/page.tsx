"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommunitySettingsPage() {
	const [generalSettings, setGeneralSettings] = useState({
		communityName: "Digital Innovators Community",
		email: "contact@digitaldiversity.com",
		phone: "+1-415-555-0100",
		website: "www.digitaldiversity.com",
		description: "A thriving community of digital innovators and entrepreneurs",
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		eventReminders: true,
		memberUpdates: true,
		weeklyDigest: true,
	});

	const [privacySettings, setPrivacySettings] = useState({
		publicDirectory: true,
		allowMemberSearch: true,
		showActivityFeed: true,
		allowDirectMessages: true,
	});

	const handleSaveGeneral = () => {
		const confirmed = window.confirm("Save general settings?");
		if (confirmed) {
			alert("General settings saved successfully!");
		}
	};

	const handleSaveNotifications = () => {
		const confirmed = window.confirm("Save notification settings?");
		if (confirmed) {
			alert("Notification settings saved successfully!");
		}
	};

	const handleSavePrivacy = () => {
		const confirmed = window.confirm("Save privacy settings?");
		if (confirmed) {
			alert("Privacy settings saved successfully!");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
			<div className="max-w-5xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-neutral-900">Community Settings</h1>
					<p className="text-neutral-600 mt-1">Manage community configuration and preferences</p>
				</div>

				<Tabs defaultValue="general" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-6 bg-neutral-100">
						<TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white">
							General
						</TabsTrigger>
						<TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-white">
							Notifications
						</TabsTrigger>
						<TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-white">
							Privacy & Access
						</TabsTrigger>
					</TabsList>

					<TabsContent value="general" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle className="text-xl font-bold text-neutral-900">General Information</CardTitle>
								<CardDescription className="text-neutral-600">Basic community details and contact information</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-4">
								<div>
									<Label className="text-sm font-medium text-neutral-700">Community Name</Label>
									<Input
										value={generalSettings.communityName}
										onChange={(e) => setGeneralSettings((prev) => ({ ...prev, communityName: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
									/>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Description</Label>
									<textarea
										value={generalSettings.description}
										onChange={(e) => setGeneralSettings((prev) => ({ ...prev, description: e.target.value }))}
										className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2"
										rows={3}
									></textarea>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label className="text-sm font-medium text-neutral-700">Email</Label>
										<Input
											type="email"
											value={generalSettings.email}
											onChange={(e) => setGeneralSettings((prev) => ({ ...prev, email: e.target.value }))}
											className="mt-1 border border-neutral-300 rounded-lg"
										/>
									</div>
									<div>
										<Label className="text-sm font-medium text-neutral-700">Phone</Label>
										<Input
											value={generalSettings.phone}
											onChange={(e) => setGeneralSettings((prev) => ({ ...prev, phone: e.target.value }))}
											className="mt-1 border border-neutral-300 rounded-lg"
										/>
									</div>
								</div>
								<div>
									<Label className="text-sm font-medium text-neutral-700">Website</Label>
									<Input
										value={generalSettings.website}
										onChange={(e) => setGeneralSettings((prev) => ({ ...prev, website: e.target.value }))}
										className="mt-1 border border-neutral-300 rounded-lg"
									/>
								</div>
								<Button
									onClick={handleSaveGeneral}
									className="w-full bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg mt-6"
								>
									<Save className="w-4 h-4 mr-2" />
									Save General Settings
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="notifications" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle className="text-xl font-bold text-neutral-900">Notification Preferences</CardTitle>
								<CardDescription className="text-neutral-600">Control how members receive community updates</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-4">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="emailNotifications"
											checked={notificationSettings.emailNotifications}
											onChange={(e) =>
												setNotificationSettings((prev) => ({
													...prev,
													emailNotifications: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="emailNotifications" className="text-neutral-700 cursor-pointer">
											Email Notifications
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="eventReminders"
											checked={notificationSettings.eventReminders}
											onChange={(e) =>
												setNotificationSettings((prev) => ({
													...prev,
													eventReminders: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="eventReminders" className="text-neutral-700 cursor-pointer">
											Event Reminders
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="memberUpdates"
											checked={notificationSettings.memberUpdates}
											onChange={(e) =>
												setNotificationSettings((prev) => ({
													...prev,
													memberUpdates: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="memberUpdates" className="text-neutral-700 cursor-pointer">
											Member Updates
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="weeklyDigest"
											checked={notificationSettings.weeklyDigest}
											onChange={(e) =>
												setNotificationSettings((prev) => ({
													...prev,
													weeklyDigest: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="weeklyDigest" className="text-neutral-700 cursor-pointer">
											Weekly Digest
										</Label>
									</div>
								</div>
								<Button
									onClick={handleSaveNotifications}
									className="w-full bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg mt-6"
								>
									<Save className="w-4 h-4 mr-2" />
									Save Notification Settings
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="privacy" className="space-y-6">
						<Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
							<CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
								<CardTitle className="text-xl font-bold text-neutral-900">Privacy & Access Control</CardTitle>
								<CardDescription className="text-neutral-600">Manage who can see and access community content</CardDescription>
							</CardHeader>
							<CardContent className="pt-6 space-y-4">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="publicDirectory"
											checked={privacySettings.publicDirectory}
											onChange={(e) =>
												setPrivacySettings((prev) => ({
													...prev,
													publicDirectory: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="publicDirectory" className="text-neutral-700 cursor-pointer">
											Public Member Directory
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="allowMemberSearch"
											checked={privacySettings.allowMemberSearch}
											onChange={(e) =>
												setPrivacySettings((prev) => ({
													...prev,
													allowMemberSearch: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="allowMemberSearch" className="text-neutral-700 cursor-pointer">
											Allow Member Search
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="showActivityFeed"
											checked={privacySettings.showActivityFeed}
											onChange={(e) =>
												setPrivacySettings((prev) => ({
													...prev,
													showActivityFeed: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="showActivityFeed" className="text-neutral-700 cursor-pointer">
											Show Activity Feed
										</Label>
									</div>
									<div className="flex items-center gap-3">
										<input
											type="checkbox"
											id="allowDirectMessages"
											checked={privacySettings.allowDirectMessages}
											onChange={(e) =>
												setPrivacySettings((prev) => ({
													...prev,
													allowDirectMessages: e.target.checked,
												}))
											}
											className="w-4 h-4 rounded border-neutral-300"
										/>
										<Label htmlFor="allowDirectMessages" className="text-neutral-700 cursor-pointer">
											Allow Direct Messages
										</Label>
									</div>
								</div>
								<Button
									onClick={handleSavePrivacy}
									className="w-full bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg mt-6"
								>
									<Save className="w-4 h-4 mr-2" />
									Save Privacy Settings
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
