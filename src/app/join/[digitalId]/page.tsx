import { JoinClient } from "@/app/join/[digitalId]/JoinClient";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function JoinCommunityPage({
  params,
}: {
  params: { digitalId: string } | Promise<{ digitalId: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const digitalId = safeDecode(resolved.digitalId);
  return <JoinClient digitalId={digitalId} />;
}
