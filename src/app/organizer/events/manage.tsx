'use client';

import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  XCircle,
  Clock,
  Users,
  UserX,
  Download,
  MoreVertical,
  Mail,
  Phone,
  CalendarCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { OrganizerEvent } from './create';

export type RegistrationStatus = 'registered' | 'cancelled';

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt: string;
  status: RegistrationStatus;
  ticketType: OrganizerEvent['paymentType'];
}

export function generateSeedRegistrations(
  event: OrganizerEvent
): Registration[] {
  const ticketType = event.paymentType;
  const seeds: Record<string, Registration[]> = {
    org_evt_1: [
      {
        id: 'r1',
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        phone: '+1 555-0101',
        registeredAt: new Date(Date.now() - 20 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r2',
        name: 'Priya Sharma',
        email: 'priya.s@example.com',
        phone: '+1 555-0102',
        registeredAt: new Date(Date.now() - 18 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r3',
        name: 'Marcus Tran',
        email: 'm.tran@example.com',
        registeredAt: new Date(Date.now() - 15 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r4',
        name: 'Sofia Reyes',
        email: 'sofia.r@example.com',
        phone: '+1 555-0104',
        registeredAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        status: 'cancelled',
        ticketType,
      },
      {
        id: 'r5',
        name: 'Ethan Brooks',
        email: 'ethan.b@example.com',
        registeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r6',
        name: 'Aisha Okonkwo',
        email: 'aisha.o@example.com',
        phone: '+1 555-0106',
        registeredAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r7',
        name: 'Liam Nguyen',
        email: 'liam.n@example.com',
        registeredAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
    ],
    org_evt_2: [
      {
        id: 'r8',
        name: 'Clara Jensen',
        email: 'clara.j@example.com',
        phone: '+1 555-0108',
        registeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r9',
        name: 'Omar Hassan',
        email: 'omar.h@example.com',
        registeredAt: new Date(Date.now() - 8 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r10',
        name: 'Nadia Petrov',
        email: 'nadia.p@example.com',
        phone: '+1 555-0110',
        registeredAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r11',
        name: 'Tyler Kim',
        email: 't.kim@example.com',
        registeredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        status: 'cancelled',
        ticketType,
      },
    ],
    org_evt_3: [
      {
        id: 'r12',
        name: 'Isabelle Dupont',
        email: 'isabelle.d@example.com',
        registeredAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r13',
        name: 'Raj Patel',
        email: 'raj.p@example.com',
        phone: '+1 555-0113',
        registeredAt: new Date(Date.now() - 12 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r14',
        name: 'Mei Lin',
        email: 'mei.l@example.com',
        registeredAt: new Date(Date.now() - 9 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r15',
        name: 'Carlos Mendez',
        email: 'carlos.m@example.com',
        phone: '+1 555-0115',
        registeredAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r16',
        name: 'Yuki Tanaka',
        email: 'yuki.t@example.com',
        registeredAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        status: 'registered',
        ticketType,
      },
      {
        id: 'r17',
        name: 'Dana White',
        email: 'dana.w@example.com',
        phone: '+1 555-0117',
        registeredAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        status: 'cancelled',
        ticketType,
      },
    ],
  };
  return seeds[event.id] ?? [];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_CONFIG: Record<
  RegistrationStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  registered: {
    label: 'Registered',
    icon: <Clock className="w-3.5 h-3.5" />,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  cancelled: {
    label: 'Cancelled',
    icon: <XCircle className="w-3.5 h-3.5" />,
    className: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  },
};

type FilterTab = 'all' | 'registered' | 'cancelled';

interface ManageRegistrationsProps {
  event: OrganizerEvent;
  onBack: () => void;
}

export function ManageRegistrations({
  event,
  onBack,
}: ManageRegistrationsProps) {
  const [registrations, setRegistrations] = useState<Registration[]>(() =>
    generateSeedRegistrations(event)
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterTab>('all');

  const counts = useMemo(
    () => ({
      all: registrations.length,
      registered: registrations.filter((r) => r.status === 'registered').length,
      cancelled: registrations.filter((r) => r.status === 'cancelled').length,
    }),
    [registrations]
  );

  const filtered = useMemo(() => {
    let list = registrations;
    if (filter !== 'all') list = list.filter((r) => r.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [registrations, filter, search]);

  const updateStatus = (id: string, status: RegistrationStatus) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const FILTER_TABS: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'registered', label: 'Registered' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="shrink-0 mt-0.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back
          </Button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
              Manage Registrations
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5 truncate">
              {event.title}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-100">
                <Users className="w-4 h-4 text-neutral-600" />
              </div>
              <div>
                <div className="text-xs text-neutral-500">Total</div>
                <div className="text-xl font-bold text-neutral-900">
                  {counts.all}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-neutral-500">Registered</div>
                <div className="text-xl font-bold text-neutral-900">
                  {counts.registered}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-neutral-100">
                <UserX className="w-4 h-4 text-neutral-500" />
              </div>
              <div>
                <div className="text-xs text-neutral-500">Cancelled</div>
                <div className="text-xl font-bold text-neutral-900">
                  {counts.cancelled}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capacity bar */}
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium text-neutral-700">Capacity</span>
              <span className="text-neutral-500">
                {counts.all} / {event.capacity} seats
              </span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-[#ff5f6d] h-2.5 rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (counts.all / event.capacity) * 100).toFixed(1)}%`,
                }}
              />
            </div>
            <div className="mt-1.5 text-xs text-neutral-400 text-right">
              {((counts.all / event.capacity) * 100).toFixed(0)}% filled
            </div>
          </CardContent>
        </Card>

        {/* Table card */}
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
          <CardHeader className="p-4 sm:p-5 border-b border-neutral-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-neutral-900">
                  Attendee List
                </CardTitle>
                <CardDescription className="text-neutral-500 text-sm mt-0.5">
                  {filtered.length}{' '}
                  {filter === 'all' ? 'total' : filter.replace('_', ' ')}{' '}
                  registrant{filtered.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name or email…"
                    className="pl-8 h-9 text-sm border-neutral-200"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-9 border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  title="Export CSV"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 mt-3 p-1 bg-neutral-100 rounded-lg w-fit">
              {FILTER_TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    filter === t.key
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  {t.label}
                  <span
                    className={`ml-1.5 ${filter === t.key ? 'text-[#ff5f6d]' : 'text-neutral-400'}`}
                  >
                    {counts[t.key]}
                  </span>
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="py-14 text-center text-neutral-400 text-sm">
                No registrants match your search.
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {filtered.map((reg) => {
                  const cfg = STATUS_CONFIG[reg.status];
                  return (
                    <li
                      key={reg.id}
                      className="flex items-center gap-3 px-4 sm:px-5 py-3.5 hover:bg-neutral-50 transition-colors"
                    >
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-[#ff5f6d]/10 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-[#ff5f6d]">
                          {reg.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="text-sm font-medium text-neutral-900 truncate">
                            {reg.name}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${
                              reg.ticketType === 'paid'
                                ? 'bg-[#ff5f6d]/10 text-[#ff5f6d]'
                                : 'bg-neutral-100 text-neutral-500'
                            }`}
                          >
                            {reg.ticketType === 'paid'
                              ? new Intl.NumberFormat(undefined, {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0,
                                }).format(event.price)
                              : 'Free'}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-neutral-500">
                          <span className="flex items-center gap-1 min-w-0 truncate">
                            <Mail className="w-3 h-3 shrink-0" />
                            {reg.email}
                          </span>
                          {reg.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 shrink-0" />
                              {reg.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <CalendarCheck className="w-3 h-3 shrink-0" />
                            {formatDate(reg.registeredAt)}
                          </span>
                        </div>
                      </div>

                      {/* Status badge */}
                      <span
                        className={`hidden sm:flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}
                      >
                        {cfg.icon}
                        {cfg.label}
                      </span>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0 w-8 h-8 p-0 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          {reg.status !== 'cancelled' && (
                            <DropdownMenuItem
                              className="gap-2 text-red-600 focus:text-red-600"
                              onClick={() => updateStatus(reg.id, 'cancelled')}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Cancel
                            </DropdownMenuItem>
                          )}
                          {reg.status === 'cancelled' && (
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => updateStatus(reg.id, 'registered')}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              Restore
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
