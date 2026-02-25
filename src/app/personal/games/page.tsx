"use client";

import { useState } from "react";
import {
  Gamepad2,
  Trophy,
  Star,
  Play,
  Clock,
  Users,
  Target,
  Zap,
  Calendar,
  Flame,
  Lock as LockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const gameCategories = [
  {
    id: "trivia",
    name: "Trivia",
    icon: <Target className="w-5 h-5" />,
    games: [
      {
        id: 1,
        title: "Tech Knowledge Quiz",
        brand: "TechCorp",
        description: "Test your knowledge about latest tech trends",
        difficulty: "Medium",
        duration: "5 min",
        points: 0,
        players: 0,
        status: "available",
        image: "🧠",
      },
      {
        id: 2,
        title: "Fashion Trends Challenge",
        brand: "FashionForward",
        description: "How well do you know current fashion?",
        difficulty: "Easy",
        duration: "3 min",
        points: 0,
        players: 0,
        status: "available",
        image: "👗",
      },
      {
        id: 3,
        title: "Coffee Culture Quiz",
        brand: "CoffeeHouse",
        description: "From beans to brewing methods",
        difficulty: "Hard",
        duration: "7 min",
        points: 0,
        players: 0,
        status: "available",
        image: "☕",
      },
    ],
  },
  {
    id: "puzzles",
    name: "Puzzles",
    icon: <Zap className="w-5 h-5" />,
    games: [
      {
        id: 4,
        title: "Brand Logo Memory",
        brand: "Multiple Brands",
        description: "Match brand logos and earn points",
        difficulty: "Medium",
        duration: "4 min",
        points: 0,
        players: 0,
        status: "available",
        image: "🧩",
      },
      {
        id: 5,
        title: "Product Word Search",
        brand: "RetailMart",
        description: "Find hidden product names",
        difficulty: "Easy",
        duration: "6 min",
        points: 0,
        players: 0,
        status: "new",
        image: "🔍",
      },
      {
        id: 6,
        title: "Innovation Crossword",
        brand: "TechCorp",
        description: "Technology-themed crossword puzzle",
        difficulty: "Hard",
        duration: "10 min",
        points: 0,
        players: 0,
        status: "available",
        image: "📝",
      },
    ],
  },
  {
    id: "challenges",
    name: "Challenges",
    icon: <Trophy className="w-5 h-5" />,
    games: [
      {
        id: 7,
        title: "Fitness Streak Challenge",
        brand: "FitLife Gym",
        description: "Complete daily fitness tasks",
        difficulty: "Medium",
        duration: "Daily",
        points: 0,
        players: 0,
        status: "ongoing",
        image: "💪",
      },
      {
        id: 8,
        title: "Eco-Friendly Actions",
        brand: "GreenWorld",
        description: "Take sustainable actions for points",
        difficulty: "Easy",
        duration: "Weekly",
        points: 0,
        players: 0,
        status: "available",
        image: "🌱",
      },
      {
        id: 9,
        title: "Photo Contest",
        brand: "Creative Studio",
        description: "Share creative product photos",
        difficulty: "Medium",
        duration: "1 week",
        points: 0,
        players: 0,
        status: "ending_soon",
        image: "📸",
      },
    ],
  },
];

const dailyChallenges = [
  {
    id: 1,
    title: "Brand Discovery",
    description: "Explore 3 new brands today",
    progress: 0,
    target: 0,
    points: 0,
    status: "active",
  },
  {
    id: 2,
    title: "Community Engagement",
    description: "Comment on 2 community posts",
    progress: 0,
    target: 0,
    points: 0,
    status: "active",
  },
  { 
    id: 3,
    title: "Game Master",
    description: "Play 5 games today",
    progress: 0,
    target: 0,
    points: 0,
    status: "active",
  },
];

const leaderboard = [
  { rank: 1, name: "GameMaster2024", score: 12450, badge: "👑" },
  { rank: 2, name: "QuizWhiz", score: 11200, badge: "🥈" },
  { rank: 3, name: "PuzzlePro", score: 10950, badge: "🥉" },
  { rank: 4, name: "TriviaKing", score: 9800, badge: "🏆" },
  { rank: 5, name: "ChallengeAce", score: 9200, badge: "⭐" },
  { rank: 6, name: "You", score: 2450, badge: "🎮", isUser: true },
];

const userStats = {
  gamesPlayed: 0,
  totalPoints: 0,
  currentStreak: 0,
  favoriteCategory: "Trivia",
  rank: 0,
  achievements: 0,
};

type CategoryType = "trivia" | "puzzles" | "challenges";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("trivia");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const gamesComingSoon = true;
  const leaderboardComingSoon = true;

  const currentCategory = gameCategories.find(
    (cat) => cat.id === activeCategory,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-[#ff5f6d] text-white text-xs">New</Badge>;
      case "ongoing":
        return <Badge className="bg-blue-500 text-white text-xs">Live</Badge>;
      case "ending_soon":
        return (
          <Badge className="bg-orange-500 text-white text-xs">
            Ending Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Gamepad2 className="w-6 h-6 text-[#ff5f6d]" />
        <h1 className="text-xl sm:text-2xl font-semibold">Games & Challenges</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ff5f6d] mb-1">
              {userStats.gamesPlayed}
            </div>
            <div className="text-xs text-neutral-600">Games Played</div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {userStats.totalPoints.toLocaleString()}
            </div>
            <div className="text-xs text-neutral-600">Total Points</div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-2xl font-bold text-orange-500">
                {userStats.currentStreak}
              </span>
            </div>
            <div className="text-xs text-neutral-600">Day Streak</div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500 mb-1">
              #{userStats.rank}
            </div>
            <div className="text-xs text-neutral-600">Global Rank</div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500 mb-1">
              {userStats.achievements}
            </div>
            <div className="text-xs text-neutral-600">Achievements</div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 border border-neutral-200 rounded-xl bg-white shadow-sm">
          <div className="text-center">
            <div className="text-sm font-bold text-blue-500 mb-1">
              {userStats.favoriteCategory}
            </div>
            <div className="text-xs text-neutral-600">Favorite</div>
          </div>
        </Card>
      </div>

      {/* Daily Challenges */}
      <Card className="p-4 sm:p-6 border border-neutral-200 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <Calendar className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-neutral-900">Daily Challenges</h3>
          <Badge className="bg-purple-500 text-white text-xs">24h</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {dailyChallenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="p-3 sm:p-4 border border-purple-200 bg-white/60"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-900 text-sm mb-1">
                    {challenge.title}
                  </h4>
                  <p className="text-xs text-neutral-600 mb-3">
                    {challenge.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 bg-neutral-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(challenge.progress / challenge.target) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-neutral-600">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <div className="text-sm font-bold text-purple-500">
                    +{challenge.points}
                  </div>
                  <div className="text-xs text-neutral-500">pts</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 mb-6">
        <div className="flex w-full sm:w-fit gap-1 p-1 bg-neutral-100 rounded-lg">
          <button
            onClick={() => setShowLeaderboard(false)}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
              !showLeaderboard
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Browse Games
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
              showLeaderboard
                ? "bg-white text-[#ff5f6d] shadow-sm"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {!showLeaderboard ? (
        <div>
          {/* Game Category Tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-lg w-full sm:w-fit mb-6 overflow-x-auto">
            {gameCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as CategoryType)}
                className={`whitespace-nowrap px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-white text-[#ff5f6d] shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory?.games.map((game) => (
              <Card
                key={game.id}
                className="relative overflow-hidden border border-neutral-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{game.image}</div>
                    <div className="flex flex-col gap-1">
                      {getStatusBadge(game.status)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-3">
                    {game.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getDifficultyColor(game.difficulty)}>
                      {game.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      {game.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {game.players.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />+{game.points} pts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {game.brand}
                    </span>
                    <Button
                      size="sm"
                      disabled={gamesComingSoon}
                      className="bg-[#ff5f6d] hover:bg-[#ff5f6d]/90"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      {gamesComingSoon ? "Locked" : "Play Now"}
                    </Button>
                  </div>
                </CardContent>

                {gamesComingSoon && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/85 backdrop-blur-[2px] text-center px-3 sm:px-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-1.5 text-xs font-semibold">
                      <LockIcon className="w-3.5 h-3.5" />
                      Coming Soon
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                      Games are not accessible yet
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Leaderboard View */
        <div>
          <Card className="relative overflow-hidden border border-neutral-200 rounded-xl bg-white shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <CardTitle className="text-lg">Global Leaderboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-40" />
            </CardContent>

            {leaderboardComingSoon && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/90 backdrop-blur-[2px] text-center px-3 sm:px-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-1.5 text-xs font-semibold">
                  <LockIcon className="w-3.5 h-3.5" />
                  Coming Soon
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 font-medium">
                  Leaderboard is not accessible yet
                </p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
