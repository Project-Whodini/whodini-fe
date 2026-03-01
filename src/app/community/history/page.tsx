'use client';

import { useState } from 'react';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type CommunityMilestone = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  impact: string;
  communityLabel: string;
};

type ViewState = 'list' | 'create';

const INITIAL_MILESTONES: CommunityMilestone[] = [
  {
    id: 'hist_1',
    title: 'Community Founded',
    description: 'Digital Innovators Community officially launched',
    date: '2023-01-15',
    category: 'Foundation',
    impact: 'Beginning of community journey',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'hist_2',
    title: 'First 500 Members',
    description: 'Community reached 500 active members milestone',
    date: '2023-06-20',
    category: 'Growth',
    impact: 'Community expansion success',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'hist_3',
    title: 'Tech Innovation Summit 2023',
    description: 'First annual tech summit with 300+ attendees',
    date: '2023-09-10',
    category: 'Events',
    impact: 'Established signature event',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'hist_4',
    title: 'Strategic Partnerships Signed',
    description: 'Signed partnerships with 5 major tech companies',
    date: '2023-11-05',
    category: 'Partnerships',
    impact: 'Enhanced member benefits and opportunities',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'hist_5',
    title: 'Chapters Launched',
    description: 'Established 8 regional chapters across major cities',
    date: '2024-01-20',
    category: 'Expansion',
    impact: 'Local community growth',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'hist_6',
    title: 'Member Benefits Program',
    description: 'Launched comprehensive benefits and rewards program',
    date: '2024-03-01',
    category: 'Programs',
    impact: 'Increased member engagement',
    communityLabel: 'Digital Innovators',
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Foundation':
      return 'bg-[#ff5f6d] text-white';
    case 'Growth':
      return 'bg-green-100 text-green-800';
    case 'Events':
      return 'bg-blue-100 text-blue-800';
    case 'Partnerships':
      return 'bg-purple-100 text-purple-800';
    case 'Expansion':
      return 'bg-orange-100 text-orange-800';
    case 'Programs':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-neutral-100 text-neutral-800';
  }
};

export default function CommunityHistoryPage() {
  const [milestones, setMilestones] =
    useState<CommunityMilestone[]>(INITIAL_MILESTONES);
  const [view, setView] = useState<ViewState>('list');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Growth',
    impact: '',
  });

  const filteredMilestones = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleCreateMilestone = () => {
    const confirmed = window.confirm(`Add milestone: "${formData.title}"?`);
    if (!confirmed) return;
    const newMilestone: CommunityMilestone = {
      id: `hist_${Date.now()}`,
      ...formData,
      communityLabel: 'Digital Innovators',
    };
    setMilestones((prev) => [newMilestone, ...prev]);
    setFormData({
      title: '',
      description: '',
      date: '',
      category: 'Growth',
      impact: '',
    });
    setView('list');
  };

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-lg">
            <CardHeader className="border-b border-neutral-200 bg-gradient-to-r from-[#ff5f6d]/5 to-[#ffc371]/5 px-4 py-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-neutral-900">
                Add Milestone
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 px-4 sm:px-6 space-y-4">
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Milestone Title *
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Milestone title"
                />
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
                      setFormData((p) => ({ ...p, date: e.target.value }))
                    }
                    className="mt-1 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-neutral-700">
                    Category *
                  </Label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, category: e.target.value }))
                    }
                    className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  >
                    {[
                      'Foundation',
                      'Growth',
                      'Events',
                      'Partnerships',
                      'Expansion',
                      'Programs',
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Description
                </Label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, description: e.target.value }))
                  }
                  className="w-full mt-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  placeholder="Milestone description"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-neutral-700">
                  Impact
                </Label>
                <Input
                  value={formData.impact}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, impact: e.target.value }))
                  }
                  className="mt-1 border border-neutral-300 rounded-lg"
                  placeholder="Impact of this milestone"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-3">
                <Button
                  onClick={handleCreateMilestone}
                  className="flex-1 bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg"
                >
                  Add Milestone
                </Button>
                <Button
                  onClick={() => setView('list')}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Audit Trail
            </h1>
            <p className="text-sm text-neutral-500 mt-0.5">
              Community milestones &amp; activity log
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-sm text-sm h-9 px-4 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Milestone
          </Button>
        </div>

        {/* Timeline */}
        {filteredMilestones.length === 0 ? (
          <div className="text-center py-12 text-neutral-400 text-sm">
            No milestones in this time range.
          </div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff5f6d] to-[#ffc371]" />

            <div className="space-y-2.5 pl-10">
              {filteredMilestones.map((milestone) => (
                <div key={milestone.id} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[30px] top-3.5 w-3 h-3 rounded-full bg-[#ff5f6d] border-2 border-white shadow-sm" />

                  <Card className="border border-neutral-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                    <CardContent className="px-3 py-3 sm:px-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-neutral-900 leading-tight">
                            {milestone.title}
                          </h3>
                          <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3 shrink-0" />
                            {new Date(milestone.date).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}
                          </p>
                        </div>
                        <Badge
                          className={`${getCategoryColor(milestone.category)} text-xs px-2 py-0.5 shrink-0`}
                        >
                          {milestone.category}
                        </Badge>
                      </div>
                      {milestone.description && (
                        <p className="text-xs text-neutral-600 mb-1.5 leading-relaxed">
                          {milestone.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-1.5 border-t border-neutral-100">
                        <TrendingUp className="w-3 h-3 text-[#ff5f6d] shrink-0" />
                        <span>{milestone.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
