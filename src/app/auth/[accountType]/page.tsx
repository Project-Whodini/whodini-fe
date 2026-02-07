import { AccountAuthClient } from "@/app/auth/[accountType]/AccountAuthClient";
import { notFound } from "next/navigation";

const allowed = ["personal", "business", "community", "organizer", "agency"] as const;

function isAllowedAccountType(value: string): boolean {
  return (allowed as readonly string[]).includes(value);
}

export default async function AccountAuthPage({
  params,
  searchParams,
}: {
  params: { accountType: string } | Promise<{ accountType: string }>;
  searchParams?:
    | { mode?: string; redirect?: string }
    | Promise<{ mode?: string; redirect?: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams ?? {});

  if (!isAllowedAccountType(resolvedParams.accountType)) notFound();
  const initialMode = resolvedSearchParams.mode === "login" ? "login" : "signup";

  return (
    <AccountAuthClient
      accountType={resolvedParams.accountType}
      initialMode={initialMode}
      redirect={resolvedSearchParams.redirect}
    />
  );
}

