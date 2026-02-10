"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSessionQuery, useSignInMutation } from "@/hooks/useDummyApi";
import { ArrowLeft, Lock } from "lucide-react";

export function AuthClient({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const { data: session } = useSessionQuery();
  const signIn = useSignInMutation();

  const [email, setEmail] = useState("");

  const isBusy = signIn.isPending;
  const canSubmit = email.trim().length > 3 && !isBusy;

  const accountTypeLinks = useMemo(
    () => [
      { type: "personal", label: "Personal" },
      { type: "business", label: "Business / Brand" },
      { type: "community", label: "Community / Organization" },
      { type: "organizer", label: "Event Organizer" },
      { type: "agency", label: "Agency" },
    ],
    []
  );

  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 px-6 py-12">
        <div className="mx-auto max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>You’re already signed in</CardTitle>
              <CardDescription>{session.email}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button asChild className="flex-1">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                <Lock className="h-8 w-8 text-neutral-800" />
              </div>
              <CardTitle className="text-3xl">Sign in</CardTitle>
              <CardDescription className="text-base">Access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="h-12 rounded-full px-4"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {signIn.error && (
                <p className="text-sm text-destructive">{(signIn.error as Error).message}</p>
              )}

              <Button
                className="h-12 w-full rounded-full"
                disabled={!canSubmit}
                onClick={async () => {
                  await signIn.mutateAsync({ email });
                  router.push(redirectTo);
                }}
              >
                Sign in
              </Button>

              <div className="pt-1 text-center text-sm text-muted-foreground">
                Need an account?{" "}
                <Link
                  href={`/auth/personal?mode=signup&redirect=${encodeURIComponent(redirectTo)}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Create one
                </Link>
              </div>

              <div className="pt-4">
                <div className="mb-2 text-center text-xs font-medium text-muted-foreground">
                  Or pick an account type
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {accountTypeLinks.map((a) => (
                    <Button key={a.type} asChild variant="outline" className="justify-start rounded-full">
                      <Link href={`/auth/${a.type}?mode=signup&redirect=${encodeURIComponent(redirectTo)}`}>
                        {a.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

