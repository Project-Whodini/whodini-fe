import { JoinClient } from "@/app/join/[digitalId]/JoinClient";
import { createSeedDb } from "@/lib/dummy/seed";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateStaticParams(): Promise<Array<{ digitalId: string }>> {
  return createSeedDb().communities.map((c) => ({ digitalId: c.digitalId }));
}

export default function JoinCommunityPage({
  params,
}: {
  params: { digitalId: string };
}) {
  const digitalId = safeDecode(params.digitalId);
  return <JoinClient digitalId={digitalId} />;
}
