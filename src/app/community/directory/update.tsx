'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
import type { DirectoryEntry } from './page';

type Props = {
  entry: DirectoryEntry;
  onUpdateEntry: (updated: DirectoryEntry) => void;
  onCancel: () => void;
};

export default function UpdateDirectoryEntry({
  entry,
  onUpdateEntry,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    title: entry.title,
    description: entry.description,
    category: entry.category,
    resourceType: entry.resourceType,
    url: entry.url,
    tags: entry.tags.join(', '),
    status: entry.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) return;

    onUpdateEntry({
      ...entry,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      resourceType: formData.resourceType.trim(),
      url: formData.url.trim(),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: formData.status as DirectoryEntry['status'],
    });
  };

  const set =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="mb-4 text-neutral-600 hover:text-neutral-900 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 px-4 py-4 sm:px-6 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
              Edit Directory Entry
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Update the details for &ldquo;{entry.title}&rdquo;.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={set('title')}
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Entry title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neutral-700">
                    Category *
                  </Label>
                  <select
                    value={formData.category}
                    onChange={set('category')}
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                  >
                    <option value="Guidelines">Guidelines</option>
                    <option value="Resources">Resources</option>
                    <option value="Directory">Directory</option>
                    <option value="Tools">Tools</option>
                    <option value="Events">Events</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-neutral-700">
                    Resource Type *
                  </Label>
                  <Input
                    value={formData.resourceType}
                    onChange={set('resourceType')}
                    className="mt-1 border border-neutral-300 rounded-lg"
                    placeholder="Document, Guide, Hub…"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  URL *
                </Label>
                <Input
                  value={formData.url}
                  onChange={set('url')}
                  type="url"
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Description
                </Label>
                <textarea
                  value={formData.description}
                  onChange={set('description')}
                  className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                  rows={3}
                  placeholder="Brief description of this resource"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Tags{' '}
                  <span className="font-normal text-neutral-400">
                    (comma-separated)
                  </span>
                </Label>
                <Input
                  value={formData.tags}
                  onChange={set('tags')}
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="innovation, guide, tutorial"
                />
              </div>

              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Status
                </Label>
                <select
                  value={formData.status}
                  onChange={set('status')}
                  className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={!formData.title.trim() || !formData.url.trim()}
                  className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border border-neutral-300 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
