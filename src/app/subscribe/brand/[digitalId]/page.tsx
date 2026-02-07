import { redirect } from "next/navigation";

export default async function BrandSubscribeRedirectPage({
  params,
}: {
  params: { digitalId: string } | Promise<{ digitalId: string }>;
}) {
  const resolvedParams = await Promise.resolve(params);
  redirect(`/subscribe/${encodeURIComponent(resolvedParams.digitalId)}`);
}

