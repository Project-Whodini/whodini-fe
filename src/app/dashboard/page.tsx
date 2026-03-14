'use client';

// React
import { JSX, useEffect, useState } from 'react';

// Icons
import { type LucideIcon } from 'lucide-react';

// UI components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// App components
import { RequireSession } from '@/components/app/RequireSession';
import SideBar from '@/components/app/SideBar';

// Personal pages
import PersonalPage from '../personal/page';
import ProfilePage from '../personal/profile/page';
import ActivityPage from '../personal/activity/page';
import CommunityPage from '../personal/community/page';
import CommunityShowPage from '../personal/community/show';
import EventsPage from '../personal/events/page';
import ExploreEventsPage from '../personal/events/explore/page';
import GamesPage from '../personal/games/page';
import MembershipsPage from '../personal/membership/page';
import NotificationsPage from '../personal/notification/page';
import NotificationShowPage from '../personal/notification/show';
import RewardsPage from '../personal/rewards/page';
import SubscriptionsPage from '../personal/subscription/page';

// Business pages
import BusinessOverviewPage from '../business/overview/page';
import BrandsPage from '../business/brands/page';
import BusinessEventsPage from '../business/events/page';
import BusinessHistoryPage from '../business/history/page';
import BusinessNotificationPage from '../business/notifications/page';
import BusinessSettingsPage from '../business/settings/page';
import ServicesPage from '../business/serviceProduct/page';
import SubscriberPage from '../business/subscriber/page';
import BusinessTeamPage from '../business/team/page';

// Community pages
import CommunityDashboardPage from '../community/page';
import CommunityChaptersPage from '../community/chapters/page';
import CommunityDirectoryPage from '../community/directory/page';
import CommunityEventsPage from '../community/events/page';
import CommunityHistoryPage from '../community/history/page';
import CommunityMembersPage from '../community/members/page';
import CommunityMessageBoardPage from '../community/message-board/page';
import CommunityServicesPage from '../community/services/page';
import CommunitySettingsPage from '../community/settings/page';
import CommunityTeamPage from '../community/team/page';

// Organizer pages
import OrganizerDashboardPage from '../organizer/page';
import OrganizerEventsPage from '../organizer/events/page';
import OrganizerServicesPage from '../organizer/services/page';
import OrganizerSettingsPage from '../organizer/settings/page';
import OrganizerTeamPage from '../organizer/team/page';
import OrganizerVendorsPage from '../organizer/vendors/page';

// Agency pages
import AgencyDashboardPage from '../agency/page';
import AgencyClientsPage from '../agency/clients/page';
import AgencyServicesPage from '../agency/services/page';
import AgencySettingsPage from '../agency/settings/page';
import AgencyTeamPage from '../agency/team/page';

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
  const [currentContent, setCurrentContent] = useState('/');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent<{ path?: string }>;
      const nextPath = customEvent.detail?.path;
      if (!nextPath) return;
      setCurrentContent(nextPath);
      customEvent.preventDefault();
    };

    window.addEventListener(
      'whodini:navigate',
      handleNavigate as EventListener
    );

    return () => {
      window.removeEventListener(
        'whodini:navigate',
        handleNavigate as EventListener
      );
    };
  }, []);

  // Content routing map
  const contentMap: Record<string, () => JSX.Element> = {
    // Personal Account
    '/': () => <PersonalPage />,
    '/home': () => <PersonalPage />,
    '/profile': () => <ProfilePage />,
    '/games': () => <GamesPage />,
    '/rewards': () => <RewardsPage />,
    '/activity': () => <ActivityPage />,
    '/events': () => <EventsPage />,
    '/events/explore': () => <ExploreEventsPage />,
    '/notifications': () => <NotificationsPage />,
    '/notifications/show': () => <NotificationShowPage />,
    '/community': () => <CommunityPage />,
    '/community/show': () => <CommunityShowPage />,
    '/memberships': () => <MembershipsPage />,
    '/subscriptions': () => <SubscriptionsPage />,

    // Business Account
    '/business/overview': () => <BusinessOverviewPage />,
    '/business/setup': () => <BusinessSettingsPage />,
    '/business/events': () => <BusinessEventsPage />,
    '/business/brands': () => <BrandsPage />,
    '/business/services': () => <ServicesPage />,
    '/business/team': () => <BusinessTeamPage />,
    '/business/subscribers': () => <SubscriberPage />,
    '/business/notifications/create': () => <BusinessNotificationPage />,
    '/business/history': () => <BusinessHistoryPage />,
    '/business/settings': () => <BusinessSettingsPage />,

    // Community Account
    '/community/overview': () => <CommunityDashboardPage />,
    '/community/events': () => <CommunityEventsPage />,
    '/community/chapters': () => <CommunityChaptersPage />,
    '/community/members': () => <CommunityMembersPage />,
    '/community/team': () => <CommunityTeamPage />,
    '/community/directory': () => <CommunityDirectoryPage />,
    '/community/message-board': () => <CommunityMessageBoardPage />,
    '/community/services': () => <CommunityServicesPage />,
    '/community/history': () => <CommunityHistoryPage />,
    '/community/settings': () => <CommunitySettingsPage />,

    // Event Organizer
    '/event/overview': () => <OrganizerDashboardPage />,
    '/event/vendors': () => <OrganizerVendorsPage />,
    '/event/events': () => <OrganizerEventsPage />,
    '/event/services': () => <OrganizerServicesPage />,
    '/event/team': () => <OrganizerTeamPage />,
    '/event/settings': () => <OrganizerSettingsPage />,

    // Agency
    '/agency/overview': () => <AgencyDashboardPage />,
    '/agency/clients': () => <AgencyClientsPage />,
    '/agency/services': () => <AgencyServicesPage />,
    '/agency/team': () => <AgencyTeamPage />,
    '/agency/settings': () => <AgencySettingsPage />,
  };

  // Navigate to content
  const navigateToContent = (path: string) => {
    setCurrentContent(path);
  };

  const renderContent = () => {
    const ContentComponent = contentMap[currentContent] || contentMap['/'];
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
          className={`bg-gray-50 min-h-screen pt-16 xl:pt-0 transition-all duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            sidebarExpanded ? 'xl:ml-64' : 'xl:ml-[4.5rem]'
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </RequireSession>
  );
}
