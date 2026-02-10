import { AccountAuthClient } from "@/app/auth/[accountType]/AccountAuthClient";
import { notFound } from "next/navigation";

const allowed = ["personal", "business", "community", "organizer", "agency"] as const;

function isAllowedAccountType(value: string): boolean {
  return (allowed as readonly string[]).includes(value);
}

export async function generateStaticParams(): Promise<Array<{ accountType: string }>> {
  return allowed.map((accountType) => ({ accountType }));
}

export default function AccountAuthPage({
  params,
  searchParams,
}: {
  params: { accountType: string };
  searchParams?: { mode?: string; redirect?: string };
}) {
  const resolvedSearchParams = searchParams ?? {};

  if (!isAllowedAccountType(params.accountType)) notFound();
  const initialMode = resolvedSearchParams.mode === "login" ? "login" : "signup";

  return (
    <AccountAuthClient
      accountType={params.accountType}
      initialMode={initialMode}
      redirect={resolvedSearchParams.redirect}
    />
  );
}
