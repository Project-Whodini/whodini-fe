import { SubscribeClient } from "@/app/subscribe/[digitalId]/SubscribeClient";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function SubscribePage({
  params,
}: {
  params: { digitalId: string } | Promise<{ digitalId: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const digitalId = safeDecode(resolved.digitalId);
  return <SubscribeClient digitalId={digitalId} />;
}

