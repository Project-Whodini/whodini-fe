export type AccountType =
  | "personal"
  | "business"
  | "community"
  | "organizer"
  | "agency"
  | "whodini";

export type Role = {
  accountType: AccountType;
  accountId: string; // e.g. businessId/communityId/etc
  label: string;
};

export type Session = {
  userId: string;
  email: string;
  displayName: string;
  roles: Role[];
  activeRoleIndex: number; // index into roles[]
};

export type Brand = {
  id: string;
  digitalId: string;
  name: string;
  industry?: string;
  description?: string;
};

export type Community = {
  id: string;
  digitalId: string;
  name: string;
  description?: string;
  approvalRequired: boolean;
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  startsAt: string; // ISO string
  locationType: "in_person" | "virtual" | "hybrid";
  locationLabel?: string;
  organizerLabel: string; // business/community/organizer name (display)
};

export type BrandSubscription = {
  id: string;
  userId: string;
  brandId: string;
  subscribedAt: string;
};

export type CommunityMembershipStatus = "active" | "pending";

export type CommunityMembership = {
  id: string;
  userId: string;
  communityId: string;
  status: CommunityMembershipStatus;
  joinedAt: string;
};

export type UserNotificationStatus = "pending" | "saved" | "expired";

export type UserNotification = {
  id: string;
  userId: string;
  fromBrandId: string;
  title: string;
  message: string;
  createdAt: string;
  status: UserNotificationStatus;
};

export type UserCommunityMessage = {
  id: string;
  userId: string;
  fromCommunityId: string;
  title: string;
  message: string;
  createdAt: string;
  readAt?: string;
};

export type EventRegistration = {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
};

export type DummyDb = {
  brands: Brand[];
  communities: Community[];
  events: Event[];
  subscriptions: BrandSubscription[];
  memberships: CommunityMembership[];
  notifications: UserNotification[];
  communityMessages: UserCommunityMessage[];
  registrations: EventRegistration[];
};

