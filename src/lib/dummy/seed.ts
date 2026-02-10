import type { DummyDb } from "@/lib/dummy/types";

export function createSeedDb(now = new Date()): DummyDb {
  const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const inTenDays = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000);

  return {
    brands: [
      {
        id: "brand_1",
        digitalId: "WD-B-ACME",
        name: "Acme Coffee",
        industry: "food & beverage",
        description: "Local coffee, seasonal specials, and member deals.",
      },
      {
        id: "brand_2",
        digitalId: "WD-B-GLOW",
        name: "Glow Fitness",
        industry: "health",
        description: "Classes, challenges, and community events.",
      },
      {
        id: "brand_3",
        digitalId: "WD-B-URBAN",
        name: "Urban Market",
        industry: "retail",
        description: "New arrivals, flash sales, and store events.",
      },
    ],
    communities: [
      {
        id: "community_1",
        digitalId: "WD-C-RUNCLUB",
        name: "City Run Club",
        description: "Weekly runs and training tips.",
        approvalRequired: false,
      },
      {
        id: "community_2",
        digitalId: "WD-C-ALUMNI",
        name: "Northside Alumni",
        description: "Announcements, reunions, and networking.",
        approvalRequired: true,
      },
    ],
    events: [
      {
        id: "event_1",
        title: "Coffee Tasting Night",
        description: "Try 4 single-origin coffees and vote your favorite.",
        startsAt: inTwoDays.toISOString(),
        locationType: "in_person",
        locationLabel: "Acme Coffee - Downtown",
        organizerLabel: "Acme Coffee",
      },
      {
        id: "event_2",
        title: "Glow Fitness Virtual Challenge Kickoff",
        description: "Join the kickoff and get the full challenge schedule.",
        startsAt: inTenDays.toISOString(),
        locationType: "virtual",
        locationLabel: "Online",
        organizerLabel: "Glow Fitness",
      },
    ],
    subscriptions: [],
    memberships: [],
    notifications: [],
    communityMessages: [],
    registrations: [],
  };
}

