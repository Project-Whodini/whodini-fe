'use client';

import { useState } from 'react';
import { Users, MessageSquare, Search, Heart, MapPin, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockData = {
  messages: [
    {
      id: 1,
      community: 'Tech Innovators',
      author: 'Sarah Chen',
      message:
        'Excited to share our latest AI breakthrough! Join us for a live demo this Friday.',
      timestamp: '2 hours ago',
      likes: 24,
      image: '💻',
    },
    {
      id: 2,
      community: 'Design Squad',
      author: 'Mike Rodriguez',
      message:
        'Check out this amazing portfolio piece from one of our members!',
      timestamp: '4 hours ago',
      likes: 18,
      image: '🎨',
    },
    {
      id: 3,
      community: 'Fitness Warriors',
      author: 'Emma Johnson',
      message:
        "Morning workout session was incredible! Who's joining tomorrow's run?",
      timestamp: '1 day ago',
      likes: 32,
      image: '💪',
    },
  ],
  discover: [
    {
      id: 1,
      name: 'Startup Founders',
      description: 'Connect with fellow entrepreneurs and share your journey.',
      members: 2450,
      category: 'Business',
      image: '🚀',
      isNew: true,
    },
    {
      id: 2,
      name: 'Local Foodies',
      description:
        'Discover the best restaurants and hidden gems in your city.',
      members: 1890,
      category: 'Food & Drink',
      image: '🍕',
      isNew: false,
    },
    {
      id: 3,
      name: 'Pet Parents',
      description: 'Share tips, photos, and connect with other pet owners.',
      members: 3200,
      category: 'Lifestyle',
      image: '🐕',
      isNew: true,
    },
    {
      id: 4,
      name: 'Music Producers',
      description: 'Collaborate on beats, share techniques, and network.',
      members: 890,
      category: 'Creative',
      image: '🎵',
      isNew: false,
    },
  ],
};

type TabType = 'messages' | 'discover';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [discoverScope, setDiscoverScope] = useState<'all' | 'followed'>('all');
  const [activeTag, setActiveTag] = useState('all');
  const [discoverCommunities, setDiscoverCommunities] = useState([
    {
      id: 1,
      name: 'Startup Founders',
      description: 'Connect with fellow entrepreneurs and share your journey.',
      members: 2450,
      category: 'Business',
      image: '🚀',
      isNew: true,
      tags: ['Business', 'Startups'],
      location: 'New York',
      followed: true,
      isMember: false,
    },
    {
      id: 2,
      name: 'Local Foodies',
      description:
        'Discover the best restaurants and hidden gems in your city.',
      members: 1890,
      category: 'Food & Drink',
      image: '🍕',
      isNew: false,
      tags: ['Food', 'Lifestyle'],
      location: 'Los Angeles',
      followed: false,
      isMember: true,
    },
    {
      id: 3,
      name: 'Pet Parents',
      description: 'Share tips, photos, and connect with other pet owners.',
      members: 3200,
      category: 'Lifestyle',
      image: '🐕',
      isNew: true,
      tags: ['Lifestyle', 'Pets'],
      location: 'San Francisco',
      followed: true,
      isMember: true,
    },
    {
      id: 4,
      name: 'Music Producers',
      description: 'Collaborate on beats, share techniques, and network.',
      members: 890,
      category: 'Creative',
      image: '🎵',
      isNew: false,
      tags: ['Creative', 'Music'],
      location: 'Los Angeles',
      followed: false,
      isMember: false,
    },
  ]);

  const discoverTags = [
    'all',
    ...Array.from(
      new Set(discoverCommunities.flatMap((community) => community.tags))
    ),
  ];

  const filteredDiscover = discoverCommunities.filter((community) => {
    const scopeMatch =
      discoverScope === 'all' ? true : Boolean(community.followed);
    const tagMatch =
      activeTag === 'all' ? true : community.tags.includes(activeTag);
    return scopeMatch && tagMatch;
  });

  const toggleFollow = (communityId: number) => {
    setDiscoverCommunities((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? { ...community, followed: !community.followed }
          : community
      )
    );
  };

  const toggleMembership = (communityId: number) => {
    setDiscoverCommunities((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? { ...community, isMember: !community.isMember }
          : community
      )
    );
  };

  const openCommunityForum = (message: (typeof mockData.messages)[0]) => {
    sessionStorage.setItem(
      'whodini:selected-forum',
      JSON.stringify({
        communityName: message.community,
        communityImage: message.image,
        incomingMessage: {
          author: message.author,
          text: message.message,
          timestamp: message.timestamp,
          likes: message.likes,
          isOwn: false,
        },
      })
    );
    window.dispatchEvent(
      new CustomEvent('whodini:navigate', {
        detail: { path: '/community/forum' },
        cancelable: true,
      })
    );
  };

  const openCommunityProfile = (community: (typeof discoverCommunities)[0]) => {
    sessionStorage.setItem(
      'whodini:selected-community',
      JSON.stringify({
        ...community,
        recentActivities: [
          {
            id: 1,
            title: 'Weekly discussion thread posted',
            timestamp: '2 hours ago',
          },
          {
            id: 2,
            title: 'New event announcement published',
            timestamp: '1 day ago',
          },
          {
            id: 3,
            title: 'Member spotlight updated',
            timestamp: '3 days ago',
          },
        ],
      })
    );

    const navigationEvent = new CustomEvent('whodini:navigate', {
      detail: { path: '/community/show' },
      cancelable: true,
    });

    window.dispatchEvent(navigationEvent);
  };

  const tabs = [
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'discover', label: 'Discover', icon: Search },
  ];

  const renderMessages = () => {
    if (mockData.messages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-neutral-100">
            <Users className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No community messages yet
          </h3>
          <p className="text-neutral-500">
            Join communities to receive updates
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3 sm:space-y-4">
        {mockData.messages.map((message) => (
          <Card
            key={message.id}
            className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openCommunityForum(message)}
          >
            <CardHeader className="pb-3 sm:pb-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="text-3xl">{message.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {message.community}
                    </Badge>
                    <span className="text-xs sm:text-sm text-neutral-500">
                      •
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-600">
                      {message.author}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500">
                      •
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <Heart className="w-4 h-4" />
                  <span>{message.likes} likes</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs w-full sm:w-auto"
                >
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderDiscover = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={discoverScope === 'all' ? 'default' : 'outline'}
              onClick={() => setDiscoverScope('all')}
              className={
                discoverScope === 'all'
                  ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90'
                  : ''
              }
            >
              All
            </Button>
            <Button
              size="sm"
              variant={discoverScope === 'followed' ? 'default' : 'outline'}
              onClick={() => setDiscoverScope('followed')}
              className={
                discoverScope === 'followed'
                  ? 'bg-[#ff5f6d] hover:bg-[#ff5f6d]/90'
                  : ''
              }
            >
              Followed
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
            {discoverTags.map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={activeTag === tag ? 'default' : 'outline'}
                onClick={() => setActiveTag(tag)}
                className="whitespace-nowrap"
                data-active={activeTag === tag}
              >
                {tag === 'all' ? 'All Tags' : tag}
              </Button>
            ))}
          </div>
        </div>

        {filteredDiscover.length === 0 ? (
          <Card className="border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardContent className="py-10 text-center text-sm text-neutral-500">
              No communities match this filter.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDiscover.map((community) => (
              <Card
                key={community.id}
                className="border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{community.image}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <CardTitle className="text-lg font-semibold text-neutral-900">
                            {community.name}
                          </CardTitle>
                          {community.isNew && (
                            <Badge className="text-xs bg-[#ff5f6d] text-white">
                              New
                            </Badge>
                          )}
                          {community.followed && (
                            <Badge variant="outline" className="text-xs">
                              Followed
                            </Badge>
                          )}
                          {community.isMember && (
                            <Badge className="text-xs bg-emerald-600 text-white">
                              Member
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {community.category}
                        </Badge>
                        <p className="text-sm text-neutral-600 leading-relaxed mb-2">
                          {community.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <MapPin className="w-3.5 h-3.5" />
                          {community.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <Users className="w-4 h-4" />
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {community.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFollow(community.id)}
                      className="text-xs w-full sm:w-auto"
                    >
                      {community.followed ? 'Following' : 'Follow'}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleMembership(community.id)}
                      className="text-xs w-full sm:w-auto bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                    >
                      {community.isMember ? 'Member' : 'Be Member'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openCommunityProfile(community)}
                      className="text-xs w-full sm:w-auto"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'messages':
        return renderMessages();
      case 'discover':
        return renderDiscover();
      default:
        return renderMessages();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
          Community Hub
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`whitespace-nowrap flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#ff5f6d] shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
