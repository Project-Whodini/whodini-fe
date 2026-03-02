'use client';

import { useState } from 'react';
import {
  Calendar,
  MapPin,
  DollarSign,
  Globe,
  Users2,
  X,
  Edit,
  Users,
  Clock,
  Tag,
  Wrench,
  Store,
  UserCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { OrganizerEvent } from './create';
import type { Service } from '../services/create';
import type { Vendor } from '../vendors/create';
import type { TeamMember } from '../team/create';
import { ManageRegistrations } from './manage';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
}

interface ShowEventProps {
  event: OrganizerEvent;
  onClose: () => void;
  onEdit: (event: OrganizerEvent) => void;
  allServices?: Service[];
  allVendors?: Vendor[];
  allTeamMembers?: TeamMember[];
}

export function ShowEvent({
  event,
  onClose,
  onEdit,
  allServices = [],
  allVendors = [],
  allTeamMembers = [],
}: ShowEventProps) {
  const [showRegistrations, setShowRegistrations] = useState(false);

  const attachedServices = allServices.filter((s) =>
    event.serviceIds?.includes(s.id)
  );
  const attachedVendors = allVendors.filter((v) =>
    event.vendorIds?.includes(v.id)
  );
  const attachedTeamMembers = allTeamMembers.filter((m) =>
    event.teamMemberIds?.includes(m.id)
  );

  if (showRegistrations) {
    return (
      <ManageRegistrations
        event={event}
        onBack={() => setShowRegistrations(false)}
      />
    );
  }
  const getLocationIcon = () => {
    if (event.locationType === 'virtual')
      return <Globe className="w-5 h-5 text-neutral-400" />;
    if (event.locationType === 'hybrid')
      return <Users2 className="w-5 h-5 text-neutral-400" />;
    return <MapPin className="w-5 h-5 text-neutral-400" />;
  };

  const getEventEmoji = () => {
    if (event.locationType === 'virtual') return '💻';
    if (event.locationType === 'hybrid') return '🔄';
    return '🎪';
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg max-w-3xl mx-auto">
      <CardHeader className="border-b border-neutral-200 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <div className="text-4xl sm:text-5xl shrink-0">
              {getEventEmoji()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-2 flex-wrap">
                <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {event.title}
                </CardTitle>
                <Badge
                  variant={
                    event.paymentType === 'paid' ? 'default' : 'secondary'
                  }
                  className={
                    event.paymentType === 'paid'
                      ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90'
                      : ''
                  }
                >
                  {event.paymentType === 'paid'
                    ? formatCurrency(event.price)
                    : 'Free'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
              </div>
              {event.description && (
                <p className="text-sm sm:text-base text-neutral-600">
                  {event.description}
                </p>
              )}
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="shrink-0 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-neutral-700">
                Start Date
              </div>
              <div className="text-base text-neutral-900">
                {formatDate(event.startsAt)}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-neutral-700">
                End Date
              </div>
              <div className="text-base text-neutral-900">
                {formatDate(event.endsAt)}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            {getLocationIcon()}
            <div>
              <div className="text-sm font-medium text-neutral-700">
                Location Type
              </div>
              <div className="text-base text-neutral-900 capitalize">
                {event.locationType.replace('_', ' ')}
              </div>
            </div>
          </div>

          {event.locationLabel && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-neutral-700">
                  Venue
                </div>
                <div className="text-base text-neutral-900">
                  {event.locationLabel}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-neutral-700">
                Capacity
              </div>
              <div className="text-base text-neutral-900">
                {event.capacity} attendees
              </div>
            </div>
          </div>

          {event.paymentType === 'paid' && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-neutral-400 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-neutral-700">
                  Ticket Price
                </div>
                <div className="text-base text-neutral-900">
                  {formatCurrency(event.price)}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-neutral-400 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-neutral-700">
                Category
              </div>
              <div className="text-base text-neutral-900">{event.category}</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-200">
          <div className="text-xs text-neutral-500">
            Organized by {event.organizerLabel}
          </div>
        </div>

        {attachedServices.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-neutral-400" />
              <div className="text-sm font-semibold text-neutral-700">
                Services
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {attachedServices.map((svc) => (
                <div
                  key={svc.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-800 truncate">
                      {svc.serviceName}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {svc.provider}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {svc.category}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      svc.status === 'available'
                        ? 'bg-green-100 text-green-700'
                        : svc.status === 'booked'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {svc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {attachedVendors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Store className="w-4 h-4 text-neutral-400" />
              <div className="text-sm font-semibold text-neutral-700">
                Vendors
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {attachedVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-neutral-800 truncate">
                      {vendor.businessName}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {vendor.contactPerson}
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      {vendor.category}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                      vendor.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : vendor.status === 'cancelled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {vendor.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {attachedTeamMembers.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-neutral-400" />
              <div className="text-sm font-semibold text-neutral-700">Team</div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {attachedTeamMembers.map((member) => {
                const getAccessColor = () => {
                  if (member.accessLevel === 'admin')
                    return 'bg-purple-100 text-purple-700';
                  if (member.accessLevel === 'manager')
                    return 'bg-blue-100 text-blue-700';
                  if (member.accessLevel === 'staff')
                    return 'bg-neutral-100 text-neutral-600';
                  return 'bg-neutral-50 text-neutral-500';
                };
                return (
                  <div
                    key={member.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-neutral-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-neutral-800 truncate">
                        {member.fullName}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">
                        {member.role}
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        {member.department}
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${getAccessColor()}`}
                    >
                      {member.accessLevel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button
            onClick={() => onEdit(event)}
            variant="outline"
            className="flex-1 border border-neutral-300 hover:bg-neutral-50 rounded-lg"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Event
          </Button>
          <Button
            onClick={() => setShowRegistrations(true)}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
          >
            Manage Registrations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
