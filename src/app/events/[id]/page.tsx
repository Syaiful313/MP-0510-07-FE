import EventDetailPage from "@/features/event/EventDetailPage";
import { notFound } from "next/navigation";

const EventDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isSafeInteger(eventId) || eventId < 1) notFound();

  return <EventDetailPage eventId={eventId} />;
};

export default EventDetail;
