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
import EventsPage from "../events/page";
import CommunityDashboardPage from "../community/page";
import BrandsPage from "../brands/page";
import AgencyPage from "../agency/page";
import OrganizerPage from "../organizer/page";
import BusinessSetupPage from "../business/setup/page";
import BusinessOverviewPage from "../business/overview/page";
import PersonalPage from "../personal/page";
import GamesPage from "../games/page";
import RewardsPage from "../rewards/page";
import ActivityPage from "../activity/page";
import NotificationsPage from "../notification/page";
import CommunityPage from "../community/page";
import MembershipsPage from "../membership/page";
import SubscriptionsPage from "../subscription/page";
import ServicesPage from "../service/page";
import SubscriberPage from "../subscriber/page";
import TeamPage from "../team/page";
import BusinessNotificationPage from "../business/notifications/page";
import BusinessHistoryPage from "../business/history/page";
import BusinessSettingsPage from "../business/settings/page";
function BusinessSetupContent() {
  return (
    <div className="h-full w-full">
      <BusinessSetupPage />
    </div>
  );
}

function CommunityContent() {
  return (
    <div className="h-full w-full">
      <CommunityDashboardPage />
    </div>
  );
}

function BrandsContent() {
  return (
    <div className="h-full w-full">
      <BrandsPage />
    </div>
  );
}

function AgencyContent() {
  return (
    <div className="h-full w-full">
      <AgencyPage />
    </div>
  );
}

function OrganizerContent() {
  return (
    <div className="h-full w-full">
      <OrganizerPage />
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
    "/business/events": () => <EventsPage />,
    "/brands": () => <BrandsContent />,
    "/business/services": () => <ServicesPage />,
    "/business/subscribers": () => <SubscriberPage />,
    "/business/team": () => <TeamPage />,
    "/business/notifications/create": () => <BusinessNotificationPage />,
    "/business/history": () => <BusinessHistoryPage />,
    "/business/settings": () => <BusinessSettingsPage />,

    // Community Account
    "/community/overview": () => <CommunityContent />,
    "/community/chapters": () => (
      <GenericContent title="Chapters" icon={BookOpen} />
    ),
    "/community/members": () => <GenericContent title="Members" icon={Users} />,
    "/community/directory": () => (
      <GenericContent title="Directory" icon={FolderOpen} />
    ),
    "/community/message-board": () => (
      <GenericContent title="Message Board" icon={MessageSquare} />
    ),
    "/community/message": () => <GenericContent title="Messages" icon={Mail} />,

    // Event Organizer
    "/event/overview": () => <OrganizerContent />,
    "/event/vendors": () => <GenericContent title="Vendors" icon={Truck} />,
    "/event/services": () => (
      <GenericContent title="Event Services" icon={Settings} />
    ),
    "/event/team": () => <GenericContent title="Event Team" icon={Users} />,
    "/event/settings": () => (
      <GenericContent title="Event Settings" icon={Cog} />
    ),

    // Agency
    "/agency/overview": () => <AgencyContent />,
    "/agency/clients": () => <GenericContent title="Clients" icon={Users} />,
    "/agency/services": () => (
      <GenericContent title="Agency Services" icon={Settings} />
    ),
    "/agency/team": () => (
      <GenericContent title="Agency Team" icon={UserCheck} />
    ),
    "/agency/settings": () => (
      <GenericContent title="Agency Settings" icon={Cog} />
    ),
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
