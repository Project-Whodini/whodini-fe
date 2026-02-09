"use client";

import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Building2,
  Ticket,
  Briefcase,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
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
} from "lucide-react";

const ACCOUNT_TYPES = [
  {
    id: "personal",
    label: "Personal Account",
    initials: "PA",
    digitalId: "WD-P-x8m9n2k5",
  },
  {
    id: "business",
    label: "Business/Brand",
    initials: "BB",
    digitalId: "WD-B-a42741f6",
  },
  {
    id: "community",
    label: "Community/Organization",
    initials: "CO",
    digitalId: "WD-C-aee090b3",
  },
  {
    id: "event",
    label: "Event Organizer",
    initials: "EO",
    digitalId: "WD-O-85203475",
  },
  { id: "agency", label: "Agency", initials: "AG", digitalId: "WD-A-23dd8aa4" },
] as const;

const NAV_ITEMS = {
  personal: [
    { label: "Home", href: "/", icon: Home },
    { label: "Games", href: "/games", icon: Gamepad2 },
    { label: "Rewards", href: "/rewards", icon: Gift },
    { label: "Activity", href: "/activity", icon: Activity },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Community", href: "/community", icon: Users },
    { label: "Memberships", href: "/memberships", icon: Crown },
    { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  ],
  business: [
    { label: "Overview", href: "/business/overview", icon: TrendingUp },
    { label: "Setup", href: "/business/setup", icon: Wrench },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Brands", href: "/brands", icon: Building2 },
    { label: "Services", href: "/business/services", icon: Settings },
    { label: "Subscribers", href: "/business/subscribers", icon: UserCheck },
    { label: "Team", href: "/business/team", icon: Users },
    {
      label: "Create Notification",
      href: "/business/notifications/create",
      icon: Plus,
    },
    { label: "History", href: "/business/history", icon: History },
    { label: "Settings", href: "/business/settings", icon: Cog },
  ],
  community: [
    { label: "Overview", href: "/community/overview", icon: TrendingUp },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Chapters", href: "/community/chapters", icon: BookOpen },
    { label: "Members", href: "/community/members", icon: Users },
    { label: "Team", href: "/community/team", icon: UserCheck },
    { label: "Directory", href: "/community/directory", icon: FolderOpen },
    {
      label: "Message Board",
      href: "/community/message-board",
      icon: MessageSquare,
    },
    { label: "Message", href: "/community/message", icon: Mail },
    { label: "Services", href: "/community/services", icon: Settings },
    { label: "History", href: "/community/history", icon: History },
    { label: "Settings", href: "/community/settings", icon: Cog },
  ],
  event: [
    { label: "Overview", href: "/event/overview", icon: TrendingUp },
    { label: "Events", href: "/events", icon: Calendar },
    { label: "Vendors", href: "/event/vendors", icon: Truck },
    { label: "Services", href: "/event/services", icon: Settings },
    { label: "Team", href: "/event/team", icon: Users },
    { label: "Settings", href: "/event/settings", icon: Cog },
  ],
  agency: [
    { label: "Overview", href: "/agency/overview", icon: TrendingUp },
    { label: "Clients", href: "/agency/clients", icon: Users },
    { label: "Services", href: "/agency/services", icon: Settings },
    { label: "Team", href: "/agency/team", icon: UserCheck },
    { label: "Settings", href: "/agency/settings", icon: Cog },
  ],
};

const DROPDOWN_ANIMATION_MS = 200;

interface SideBarProps {
  onNavigate?: (path: string) => void;
  currentPath?: string;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function SideBar({
  onNavigate,
  currentPath = "/",
  expanded: controlledExpanded,
  onExpandedChange,
}: SideBarProps) {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(controlledExpanded ?? true);

  // Sync with controlled expanded state
  useEffect(() => {
    if (controlledExpanded !== undefined) {
      setExpanded(controlledExpanded);
    }
  }, [controlledExpanded]);

  // Notify parent of expanded state changes
  const handleExpandedChange = (newExpanded: boolean) => {
    setExpanded(newExpanded);
    onExpandedChange?.(newExpanded);
  };
  const [accountTypeId, setAccountTypeId] = useState<string>("personal");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownClosing, setDropdownClosing] = useState(false);
  const [dropdownEntered, setDropdownEntered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedAccount =
    ACCOUNT_TYPES.find((a) => a.id === accountTypeId) ?? ACCOUNT_TYPES[0];
  const currentNavItems =
    NAV_ITEMS[accountTypeId as keyof typeof NAV_ITEMS] ?? NAV_ITEMS.personal;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate in when opening
  useEffect(() => {
    if (dropdownOpen && !dropdownClosing) {
      setDropdownEntered(false);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setDropdownEntered(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    if (!dropdownOpen) setDropdownEntered(false);
  }, [dropdownOpen, dropdownClosing]);

  // Run close animation then unmount
  useEffect(() => {
    if (!dropdownClosing) return;
    const id = setTimeout(() => {
      setDropdownOpen(false);
      setDropdownClosing(false);
    }, DROPDOWN_ANIMATION_MS);
    return () => clearTimeout(id);
  }, [dropdownClosing]);

  const closeDropdown = () => {
    if (!dropdownOpen) return;
    setDropdownClosing(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  if (!mounted) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#ff5f6d] transition-[width] duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden z-40" />
    );
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen flex flex-col items-center py-8 shadow-xl rounded-r-2xl bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] overflow-hidden transition-[width] duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)] z-40 ${
        expanded ? "w-64" : "w-[4.5rem]"
      }`}
    >
      <div
        className={`mb-4 flex flex-col items-center w-full flex-shrink-0 ${expanded ? "px-4" : "px-2"}`}
        ref={dropdownRef}
      >
        {/* Account type dropdown */}
        <div className="relative w-full flex justify-center">
          <button
            type="button"
            onClick={() =>
              dropdownOpen ? closeDropdown() : setDropdownOpen(true)
            }
            className={`flex items-center gap-3 py-2.5 bg-white/95 rounded-xl shadow-md ring-1 ring-black/5 hover:bg-white transition text-left ${
              expanded ? "w-full px-4" : "w-10 h-10 justify-center px-0"
            }`}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-label={`Account type: ${selectedAccount.label}`}
            title={!expanded ? selectedAccount.label : undefined}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5f6d]/20 to-[#ffc371]/30 text-[#c24150] font-bold text-sm">
              {selectedAccount.initials}
            </span>
            {expanded && (
              <>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-medium text-neutral-900 truncate">
                    {selectedAccount.label}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {selectedAccount.digitalId}
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>

          {/* Dropdown panel - position to the right when collapsed */}
          {dropdownOpen && (
            <ul
              role="listbox"
              aria-label="Account type options"
              className={`absolute py-1.5 bg-white rounded-xl shadow-lg ring-1 ring-black/10 overflow-hidden z-50 origin-top transition-all duration-200 ease-out ${
                expanded
                  ? "left-0 right-0 top-full mt-1.5"
                  : "left-full top-0 ml-1.5 min-w-[12rem]"
              } ${
                dropdownClosing || !dropdownEntered
                  ? "opacity-0 scale-[0.96] -translate-y-1"
                  : "opacity-100 scale-100 translate-y-0"
              }`}
            >
              {ACCOUNT_TYPES.map((type) => {
                const isSelected = type.id === accountTypeId;
                return (
                  <li key={type.id} role="option" aria-selected={isSelected}>
                    <button
                      type="button"
                      onClick={() => {
                        setAccountTypeId(type.id);
                        closeDropdown();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition ${
                        isSelected
                          ? "bg-[#ff5f6d] text-white font-medium"
                          : "text-neutral-800 hover:bg-neutral-100"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isSelected
                            ? "bg-white/25 text-white"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {type.initials}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate">{type.label}</div>
                        <div
                          className={`text-xs truncate ${
                            isSelected ? "text-white/70" : "text-neutral-500"
                          }`}
                        >
                          {type.digitalId}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Scrollable Navigation Section */}
      <div className="flex-1 overflow-y-scroll overflow-x-hidden w-full min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav
          className={`flex flex-col gap-2 w-full pb-4 ${expanded ? "px-4" : "px-2 items-center"}`}
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
                    ? "bg-white/20 ring-1 ring-white/30"
                    : "hover:bg-white/10"
                } ${
                  expanded
                    ? "py-2 px-4 w-full text-left"
                    : "w-10 h-10 justify-center p-0"
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
        className={`w-full flex flex-col items-center gap-2 flex-shrink-0 ${expanded ? "px-4" : "px-2"}`}
      >
        <button
          type="button"
          onClick={() => handleExpandedChange(!expanded)}
          className={`flex items-center justify-center text-white rounded-xl border border-white/30 hover:bg-white/20 transition ${
            expanded ? "w-full py-2 gap-2" : "w-10 h-10"
          }`}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <ChevronLeft className="w-5 h-5 shrink-0" />
          ) : (
            <ChevronRight className="w-5 h-5 shrink-0" />
          )}
          {expanded && <span className="font-semibold text-sm">Collapse</span>}
        </button>
        <button
          type="button"
          title="Sign out"
          className={`flex items-center justify-center bg-white/20 text-white font-semibold rounded-xl shadow-md border border-white/30 hover:bg-white/30 transition ${
            expanded ? "w-full py-2 gap-2" : "w-10 h-10"
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" aria-hidden />
          {expanded && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
