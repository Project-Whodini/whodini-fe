"use client";

import type { Session } from "@/lib/dummy/types";
import { writeSession } from "@/lib/dummy/storage";

const AUTH_TOKEN_KEY = "whodini_auth_token_v1";
const DEFAULT_API_URL = "http://localhost:8000/api";

type AuthUser = {
  id: number | string;
  name: string;
  display_name: string;
  email: string;
  last_followed_business: string | null;
  last_joined_community: string | null;
  created_at?: string | null;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
  message?: string;
};

function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL;
  return `${baseUrl.replace(/\/+$/, "")}${path}`;
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(AUTH_TOKEN_KEY);
}

function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;

  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function mapUserToSession(user: AuthUser): Session {
  return {
    userId: String(user.id),
    email: user.email,
    displayName: user.display_name || user.name,
    roles: [
      {
        accountType: "personal",
        accountId: String(user.id),
        label: user.display_name || user.name || "Personal",
      },
    ],
    activeRoleIndex: 0,
  };
}

function syncSession(user: AuthUser | null): Session | null {
  if (!user) {
    writeSession(null);
    return null;
  }

  const session = mapUserToSession(user);
  writeSession(session);
  return session;
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

async function throwRequestError(response: Response): Promise<never> {
  let message = "Request failed";

  try {
    const body = (await response.json()) as {
      message?: string;
      errors?: Record<string, string[]>;
    };

    message = body.message || Object.values(body.errors ?? {})[0]?.[0] || message;
  } catch {
    message = response.statusText || message;
  }

  throw new Error(message);
}

export async function getCurrentSession(): Promise<Session | null> {
  const token = getStoredToken();

  if (!token) {
    syncSession(null);
    return null;
  }

  const response = await fetch(getApiUrl("/auth/me"), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    setStoredToken(null);
    syncSession(null);
    return null;
  }

  if (!response.ok) {
    await throwRequestError(response);
  }

  const body = await parseJson<{ user: AuthUser }>(response);
  return syncSession(body.user);
}

export async function loginWithPassword(input: {
  email: string;
  password: string;
}): Promise<Session> {
  const response = await fetch(getApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    await throwRequestError(response);
  }

  const body = await parseJson<AuthResponse>(response);
  setStoredToken(body.token);

  const session = syncSession(body.user);

  if (!session) {
    throw new Error("Unable to create session");
  }

  return session;
}

export async function registerUser(input: {
  display_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  last_followed_business?: string | null;
  last_joined_community?: string | null;
}): Promise<Session> {
  const response = await fetch(getApiUrl("/auth/register"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    await throwRequestError(response);
  }

  const body = await parseJson<AuthResponse>(response);
  setStoredToken(body.token);

  const session = syncSession(body.user);

  if (!session) {
    throw new Error("Unable to create session");
  }

  return session;
}

export async function requestPasswordReset(email: string): Promise<string> {
  const response = await fetch(getApiUrl("/auth/forgot-password"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    await throwRequestError(response);
  }

  const body = await parseJson<{ message: string }>(response);
  return body.message;
}

export async function logoutUser(): Promise<void> {
  const token = getStoredToken();

  if (token) {
    await fetch(getApiUrl("/auth/logout"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch(() => undefined);
  }

  setStoredToken(null);
  syncSession(null);
}
