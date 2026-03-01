'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, FileText, Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import CreateDirectoryEntry from './create';
import ShowDirectoryEntry from './show';
import UpdateDirectoryEntry from './update';

export type DirectoryEntry = {
  id: string;
  title: string;
  description: string;
  category: string;
  resourceType: string;
  url: string;
  tags: string[];
  status: 'active' | 'inactive';
  communityLabel: string;
};

type ViewState = 'list' | 'create' | 'show' | 'update';

const INITIAL_ENTRIES: DirectoryEntry[] = [
  {
    id: 'dir_1',
    title: 'Community Code of Conduct',
    description: 'Guidelines and expectations for all community members',
    category: 'Guidelines',
    resourceType: 'Document',
    url: 'https://community.digitaldiversity.com/code-of-conduct',
    tags: ['policies', 'governance'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'dir_2',
    title: 'Innovation Framework Guide',
    description: 'Step-by-step guide for implementing innovation frameworks',
    category: 'Resources',
    resourceType: 'Guide',
    url: 'https://resources.digitaldiversity.com/innovation-guide',
    tags: ['innovation', 'tutorial'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'dir_3',
    title: 'Member Directory with Photos',
    description: 'Complete searchable directory of all community members',
    category: 'Directory',
    resourceType: 'Database',
    url: 'https://directory.digitaldiversity.com',
    tags: ['members', 'networking'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'dir_4',
    title: 'Chapter Resources Hub',
    description: 'Centralized resource library for chapter leaders',
    category: 'Resources',
    resourceType: 'Hub',
    url: 'https://chapters.digitaldiversity.com/resources',
    tags: ['chapters', 'leadership'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'dir_5',
    title: 'Design Toolkit',
    description: 'Brand templates, logos, and design assets for members',
    category: 'Tools',
    resourceType: 'Toolkit',
    url: 'https://design.digitaldiversity.com/toolkit',
    tags: ['design', 'branding', 'assets'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'dir_6',
    title: 'Upcoming Events Calendar',
    description: 'Full calendar of community events and workshops',
    category: 'Events',
    resourceType: 'Calendar',
    url: 'https://events.digitaldiversity.com',
    tags: ['events', 'calendar', 'workshops'],
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Guidelines':
      return 'bg-red-100 text-red-800';
    case 'Resources':
      return 'bg-blue-100 text-blue-800';
    case 'Directory':
      return 'bg-purple-100 text-purple-800';
    case 'Tools':
      return 'bg-green-100 text-green-800';
    case 'Events':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-neutral-100 text-neutral-800';
  }
};

export default function CommunityDirectoryPage() {
  const [entries, setEntries] = useState<DirectoryEntry[]>(INITIAL_ENTRIES);
  const [view, setView] = useState<ViewState>('list');
  const [selected, setSelected] = useState<DirectoryEntry | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(
    () => Array.from(new Set(entries.map((e) => e.category))).sort(),
    [entries]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return entries.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.resourceType.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory =
        categoryFilter === 'all' || e.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [entries, search, categoryFilter]);

  const hasFilters = search !== '' || categoryFilter !== 'all';

  // ── sub-views ─────────────────────────────────────────────────────────────
  if (view === 'create') {
    return (
      <CreateDirectoryEntry
        onCreateEntry={(entry) => {
          setEntries((prev) => [entry, ...prev]);
          setView('list');
        }}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'show' && selected) {
    return (
      <ShowDirectoryEntry
        entry={selected}
        onEdit={() => setView('update')}
        onDelete={() => {
          setEntries((prev) => prev.filter((e) => e.id !== selected.id));
          setSelected(null);
          setView('list');
        }}
        onBack={() => setView('list')}
      />
    );
  }

  if (view === 'update' && selected) {
    return (
      <UpdateDirectoryEntry
        entry={selected}
        onUpdateEntry={(updated) => {
          setEntries((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
          );
          setSelected(updated);
          setView('show');
        }}
        onCancel={() => setView('show')}
      />
    );
  }

  // ── list view ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Community Directory
            </h1>
            <p className="text-neutral-600 mt-1 text-sm sm:text-base">
              Resources, guides, and useful links
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Search + Category filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, tag, or type…"
              className="pl-9 border border-neutral-300 rounded-lg"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 sm:w-48"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        {hasFilters && (
          <p className="text-xs text-neutral-500 mb-4">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
            {categoryFilter !== 'all' && ` in "${categoryFilter}"`}
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((entry) => (
              <Card
                key={entry.id}
                onClick={() => {
                  setSelected(entry);
                  setView('show');
                }}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d]/40 cursor-pointer transition-all"
              >
                <CardContent className="pt-5 pb-5 px-4 sm:px-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ff5f6d]/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-[#ff5f6d]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold text-neutral-900 leading-snug line-clamp-2">
                        {entry.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        <Badge
                          className={
                            getCategoryColor(entry.category) + ' text-xs'
                          }
                        >
                          {entry.category}
                        </Badge>
                        <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-xs text-neutral-600">
                          {entry.resourceType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {entry.description && (
                    <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                      {entry.description}
                    </p>
                  )}

                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {entry.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-neutral-100 text-neutral-600 text-xs rounded-full"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {entry.tags.length > 3 && (
                        <span className="text-xs text-neutral-400">
                          +{entry.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-[#ff5f6d] hover:text-[#ff5f6d]/80 text-xs font-medium"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    Visit Resource
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 font-medium">No entries found</p>
            <p className="text-sm text-neutral-400 mt-1">
              {hasFilters
                ? 'Try adjusting your search or category filter.'
                : 'Add the first entry to get started.'}
            </p>
            {hasFilters && (
              <Button
                variant="ghost"
                className="mt-3 text-[#ff5f6d]"
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('all');
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
