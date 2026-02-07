import { AuthClient } from "@/app/auth/AuthClient";

export default function AuthIndexPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const redirectTo = searchParams?.redirect || "/dashboard";
  return <AuthClient redirectTo={redirectTo} />;
}

