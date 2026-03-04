'use client';

import { Users, TrendingUp, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MobileMetrics } from '@/components/app/MobileMetrics';

type Service = {
  id: string;
  serviceName: string;
  category: string;
  deliveryTime: string;
  status: 'available' | 'unavailable';
};

const SAMPLE_SERVICES: Service[] = [
  {
    id: 's1',
    serviceName: 'Logo & Branding Design',
    category: 'Branding',
    deliveryTime: '3 weeks',
    status: 'available',
  },
  {
    id: 's2',
    serviceName: 'Website Design & Development',
    category: 'Web Development',
    deliveryTime: '8 weeks',
    status: 'available',
  },
  {
    id: 's3',
    serviceName: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    deliveryTime: 'Ongoing',
    status: 'available',
  },
  {
    id: 's4',
    serviceName: 'Content Writing & Strategy',
    category: 'Content',
    deliveryTime: '2 weeks',
    status: 'available',
  },
  {
    id: 's5',
    serviceName: 'UX/UI Design',
    category: 'Web Design',
    deliveryTime: '6 weeks',
    status: 'available',
  },
  {
    id: 's6',
    serviceName: 'Business Consulting',
    category: 'Consulting',
    deliveryTime: 'Ongoing',
    status: 'available',
  },
];

type Client = {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive';
  monthlyRetainer: number;
};

const SAMPLE_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Tech Startup Inc',
    industry: 'Technology',
    status: 'active',
    monthlyRetainer: 5000,
  },
  {
    id: '2',
    name: 'E-Commerce Plus',
    industry: 'Retail',
    status: 'active',
    monthlyRetainer: 8000,
  },
  {
    id: '3',
    name: 'Health Solutions',
    industry: 'Healthcare',
    status: 'active',
    monthlyRetainer: 6500,
  },
];

export default function AgencyDashboardPage() {
  const agencyName = 'Demo Agency';

  const totalClients = SAMPLE_CLIENTS.length;
  const activeClients = SAMPLE_CLIENTS.filter(
    (c) => c.status === 'active'
  ).length;
  const availableServices = SAMPLE_SERVICES.filter(
    (s) => s.status === 'available'
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Agency Dashboard
          </h1>
          <p className="text-neutral-600 mt-1">
            Welcome to <span className="font-semibold">{agencyName}</span>
          </p>
        </div>

        <MobileMetrics
          className="mb-6"
          items={[
            {
              label: 'Total Clients',
              value: totalClients,
              icon: <Users className="w-4 h-4" />,
            },
            {
              label: 'Active Clients',
              value: activeClients,
              icon: <TrendingUp className="w-4 h-4" />,
              valueClassName: 'text-green-600',
            },
            {
              label: 'Services',
              value: availableServices,
              icon: <Settings className="w-4 h-4" />,
            },
          ]}
        />
        <div className="hidden sm:grid gap-6 sm:grid-cols-3 mb-8">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Total Clients
                </CardTitle>
                <Users className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-900">
                {totalClients}
              </div>
              <p className="text-xs text-neutral-500 mt-1">All clients</p>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Active Clients
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {activeClients}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Currently active</p>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-neutral-600">
                  Services
                </CardTitle>
                <Settings className="w-4 h-4 text-neutral-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-neutral-900">
                {availableServices}
              </div>
              <p className="text-xs text-neutral-500 mt-1">Available</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-neutral-900">
                  Quick Actions
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('whodini:navigate', {
                      detail: { path: '/agency/clients' },
                    })
                  )
                }
                className="w-full bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg justify-between"
              >
                <span>Manage Clients</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('whodini:navigate', {
                      detail: { path: '/agency/services' },
                    })
                  )
                }
                variant="outline"
                className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between"
              >
                <span>View Services</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('whodini:navigate', {
                      detail: { path: '/agency/team' },
                    })
                  )
                }
                variant="outline"
                className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between"
              >
                <span>Team Management</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('whodini:navigate', {
                      detail: { path: '/agency/settings' },
                    })
                  )
                }
                variant="outline"
                className="w-full border-neutral-300 hover:bg-neutral-50 rounded-lg justify-between"
              >
                <span>Settings</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
