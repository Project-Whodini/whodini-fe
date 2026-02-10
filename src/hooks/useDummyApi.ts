"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SignUpInput } from "@/lib/dummy/api";
import {
  approveMembership,
  createBrandNotification,
  createCommunityAnnouncement,
  createEvent,
  getMembershipsForCommunity,
  getBrandByDigitalId,
  getBrands,
  getCommunities,
  getCommunityByDigitalId,
  getEventById,
  getEvents,
  getSubscriptionsForBrand,
  getMyCommunityMessages,
  getMyMemberships,
  getMyNotifications,
  getMyRegistrations,
  getMySubscriptions,
  getSession,
  markCommunityMessageRead,
  registerForEvent,
  setActiveRoleIndex,
  signIn,
  signOut,
  signUp,
  subscribeToBrand,
  joinCommunity,
} from "@/lib/dummy/api";

const keys = {
  session: ["session"] as const,
  brands: ["brands"] as const,
  brandByDigitalId: (digitalId: string) => ["brands", "digitalId", digitalId] as const,
  communities: ["communities"] as const,
  communityByDigitalId: (digitalId: string) => ["communities", "digitalId", digitalId] as const,
  events: ["events"] as const,
  eventById: (eventId: string) => ["events", "id", eventId] as const,
  mySubscriptions: ["me", "subscriptions"] as const,
  brandSubscribers: (brandId: string) => ["brands", brandId, "subscribers"] as const,
  myMemberships: ["me", "memberships"] as const,
  communityMembers: (communityId: string) => ["communities", communityId, "members"] as const,
  myNotifications: ["me", "notifications"] as const,
  myCommunityMessages: ["me", "communityMessages"] as const,
  myRegistrations: ["me", "registrations"] as const,
};

export function useSessionQuery() {
  return useQuery({
    queryKey: keys.session,
    queryFn: getSession,
  });
}

export function useBrandsQuery() {
  return useQuery({ queryKey: keys.brands, queryFn: getBrands });
}

export function useBrandByDigitalIdQuery(digitalId: string) {
  return useQuery({
    queryKey: keys.brandByDigitalId(digitalId),
    queryFn: () => getBrandByDigitalId(digitalId),
    enabled: !!digitalId,
  });
}

export function useCommunitiesQuery() {
  return useQuery({ queryKey: keys.communities, queryFn: getCommunities });
}

export function useCommunityByDigitalIdQuery(digitalId: string) {
  return useQuery({
    queryKey: keys.communityByDigitalId(digitalId),
    queryFn: () => getCommunityByDigitalId(digitalId),
    enabled: !!digitalId,
  });
}

export function useEventsQuery() {
  return useQuery({ queryKey: keys.events, queryFn: getEvents });
}

export function useEventByIdQuery(eventId: string) {
  return useQuery({
    queryKey: keys.eventById(eventId),
    queryFn: () => getEventById(eventId),
    enabled: !!eventId,
  });
}

export function useMySubscriptionsQuery(enabled = true) {
  return useQuery({
    queryKey: keys.mySubscriptions,
    queryFn: getMySubscriptions,
    enabled,
  });
}

export function useBrandSubscribersQuery(brandId: string, enabled = true) {
  return useQuery({
    queryKey: keys.brandSubscribers(brandId),
    queryFn: () => getSubscriptionsForBrand(brandId),
    enabled: enabled && !!brandId,
  });
}

export function useMyMembershipsQuery(enabled = true) {
  return useQuery({
    queryKey: keys.myMemberships,
    queryFn: getMyMemberships,
    enabled,
  });
}

export function useCommunityMembersQuery(communityId: string, enabled = true) {
  return useQuery({
    queryKey: keys.communityMembers(communityId),
    queryFn: () => getMembershipsForCommunity(communityId),
    enabled: enabled && !!communityId,
  });
}

export function useMyNotificationsQuery(enabled = true) {
  return useQuery({
    queryKey: keys.myNotifications,
    queryFn: getMyNotifications,
    enabled,
  });
}

export function useMyCommunityMessagesQuery(enabled = true) {
  return useQuery({
    queryKey: keys.myCommunityMessages,
    queryFn: getMyCommunityMessages,
    enabled,
  });
}

export function useMyRegistrationsQuery(enabled = true) {
  return useQuery({
    queryKey: keys.myRegistrations,
    queryFn: getMyRegistrations,
    enabled,
  });
}

export function useSignInMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { email: string }) => signIn(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.session });
    },
  });
}

export function useSignUpMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SignUpInput) => signUp(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.session });
      await qc.invalidateQueries({ queryKey: keys.brands });
      await qc.invalidateQueries({ queryKey: keys.communities });
    },
  });
}

export function useSignOutMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: async () => {
      await qc.invalidateQueries();
    },
  });
}

export function useSetActiveRoleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (index: number) => setActiveRoleIndex(index),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.session });
    },
  });
}

export function useSubscribeToBrandMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (brandId: string) => subscribeToBrand(brandId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.mySubscriptions });
    },
  });
}

export function useJoinCommunityMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myMemberships });
    },
  });
}

export function useApproveMembershipMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (membershipId: string) => approveMembership(membershipId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myMemberships });
    },
  });
}

export function useCreateBrandNotificationMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { brandId: string; title: string; message: string }) =>
      createBrandNotification(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myNotifications });
    },
  });
}

export function useCreateCommunityAnnouncementMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { communityId: string; title: string; message: string }) =>
      createCommunityAnnouncement(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myCommunityMessages });
    },
  });
}

export function useMarkCommunityMessageReadMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (messageId: string) => markCommunityMessageRead(messageId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myCommunityMessages });
    },
  });
}

export function useRegisterForEventMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => registerForEvent(eventId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.myRegistrations });
    },
  });
}

export function useCreateEventMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      title: string;
      description?: string;
      startsAt: string;
      locationType: "in_person" | "virtual" | "hybrid";
      locationLabel?: string;
      organizerLabel: string;
    }) => createEvent(input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: keys.events });
    },
  });
}

