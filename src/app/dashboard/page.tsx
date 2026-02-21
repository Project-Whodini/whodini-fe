"use client";

import { JSX, useState } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import SideBar from "@/components/app/SideBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Users,
  Settings,
  UserCheck,
  Plus,
  History,
  Cog,
  BookOpen,
  FolderOpen,
  MessageSquare,
  Mail,
  Truck,
  type LucideIcon,
} from "lucide-react";

// Import actual page components
import EventsPage from "../personal/events/page";
import CommunityDashboardPage from "../personal/community/page";
import BrandsPage from "../brands/page";
import AgencyPage from "../agency/page";
import OrganizerPage from "../organizer/page";
import BusinessSetupPage from "../business/setup/page";
import BusinessOverviewPage from "../business/overview/page";
import PersonalPage from "../personal/page";
import GamesPage from "../personal/games/page";
import RewardsPage from "../personal/rewards/page";
import ActivityPage from "../personal/activity/page";
import NotificationsPage from "../personal/notification/page";
import CommunityPage from "../personal/community/page";
import MembershipsPage from "../personal/membership/page";
import SubscriptionsPage from "../personal/subscription/page";
import ServicesPage from "../business/service/page";
import SubscriberPage from "../business/subscriber/page";
import TeamPage from "../business/team/page";
import BusinessNotificationPage from "../business/notifications/page";
import BusinessHistoryPage from "../business/history/page";
import BusinessSettingsPage from "../business/settings/page";
import BusinessEventsPage from "../business/events/page";
import OrganizerEventsPage from "../organizer/events/page";
import OrganizerVendorsPage from "../organizer/vendors/page";
import OrganizerServicesPage from "../organizer/services/page";
import OrganizerTeamPage from "../organizer/team/page";
import OrganizerSettingsPage from "../organizer/settings/page";
import AgencyDashboardPage from "../agency/page";
import AgencyClientsPage from "../agency/clients/page";
import AgencyServicesPage from "../agency/services/page";
import AgencyTeamPage from "../agency/team/page";
import AgencySettingsPage from "../agency/settings/page";
import CommunityMembersPage from "../community/members/page";
import CommunityChaptersPage from "../community/chapters/page";
import CommunityDirectoryPage from "../community/directory/page";
import CommunityMessagePage from "../community/message/page";
import CommunityMessageBoardPage from "../community/message-board/page";
import OrganizerDashboardPage from "../organizer/page";
import CommunityTeamPage from "../community/team/page";
import CommunityEventsPage from "../community/events/page";
import CommunityServicesPage from "../community/services/page";
import CommunityHistoryPage from "../community/history/page";
import CommunitySettingsPage from "../community/settings/page";

function BusinessSetupContent() {
  return (
    <div className="h-full w-full">
      <BusinessSetupPage />
    </div>
  );
}







// Generic Content Components for other sections
function GenericContent({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-[#ff5f6d]" />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <Card>
        <CardContent className="py-10 text-center">
          <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {title} content will be implemented here
          </p>
          <Button variant="outline">Coming Soon</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const [currentContent, setCurrentContent] = useState("/");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Content routing map
  const contentMap: Record<string, () => JSX.Element> = {
    // Personal Account
    "/": () => <PersonalPage />,
    "/home": () => <PersonalPage />,
    "/games": () => <GamesPage />,
    "/rewards": () => <RewardsPage />,
    "/activity": () => <ActivityPage />,
    "/events": () => <EventsPage />,
    "/notifications": () => <NotificationsPage />,
    "/community": () => <CommunityPage />,
    "/memberships": () => <MembershipsPage />,
    "/subscriptions": () => <SubscriptionsPage />,

    // Business Account
    "/business/overview": () => <BusinessOverviewPage />,
    "/business/setup": () => <BusinessSetupContent />,
    "/business/events": () => <BusinessEventsPage />,
    "/business/brands": () => <BrandsPage />,
    "/business/services": () => <ServicesPage />,
    "/business/subscribers": () => <SubscriberPage />,
    "/business/team": () => <TeamPage />,
    "/business/notifications/create": () => <BusinessNotificationPage />,
    "/business/history": () => <BusinessHistoryPage />,
    "/business/settings": () => <BusinessSettingsPage />,

    // Community Account
    "/community/overview": () => <CommunityDashboardPage />,
   "/community/events": () =>  <CommunityEventsPage />,
    "/community/chapters": () => <CommunityChaptersPage />,
    "/community/members": () => <CommunityMembersPage />,
    "/community/team": () => <CommunityTeamPage />,
    "/community/directory": () => <CommunityDirectoryPage />,
    "/community/message-board": () => <CommunityMessageBoardPage />,
    "/community/message": () => <CommunityMessagePage />,
    "/community/services": () => <CommunityServicesPage />,
    "/community/history": () => <CommunityHistoryPage />,
    "/community/settings": () => <CommunitySettingsPage />,
    
    
    
    // Event Organizer
    "/event/overview": () => <OrganizerDashboardPage />,
    "/event/vendors": () => <OrganizerVendorsPage />,
    "/event/events": () => <OrganizerEventsPage />,
    "/event/services": () => <OrganizerServicesPage />,
    "/event/team": () => <OrganizerTeamPage />,
    "/event/settings": () => <OrganizerSettingsPage />,

    // Agency
    "/agency/overview": () => <AgencyDashboardPage />,
    "/agency/clients": () => <AgencyClientsPage />,
    "/agency/services": () => <AgencyServicesPage />,
    "/agency/team": () => <AgencyTeamPage />,
    "/agency/settings": () => <AgencySettingsPage />,
  };

  // Navigate to content
  const navigateToContent = (path: string) => {
    setCurrentContent(path);
  };

  const renderContent = () => {
    const ContentComponent = contentMap[currentContent] || contentMap["/"];
    return <ContentComponent />;
  };

  return (
    <RequireSession>
      <div className="min-h-screen">
        <SideBar
          onNavigate={navigateToContent}
          currentPath={currentContent}
          expanded={sidebarExpanded}
          onExpandedChange={setSidebarExpanded}
        />
        <div
          className={`bg-gray-50 min-h-screen transition-all duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            sidebarExpanded ? "ml-64" : "ml-[4.5rem]"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </RequireSession>
  );
}
