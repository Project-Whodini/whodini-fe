import { EventDetailClient } from "@/app/events/[eventId]/EventDetailClient";
import { createSeedDb } from "@/lib/dummy/seed";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateStaticParams(): Promise<Array<{ eventId: string }>> {
  return createSeedDb().events.map((e) => ({ eventId: e.id }));
}

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = safeDecode(params.eventId);
  return <EventDetailClient eventId={eventId} />;
}
