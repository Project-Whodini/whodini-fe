'use client';

import { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  Building2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Gift,
  Activity,
  Bell,
  Crown,
  CreditCard,
  TrendingUp,
  Settings,
  Plus,
  History,
  UserCheck,
  Cog,
  BookOpen,
  FolderOpen,
  MessageSquare,
  Mail,
  Truck,
  Wrench,
  Menu,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ACCOUNT_TYPES = [
  {
    id: 'personal',
    label: 'Personal Account',
    initials: 'PA',
    digitalId: 'WD-P-x8m9n2k5',
  },
  {
    id: 'business',
    label: 'Business/Brand',
    initials: 'BB',
    digitalId: 'WD-B-a42741f6',
  },
  {
    id: 'community',
    label: 'Community/Organization',
    initials: 'CO',
    digitalId: 'WD-C-aee090b3',
  },
  {
    id: 'event',
    label: 'Event Organizer',
    initials: 'EO',
    digitalId: 'WD-O-85203475',
  },
  { id: 'agency', label: 'Agency', initials: 'AG', digitalId: 'WD-A-23dd8aa4' },
] as const;

const NAV_ITEMS = {
  personal: [
    { label: 'Overview', href: '/', icon: TrendingUp },
    { label: 'Games', href: '/games', icon: Gamepad2 },
    { label: 'Business & Rewards', href: '/rewards', icon: Gift },
    { label: 'Activity', href: '/activity', icon: Activity },
    { label: 'Events', href: '/events', icon: Calendar },
    { label: 'Notifications', href: '/notifications', icon: Bell },
    { label: 'Community', href: '/community', icon: Users },
    { label: 'Memberships', href: '/memberships', icon: Crown },
    { label: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  ],
  business: [
    { label: 'Overview', href: '/business/overview', icon: TrendingUp },
    { label: 'Events', href: '/business/events', icon: Calendar },
    { label: 'Brands', href: '/business/brands', icon: Building2 },
    {
      label: 'Services & Products',
      href: '/business/services',
      icon: Settings,
    },
    { label: 'Subscribers', href: '/business/subscribers', icon: UserCheck },
    { label: 'Team', href: '/business/team', icon: Users },
    {
      label: 'Create Notification',
      href: '/business/notifications/create',
      icon: Plus,
    },
    { label: 'History', href: '/business/history', icon: History },
    // { label: 'Setup', href: '/business/setup', icon: Wrench },

    { label: 'Settings', href: '/business/settings', icon: Cog },
  ],
  community: [
    { label: 'Overview', href: '/community/overview', icon: TrendingUp },
    { label: 'Events', href: '/community/events', icon: Calendar },
    { label: 'Chapters', href: '/community/chapters', icon: BookOpen },
    { label: 'Members', href: '/community/members', icon: Users },
    { label: 'Team', href: '/community/team', icon: UserCheck },
    { label: 'Directory', href: '/community/directory', icon: FolderOpen },
    {
      label: 'Message Board',
      href: '/community/message-board',
      icon: MessageSquare,
    },
    // { label: 'Message', href: '/community/message', icon: Mail },
    { label: 'Services', href: '/community/services', icon: Settings },
    { label: 'History', href: '/community/history', icon: History },
    { label: 'Settings', href: '/community/settings', icon: Cog },
  ],
  event: [
    { label: 'Overview', href: '/event/overview', icon: TrendingUp },
    { label: 'Events', href: '/event/events', icon: Calendar },
    { label: 'Vendors', href: '/event/vendors', icon: Truck },
    { label: 'Services', href: '/event/services', icon: Settings },
    { label: 'Team', href: '/event/team', icon: Users },
    { label: 'Settings', href: '/event/settings', icon: Cog },
  ],
  agency: [
    { label: 'Overview', href: '/agency/overview', icon: TrendingUp },
    { label: 'Clients', href: '/agency/clients', icon: Users },
    { label: 'Services', href: '/agency/services', icon: Settings },
    { label: 'Team', href: '/agency/team', icon: UserCheck },
    { label: 'Settings', href: '/agency/settings', icon: Cog },
  ],
};

interface SideBarProps {
  onNavigate?: (path: string) => void;
  currentPath?: string;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function SideBar({
  onNavigate,
  currentPath = '/',
  expanded: controlledExpanded,
  onExpandedChange,
}: SideBarProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(true);
  const expanded = controlledExpanded ?? uncontrolledExpanded;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notify parent of expanded state changes
  const handleExpandedChange = (newExpanded: boolean) => {
    if (controlledExpanded === undefined) setUncontrolledExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };
  const [accountTypeId, setAccountTypeId] = useState<string>('personal');

  const selectedAccount =
    ACCOUNT_TYPES.find((a) => a.id === accountTypeId) ?? ACCOUNT_TYPES[0];
  const currentNavItems =
    NAV_ITEMS[accountTypeId as keyof typeof NAV_ITEMS] ?? NAV_ITEMS.personal;

  const handleAccountTypeChange = (nextAccountTypeId: string) => {
    setAccountTypeId(nextAccountTypeId);
    const overviewPath =
      NAV_ITEMS[nextAccountTypeId as keyof typeof NAV_ITEMS]?.[0]?.href ?? '/';
    onNavigate?.(overviewPath);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOpenAccountType = (event: Event) => {
      const customEvent = event as CustomEvent<{ accountTypeId?: string }>;
      const nextAccountTypeId = customEvent.detail?.accountTypeId;
      if (!nextAccountTypeId) return;
      if (!(nextAccountTypeId in NAV_ITEMS)) return;
      handleAccountTypeChange(nextAccountTypeId);
    };

    window.addEventListener(
      'whodini:open-account-type',
      handleOpenAccountType as EventListener
    );

    return () => {
      window.removeEventListener(
        'whodini:open-account-type',
        handleOpenAccountType as EventListener
      );
    };
  }, []);

  return (
    <>
      {/* Tablet + Mobile Header */}
      <header className="xl:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-gradient-to-r from-[#ff5f6d] to-[#ffc371] px-3 sm:px-4 border-b border-white/20">
        <div className="h-full flex items-center justify-between gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/30 bg-white/15 text-white hover:bg-white/25 transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="p-0 w-[88vw] max-w-sm border-r-0 bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] text-white"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="h-full flex flex-col min-h-0">
                <div className="p-4 border-b border-white/20">
                  <div className="text-sm font-semibold mb-2">Account Type</div>
                  <Select
                    value={accountTypeId}
                    onValueChange={handleAccountTypeChange}
                  >
                    <SelectTrigger className="w-full bg-white text-neutral-900 border-white/50">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="z-[60]">
                      {ACCOUNT_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="mt-2 text-xs text-white/85 truncate">
                    {
                      ACCOUNT_TYPES.find((type) => type.id === accountTypeId)
                        ?.digitalId
                    }
                  </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-3 space-y-2">
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <button
                          type="button"
                          onClick={() => onNavigate?.(item.href)}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                            isActive
                              ? 'bg-white/25 ring-1 ring-white/40'
                              : 'hover:bg-white/15'
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0" aria-hidden />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      </SheetClose>
                    );
                  })}
                </nav>

                <div className="p-3 border-t border-white/20">
                  <button
                    type="button"
                    title="Sign out"
                    className="w-full flex items-center justify-center bg-white/20 text-white font-semibold rounded-xl shadow-md border border-white/30 hover:bg-white/30 transition py-2.5 gap-2"
                  >
                    <LogOut className="w-5 h-5 shrink-0" aria-hidden />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <div className="text-white font-semibold truncate">Whodini</div>
            <div className="text-white/80 text-xs truncate">
              {selectedAccount.label}
            </div>
          </div>

          <div className="w-36 sm:w-44">
            <Select
              value={accountTypeId}
              onValueChange={handleAccountTypeChange}
            >
              <SelectTrigger className="h-9 w-full bg-white text-neutral-900 border-white/50">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent className="z-[60]">
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden xl:flex fixed left-0 top-0 h-screen flex-col items-center py-8 shadow-xl bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] overflow-hidden transition-[width] duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] z-40 ${
          expanded ? 'w-64' : 'w-[4.5rem]'
        }`}
      >
        <div
          className={`mb-4 flex flex-col items-center w-full flex-shrink-0 ${expanded ? 'px-4' : 'px-2'}`}
        >
          <div className="w-full">
            <Select
              value={accountTypeId}
              onValueChange={handleAccountTypeChange}
            >
              <SelectTrigger
                className={`bg-white text-neutral-900 border-white/50 ${
                  expanded ? 'w-full' : 'w-10 h-10 p-0 justify-center'
                }`}
                aria-label={`Account type: ${selectedAccount.label}`}
                title={!expanded ? selectedAccount.label : undefined}
              >
                {expanded ? (
                  <SelectValue placeholder="Select account type" />
                ) : (
                  <span className="font-bold text-xs">
                    {selectedAccount.initials}
                  </span>
                )}
              </SelectTrigger>
              <SelectContent className="z-[60]">
                {ACCOUNT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {expanded && (
              <div className="mt-2 px-1 text-xs text-white/85 truncate">
                {selectedAccount.digitalId}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll overflow-x-hidden w-full min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <nav
            className={`flex flex-col gap-2 w-full pb-4 ${expanded ? 'px-4' : 'px-2 items-center'}`}
          >
            {currentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => onNavigate?.(item.href)}
                  title={!expanded ? item.label : undefined}
                  className={`text-white font-medium rounded-xl transition flex items-center gap-3 ${
                    isActive
                      ? 'bg-white/20 ring-1 ring-white/30'
                      : 'hover:bg-white/10'
                  } ${
                    expanded
                      ? 'py-2 px-4 w-full text-left'
                      : 'w-10 h-10 justify-center p-0'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" aria-hidden />
                  {expanded && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        <div
          className={`w-full flex flex-col items-center gap-2 flex-shrink-0 ${expanded ? 'px-4' : 'px-2'}`}
        >
          <button
            type="button"
            onClick={() => handleExpandedChange(!expanded)}
            className={`flex items-center justify-center text-white rounded-xl border border-white/30 hover:bg-white/20 transition ${
              expanded ? 'w-full py-2 gap-2' : 'w-10 h-10'
            }`}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {expanded ? (
              <ChevronLeft className="w-5 h-5 shrink-0" />
            ) : (
              <ChevronRight className="w-5 h-5 shrink-0" />
            )}
            {expanded && (
              <span className="font-semibold text-sm">Collapse</span>
            )}
          </button>
          <button
            type="button"
            title="Sign out"
            className={`flex items-center justify-center bg-white/20 text-white font-semibold rounded-xl shadow-md border border-white/30 hover:bg-white/30 transition ${
              expanded ? 'w-full py-2 gap-2' : 'w-10 h-10'
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" aria-hidden />
            {expanded && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
