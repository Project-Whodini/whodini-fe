import { redirect } from "next/navigation";
import { createSeedDb } from "@/lib/dummy/seed";

export async function generateStaticParams(): Promise<Array<{ digitalId: string }>> {
  return createSeedDb().brands.map((b) => ({ digitalId: b.digitalId }));
}

export default function BrandSubscribeRedirectPage({
  params,
}: {
  params: { digitalId: string };
}) {
  redirect(`/subscribe/${encodeURIComponent(params.digitalId)}`);
}
