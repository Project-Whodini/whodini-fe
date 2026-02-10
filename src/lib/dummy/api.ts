import type {
  AccountType,
  Brand,
  BrandSubscription,
  Community,
  CommunityMembership,
  CommunityMembershipStatus,
  DummyDb,
  Event,
  EventRegistration,
  Role,
  Session,
  UserCommunityMessage,
  UserNotification,
} from "@/lib/dummy/types";
import { createSeedDb } from "@/lib/dummy/seed";
import { createId, readDb, readSession, writeDb, writeSession } from "@/lib/dummy/storage";

function requireDb(): DummyDb {
  const existing = readDb();
  if (existing) return existing;
  const seeded = createSeedDb();
  writeDb(seeded);
  return seeded;
}

function requireSession(): Session {
  const s = readSession();
  if (!s) throw new Error("Not signed in");
  return s;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function ensurePersonalRole(roles: Role[], email: string, displayName: string): Role[] {
  if (roles.some((r) => r.accountType === "personal")) return roles;
  return [
    ...roles,
    {
      accountType: "personal",
      accountId: `personal_${email}`,
      label: displayName || "Personal",
    },
  ];
}

export async function getSession(): Promise<Session | null> {
  return readSession();
}

export async function signOut(): Promise<void> {
  writeSession(null);
}

type PersonalSignUpInput = {
  accountType: "personal";
  email: string;
  displayName: string;
};

type BusinessSignUpInput = {
  accountType: "business";
  email: string;
  displayName: string;
  businessName: string;
  industry?: string;
  description?: string;
};

type CommunitySignUpInput = {
  accountType: "community";
  email: string;
  displayName: string;
  communityName: string;
  approvalRequired: boolean;
  description?: string;
};

type OrganizerSignUpInput = {
  accountType: "organizer";
  email: string;
  displayName: string;
  organizerName: string;
};

type AgencySignUpInput = {
  accountType: "agency";
  email: string;
  displayName: string;
  agencyName: string;
};

export type SignUpInput =
  | PersonalSignUpInput
  | BusinessSignUpInput
  | CommunitySignUpInput
  | OrganizerSignUpInput
  | AgencySignUpInput;

export async function signUp(input: SignUpInput): Promise<Session> {
  const email = normalizeEmail(input.email);
  const displayName = input.displayName.trim() || "User";

  // For dummy data, “sign up” means: create session + (for org types) create org record in the local DB.
  const current = readSession();
  const baseRoles = current?.email === email ? current.roles : [];
  const rolesWithPersonal = ensurePersonalRole(baseRoles, email, displayName);

  const db = requireDb();

  let newRole: Role | null = null;

  if (input.accountType === "personal") {
    newRole = rolesWithPersonal.find((r) => r.accountType === "personal") ?? null;
  }

  if (input.accountType === "business") {
    const brandId = createId("brand");
    const digitalId = `WD-B-${input.businessName.trim().toUpperCase().replace(/\\s+/g, "").slice(0, 10)}`;
    const brand: Brand = {
      id: brandId,
      digitalId,
      name: input.businessName.trim() || "Business",
      industry: input.industry?.trim() || undefined,
      description: input.description?.trim() || undefined,
    };
    writeDb({
      ...db,
      brands: [brand, ...db.brands],
    });
    newRole = { accountType: "business", accountId: brandId, label: brand.name };
  }

  if (input.accountType === "community") {
    const communityId = createId("community");
    const digitalId = `WD-C-${input.communityName.trim().toUpperCase().replace(/\\s+/g, "").slice(0, 10)}`;
    const community: Community = {
      id: communityId,
      digitalId,
      name: input.communityName.trim() || "Community",
      description: input.description?.trim() || undefined,
      approvalRequired: input.approvalRequired,
    };
    writeDb({
      ...db,
      communities: [community, ...db.communities],
    });
    newRole = { accountType: "community", accountId: communityId, label: community.name };
  }

  if (input.accountType === "organizer") {
    newRole = {
      accountType: "organizer",
      accountId: createId("organizer"),
      label: input.organizerName.trim() || "Organizer",
    };
  }

  if (input.accountType === "agency") {
    newRole = {
      accountType: "agency",
      accountId: createId("agency"),
      label: input.agencyName.trim() || "Agency",
    };
  }

  const nextRoles = newRole
    ? [...rolesWithPersonal.filter((r) => !(r.accountType === newRole!.accountType && r.accountId === newRole!.accountId)), newRole]
    : rolesWithPersonal;

  const session: Session = {
    userId: current?.email === email ? current.userId : createId("user"),
    email,
    displayName,
    roles: nextRoles,
    activeRoleIndex: Math.max(
      0,
      newRole ? nextRoles.findIndex((r) => r.accountType === newRole.accountType && r.accountId === newRole.accountId) : 0
    ),
  };

  writeSession(session);
  return session;
}

export async function signIn(params: { email: string }): Promise<Session> {
  // Dummy sign-in: if there's an existing session for this email, keep it; otherwise create personal-only.
  const email = normalizeEmail(params.email);
  const current = readSession();
  if (current?.email === email) return current;

  const session: Session = {
    userId: createId("user"),
    email,
    displayName: email.split("@")[0] || "User",
    roles: ensurePersonalRole([], email, email.split("@")[0] || "User"),
    activeRoleIndex: 0,
  };
  writeSession(session);
  return session;
}

export async function setActiveRoleIndex(index: number): Promise<Session> {
  const session = requireSession();
  const clamped = Math.min(Math.max(index, 0), session.roles.length - 1);
  const next: Session = { ...session, activeRoleIndex: clamped };
  writeSession(next);
  return next;
}

export async function getBrands(): Promise<Brand[]> {
  return requireDb().brands;
}

export async function getBrandByDigitalId(digitalId: string): Promise<Brand | null> {
  const id = digitalId.trim();
  return requireDb().brands.find((b) => b.digitalId === id) ?? null;
}

export async function getCommunities(): Promise<Community[]> {
  return requireDb().communities;
}

export async function getCommunityByDigitalId(digitalId: string): Promise<Community | null> {
  const id = digitalId.trim();
  return requireDb().communities.find((c) => c.digitalId === id) ?? null;
}

export async function getEvents(): Promise<Event[]> {
  return requireDb().events.slice().sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getEventById(id: string): Promise<Event | null> {
  return requireDb().events.find((e) => e.id === id) ?? null;
}

export async function getMySubscriptions(): Promise<BrandSubscription[]> {
  const s = requireSession();
  return requireDb().subscriptions.filter((sub) => sub.userId === s.userId);
}

export async function getSubscriptionsForBrand(brandId: string): Promise<BrandSubscription[]> {
  const db = requireDb();
  return db.subscriptions
    .filter((sub) => sub.brandId === brandId)
    .slice()
    .sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
}

export async function getMyMemberships(): Promise<CommunityMembership[]> {
  const s = requireSession();
  return requireDb().memberships.filter((m) => m.userId === s.userId);
}

export async function getMembershipsForCommunity(communityId: string): Promise<CommunityMembership[]> {
  const db = requireDb();
  return db.memberships
    .filter((m) => m.communityId === communityId)
    .slice()
    .sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}

export async function getMyNotifications(): Promise<UserNotification[]> {
  const s = requireSession();
  return requireDb().notifications
    .filter((n) => n.userId === s.userId)
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMyCommunityMessages(): Promise<UserCommunityMessage[]> {
  const s = requireSession();
  return requireDb().communityMessages
    .filter((m) => m.userId === s.userId)
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getMyRegistrations(): Promise<EventRegistration[]> {
  const s = requireSession();
  return requireDb().registrations
    .filter((r) => r.userId === s.userId)
    .slice()
    .sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
}

export async function subscribeToBrand(brandId: string): Promise<void> {
  const s = requireSession();
  const db = requireDb();
  if (!db.brands.some((b) => b.id === brandId)) throw new Error("Brand not found");

  const already = db.subscriptions.some((sub) => sub.userId === s.userId && sub.brandId === brandId);
  if (already) return;

  const next: BrandSubscription = {
    id: createId("sub"),
    userId: s.userId,
    brandId,
    subscribedAt: new Date().toISOString(),
  };

  writeDb({ ...db, subscriptions: [next, ...db.subscriptions] });
}

export async function joinCommunity(communityId: string): Promise<CommunityMembershipStatus> {
  const s = requireSession();
  const db = requireDb();
  const community = db.communities.find((c) => c.id === communityId);
  if (!community) throw new Error("Community not found");

  const existing = db.memberships.find((m) => m.userId === s.userId && m.communityId === communityId);
  if (existing) return existing.status;

  const status: CommunityMembershipStatus = community.approvalRequired ? "pending" : "active";
  const membership: CommunityMembership = {
    id: createId("member"),
    userId: s.userId,
    communityId,
    status,
    joinedAt: new Date().toISOString(),
  };

  writeDb({ ...db, memberships: [membership, ...db.memberships] });
  return status;
}

export async function approveMembership(membershipId: string): Promise<void> {
  // Dummy: flip pending -> active
  const db = requireDb();
  const membership = db.memberships.find((m) => m.id === membershipId);
  if (!membership) throw new Error("Membership not found");
  if (membership.status === "active") return;

  writeDb({
    ...db,
    memberships: db.memberships.map((m) => (m.id === membershipId ? { ...m, status: "active" } : m)),
  });
}

export async function createBrandNotification(input: {
  brandId: string;
  title: string;
  message: string;
}): Promise<void> {
  const db = requireDb();
  const brand = db.brands.find((b) => b.id === input.brandId);
  if (!brand) throw new Error("Brand not found");

  const now = new Date().toISOString();
  const fanout: UserNotification[] = db.subscriptions
    .filter((s) => s.brandId === input.brandId)
    .map((sub) => ({
      id: createId("notif"),
      userId: sub.userId,
      fromBrandId: input.brandId,
      title: input.title.trim() || `Update from ${brand.name}`,
      message: input.message.trim() || "",
      createdAt: now,
      status: "pending",
    }));

  writeDb({
    ...db,
    notifications: [...fanout, ...db.notifications],
  });
}

export async function createCommunityAnnouncement(input: {
  communityId: string;
  title: string;
  message: string;
}): Promise<void> {
  const db = requireDb();
  const community = db.communities.find((c) => c.id === input.communityId);
  if (!community) throw new Error("Community not found");

  const now = new Date().toISOString();
  const fanout: UserCommunityMessage[] = db.memberships
    .filter((m) => m.communityId === input.communityId && m.status === "active")
    .map((member) => ({
      id: createId("cmsg"),
      userId: member.userId,
      fromCommunityId: input.communityId,
      title: input.title.trim() || `Message from ${community.name}`,
      message: input.message.trim() || "",
      createdAt: now,
    }));

  writeDb({
    ...db,
    communityMessages: [...fanout, ...db.communityMessages],
  });
}

export async function markCommunityMessageRead(messageId: string): Promise<void> {
  const s = requireSession();
  const db = requireDb();
  const msg = db.communityMessages.find((m) => m.id === messageId && m.userId === s.userId);
  if (!msg) return;
  if (msg.readAt) return;

  writeDb({
    ...db,
    communityMessages: db.communityMessages.map((m) =>
      m.id === messageId ? { ...m, readAt: new Date().toISOString() } : m
    ),
  });
}

export async function registerForEvent(eventId: string): Promise<void> {
  const s = requireSession();
  const db = requireDb();
  const event = db.events.find((e) => e.id === eventId);
  if (!event) throw new Error("Event not found");

  const existing = db.registrations.find((r) => r.userId === s.userId && r.eventId === eventId);
  if (existing) return;

  const reg: EventRegistration = {
    id: createId("reg"),
    userId: s.userId,
    eventId,
    registeredAt: new Date().toISOString(),
  };

  writeDb({ ...db, registrations: [reg, ...db.registrations] });
}

export async function createEvent(input: {
  title: string;
  description?: string;
  startsAt: string;
  locationType: Event["locationType"];
  locationLabel?: string;
  organizerLabel: string;
}): Promise<void> {
  const db = requireDb();
  const event: Event = {
    id: createId("event"),
    title: input.title.trim() || "Untitled Event",
    description: input.description?.trim() || undefined,
    startsAt: input.startsAt,
    locationType: input.locationType,
    locationLabel: input.locationLabel?.trim() || undefined,
    organizerLabel: input.organizerLabel,
  };
  writeDb({ ...db, events: [event, ...db.events] });
}

export async function getActiveRole(): Promise<{ role: Role; session: Session } | null> {
  const session = readSession();
  if (!session) return null;
  const role = session.roles[session.activeRoleIndex];
  if (!role) return null;
  return { role, session };
}

export function getDashboardPathForRole(type: AccountType): string {
  if (type === "business") return "/business";
  if (type === "community") return "/community";
  if (type === "organizer") return "/organizer";
  if (type === "agency") return "/agency";
  if (type === "whodini") return "/whodini";
  return "/dashboard";
}

