'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Heart, Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type ForumMessage = {
  id: number;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
  isOwn: boolean;
};

type ForumData = {
  communityName: string;
  communityImage: string;
};

// Seed extra context messages per community so the chat room feels alive
const SEED_MESSAGES: Record<string, ForumMessage[]> = {
  'Tech Innovators': [
    {
      id: -3,
      author: 'James Lim',
      text: 'Has anyone tried the new open-source LLM released last week?',
      timestamp: '1 day ago',
      likes: 5,
      isOwn: false,
    },
    {
      id: -2,
      author: 'Me',
      text: "Not yet, but I've heard great things! Sharing the link now.",
      timestamp: '1 day ago',
      likes: 2,
      isOwn: true,
    },
    {
      id: -1,
      author: 'Sarah Chen',
      text: 'The benchmarks look impressive. Way faster than the previous version.',
      timestamp: '18 hours ago',
      likes: 9,
      isOwn: false,
    },
  ],
  'Design Squad': [
    {
      id: -3,
      author: 'Lena Park',
      text: 'Anyone else attending the design systems conf next month?',
      timestamp: '2 days ago',
      likes: 3,
      isOwn: false,
    },
    {
      id: -2,
      author: 'Me',
      text: "I'll be there! See you all in the morning sessions.",
      timestamp: '2 days ago',
      likes: 1,
      isOwn: true,
    },
    {
      id: -1,
      author: 'Mike Rodriguez',
      text: 'Same here. Also the portfolio showcase is going to be amazing.',
      timestamp: '5 hours ago',
      likes: 7,
      isOwn: false,
    },
  ],
  'Fitness Warriors': [
    {
      id: -3,
      author: 'Carlos Tan',
      text: 'Hit a new PR on deadlifts today — 160kg! 🔥',
      timestamp: '3 days ago',
      likes: 12,
      isOwn: false,
    },
    {
      id: -2,
      author: 'Me',
      text: "That's insane, congrats! What program are you running?",
      timestamp: '3 days ago',
      likes: 2,
      isOwn: true,
    },
    {
      id: -1,
      author: 'Emma Johnson',
      text: "Love these updates! Morning run crew, we're meeting at 6 AM tomorrow.",
      timestamp: '1 day ago',
      likes: 8,
      isOwn: false,
    },
  ],
};

const DEFAULT_SEED: ForumMessage[] = [
  {
    id: -2,
    author: 'Community Bot',
    text: 'Welcome to the forum! Feel free to join the conversation.',
    timestamp: '1 week ago',
    likes: 0,
    isOwn: false,
  },
  {
    id: -1,
    author: 'Me',
    text: 'Glad to be here!',
    timestamp: '5 days ago',
    likes: 1,
    isOwn: true,
  },
];

const avatarColor = (name: string) => {
  const colors = [
    'bg-red-400',
    'bg-orange-400',
    'bg-amber-500',
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

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function CommunityForumPage() {
  const [data, setData] = useState<ForumData | null>(null);
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [input, setInput] = useState('');
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('whodini:selected-forum');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as ForumData & {
        incomingMessage: ForumMessage;
      };
      setData({
        communityName: parsed.communityName,
        communityImage: parsed.communityImage,
      });
      const seed = SEED_MESSAGES[parsed.communityName] ?? DEFAULT_SEED;
      setMessages([...seed, { ...parsed.incomingMessage, id: 0 }]);
    } catch {
      setData(null);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const goBack = () => {
    window.dispatchEvent(
      new CustomEvent('whodini:navigate', {
        detail: { path: '/community' },
        cancelable: true,
      })
    );
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: 'Me',
        text,
        timestamp: 'Just now',
        likes: 0,
        isOwn: true,
      },
    ]);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, likes: m.likes + (likedIds.has(id) ? -1 : 1) } : m
      )
    );
  };

  if (!data) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="border border-neutral-200 rounded-xl bg-white shadow-sm p-8 text-center space-y-3">
          <Users className="w-10 h-10 text-neutral-400 mx-auto" />
          <p className="text-neutral-600">No forum selected.</p>
          <Button onClick={goBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-neutral-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-neutral-200 shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={goBack}
          className="text-neutral-600 hover:text-neutral-900 -ml-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="text-2xl">{data.communityImage}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-900 truncate">
            {data.communityName}
          </p>
          <p className="text-xs text-neutral-500">Community Forum</p>
        </div>
        <Badge variant="outline" className="ml-auto text-xs shrink-0">
          {messages.length} posts
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {!msg.isOwn && (
              <div
                className={`w-7 h-7 rounded-full ${avatarColor(msg.author)} flex items-center justify-center text-white text-xs font-semibold shrink-0`}
              >
                {getInitials(msg.author)}
              </div>
            )}

            <div
              className={`max-w-[75%] sm:max-w-[60%] space-y-1 ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col`}
            >
              {!msg.isOwn && (
                <span className="text-xs font-medium text-neutral-600 ml-1">
                  {msg.author}
                </span>
              )}
              <div
                className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.isOwn
                    ? 'bg-[#ff5f6d] text-white rounded-br-sm'
                    : 'bg-white border border-neutral-200 text-neutral-800 rounded-bl-sm shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <div
                className={`flex items-center gap-2 px-1 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <span className="text-xs text-neutral-400">
                  {msg.timestamp}
                </span>
                <button
                  onClick={() => toggleLike(msg.id)}
                  className={`flex items-center gap-0.5 text-xs transition-colors ${
                    likedIds.has(msg.id)
                      ? 'text-[#ff5f6d]'
                      : 'text-neutral-400 hover:text-[#ff5f6d]'
                  }`}
                >
                  <Heart
                    className={`w-3 h-3 ${likedIds.has(msg.id) ? 'fill-current' : ''}`}
                  />
                  <span>{msg.likes + (likedIds.has(msg.id) ? 0 : 0)}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-neutral-200">
        <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-7 h-7 rounded-full bg-[#ff5f6d] flex items-center justify-center text-white disabled:opacity-40 transition-opacity shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
