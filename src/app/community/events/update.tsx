'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import type { CommunityEvent } from './page';

interface UpdateCommunityEventProps {
  event: CommunityEvent;
  onUpdate: (updated: CommunityEvent) => void;
  onCancel: () => void;
}

export function UpdateCommunityEvent({
  event,
  onUpdate,
  onCancel,
}: UpdateCommunityEventProps) {
  const [formData, setFormData] = useState<CommunityEvent>({ ...event });

  const handleSubmit = () => {
    if (!formData.eventName.trim()) return;
    onUpdate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
            <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
              Edit Event
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5 sm:pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Event Name *
                </Label>
                <Input
                  value={formData.eventName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      eventName: e.target.value,
                    }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Event name"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Chapter *
                </Label>
                <Input
                  value={formData.chapterName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      chapterName: e.target.value,
                    }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Chapter name"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Date *
                </Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Time *
                </Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, time: e.target.value }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-neutral-700">
                Location *
              </Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="mt-1 border border-neutral-300 rounded-lg"
                placeholder="Event location"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-neutral-700">
                Description
              </Label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                rows={3}
                placeholder="Event description"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Capacity
                </Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      capacity: parseInt(e.target.value) || 1,
                    }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                  min="1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: val as CommunityEvent['status'],
                    }))
                  }
                >
                  <SelectTrigger className="mt-1 border border-neutral-300 rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="postponed">Postponed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
              >
                Save Changes
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border border-neutral-300 rounded-lg"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
