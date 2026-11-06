import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Event } from "@/types/event";
import { PageableResponse } from "@/types/pagination";
import ExploreList from "./components/ExploreList";

interface ExplorePageProps {
  data: PageableResponse<Event> | null;
  search: string;
  category: string;
}

const ExplorePage = ({ data, search, category }: ExplorePageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>

      <div className="w-full">
        <ExploreList data={data} search={search} category={category} />
      </div>

      <div className="border-t bg-white">
        <Footer />
      </div>

      <ScrollToTopButton threshold={400} />

      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
    </div>
  );
};

export default ExplorePage;
