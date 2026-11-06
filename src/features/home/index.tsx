import Navbar from "@/components/Navbar";
import { getEventsFromServer } from "@/lib/server-events";
import EventList from "./components/EventList";
import { HeroSection } from "./components/HeroSection";

const HomePage = async () => {
  const eventResponse = await getEventsFromServer({ page: 1, take: 10 }).catch(
    () => null,
  );
  const events = eventResponse?.data ?? [];

  return (
    <>
      <main className="min-h-screen w-full">
        <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto">
            <Navbar />
          </div>
        </div>

        <div className="mx-auto max-w-8xl px-4 py-16">
          <HeroSection events={events.slice(0, 5)} hasError={!eventResponse} />
        </div>

        <div>
          <EventList events={events.slice(0, 4)} />
        </div>

        <div className="mx-auto max-w-8xl px-4 py-16">
          <div className="rounded-xl bg-gray-50 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              About Our Ticket Marketplace
            </h2>
            <p className="text-gray-600">
              Our marketplace provides a secure platform for buying and selling
              tickets to your favorite events. Whether you're looking for
              concerts, sports, or theater events, we ensure a seamless
              transaction process with our guaranteed authenticity policy.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
