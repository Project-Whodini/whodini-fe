'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  status: 'active' | 'inactive';
  joinedAt: string;
  notes?: string;
  agencyLabel: string;
  assignedServices: string[];
  assignedTeamMembers: string[];
};

interface CreateClientFormProps {
  agencyName: string;
  availableServices: string[];
  availableTeamMembers: string[];
  onCreateClient: (client: Client) => void;
  onCancel: () => void;
}

export function CreateClientForm({
  agencyName,
  availableServices,
  availableTeamMembers,
  onCreateClient,
  onCancel,
}: CreateClientFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [notes, setNotes] = useState('');
  const [assignedServices, setAssignedServices] = useState<string[]>([]);
  const [assignedTeamMembers, setAssignedTeamMembers] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setAssignedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const toggleMember = (member: string) => {
    setAssignedTeamMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleSubmit = () => {
    const cleanName = name.trim();
    if (!cleanName || !email.trim()) return;

    const newClient: Client = {
      id: `client_${Date.now()}`,
      name: cleanName,
      email: email.trim(),
      phone: phone.trim(),
      industry: industry.trim(),
      website: website.trim() || undefined,
      status,
      joinedAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
      agencyLabel: agencyName,
      assignedServices,
      assignedTeamMembers,
    };

    onCreateClient(newClient);

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setIndustry('Technology');
    setWebsite('');
    setStatus('active');
    setNotes('');
    setAssignedServices([]);
    setAssignedTeamMembers([]);
  };

  return (
    <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-neutral-900">
          Add New Client
        </CardTitle>
        <CardDescription className="text-sm text-neutral-600">
          Enter client details to onboard a new account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="client-name"
              className="text-sm font-medium text-neutral-700"
            >
              Client Name *
            </Label>
            <Input
              id="client-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Company name"
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="client-email"
              className="text-sm font-medium text-neutral-700"
            >
              Email Address *
            </Label>
            <Input
              id="client-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@company.com"
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="client-phone"
              className="text-sm font-medium text-neutral-700"
            >
              Phone Number
            </Label>
            <Input
              id="client-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="rounded-lg border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="client-industry"
              className="text-sm font-medium text-neutral-700"
            >
              Industry
            </Label>
            <select
              id="client-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
            >
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="client-website"
              className="text-sm font-medium text-neutral-700"
            >
              Website
            </Label>
            <Input
              id="client-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://company.com"
              className="rounded-lg border-neutral-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="client-status"
            className="text-sm font-medium text-neutral-700"
          >
            Status
          </Label>
          <select
            id="client-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="client-notes"
            className="text-sm font-medium text-neutral-700"
          >
            Notes
          </Label>
          <textarea
            id="client-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff5f6d] focus:border-transparent"
            placeholder="Additional notes about the client..."
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-700">
            Assign Services
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-neutral-200 rounded-lg p-3 bg-neutral-50 max-h-40 overflow-y-auto">
            {availableServices.map((service) => (
              <label
                key={service}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={assignedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="w-4 h-4 accent-[#ff5f6d] rounded"
                />
                <span className="text-sm text-neutral-700">{service}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-neutral-700">
            Assign Team Members
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-neutral-200 rounded-lg p-3 bg-neutral-50 max-h-40 overflow-y-auto">
            {availableTeamMembers.map((member) => (
              <label
                key={member}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={assignedTeamMembers.includes(member)}
                  onChange={() => toggleMember(member)}
                  className="w-4 h-4 accent-[#ff5f6d] rounded"
                />
                <span className="text-sm text-neutral-700">{member}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-neutral-200">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-neutral-300 hover:bg-neutral-50 rounded-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
