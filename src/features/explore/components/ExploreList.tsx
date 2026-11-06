import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/features/home/components/EventCard";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import { Search, Calendar, Filter } from "lucide-react";
import Link from "next/link";

interface ExploreListProps {
  data: PageableResponse<Event> | null;
  search: string;
  category: string;
}

const ExploreList = ({ data, search, category }: ExploreListProps) => {
  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <p className="text-xl font-medium text-gray-800">No data available</p>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-8xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Discover Events
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find and join amazing events happening around you
          </p>
        </div>

        <div className="mb-12 rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-6">
            <div className="flex items-center gap-2 pb-4">
              <Filter className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild
                className={`transition-all duration-300 ${
                  category === ""
                    ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                    : "bg-green-50 text-gray-700 hover:bg-green-100"
                }`}
              >
                <Link href="/explore">All Events</Link>
              </Button>
              {["Music", "Sport", "Technology", "Business", "Science", "Art"].map(
                (eventCategory) => (
                  <Button asChild
                    key={eventCategory}
                    className={`transition-all duration-300 ${
                      category === eventCategory
                        ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                        : "bg-green-50 text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    <Link href={`/explore?category=${encodeURIComponent(eventCategory)}`}>
                      {eventCategory}
                    </Link>
                  </Button>
                )
              )}
            </div>
          </div>

          <form action="/explore" method="get" className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-emerald-600" />
            </div>
            <Input
              name="search"
              defaultValue={search}
              placeholder="Search for events..."
              className="w-full rounded-xl border-gray-200 bg-green-50 py-6 pl-10 pr-28 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-emerald-600"
            />
            {category && <input type="hidden" name="category" value={category} />}
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700"
            >
              Search
            </Button>
          </form>
        </div>

        {!data.data.length ? (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-emerald-600" />
              <p className="mt-4 text-xl font-medium text-gray-800">No events found</p>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Upcoming Events
              </h2>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-emerald-800">
                {data.data.length} events found
              </span>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.data.slice(0, 6).map((event, index) => (
                <Link href={`/events/${event.id}`}
                  key={index}
                  className="group relative transform rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreList;
