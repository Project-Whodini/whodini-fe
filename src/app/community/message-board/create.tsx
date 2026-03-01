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
import type { MessageThread } from './page';

type Props = {
  alias: string;
  onCreateThread: (thread: MessageThread) => void;
  onCancel: () => void;
};

export default function CreateThread({
  alias,
  onCreateThread,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    author: alias || '',
  });

  const set =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) return;

    const thread: MessageThread = {
      id: `thread_${Date.now()}`,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      author: formData.author.trim(),
      postCount: 0,
      viewCount: 0,
      lastActivity: 'just now',
      status: 'active',
      communityLabel: 'Digital Innovators',
    };
    onCreateThread(thread);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="mb-4 -ml-2 text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Board
        </Button>

        <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
          <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 px-4 py-4 sm:px-6 sm:py-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
              Start New Discussion
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Ask a question or open a topic for the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Discussion Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={set('title')}
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Create an engaging title"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-neutral-700">
                    Your Name / Alias *
                  </Label>
                  <Input
                    value={formData.author}
                    onChange={set('author')}
                    className="mt-1 border border-neutral-300 rounded-lg"
                    placeholder="How you'll appear"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-neutral-700">
                    Category *
                  </Label>
                  <select
                    value={formData.category}
                    onChange={set('category')}
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Networking">Networking</option>
                    <option value="Events">Events</option>
                    <option value="Business">Business</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Description *
                </Label>
                <textarea
                  value={formData.description}
                  onChange={set('description')}
                  className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                  rows={4}
                  placeholder="Describe your discussion topic…"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={!formData.title.trim() || !formData.author.trim()}
                  className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg disabled:opacity-50"
                >
                  Create Discussion
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
