"use client";

import { JSX, useState, useEffect } from "react";
import { RequireSession } from "@/components/app/RequireSession";
import SideBar from "@/components/app/SideBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Gamepad2,
  Gift,
  Activity,
  Calendar,
  Bell,
  Users,
  Crown,
  CreditCard,
  TrendingUp,
  Building2,
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
  Package,
  Star,
  DollarSign,
  ShoppingBag,
  Tag,
  Edit,
  Trash2,
  type LucideIcon,
} from "lucide-react";

// Import actual page components
import BusinessDashboardPage from "../business/page";
import EventsPage from "../events/page";
import CommunityDashboardPage from "../community/page";
import BrandsPage from "../brands/page";
import AgencyPage from "../agency/page";
import OrganizerPage from "../organizer/page";
import BusinessSetupPage from "../business/setup/page";
import BusinessOverviewPage from "../business/overview/page";

// Personal Account Content Components (keeping these as basic since no specific pages exist)
function PersonalHomeContent() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your personal dashboard overview
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">5</div>
            <p className="text-sm text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Reward Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#ff5f6d]">2,450</div>
            <p className="text-sm text-muted-foreground">Ready to redeem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">3</div>
            <p className="text-sm text-muted-foreground">Upcoming events</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GamesContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Games & Challenges</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Daily Challenge</CardTitle>
            <CardDescription>
              Complete today&apos;s challenge to earn points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600 mb-2">
              +50 XP
            </div>
            <Button className="w-full">Play Now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Streak</CardTitle>
            <CardDescription>Keep your streak alive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-600 mb-2">
              7 Days
            </div>
            <Button variant="outline" className="w-full">
              View Progress
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leaderboard</CardTitle>
            <CardDescription>See how you rank</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-purple-600 mb-2">
              #12
            </div>
            <Button variant="outline" className="w-full">
              View Rankings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RewardsContent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Rewards & Points</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Points</CardTitle>
            <CardDescription>
              Redeem points for exclusive rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-[#ff5f6d] mb-4">2,450</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">10% Discount</div>
                  <div className="text-sm text-muted-foreground">
                    Any purchase
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">500 pts</div>
                  <Button size="sm">Redeem</Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">
                    Next order
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">750 pts</div>
                  <Button size="sm">Redeem</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reward History</CardTitle>
            <CardDescription>Your recent redemptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">5% Discount Used</div>
                  <div className="text-sm text-muted-foreground">
                    2 days ago
                  </div>
                </div>
                <Badge variant="secondary">-250 pts</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <div className="font-medium">Daily Login Bonus</div>
                  <div className="text-sm text-muted-foreground">
                    3 days ago
                  </div>
                </div>
                <Badge variant="outline">+100 pts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Wrapper components to extract content from actual page components
function BusinessOverviewContent() {
  return (
    <div className="h-full w-full">
      <BusinessOverviewPage />
    </div>
  );
}

function BusinessSetupContent() {
  return (
    <div className="h-full w-full">
      <BusinessSetupPage />
    </div>
  );
}

function BusinessDashboardContent() {
  return (
    <div className="h-full w-full">
      <BusinessDashboardPage />
    </div>
  );
}

function EventsContent() {
  return (
    <div className="h-full w-full">
      <EventsPage />
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
function GenericContent({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
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
    "/": () => <PersonalHomeContent />,
    "/home": () => <PersonalHomeContent />,
    "/games": () => <GamesContent />,
    "/rewards": () => <RewardsContent />,
    "/activity": () => <GenericContent title="Activity" icon={Activity} />,
    "/events": () => <EventsContent />,
    "/notifications": () => (
      <GenericContent title="Notifications" icon={Bell} />
    ),
    "/community": () => <CommunityContent />,
    "/memberships": () => <GenericContent title="Memberships" icon={Crown} />,
    "/subscriptions": () => (
      <GenericContent title="Subscriptions" icon={CreditCard} />
    ),

    // Business Account
    "/business/overview": () => <BusinessOverviewContent />,
    "/business/setup": () => <BusinessSetupContent />,
    "/business/events": () => <EventsContent />,
    "/brands": () => <BrandsContent />,
    "/business/services": () => (
      <GenericContent title="Services" icon={Settings} />
    ),
    "/business/subscribers": () => (
      <GenericContent title="Subscribers" icon={UserCheck} />
    ),
    "/business/team": () => <GenericContent title="Team" icon={Users} />,
    "/business/notifications/create": () => (
      <GenericContent title="Create Notification" icon={Plus} />
    ),
    "/business/history": () => (
      <GenericContent title="History" icon={History} />
    ),
    "/business/settings": () => <GenericContent title="Settings" icon={Cog} />,

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
