'use client';

import { useMemo, useState } from 'react';
import { Plus, Search, MessageSquare, Eye, User, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import CreateThread from './create';
import ShowThread from './show';

export type MessageThread = {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  postCount: number;
  viewCount: number;
  lastActivity: string;
  status: 'active' | 'archived';
  communityLabel: string;
};

export type ForumPost = {
  id: string;
  threadId: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
};

export type StaffInfo = {
  position: string;
  role: 'admin' | 'moderator' | 'coordinator';
};

// Community owner: their identity is always shown with a Founder badge, no alias editing
export const COMMUNITY_OWNER = 'Alex Rivera';

// Community staff: team members whose identity is always shown with their real name + position
export const COMMUNITY_STAFF: Record<string, StaffInfo> = {
  'Sarah Williams': { position: 'Community Director', role: 'admin' },
  'Michael Chen': { position: 'Operations Manager', role: 'admin' },
  'Emma Johnson': { position: 'Content Moderator', role: 'moderator' },
  'David Park': { position: 'Events Coordinator', role: 'moderator' },
  'Lisa Anderson': {
    position: 'Member Engagement Coordinator',
    role: 'coordinator',
  },
};

type ViewState = 'list' | 'create' | 'show';

const INITIAL_THREADS: MessageThread[] = [
  {
    id: 'thread_1',
    title: 'Best Practices for Digital Transformation',
    description:
      'Share and discuss strategies for digital transformation in your organization',
    category: 'Technology',
    author: 'Sarah Williams',
    postCount: 3,
    viewCount: 456,
    lastActivity: '2 hours ago',
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'thread_2',
    title: 'Networking Tips for Remote Professionals',
    description: 'Connect and share experiences about virtual networking',
    category: 'Networking',
    author: 'Michael Chen',
    postCount: 2,
    viewCount: 302,
    lastActivity: '5 hours ago',
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'thread_3',
    title: 'Upcoming Chapter Events Calendar',
    description: 'View and discuss upcoming events across all chapters',
    category: 'Events',
    author: 'Emma Johnson',
    postCount: 3,
    viewCount: 567,
    lastActivity: '1 hour ago',
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
  {
    id: 'thread_4',
    title: 'Startup Funding Opportunities',
    description: 'Discuss funding sources and investment opportunities',
    category: 'Business',
    author: 'David Park',
    postCount: 2,
    viewCount: 389,
    lastActivity: '3 hours ago',
    status: 'active',
    communityLabel: 'Digital Innovators',
  },
];

const INITIAL_POSTS: ForumPost[] = [
  // thread_1
  {
    id: 'post_1',
    threadId: 'thread_1',
    author: 'Sarah Williams',
    content:
      'Great topic! I think starting with a clear roadmap is key. Aligning leadership early saves a lot of pain later.',
    timestamp: '2 hours ago',
    isOwn: false,
  },
  {
    id: 'post_2',
    threadId: 'thread_1',
    author: 'James Rodriguez',
    content:
      'Agreed — we had a painful experience skipping the change management piece. Highly recommend involving HR from day one.',
    timestamp: '1 hour 45 min ago',
    isOwn: false,
  },
  {
    id: 'post_3',
    threadId: 'thread_1',
    author: 'Jennifer Lee',
    content:
      'What tools are people using for the tech stack side? We are evaluating a few platforms right now.',
    timestamp: '1 hour ago',
    isOwn: false,
  },
  // thread_2
  {
    id: 'post_4',
    threadId: 'thread_2',
    author: 'Michael Chen',
    content:
      'Virtual coffee chats have been a game-changer for me. Scheduling 15-minute intros with people in the community really adds up.',
    timestamp: '5 hours ago',
    isOwn: false,
  },
  {
    id: 'post_5',
    threadId: 'thread_2',
    author: 'Alex Thompson',
    content:
      'Totally agree. LinkedIn events and virtual coworking sessions are also great low-effort ways to stay connected.',
    timestamp: '4 hours ago',
    isOwn: false,
  },
  // thread_3
  {
    id: 'post_6',
    threadId: 'thread_3',
    author: 'Emma Johnson',
    content:
      'Pinning the Q2 schedule here: April 5 — Leadership Workshop, April 19 — Startup Pitch Night, May 3 — Design Sprint.',
    timestamp: '1 hour ago',
    isOwn: false,
  },
  {
    id: 'post_7',
    threadId: 'thread_3',
    author: 'David Park',
    content:
      'Will the Leadership Workshop be hybrid or fully remote this time? Last session had some audio issues.',
    timestamp: '45 min ago',
    isOwn: false,
  },
  {
    id: 'post_8',
    threadId: 'thread_3',
    author: 'Lisa Anderson',
    content:
      'Looks like it will be hybrid — I will share venue details once confirmed.',
    timestamp: '30 min ago',
    isOwn: false,
  },
  // thread_4
  {
    id: 'post_9',
    threadId: 'thread_4',
    author: 'David Park',
    content:
      'Anyone explored SBIC loans? They seem underutilized for early-stage hardware startups.',
    timestamp: '3 hours ago',
    isOwn: false,
  },
  {
    id: 'post_10',
    threadId: 'thread_4',
    author: 'Jennifer Lee',
    content:
      'I have. The process is long but worth it if you qualify. DM me and I can share our experience.',
    timestamp: '2 hours ago',
    isOwn: false,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Technology':
      return 'bg-blue-100 text-blue-800';
    case 'Networking':
      return 'bg-purple-100 text-purple-800';
    case 'Events':
      return 'bg-green-100 text-green-800';
    case 'Business':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-neutral-100 text-neutral-800';
  }
};

export default function MessageBoardPage() {
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_POSTS);
  const [view, setView] = useState<ViewState>('list');
  const [selected, setSelected] = useState<MessageThread | null>(null);
  const [alias, setAlias] = useState(COMMUNITY_OWNER);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = useMemo(
    () => Array.from(new Set(threads.map((t) => t.category))).sort(),
    [threads]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return threads.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.author.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      const matchCat =
        categoryFilter === 'all' || t.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [threads, search, categoryFilter]);

  const hasFilters = search !== '' || categoryFilter !== 'all';

  const handlePostReply = (
    threadId: string,
    content: string,
    author: string
  ) => {
    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      threadId,
      author,
      content,
      timestamp: 'just now',
      isOwn: true,
    };
    setPosts((prev) => [...prev, newPost]);
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, postCount: t.postCount + 1, lastActivity: 'just now' }
          : t
      )
    );
    // keep selected in sync
    if (selected?.id === threadId) {
      setSelected((s) =>
        s ? { ...s, postCount: s.postCount + 1, lastActivity: 'just now' } : s
      );
    }
  };

  // ── sub-views ─────────────────────────────────────────────────────────────
  if (view === 'create') {
    return (
      <CreateThread
        alias={alias}
        onCreateThread={(thread) => {
          setThreads((prev) => [thread, ...prev]);
          if (!alias) setAlias(thread.author);
          setView('list');
        }}
        onCancel={() => setView('list')}
      />
    );
  }

  if (view === 'show' && selected) {
    return (
      <ShowThread
        thread={selected}
        posts={posts}
        alias={alias}
        communityOwner={COMMUNITY_OWNER}
        communityStaff={COMMUNITY_STAFF}
        onAliasChange={setAlias}
        onPostReply={handlePostReply}
        onBack={() => setView('list')}
      />
    );
  }

  // ── list view ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
              Message Board
            </h1>
            <p className="text-neutral-600 mt-1 text-sm sm:text-base">
              Community discussions and forums
            </p>
          </div>
          <Button
            onClick={() => setView('create')}
            className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Start Discussion
          </Button>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search discussions…"
              className="pl-9 border border-neutral-300 rounded-lg"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-neutral-300 rounded-lg px-3 py-2 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 sm:w-44"
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
            {filtered.length} thread{filtered.length !== 1 ? 's' : ''} found
            {categoryFilter !== 'all' && ` in "${categoryFilter}"`}
          </p>
        )}

        {/* Thread list */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((thread) => {
              const threadPostCount = posts.filter(
                (p) => p.threadId === thread.id
              ).length;
              return (
                <Card
                  key={thread.id}
                  onClick={() => {
                    setSelected(thread);
                    setView('show');
                  }}
                  className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md hover:border-[#ff5f6d]/40 cursor-pointer transition-all"
                >
                  <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Badge
                            className={
                              getCategoryColor(thread.category) + ' text-xs'
                            }
                          >
                            {thread.category}
                          </Badge>
                          {thread.status === 'archived' && (
                            <span className="px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-500">
                              archived
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 leading-snug mb-1">
                          {thread.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 mb-3">
                          {thread.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {thread.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {threadPostCount}{' '}
                            {threadPostCount === 1 ? 'reply' : 'replies'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {thread.viewCount} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {thread.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <MessageSquare className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-neutral-500 font-medium">No threads found</p>
            <p className="text-sm text-neutral-400 mt-1">
              {hasFilters
                ? 'Try adjusting your search or filter.'
                : 'Start the first discussion!'}
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
