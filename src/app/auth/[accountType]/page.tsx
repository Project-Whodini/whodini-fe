import { redirect } from "next/navigation";

const allowed = ["personal", "business", "community", "organizer", "agency"] as const;

export async function generateStaticParams(): Promise<Array<{ accountType: string }>> {
  return allowed.map((accountType) => ({ accountType }));
}

export default function AccountAuthPage({
  searchParams,
}: {
  params: { accountType: string };
  searchParams?: { mode?: string; redirect?: string };
}) {
  const resolvedSearchParams = searchParams ?? {};
  redirect(resolvedSearchParams.redirect || "/register");
}
