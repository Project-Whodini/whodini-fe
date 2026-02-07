import { EventDetailClient } from "@/app/events/[eventId]/EventDetailClient";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: { eventId: string } | Promise<{ eventId: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const eventId = safeDecode(resolved.eventId);
  return <EventDetailClient eventId={eventId} />;
}

