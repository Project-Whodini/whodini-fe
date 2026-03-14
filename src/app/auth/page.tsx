import { redirect } from "next/navigation";

export default function AuthIndexPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirectTo = searchParams?.redirect || "/dashboard";
  redirect(`/?redirect=${encodeURIComponent(redirectTo)}`);
}
