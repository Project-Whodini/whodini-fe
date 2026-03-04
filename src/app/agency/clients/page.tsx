'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CreateClientForm, type Client } from './create';
import { ShowClient } from './show';
import { UpdateClientForm } from './update';

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'client_1',
    name: 'Tech Startup Inc',
    email: 'contact@techstartup.com',
    phone: '+1 (555) 100-1001',
    industry: 'Technology',
    website: 'https://techstartup.com',
    status: 'active',
    joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    notes:
      'High-growth startup focused on AI solutions. Regular monthly check-ins.',
    agencyLabel: 'Demo Agency',
    assignedServices: [
      'Website Design & Development',
      'Digital Marketing Campaign',
    ],
    assignedTeamMembers: ['Michael Chen', 'David Thompson'],
  },
  {
    id: 'client_2',
    name: 'E-Commerce Plus',
    email: 'hello@ecommerceplus.com',
    phone: '+1 (555) 200-2002',
    industry: 'Retail',
    website: 'https://ecommerceplus.com',
    status: 'active',
    joinedAt: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Multi-channel retail platform. Seasonal campaign planning.',
    agencyLabel: 'Demo Agency',
    assignedServices: ['UX/UI Design', 'Content Writing & Strategy'],
    assignedTeamMembers: ['Sarah Johnson', 'Emily Rodriguez'],
  },
  {
    id: 'client_3',
    name: 'Health Solutions',
    email: 'info@healthsolutions.com',
    phone: '+1 (555) 300-3003',
    industry: 'Healthcare',
    status: 'active',
    joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    notes: 'Healthcare provider network. Compliance-focused projects.',
    agencyLabel: 'Demo Agency',
    assignedServices: ['Business Consulting'],
    assignedTeamMembers: ['Emily Rodriguez', 'Jessica Williams'],
  },
];

type ViewState = 'list' | 'create' | 'show' | 'update';

const AVAILABLE_SERVICES = [
  'Logo & Branding Design',
  'Website Design & Development',
  'Digital Marketing Campaign',
  'Content Writing & Strategy',
  'UX/UI Design',
  'Business Consulting',
];

const AVAILABLE_TEAM_MEMBERS = [
  'Sarah Johnson',
  'Michael Chen',
  'Emily Rodriguez',
  'David Thompson',
  'Jessica Williams',
  'Alex Martinez',
];

export default function AgencyClientsPage() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [view, setView] = useState<ViewState>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const agenсyName = 'Demo Agency';

  const handleCreateClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
    setView('list');
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setView('show');
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setView('update');
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setView('list');
    setSelectedClient(null);
  };

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <CreateClientForm
            agencyName={agenсyName}
            availableServices={AVAILABLE_SERVICES}
            availableTeamMembers={AVAILABLE_TEAM_MEMBERS}
            onCreateClient={handleCreateClient}
            onCancel={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  if (view === 'show' && selectedClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <ShowClient
          client={selectedClient}
          onClose={() => {
            setView('list');
            setSelectedClient(null);
          }}
          onEdit={handleEditClient}
        />
      </div>
    );
  }

  if (view === 'update' && selectedClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <UpdateClientForm
            client={selectedClient}
            availableServices={AVAILABLE_SERVICES}
            availableTeamMembers={AVAILABLE_TEAM_MEMBERS}
            onUpdateClient={handleUpdateClient}
            onCancel={() => {
              setView('list');
              setSelectedClient(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Clients
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage client relationships for{' '}
              <span className="font-semibold">{agenсyName}</span>
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Client
          </Button>
        </div>

        {clients.length === 0 ? (
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="text-6xl mb-4">👤</div>
              <CardTitle className="text-xl font-semibold text-neutral-900 mb-2">
                No Clients Yet
              </CardTitle>
              <CardDescription className="text-neutral-600 mb-6">
                Add your first client to start managing projects and revenue.
              </CardDescription>
              <Button
                onClick={() => setView('create')}
                className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Client
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {clients.map((client) => (
              <Card
                key={client.id}
                onClick={() => handleViewClient(client)}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d] cursor-pointer transition-all"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ff5f6d] to-[#ffc371] flex items-center justify-center text-white font-semibold text-sm">
                          {client.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {client.name}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {client.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:justify-end">
                      <Badge
                        className={
                          client.status === 'active'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                        }
                      >
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200 text-sm text-neutral-600">
                    <p>{client.email}</p>
                    {client.phone && <p>{client.phone}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
