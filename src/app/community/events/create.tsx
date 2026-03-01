'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type CreateEventFormData = {
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: number;
  chapterName: string;
};

interface CreateCommunityEventProps {
  formData: CreateEventFormData;
  setFormData: (data: CreateEventFormData) => void;
  onCreateEvent: () => void;
  onCancel: () => void;
}

export function CreateCommunityEvent({
  formData,
  setFormData,
  onCreateEvent,
  onCancel,
}: CreateCommunityEventProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5">
            <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
              Create Event
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
                    setFormData({ ...formData, eventName: e.target.value })
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
                    setFormData({ ...formData, chapterName: e.target.value })
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
                    setFormData({ ...formData, date: e.target.value })
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
                    setFormData({ ...formData, time: e.target.value })
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
                  setFormData({ ...formData, location: e.target.value })
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
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                rows={3}
                placeholder="Event description"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-neutral-700">
                Capacity
              </Label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: parseInt(e.target.value) || 1,
                  })
                }
                className="mt-1 border border-neutral-300 rounded-lg"
                min="1"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                onClick={onCreateEvent}
                className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
              >
                Create Event
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
