'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Eye,
  User,
  Pencil,
  Check,
  X,
  Send,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { MessageThread, ForumPost, StaffInfo } from './page';

type Props = {
  thread: MessageThread;
  posts: ForumPost[];
  alias: string;
  communityStaff: Record<string, StaffInfo>;
  onAliasChange: (alias: string) => void;
  onPostReply: (threadId: string, content: string, author: string) => void;
  onBack: () => void;
};

const roleColor = (role: StaffInfo['role']) => {
  switch (role) {
    case 'admin':
      return 'bg-[#ff5f6d] text-white';
    case 'moderator':
      return 'bg-amber-100 text-amber-800';
    case 'coordinator':
      return 'bg-blue-100 text-blue-800';
  }
};

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

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const avatarColor = (name: string) => {
  const colors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-400',
    'bg-green-500',
    'bg-teal-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

export default function ShowThread({
  thread,
  posts,
  alias,
  communityStaff,
  onAliasChange,
  onPostReply,
  onBack,
}: Props) {
  const [editingAlias, setEditingAlias] = useState(false);
  const [draftAlias, setDraftAlias] = useState(alias);
  const [reply, setReply] = useState('');

  // If the current alias matches a staff member, they post as their real identity
  const myStaffInfo: StaffInfo | null = communityStaff[alias] ?? null;
  const canPost = !!alias; // staff always have alias = their name; regular need to set one

  const saveAlias = () => {
    const trimmed = draftAlias.trim();
    if (trimmed) {
      onAliasChange(trimmed);
    } else {
      setDraftAlias(alias);
    }
    setEditingAlias(false);
  };

  const cancelAlias = () => {
    setDraftAlias(alias);
    setEditingAlias(false);
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !alias.trim()) return;
    onPostReply(thread.id, reply.trim(), alias);
    setReply('');
  };

  const threadPosts = posts.filter((p) => p.threadId === thread.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 -ml-2 text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Board
        </Button>

        {/* Thread header */}
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-md mb-4">
          <CardContent className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge
                    className={getCategoryColor(thread.category) + ' text-xs'}
                  >
                    {thread.category}
                  </Badge>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      thread.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-neutral-100 text-neutral-500'
                    }`}
                  >
                    {thread.status}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug mb-2">
                  {thread.title}
                </h1>
                {thread.description && (
                  <p className="text-sm text-neutral-600 mb-3">
                    {thread.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {thread.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {thread.postCount} posts
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

        {/* Identity bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5 px-1">
          <span className="text-xs text-neutral-500 shrink-0">Posting as:</span>

          {myStaffInfo ? (
            /* ── Staff identity: real name + position badge, no alias editing ── */
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-900">
                {alias}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColor(myStaffInfo.role)}`}
              >
                {myStaffInfo.position}
              </span>
              <span className="text-xs text-neutral-400 italic">
                · official
              </span>
            </div>
          ) : editingAlias ? (
            /* ── Regular member: editing alias ── */
            <div className="flex items-center gap-2 flex-1">
              <Input
                autoFocus
                value={draftAlias}
                onChange={(e) => setDraftAlias(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveAlias();
                  if (e.key === 'Escape') cancelAlias();
                }}
                className="h-8 text-sm border border-[#ff5f6d]/50 rounded-lg max-w-xs"
                placeholder="Your alias"
              />
              <button
                onClick={saveAlias}
                className="text-green-600 hover:text-green-700"
                title="Save"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={cancelAlias}
                className="text-neutral-400 hover:text-neutral-600"
                title="Cancel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* ── Regular member: showing alias ── */
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-900">
                {alias || (
                  <span className="text-neutral-400 italic">unnamed</span>
                )}
              </span>
              <button
                onClick={() => {
                  setDraftAlias(alias);
                  setEditingAlias(true);
                }}
                className="text-neutral-400 hover:text-[#ff5f6d] transition-colors"
                title="Change alias"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {!alias && !editingAlias && !myStaffInfo && (
            <span className="text-xs text-amber-600">
              Set an alias to join the discussion
            </span>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-3 mb-5">
          {threadPosts.length === 0 ? (
            <div className="text-center py-10 text-neutral-400 text-sm">
              No replies yet. Be the first to respond!
            </div>
          ) : (
            threadPosts.map((post) => {
              const isOwn = post.isOwn;
              return (
                <div
                  key={post.id}
                  className={`flex items-start gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${avatarColor(post.author)}`}
                  >
                    {getInitials(post.author)}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <span className="font-medium text-neutral-700">
                        {post.author}
                      </span>
                      {communityStaff[post.author] && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${roleColor(communityStaff[post.author].role)}`}
                        >
                          {communityStaff[post.author].position}
                        </span>
                      )}
                      <span>{post.timestamp}</span>
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isOwn
                          ? 'bg-[#ff5f6d] text-white rounded-tr-sm'
                          : 'bg-white border border-neutral-200 text-neutral-800 rounded-tl-sm shadow-sm'
                      }`}
                    >
                      {post.content}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Reply box */}
        <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm sticky bottom-4">
          <CardContent className="px-4 py-3 sm:px-5 sm:py-4">
            {!canPost ? (
              <p className="text-sm text-center text-neutral-400 py-2">
                Set your alias above to post a reply.
              </p>
            ) : (
              <form onSubmit={handlePost} className="flex gap-2 items-end">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (reply.trim())
                        handlePost(e as unknown as React.FormEvent);
                    }
                  }}
                  className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/30 resize-none"
                  rows={2}
                  placeholder={
                    myStaffInfo
                      ? `Reply as ${alias} · ${myStaffInfo.position}…`
                      : `Reply as ${alias}… (Enter to send, Shift+Enter for new line)`
                  }
                />
                <Button
                  type="submit"
                  disabled={!reply.trim()}
                  className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90 text-white rounded-lg px-4 h-10 shrink-0 self-end disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
