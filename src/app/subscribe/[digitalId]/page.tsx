import { SubscribeClient } from "@/app/subscribe/[digitalId]/SubscribeClient";
import { createSeedDb } from "@/lib/dummy/seed";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateStaticParams(): Promise<Array<{ digitalId: string }>> {
  return createSeedDb().brands.map((b) => ({ digitalId: b.digitalId }));
}

export default function SubscribePage({
  params,
}: {
  params: { digitalId: string };
}) {
  const digitalId = safeDecode(params.digitalId);
  return <SubscribeClient digitalId={digitalId} />;
}
