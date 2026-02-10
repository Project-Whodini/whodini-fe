"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getDashboardPathForRole } from "@/lib/dummy/api";
import type { AccountType } from "@/lib/dummy/types";
import { useSignInMutation, useSignUpMutation } from "@/hooks/useDummyApi";
import { ArrowLeft, Briefcase, Building2, Ticket, User, Users } from "lucide-react";

const allowed = ["personal", "business", "community", "organizer", "agency"] as const;
type AllowedAccountType = (typeof allowed)[number];

function isAllowedAccountType(value: string): value is AllowedAccountType {
  return (allowed as readonly string[]).includes(value);
}

export function AccountAuthClient(props: {
  accountType: string;
  initialMode: "login" | "signup";
  redirect?: string;
}) {
  const { accountType: rawType, initialMode, redirect } = props;

  if (!isAllowedAccountType(rawType)) {
    return (
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto max-w-md space-y-3">
          <h1 className="text-xl font-semibold">Unknown account type</h1>
          <p className="text-sm text-muted-foreground">
            Supported: personal, business, community, organizer, agency.
          </p>
          <Button asChild>
            <Link href="/auth">Go to auth</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AccountAuthClientInner
      accountType={rawType}
      initialMode={initialMode}
      redirect={redirect}
    />
  );
}

function AccountAuthClientInner(props: {
  accountType: AllowedAccountType;
  initialMode: "login" | "signup";
  redirect?: string;
}) {
  const router = useRouter();
  const { accountType, initialMode, redirect } = props;

  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const signIn = useSignInMutation();
  const signUp = useSignUpMutation();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState<string>("");
  const [businessDescription, setBusinessDescription] = useState("");

  const [communityName, setCommunityName] = useState("");
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [organizationType, setOrganizationType] = useState<string>("");

  const [organizerName, setOrganizerName] = useState("");
  const [organizerType, setOrganizerType] = useState<string>("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyType, setAgencyType] = useState<string>("");

  const isBusy = signIn.isPending || signUp.isPending;
  const afterAuthPath = redirect || getDashboardPathForRole(accountType as AccountType);

  const Icon =
    accountType === "personal"
      ? User
      : accountType === "business"
        ? Building2
        : accountType === "community"
          ? Users
          : accountType === "organizer"
            ? Ticket
            : Briefcase;

  const headline =
    mode === "signup"
      ? accountType === "personal"
        ? "Create Personal Account"
        : accountType === "business"
          ? "Create Business Account"
          : accountType === "community"
            ? "Create Community Account"
            : accountType === "organizer"
              ? "Create Event Organizer Account"
              : "Create Agency Account"
      : "Sign in";

  const subhead =
    mode === "signup"
      ? accountType === "personal"
        ? "Start managing your brand subscriptions"
        : accountType === "business"
          ? "Start sending notifications to your subscribers"
          : accountType === "community"
            ? "Start communicating with your members"
            : accountType === "organizer"
              ? "Manage events with multiple vendors and attendees"
              : "Manage multiple business clients from one dashboard"
      : "Access your dashboard";

  const industryOptions = [
    "Retail",
    "Food & Beverage",
    "Healthcare",
    "Technology",
    "Entertainment",
    "Fashion",
    "Automotive",
    "Real Estate",
    "Finance",
    "Other",
  ];

  const orgTypeOptions = ["Non-profit", "School", "Club", "Company", "Government", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Button
          asChild
          variant="ghost"
          className="mb-8 px-0 text-white/90 hover:bg-white/10 hover:text-white"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </span>
          </Link>
        </Button>

        <div className="flex justify-center">
          <Card className="w-full max-w-xl rounded-3xl border-white/10 bg-background shadow-2xl">
            <CardHeader className="space-y-2 pb-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100">
                <Icon className="h-8 w-8 text-neutral-800" />
              </div>
              <CardTitle className="text-3xl">{headline}</CardTitle>
              <CardDescription className="text-base">{subhead}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {mode === "signup" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      {accountType === "business"
                        ? "Business Name"
                        : accountType === "community"
                          ? "Organization Name"
                          : accountType === "organizer"
                            ? "Organization Name"
                            : accountType === "agency"
                              ? "Agency Name"
                              : "Full Name"}
                    </Label>
                    <Input
                      id="fullName"
                      className="h-12 rounded-full px-4"
                      placeholder="John Doe"
                      value={
                        accountType === "business"
                          ? businessName
                          : accountType === "community"
                            ? communityName
                            : accountType === "organizer"
                              ? organizerName
                              : accountType === "agency"
                                ? agencyName
                                : displayName
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (accountType === "business") setBusinessName(v);
                        else if (accountType === "community") setCommunityName(v);
                        else if (accountType === "organizer") setOrganizerName(v);
                        else if (accountType === "agency") setAgencyName(v);
                        else setDisplayName(v);
                      }}
                    />
                  </div>

                  {(accountType === "business" || accountType === "community" || accountType === "organizer" || accountType === "agency") && (
                    <div className="space-y-2">
                      <Label htmlFor="type">
                        {accountType === "business"
                          ? "Industry"
                          : accountType === "agency"
                            ? "Agency Type"
                            : "Organization Type"}
                      </Label>
                      <Select
                        value={
                          accountType === "business"
                            ? industry
                            : accountType === "agency"
                              ? agencyType
                              : accountType === "organizer"
                                ? organizerType
                                : organizationType
                        }
                        onValueChange={(v) => {
                          if (accountType === "business") setIndustry(v);
                          else if (accountType === "agency") setAgencyType(v);
                          else if (accountType === "organizer") setOrganizerType(v);
                          else setOrganizationType(v);
                        }}
                      >
                        <SelectTrigger className="h-12 rounded-full px-4">
                          <SelectValue placeholder={`Select ${accountType === "business" ? "your industry" : "type"}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {(accountType === "business" ? industryOptions : orgTypeOptions).map((opt) => (
                            <SelectItem key={opt} value={opt.toLowerCase()}>
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">{accountType === "business" ? "Business Email" : "Email"}</Label>
                    <Input
                      id="email"
                      className="h-12 rounded-full px-4"
                      placeholder={accountType === "business" ? "business@company.com" : "you@example.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="h-12 rounded-full px-4"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {accountType === "business" && (
                    <div className="space-y-2">
                      <Label htmlFor="bizDesc">Description (optional)</Label>
                      <Input
                        id="bizDesc"
                        className="h-12 rounded-full px-4"
                        placeholder="What do you do?"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                      />
                    </div>
                  )}

                  {accountType === "community" && (
                    <div className="flex items-center justify-between rounded-xl border p-3">
                      <div>
                        <p className="text-sm font-medium">Approval required</p>
                        <p className="text-xs text-muted-foreground">
                          If on, new members are pending until approved.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant={approvalRequired ? "default" : "outline"}
                        onClick={() => setApprovalRequired((v) => !v)}
                      >
                        {approvalRequired ? "On" : "Off"}
                      </Button>
                    </div>
                  )}

                  {signUp.error && (
                    <p className="text-sm text-destructive">{(signUp.error as Error).message}</p>
                  )}

                  <Button
                    className="h-12 w-full rounded-full"
                    disabled={isBusy || email.trim().length < 3}
                    onClick={async () => {
                      await signUp.mutateAsync(
                        accountType === "personal"
                          ? { accountType, email, displayName }
                          : accountType === "business"
                            ? {
                                accountType,
                                email,
                                displayName,
                                businessName,
                                industry,
                                description: businessDescription,
                              }
                            : accountType === "community"
                              ? {
                                  accountType,
                                  email,
                                  displayName,
                                  communityName,
                                  approvalRequired,
                                }
                              : accountType === "organizer"
                                ? { accountType, email, displayName, organizerName }
                                : { accountType, email, displayName, agencyName }
                      );
                      router.push(afterAuthPath);
                    }}
                  >
                    {accountType === "business" ? "Create Business Account" : "Create Account"}
                  </Button>

                  <div className="pt-1 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button className="font-medium text-primary underline-offset-4 hover:underline" onClick={() => setMode("login")}>
                      Sign in
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">Email</Label>
                    <Input
                      id="loginEmail"
                      className="h-12 rounded-full px-4"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      className="h-12 rounded-full px-4"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {signIn.error && (
                    <p className="text-sm text-destructive">{(signIn.error as Error).message}</p>
                  )}

                  <Button
                    className="h-12 w-full rounded-full"
                    disabled={isBusy || email.trim().length < 3}
                    onClick={async () => {
                      await signIn.mutateAsync({ email });
                      router.push(afterAuthPath);
                    }}
                  >
                    Sign in
                  </Button>

                  <div className="pt-1 text-center text-sm text-muted-foreground">
                    Don’t have an account?{" "}
                    <button className="font-medium text-primary underline-offset-4 hover:underline" onClick={() => setMode("signup")}>
                      Create one
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

