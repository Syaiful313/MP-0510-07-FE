import { Event } from "@/types/event";
import { Calendar } from "lucide-react";
import Link from "next/link";
import EventCard from "./EventCard";

const EventList = ({ events }: { events: Event[] }) => {
  if (!events.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            No Events Found
          </h2>
          <p className="mt-2 text-gray-600">
            Check back later for upcoming events
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-green-50/50 to-white">
      <div className="mx-auto max-w-8xl px-4 py-16">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Events
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Don't miss out on these exciting upcoming events
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className="group transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-2xl bg-white shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <EventCard event={event} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventList;
