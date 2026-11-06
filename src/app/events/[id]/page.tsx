import EventDetailPage from "@/features/event/EventDetailPage";
import {
  getEventFromServer,
  getEventReviewsFromServer,
} from "@/lib/server-events";
import { notFound } from "next/navigation";

const EventDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const eventId = Number(id);

  if (!Number.isSafeInteger(eventId) || eventId < 1) notFound();

  const event = await getEventFromServer(eventId);

  if (!event) notFound();

  const isEventFinished = new Date(event.endDate).getTime() < Date.now();
  const reviews = isEventFinished
    ? await getEventReviewsFromServer(eventId).catch(() => null)
    : null;

  return (
    <EventDetailPage
      event={event}
      isEventFinished={isEventFinished}
      reviews={reviews}
    />
  );
};

export default EventDetail;
