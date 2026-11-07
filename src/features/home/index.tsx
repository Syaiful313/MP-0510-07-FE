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
      <main className="min-h-screen w-full bg-background text-foreground">
        <div className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
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
          <div className="rounded-xl bg-white p-6 dark:bg-black">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
              About Our Ticket Marketplace
            </h2>
            <p className="text-black/70 dark:text-white/70">
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
